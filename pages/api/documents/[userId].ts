import { NextApiRequest, NextApiResponse } from 'next';
import {
  AllPersonalInfo,
  ReadAllPersonalInfo,
  readUserAllPersonalInfo,
  updateUserAddress,
  updateUserPersonalInfo,
  UserAddress,
} from '../../../util/database';

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
  if (!userId) {
    response.status(400).json({
      errors: 'no valid userId',
    });
    return;
  }

  // *** PUT-Method ** //
  if (request.method === 'PUT') {
    // access the body from the request object
    const formUpdateRequest = request.body.formUpdate;

    const updatePersDetail = await updateUserPersonalInfo(
      formUpdateRequest.userId,
      formUpdateRequest.dateOfBirth,
      formUpdateRequest.socialSecNb,
      formUpdateRequest.nationality,
      formUpdateRequest.email,
      formUpdateRequest.userPhone,
    );
    const updateAddress = await updateUserAddress(
      formUpdateRequest.userId,
      formUpdateRequest.streetAndNbr,
      formUpdateRequest.city,
      formUpdateRequest.postalCode,
      formUpdateRequest.country,
    );

    response.status(200).json({
      updatePers: updatePersDetail,
      updateAddr: updateAddress,
    });
    return;
  }

  // *** GET-Method ** //
  if (request.method === 'GET') {
    // read all personal information from db
    const userAllPersonalInfoResponse = await readUserAllPersonalInfo(userId);

    response.status(201).json({
      userFormInfo: userAllPersonalInfoResponse,
    });
    return;
  }

  response.status(405).json({
    errors: 'Method not supported',
  });
}
