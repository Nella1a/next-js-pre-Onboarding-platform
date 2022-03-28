import { NextApiRequest, NextApiResponse } from 'next';
import {
  AddUserAddress,
  AddUserEmergencyContact,
  AddUserMaritalStatus,
  MaritalStatus,
  SosContact,
  updateFormStepDb,
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

// type FormTwoRequestBody = {
//   userPersonalInfo: Omit<UserAddress & MaritalStatus & SosContact, 'userId'>;
// };

// type FormTwoNextApiRequest = Omit<NextApiRequest, 'body'> & {
//   body: FormTwoRequestBody;
// };

export type FormTwoResponseBody =
  | { errors: { message: string }[] }
  | {
      address: UserAddress;
      maritalStatus: MaritalStatus;
    };

export default async function formInputHandler(
  request: NextApiRequest,
  response: NextApiResponse<FormTwoResponseBody>,
) {
  if (request.method === 'POST') {
    // validation:
    console.log(request.body);

    if (
      !request.body.address ||
      !request.body.city ||
      !request.body.zipCode ||
      !request.body.country ||
      !request.body.formStep ||
      !request.body.maritalStatus ||
      typeof request.body.address !== 'string' ||
      typeof request.body.city !== 'string' ||
      typeof request.body.country !== 'string' ||
      typeof request.body.zipCode !== 'number' ||
      typeof request.body.maritalStatus !== 'number' ||
      typeof request.body.formStep !== 'number'
    ) {
      response.status(400).json({
        errors: [{ message: 'please provide missing data' }],
      });
      return;
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

    // update formStep in db
    const stepInDB = await updateFormStepDb(
      request.body.userId,
      request.body.formStep + 1,
    );
    console.log('FormStep 2 in DB:', stepInDB);
    // success status response
    response.status(201).json({
      address: formResponseAddress,
      maritalStatus: formResponseMaritalStaus,
    });
    return;
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}
