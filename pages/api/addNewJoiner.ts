// import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
// import { verifyCsrfToken } from '../../util/auth';
// import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import { createUser, getUserByUsername, User } from '../../util/database';

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

type RegisterNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: RegisterRequestBody;
};

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: User };

export default async function registerHandler(
  request: NextApiRequest,
  response: NextApiResponse<RegisterResponseBody>,
) {
  if (request.method === 'POST') {
    //  check if un or pw is not string or empty
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
      return;
    }

    // TO DO: check if role exist?

    // check if username already exists in database
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
      request.body.newJoiner.firstName,
      request.body.newJoiner.lastname,
      request.body.userRole,
    );
    console.log('addNewJoiner:', addNewJoiner);
    if (!addNewJoiner) {
      response.status(400).json({
        errors: [{ message: 'failed to save to db' }],
      });
      return;
    }

    response.status(201).json({
      user: addNewJoiner,
    });
    return;
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}
