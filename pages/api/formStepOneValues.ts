import { NextApiRequest, NextApiResponse } from 'next';
import { formInputPersonalDetails, FormValues } from '../../util/database';

// type FormOneRequestBodyType = {
//   firstName: string;
//   lastName: string;
//   dateOfBirth: Date;
//   socialSecNumber: number;
//   nationality: string | undefined;
//   email: string | undefined;
//   phone: string | undefined;
// };

// type FormOneRequestBody = { userPersonalInfo: Omit<FormValues, 'userId'> };

// type FormOneNextApiRequest = Omit<NextApiRequest, 'body'> & {
//   body: FormOneRequestBody;
// };

export type FormOneResponseBodyPost =
  | { errors: { message: string }[] }
  | { personalInfo: FormValues };

type FormOneResponseBody = FormOneResponseBodyPost;

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
      return;
    }

    // send formInput to database
    const formOneResponse: FormValues = await formInputPersonalDetails(
      request.body.userId,
      // request.body.firstName,
      // request.body.lastName,
      request.body.dateOfBirth,
      request.body.socialSecNumber,
      request.body.nationality,
      request.body.email,
      request.body.phone,
    );

    console.log('formValues from db', formOneResponse);
    response.status(201).json({
      personalInfo: formOneResponse,
    });
    return;
  }

  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}