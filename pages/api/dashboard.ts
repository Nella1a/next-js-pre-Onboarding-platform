import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserById, User } from '../../util/database';

type RequestBody = { userId: number };

type FormNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: RequestBody;
};

export type ResponseBody =
  | { error: string }
  | { allNewHires: User | undefined };

export type FormResponseBody = ResponseBody;

export default async function deleteNewJoiner(
  request: FormNextApiRequest,
  response: NextApiResponse<ResponseBody>,
) {
  if (request.method === 'POST') {
    const allNewHiresResponse = await deleteUserById(request.body.userId);

    console.log('deleteUser:', allNewHiresResponse);
    response.status(200).json({
      allNewHires: allNewHiresResponse,
    });
    return;
  }
  response.status(405).json({
    error: 'Mehod not supported',
  });
}
