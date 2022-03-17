import { NextApiRequest, NextApiResponse } from 'next';
import { AllPersonalInfo, readUserAllPersonalInfo } from '../../util/database';

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

type FormRequestBody = { formResponse: Omit<AllPersonalInfo, 'id'> };

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
  const userId = Number(request.query.userId);
  console.log('userId:', userId);
  if (!userId) {
    response.status(400).json({
      errors: 'no valid userId',
    });
    return;
  }

  if (request.method === 'PUT') {
    // if the method is PUT update the form and response the updated form

    // access the  from  formthe request object
    const formRequestUpdate = request.body;

    console.log('request body :', formRequestUpdate);
    // // Error-Handling:
    // if (userAllPersonalInfoResponse[0] === 0) {
    //   response.status(401).json({
    //     errors: [{ message: 'No data selected' }],
    //   });
    //   return;
    // }

    response.status(201).json({
      userFormInfo: {},
    });
    return;
  }

  if (request.method === 'GET') {
    // read all personal information from db
    const userAllPersonalInfoResponse = await readUserAllPersonalInfo(userId);

    console.log('UserAllPersonalINfo:', userAllPersonalInfoResponse);
    // // Error-Handling:
    // if (userAllPersonalInfoResponse[0] === 0) {
    //   response.status(401).json({
    //     errors: [{ message: 'No data selected' }],
    //   });
    //   return;
    // }

    response.status(201).json({
      userFormInfo: userAllPersonalInfoResponse,
    });
    return;
  }

  response.status(405).json({
    errors: 'Method not supported, try GET instead',
  });
}
