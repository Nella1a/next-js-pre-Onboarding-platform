import { NextApiRequest, NextApiResponse } from 'next';
import {
  // addUserProfileImage,
  ImgUrl,
  readUserProfileImage,
  updateUserProfileImage,
} from '../../../util/database';

// type FormRequestBody = { formResponse: Omit<AllPersonalInfo, 'id'> };

type FileUploadRequestBody = { imageUrl: string; userId: number };

type FormNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: FileUploadRequestBody;
};

export type FileUploadResponseBodyGet = {
  imgUrlInDb: string[];
};

export type UserFileUploadResponseBody =
  | { errors: string }
  | { imgUrlInDb: ImgUrl | undefined };

export type FormResponseBody =
  | FileUploadResponseBodyGet
  | UserFileUploadResponseBody;

export default async function UploadFilesHandler(
  request: FormNextApiRequest,
  response: NextApiResponse<FormResponseBody>,
) {
  // check if userId is a number
  const userId = Number(request.query.userId);
  if (!userId) {
    response.status(400).json({
      errors: 'no valid userId',
    });
    return;
  }

  if (!request.body.imageUrl || typeof request.body.imageUrl !== 'string') {
    response.status(400).json({
      errors: 'no valid image url',
    });
    return;
  }

  // *** POST  ***
  if (request.method === 'POST') {
    const addImgUrlToDB = await updateUserProfileImage(
      request.body.userId,
      request.body.imageUrl,
    );

    response.status(200).json({
      imgUrlInDb: addImgUrlToDB,
    });
    return;
  }
  //  *** UPDATE **
  if (request.method === 'PUT') {
    const addImgUrlToDB = await updateUserProfileImage(
      request.body.userId,
      request.body.imageUrl,
    );

    console.log('UpdateImage', addImgUrlToDB);
    response.status(200).json({
      imgUrlInDb: addImgUrlToDB,
    });
    return;
  }

  if (request.method === 'GET') {
    const profileUserUrl = await readUserProfileImage(userId);

    response.status(405).json({
      imgUrlInDb: profileUserUrl,
    });
    return;
  }

  response.status(405).json({
    errors: 'Method not supported',
  });
}
