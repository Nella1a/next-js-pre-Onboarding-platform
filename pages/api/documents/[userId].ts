import { NextApiRequest, NextApiResponse } from 'next';
import {
  AllPersonalInfo,
  ReadAllPersonalInfo,
  readUserAllPersonalInfo,
  updateUserAddress,
  updateUserPersonalInfo,
  UserAddress,
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

type FormUpdateValues = {
  // dateOfBirth: string;
  email: string;
  socialSecNb: number;
  nationality: string;
  userPhone: number;
};

// type FormRequestBody = { formResponse: Omit<AllPersonalInfo, 'id'> };

type FormRequestBody = { formUpdate: AllPersonalInfo };

type FormNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: FormRequestBody;
};

export type FormResponseBodyGet = {
  userFormInfo: ReadAllPersonalInfo | undefined;
};

export type UserAddressResponseBody =
  | { errors: string }
  | { updatePers: FormUpdateValues; updateAddr: UserAddress };

export type FormResponseBody = FormResponseBodyGet | UserAddressResponseBody;

export default async function formInputHandler(
  request: FormNextApiRequest,
  response: NextApiResponse<FormResponseBody>,
) {
  // * check if userId is a number
  const userId = Number(request.query.userId);
  console.log('userId:', userId);
  if (!userId) {
    response.status(400).json({
      errors: 'no valid userId',
    });
    return;
  }

  // *** PUT-Method ** //
  if (request.method === 'PUT') {
    console.log('Response:', request.body);
    // access the body from the request object
    const formUpdateRequest = request.body.formUpdate;
    console.log('Formupdate:', formUpdateRequest.email);

    const updatePersDetail = await updateUserPersonalInfo(
      formUpdateRequest.userId,
      formUpdateRequest.socialSecNb,
      formUpdateRequest.nationality,
      formUpdateRequest.email,
      formUpdateRequest.userPhone,
    );
    console.log('UPDATE_PersDetail:', updatePersDetail);
    const updateAddress = await updateUserAddress(
      formUpdateRequest.userId,
      formUpdateRequest.streetAndNbr,
      formUpdateRequest.city,
      formUpdateRequest.postalCode,
      formUpdateRequest.country,
    );
    console.log('UPDATE_Addres:', updateAddress);

    // const updateMaritalStatus = await updateUserMaritalStatus(
    //   formUpdateRequest.userId,
    //   formUpdateRequest.maritalStatusId,
    // );
    // console.log('UPDATE_Marital:', updateMaritalStatus);

    // const updateSosContact = await updateUserEmergencyContact(
    //   formUpdateRequest.userId,
    //   formUpdateRequest.fullname,
    //   formUpdateRequest.sosPhone,
    //   formUpdateRequest.relationshipId,
    // );
    // console.log('UPDATE-SOS:', updateSosContact);
    response.status(200).json({
      updatePers: updatePersDetail,
      updateAddr: updateAddress,
      // updateCivil: updateMaritalStatus,
      // updateSos: updateSosContact,
    });
    return;
  }

  // *** GET-Method ** //
  if (request.method === 'GET') {
    // read all personal information from db
    const userAllPersonalInfoResponse = await readUserAllPersonalInfo(userId);

    console.log('P-Info API', userAllPersonalInfoResponse);

    // if (!userAllPersonalInfoResponse) {
    //   response.status(400).json({
    //     errors: 'not good',
    //   });
    //   return;
    // }

    response.status(201).json({
      userFormInfo: userAllPersonalInfoResponse,
    });
    return;
  }

  response.status(405).json({
    errors: 'Method not supported',
  });
}
