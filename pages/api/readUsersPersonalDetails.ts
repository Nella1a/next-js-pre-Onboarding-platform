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
  readUserAddress,
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

export type UserAddressResponseBody =
  | { errors: { message: string }[] }
  | { address: UserAddress };

export default async function formInputHandler(
  request: NextApiRequest,
  response: NextApiResponse<FormTwoResponseBody>,
) {
  if (request.method === 'GET') {
    // validation: c

    // read address from database
    const redUserAddress = await readUserAddress(1);

    console.log('User Address :', redUserAddress);
    // Error-Handling:
    if (!redUserAddress) {
      response.status(401).json({
        errors: [{ message: 'no Address in database' }],
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
      address: redUserAddress,
    });
    return;
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try GET instead' }],
  });
}
