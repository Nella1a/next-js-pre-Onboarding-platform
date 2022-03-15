import { NextApiRequest, NextApiResponse } from 'next';
import {
  AddUserAddress,
  AddUserEmergencyContact,
  AddUserMaritalStatus,
  createUser,
  formInputPersonalDetails,
  FormValues,
  getUserByUsername,
  getUserByUserWithPasswordHashByUsername,
  UserAddress,
} from '../../util/database';

type FormTwoRequestBody = {
  address: string;
  city: string;
  zipCode: string;
  country: string;
  maritalStatus: number;
  sosContactfullName: string;
  sosContactPhone: string;
  sosContactRelation: number;
};

type FormTwoNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: FormTwoRequestBody;
};

export type FormTwoResponseBody =
  | { errors: { message: string }[] }
  | { form: string };

export default async function formInputHandler(
  request: NextApiRequest,
  response: NextApiResponse<FormTwoResponseBody>,
) {
  if (request.method === 'POST') {
    // validation: c
    console.log(request.body);

    if (
      !request.body.address ||
      !request.body.city ||
      !request.body.zipCode ||
      !request.body.country ||
      !request.body.maritalStatus ||
      !request.body.sosContactfullName ||
      !request.body.sosContactPhone ||
      !request.body.sosContactRelation ||
      typeof request.body.address !== 'string' ||
      typeof request.body.city !== 'string' ||
      typeof request.body.country !== 'string' ||
      typeof request.body.sosContactPhone !== 'string' ||
      typeof request.body.sosContactfullName !== 'string' ||
      typeof request.body.zipCode !== 'number' ||
      typeof request.body.maritalStatus !== 'number' ||
      typeof request.body.sosContactRelation !== 'number'
    ) {
      response.status(400).json({
        errors: [{ message: 'please provide missing data' }],
      });
      return; // Always include a return in api route, important because it will prevent "Headers" already sent" error
    }

    // Add address to database
    const formResponseAddress = await AddUserAddress(
      request.body.userId,
      request.body.address,
      request.body.city,
      request.body.zipCode,
      request.body.country,
    );

    console.log('User Address :', formResponseAddress);
    // Error-Handling:
    if (!formResponseAddress) {
      response.status(401).json({
        errors: [
          { message: 'Address not addded to database, please try again' },
        ],
      });
      return;
    }

    // add user marital status to db
    const formResponseMaritalStaus = await AddUserMaritalStatus(
      request.body.userId,
      request.body.maritalStatus,
    );

    // error handling
    if (!formResponseMaritalStaus) {
      response.status(401).json({
        errors: [
          {
            message: 'marital status not addded to database, please try again',
          },
        ],
      });
      return;
    }

    // add user emergency contact info to db
    const formResponseEmergencyContact = await AddUserEmergencyContact(
      request.body.userId,
      request.body.sosContactfullName,
      request.body.sosContactPhone,
      request.body.sosContactRelation,
    );

    // error handling
    if (!formResponseEmergencyContact) {
      response.status(401).json({
        errors: [
          {
            message: 'Upps: emergency contact not addded to database',
          },
        ],
      });
      return;
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

    response.status(201).json({
      form: 'This was succesfull',
    });
    return;
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}
