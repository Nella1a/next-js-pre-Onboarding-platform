import { NextApiRequest, NextApiResponse } from 'next';
import {
  addContractDetails,
  AddContractDetailsRequestBody,
  readContractDetails,
} from '../../../util/database';

// type RegisterNextApiRequest = Omit<NextApiRequest, 'body'> & {
//   body: AddContractDetailsRequestBody;
// };

export type AddContractResponseBody =
  | { errors: string }
  | { contractSummary: AddContractDetailsRequestBody };

export default async function AddContractHandler(
  request: NextApiRequest,
  response: NextApiResponse<AddContractResponseBody>,
) {
  // * check if userId is a number
  const userId: number = Number(request.query.userId);
  console.log('userId:', userId);
  if (!userId) {
    response.status(400).json({
      errors: 'no valid userId',
    });
    return;
  }

  if (request.method === 'POST') {
    // check if request body not empty
    console.log('request.body:', request.body);
    if (
      typeof request.body.userId !== 'number' ||
      !request.body.userId ||
      typeof request.body.startingDate !== 'string' ||
      !request.body.startingDate ||
      typeof request.body.jobTitle !== 'string' ||
      !request.body.jobTitle ||
      typeof request.body.salary !== 'number' ||
      !request.body.salary ||
      typeof request.body.benefits !== 'string' ||
      !request.body.benefits
    ) {
      response.status(400).json({
        errors:
          'userId, starting date, job title, salary or benefits not provided',
      });
      return;
    }

    // add request body to db
    const contractSummary = await addContractDetails(
      request.body.userId,
      request.body.startingDate,
      request.body.jobTitle,
      request.body.salary,
      request.body.benefits,
    );

    console.log('added contract:', contractSummary);

    // success
    response.status(201).json({
      contractSummary: contractSummary,
    });
    return;
  }

  if (request.method === 'GET') {
    const readContract = await readContractDetails(userId);
    console.log('readContract:', readContract);

    response.status(200).json({
      contractSummary: readContract,
    });
    return;
  }

  response.status(405).json({
    errors: 'Method not supported, try POST instead',
  });
}