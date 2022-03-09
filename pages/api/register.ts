import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCsrfToken } from '../../util/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
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
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password ||
      typeof request.body.csrfToken !== 'string' ||
      !request.body.csrfToken ||
      !request.body.userRole
    ) {
      response.status(400).json({
        errors: [
          {
            message: 'Username, password, CSRF token or user role not provided',
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

    // validation 2: check if username already exists in database
    if (await getUserByUsername(request.body.username)) {
      response.status(409).json({
        errors: [{ message: 'Username is already taken' }],
      });
      return; // Always include a return in api route,
    }

    // create passwordHash
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // add new user & passwordHash to database
    const user = await createUser(
      request.body.username,
      passwordHash,
      request.body.userRole,
    );

    // 1. Create a unique token (use node crypto)
    const token = crypto.randomBytes(64).toString('base64');

    // 2. Save token into sessions table
    const session = await createSession(token, user.id);
    console.log(session);

    // 3. Serialize the Cookie (we need to do serialize bc we are in the backend)
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
