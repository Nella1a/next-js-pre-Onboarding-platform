import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserByValidSessionToken,
  readUserProfileImage,
} from '../../util/database';

export default async function profileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // 1. Get current user from the cookie sessionToken
    const token = req.cookies.sessionToken;

    if (!token) {
      res.status(400).json({
        errors: [
          {
            message: 'No session token passed',
          },
        ],
      });
      return;
    }

    // 2. Retrieve user by valid sessionToken
    const user = await getUserByValidSessionToken(token);
    const userId = user.id;
    const profileImgUrl = await readUserProfileImage(userId);

    // If user exists but no img url
    if (user && !profileImgUrl) {
      res.status(200).json({
        user: user,
        profileImgUrl: '',
      });
      return;
    }

    // If user & img url exists, return user and render page
    if (user && profileImgUrl) {
      res.status(200).json({
        user: user,
        profileImgUrl: profileImgUrl,
      });
      return;
    }

    // If user is undefined, send error message
    res.status(404).json({
      errors: [
        {
          message: 'User not found or session token not valid',
        },
      ],
    });
    return;
  }

  res.status(405).json({
    errors: [
      {
        message: 'Method not supported, try GET instead',
      },
    ],
  });
}
