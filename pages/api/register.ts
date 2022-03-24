import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCsrfToken } from '../../util/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  addUserRole,
  createSession,
  createUser,
  getUserByUsername,
  User,
} from '../../util/database';

type RegisterRequestBody = {
  username: string;
  password: string;
  csrfToken: string;
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
      typeof request.body.csrfToken !== 'string' ||
      !request.body.csrfToken ||
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
      return; // Always include a return in api route, important because it will prevent "Headers" already sent" error
    }
    // Verify CSRF Token
    const csrfTokenMatches = verifyCsrfToken(request.body.csrfToken);

    if (!csrfTokenMatches) {
      response.status(403).json({
        errors: [
          {
            message: 'Invalid CSRF token',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    // TO DO: check if role exist?

    // check if username already exists in database
    if (await getUserByUsername(request.body.username)) {
      response.status(409).json({
        errors: [{ message: 'Username is already taken' }],
      });
      return;
    }

    // create passwordHash
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // add new user & passwordHash to database
    const user = await createUser(
      request.body.username,
      passwordHash,
      request.body.firstName,
      request.body.lastName,
      request.body.userRole,
    );

    if (!user) {
      response.status(405).json({
        errors: [{ message: 'usser not added to the db' }],
      });
    }

    // const userId = user.id;
    // console.log('userIDDB + roleId:', userId);
    // console.log('user', user);

    // // add userRole to user_role table
    // const userRole = await addUserRole(userId, request.body.roleId);
    // console.log('userRole', userRole);

    // if (!userRole) {
    //   response.status(405).json({
    //     errors: [{ message: 'UserRole not added to the db' }],
    //   });
    //   return;
    // }

    // 1. Create a unique token (use node crypto)
    const token = crypto.randomBytes(64).toString('base64');

    // 2. Save token into sessions table
    const session = await createSession(token, user.id);
    console.log(session);

    // 3. Serialize the Cookie we need to do serialize bc we are in the backend)
    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // Add user to the response body
    // 4. Add cookie to the header response
    response
      .status(201)
      .setHeader('Set-Cookie', serializedCookie)
      .json({
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
