import { NextApiRequest, NextApiResponse } from 'next';

type IndexResponseBody = {
  users: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IndexResponseBody>,
) {
  res.status(200).json({
    users: 'http://localhost:3000/api/users/',
  });
}
