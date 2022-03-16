import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCsrfToken } from '../../util/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  createUser,
  formInputPersonalDetails,
  FormValues,
  getUserByUsername,
  getUserByUserWithPasswordHashByUsername,
  Session,
  User,
} from '../../util/database';

type FormOneRequestBody =
  | {
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
      socialSecNumber: number;
      nationality: string | undefined;
      email: string | undefined;
      phone: string | undefined;
    }
  | {
      address: string;
      city: string;
      zipCode: string;
      country: string;
      maritalStatus: number;
      sosContactfullName: string;
      sosContactPhone: string;
      sosContactRelation: number;
    };

type FormOneNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: FormOneRequestBody;
};

export type FormOneResponseBody =
  | { errors: { message: string }[] }
  | { form: string };

export default async function formInputHandler(
  request: NextApiRequest,
  response: NextApiResponse<FormOneResponseBody>,
) {
  if (request.method === 'POST') {
    // validation: check if un or pw is not string or empty
    console.log(request.body);
    console.log('type of tel::', typeof request.body.phone);
    console.log('type of socialSec::', typeof request.body.socialSecNumber);

    if (
      // typeof request.body.firstName !== 'string' ||
      // !request.body.firstName ||
      // typeof request.body.lastName !== 'string' ||
      // !request.body.lastName ||
      typeof request.body.dateOfBirth !== 'string' ||
      !request.body.dateOfBirth ||
      typeof request.body.socialSecNumber !== 'number' ||
      !request.body.socialSecNumber ||
      typeof request.body.nationality !== 'string' ||
      !request.body.nationality ||
      typeof request.body.email !== 'string' ||
      !request.body.email ||
      typeof request.body.phone !== 'number' ||
      !request.body.phone
    ) {
      response.status(400).json({
        errors: [{ message: 'user input is not correct' }],
      });
      return; // Always include a return in api route, important because it will prevent "Headers" already sent" error
    }

    // transform date for database
    const newDate = new Date(request.body.dateOfBirth).toLocaleDateString();

    console.log('new Date:', newDate);

    // send formInput to database
    const formOneResponse = await formInputPersonalDetails(
      request.body.userId,
      request.body.dateOfBirth,
      request.body.socialSecNumber,
      request.body.nationality,
      request.body.email,
      request.body.phone,
    );

    console.log('Data aleady exists:', formOneResponse);
    // Error-Handling:
    if (!formOneResponse) {
      response.status(401).json({
        errors: [{ message: 'Data Already exist' }],
      });
      return; // Always include a return in api route, important because it will prevent "Headers" already sent" error
    }

    // // compare passwordHash
    // const passwordMatches = await bcrypt.compare(
    //   request.body.password,
    //   userWithPasswordHash.passwordHash,
    // );

    // // Error-Handling: password does not match
    // if (!passwordMatches) {
    //   response.status(401).json({
    //     errors: [{ message: 'Username or password does not match.' }],
    //   });
    //   return; // Always include a return in api route, important because it will prevent "Headers" already sent" error
    // }

    // // 1. Create a unique token (use node crypto)
    // const sessionToken = crypto.randomBytes(64).toString('base64');

    // // 2. Save token into sessions table
    // const session = await createSession(sessionToken, userWithPasswordHash.id);
    // console.log(session);

    // // 3. Serialize the Cookie (we need to do serialize bc we are in the backend)
    // const serializedCookie = await createSerializedRegisterSessionTokenCookie(
    //   session.token,
    // );

    // // Add user to the response body
    // // 4. Add cookie to the header response
    console.log('formValues db', formOneResponse);
    response.status(201).json({
      form: 'yes this works',
    });
    return;
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}
