import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  createUser,
  getUserByUsername,
  getUserByUserWithPasswordHashByUsername,
  User,
} from '../../util/database';

type LoginRequestBody = {
  username: string;
  password: string;
  csrfToken: string;
};

type LoginNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: LoginRequestBody;
};

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: Pick<User, 'id'> };

export default async function loginHandler(
  request: NextApiRequest,
  response: NextApiResponse<LoginResponseBody>,
) {
  if (request.method === 'POST') {
    // validation: check if un or pw is not string or empty
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password
    ) {
      response.status(400).json({
        errors: [{ message: 'Username or password not provided' }],
      });
      return; // Always include a return in api route, important because it will prevent "Headers" already sent" error
    }

    // get user with password_hash from database
    const userWithPasswordHash = await getUserByUserWithPasswordHashByUsername(
      request.body.username,
    );

    // Error-Handling:  user or password doesn't exist
    if (!userWithPasswordHash) {
      response.status(401).json({
        errors: [{ message: 'Username or password does not match.' }],
      });
      return; // Always include a return in api route, important because it will prevent "Headers" already sent" error
    }

    // compare passwordHash
    const passwordMatches = await bcrypt.compare(
      request.body.password,
      userWithPasswordHash.passwordHash,
    );

    // Error-Handling: password does not match
    if (!passwordMatches) {
      response.status(401).json({
        errors: [{ message: 'Username or password does not match.' }],
      });
      return; // Always include a return in api route, important because it will prevent "Headers" already sent" error
    }

    // TODO: Create Session Cookie = A record that a user has correctly loged in at a specific point in time. And it will expire at a specific point in time

    // send back user to frontend
    response.status(201).json({
      user: {
        id: userWithPasswordHash.id,
      },
    });
    return;
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}
