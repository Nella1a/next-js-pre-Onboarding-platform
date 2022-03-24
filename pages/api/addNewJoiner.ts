import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByUsername, User } from '../../util/database';

type RegisterRequestBody = {
  username: string;
  password: string;
  userRole: number;
  firstName: string;
  lastName: string;
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
    // validation 1: check if un or pw is not string or empty
    console.log('request.body:', request.body);
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password ||
      !request.body.userRole ||
      typeof request.body.lastName !== 'string' ||
      !request.body.lastName ||
      typeof request.body.firstName !== 'string' ||
      !request.body.firstName
    ) {
      response.status(400).json({
        errors: [
          {
            message:
              'Username, password, CSRF token, First Name or Last Name or user role not provided',
          },
        ],
      });
      return;
    }

    // TO DO: check if role exist?

    // check if username already exists in db
    if (await getUserByUsername(request.body.username)) {
      response.status(409).json({
        errors: [{ message: 'Username is already taken' }],
      });
      return;
    }

    // create passwordHash
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // add new user & passwordHash to db
    const user = await createUser(
      request.body.username,
      passwordHash,
      request.body.firstName,
      request.body.lastName,
      request.body.userRole,
    );

    // error handling
    if (!user) {
      response.status(405).json({
        errors: [{ message: 'new user not added to the db' }],
      });
    }
    console.log('new user:', user);
    // success status:  add user to the response body
    response.status(201).json({
      user: {
        user: user,
      },
    });
    return;
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}
