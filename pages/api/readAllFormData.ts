import { NextApiRequest, NextApiResponse } from 'next';
import {
  readUserAddress,
  readUserAllPersonalInfo,
  UserAddress,
} from '../../util/database';

// type FormTwoRequestBody = {
//   address: string;
//   city: string;
//   zipCode: string;
//   country: string;
//   maritalStatus: number;
//   sosContactfullName: string;
//   sosContactPhone: string;
//   sosContactRelation: number;
// };

// type FormTwoNextApiRequest = Omit<NextApiRequest, 'body'> & {
//   body: FormTwoRequestBody;
// };

export type UserAddressResponseBody =
  | { errors: { message: string }[] }
  | { message: string };

export default async function formInputHandler(
  request: NextApiRequest,
  response: NextApiResponse<UserAddressResponseBody>,
) {
  //* check id userId is a number
  // const userId = Number(request.query.userId);
  // if (!userId) {
  //   response.status(400).json({
  //     errors: [{ message: 'no valid userId' }],
  //   });
  //   return;
  // }

  if (request.method === 'GET') {
    // read all personal information from db
    const userAllPersonalInfoResponse = await readUserAllPersonalInfo(24);

    console.log('User Address :', userAllPersonalInfoResponse);
    // Error-Handling:
    if (userAllPersonalInfoResponse[0] === 0) {
      response.status(401).json({
        errors: [{ message: 'No data selected' }],
      });
      return;
    }

    response.status(201).json({
      message: 'this works great',
    });
    return;
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try GET instead' }],
  });
}
