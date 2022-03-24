import { NextApiRequest, NextApiResponse } from 'next';
import {
  AllPersonalInfo,
  readUserAllPersonalInfo,
  updateUserAddress,
  updateUserEmergencyContact,
  updateUserMaritalStatus,
  updateUserPersonalInfo,
} from '../../../util/database';

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

// type FormRequestBody = { formResponse: Omit<AllPersonalInfo, 'id'> };

type FormRequestBody = { formResponse: AllPersonalInfo };

type FormNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: FormRequestBody;
};

export type FormResponseBodyGet = {
  userFormInfo: AllPersonalInfo;
};

export type UserAddressResponseBody =
  | { errors: string }
  | { userFormInfo: AllPersonalInfo };

export type FormResponseBody = FormResponseBodyGet | UserAddressResponseBody;

export default async function formInputHandler(
  request: FormNextApiRequest,
  response: NextApiResponse<FormResponseBody>,
) {
  // * check if userId is a number
  const userId = parseInt(request.query.userId);
  console.log('userId:', userId);
  if (!userId) {
    response.status(400).json({
      errors: 'no valid userId',
    });
    return;
  }

  if (request.method === 'PUT') {
    // if the method is PUT update the form and response the updated form

    // access the body from the request object
    const formRequestUpdate = request.body.formResponse;

    console.log('request body :', formRequestUpdate);
    // console.log('request body name:', formRequestUpdate.firstName);
    // console.log('request body name:', formRequestUpdate.lastName);

    // update personal infos
    if (
      // formRequestUpdate.firstName ||
      // formRequestUpdate.lastName ||
      // formRequestUpdate.dateOfBirth ||
      formRequestUpdate.socialSecNb ||
      formRequestUpdate.nationality ||
      formRequestUpdate.email ||
      formRequestUpdate.userPhone
    ) {
      const updatePersonalInfoResponse = await updateUserPersonalInfo(
        formRequestUpdate.userId,
        // formRequestUpdate.firstName,
        // formRequestUpdate.lastName,
        // formRequestUpdate.dateOfBirth,
        formRequestUpdate.socialSecNb,
        formRequestUpdate.nationality,
        formRequestUpdate.email,
        formRequestUpdate.userPhone,
      );
      // console.log('updatePersonalInfoResponse :', updatePersonalInfoResponse);
    }

    // *** update address *** //
    if (
      formRequestUpdate.userId ||
      formRequestUpdate.streetAndNbr ||
      formRequestUpdate.city ||
      formRequestUpdate.postalCode ||
      formRequestUpdate.country
    ) {
      const updateAddress = await updateUserAddress(
        userId,
        formRequestUpdate.streetAndNbr,
        formRequestUpdate.city,
        formRequestUpdate.postalCode,
        formRequestUpdate.country,
      );
      // console.log('Address::', updateAddress);
    }

    // *** update civil status *** //
    if (formRequestUpdate.maritalStatus) {
      const updateMaritalStatus = await updateUserMaritalStatus(
        userId,
        formRequestUpdate.maritalStatus,
      );
      // console.log('Update: Martial Status:', updateMaritalStatus);
    }

    // *** update emergency contact *** //
    if (
      formRequestUpdate.fullname ||
      formRequestUpdate.sosPhone ||
      formRequestUpdate.relationshipId
    ) {
      await updateUserEmergencyContact(
        userId,
        formRequestUpdate.fullname,
        formRequestUpdate.sosPhone,
        formRequestUpdate.relationshipId,
      );
      // console.log('Update: SOS Contact:', updateEmergencyContact);
    }

    // *** get updated form values and return *** //
    const updatedForm = await readUserAllPersonalInfo(userId);

    response.status(201).json({
      userFormInfo: updatedForm,
    });
    return;
  }
  // *** GET-Method ** //
  if (request.method === 'GET') {
    // read all personal information from db
    const userAllPersonalInfoResponse = await readUserAllPersonalInfo(userId);

    // const userFirstName = await readUserFirstName(userId);

    // console.log('UserAllPersonalINfo:', userAllPersonalInfoResponse);
    console.log('userFirstName:', userAllPersonalInfoResponse);

    if (!userAllPersonalInfoResponse) {
      response.status(400).json({
        errors: 'not good',
      });
      return;
    }

    response.status(201).json({
      userFormInfo: userAllPersonalInfoResponse,
    });
    return;
  }

  response.status(405).json({
    errors: 'Method not supported',
  });
}
