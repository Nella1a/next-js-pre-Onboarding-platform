// import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
// import { verifyCsrfToken } from '../../util/auth';
// import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  AddUsersFirstAndLastName,
  createUser,
  getUserByUsername,
} from '../../util/database';

/* *******************************************
  Endpoint USER:
  -  POST: Add new user to DB and return to FE
  -  GET:  Read user
  -  PUT:  Update user infos

  ******************************************* */

type RegisterRequestBody = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  userRole: number;
};

type AddNewJoiner = {
  username: string;
  firstName: string;
  lastName: string;
  id: number;
  roleId: number;
};

type RegisterNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: RegisterRequestBody;
};

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: AddNewJoiner };

export default async function registerHandler(
  request: NextApiRequest,
  response: NextApiResponse<RegisterResponseBody>,
) {
  if (request.method === 'POST') {
    // validation 1: check if un or pw is not string or empty
    console.log('request.body:', request.body.newJoiner);
    console.log('request.body.userRole:', request.body.userRole);
    console.log('request.body.userRole Type:', typeof request.body.userRole);
    if (
      typeof request.body.newJoiner.username !== 'string' ||
      !request.body.newJoiner.username ||
      typeof request.body.newJoiner.password !== 'string' ||
      !request.body.newJoiner.password ||
      typeof request.body.newJoiner.firstName !== 'string' ||
      !request.body.newJoiner.firstName ||
      typeof request.body.newJoiner.lastName !== 'string' ||
      !request.body.newJoiner.lastName ||
      !request.body.userRole ||
      typeof request.body.userRole !== 'number'
    ) {
      response.status(400).json({
        errors: [
          {
            message: 'Username or password not provided',
          },
        ],
      });
      return; // Always include a return in api route, important because it will prevent "Headers" already sent" error
    }

    // TO DO: check if role exist?

    // validation 2: check if username already exists in database
    if (await getUserByUsername(request.body.newJoiner.username)) {
      response.status(409).json({
        errors: [{ message: 'Username is already taken' }],
      });
      return; // Always include a return in api route,
    }

    // create passwordHash
    const passwordHash = await bcrypt.hash(request.body.newJoiner.password, 12);

    // add new user & passwordHash to database
    const addNewJoiner = await createUser(
      request.body.newJoiner.username,
      passwordHash,
      request.body.userRole,
    );
    console.log('addNewJoiner:', addNewJoiner);
    // add first & last name to database

    const userFirstAndLastName = await AddUsersFirstAndLastName(
      addNewJoiner.id,
      request.body.newJoiner.firstName,
      request.body.newJoiner.lastName,
    );
    console.log('UserFullName', userFirstAndLastName);
    // Add user to the response body
    /*  response.status(201).json({
      user: {
        addNewJoiner: addNewJoiner,
      },
    });
    return;
  } */
    response.status(201).json({
      user: userFirstAndLastName,
    });
    return;
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}
