import { NextApiRequest, NextApiResponse } from 'next';
import {
  addUserProfileImage,
  getUserByImg,
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
  url: string[];
};

export type UserFileUploadResponseBody =
  | { errors: string }
  | { url: ImgUrl | undefined };

export type FormResponseBody =
  | FileUploadResponseBodyGet
  | UserFileUploadResponseBody;

export default async function UploadFilesHandler(
  request: FormNextApiRequest,
  response: NextApiResponse<FormResponseBody>,
) {
  // * check if userId is a number
  const userId = Number(request.query.userId);
  console.log('userId:', userId);
  console.log('userId.request:', request.body.userId);
  if (!userId) {
    response.status(400).json({
      errors: 'no valid userId',
    });
    return;
  }

  console.log('imageUrl', request.body.imageUrl);
  console.log('userIdBE', userId);
  if (!request.body.imageUrl || typeof request.body.imageUrl !== 'string') {
    response.status(400).json({
      errors: 'no valid image url',
    });
    return;
  }

  // *** POST METHOD ***
  if (request.method === 'POST') {
    // check if user_id already in table
    if (await getUserByImg(userId)) {
      // Update image
      const imgUpdateResp = await updateUserProfileImage(
        request.body.userId,
        request.body.imageUrl,
      );

      if (!imgUpdateResp) {
        response.status(405).json({
          errors: 'failed to save in db',
        });
        return;
      }

      console.log('imgUpdate:', imgUpdateResp);
      response.status(200).json({
        url: imgUpdateResp,
      });
      return;
    }
    // insert image
    const responseUrlImage = await addUserProfileImage(
      request.body.userId,
      request.body.imageUrl,
    );

    if (!responseUrlImage) {
      response.status(405).json({
        errors: 'failed to save in db',
      });
    }

    console.log('InsertImage', responseUrlImage);
    response.status(200).json({
      url: responseUrlImage,
    });
    return;
  }

  response.status(405).json({
    errors: 'Method not supported',
  });
}
