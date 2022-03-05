import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByUsername } from '../../util/database';

export default async function registerHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    // validation 1: check if un or pw is not string or empty
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password
    ) {
      response.status(400).json({
        errors: [{ message: 'Username or password not provided' }],
      });
      return; // Always indlude a return in api route, important because it will prevent "Headers" already sent" error
    }

    // validation 2: check if username already exists in database
    if (await getUserByUsername(request.body.username)) {
      response.status(409).json({
        errors: [{ message: 'Username is already taken' }],
      });
      return; // Always indlude a return in api route,
    }

    // create passwordHash
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // add new user to database
    const user = await createUser(request.body.username, passwordHash);

    // send back created user from database
    response.status(201).json({ user: user });
    return;
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}
