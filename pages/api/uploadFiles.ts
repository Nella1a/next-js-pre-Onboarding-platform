import { NextApiRequest, NextApiResponse } from 'next';
import {
  addUserProfileImage,
  ImgUrl,
  readUserProfileImage,
} from '../../util/database';

// type FormRequestBody = { formResponse: Omit<AllPersonalInfo, 'id'> };

type FileUploadRequestBody = { imageUrl: ImgUrl; userId: number };

type FormNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: FileUploadRequestBody;
};

export type FileUploadResponseBodyGet = {
  url: ImgUrl;
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
  // // * check if userId is a number
  // const userId = Number(request.query.userId);
  // console.log('userId:', userId);
  // if (!userId) {
  //   response.status(400).json({
  //     errors: 'no valid userId',
  //   });
  //   return;
  // }

  console.log('imageUrl', request.body.imageUrl);
  console.log('userIdBE', request.body.userId);
  if (typeof request.body.imageUrl !== 'string') {
    response.status(400).json({
      errors: 'no valid image url',
    });
    return;
  }
  console.log('userIdUploadFiles:', Number(request.body.userId));

  // *** POST METHOD ***
  if (request.method === 'POST') {
    const responseUrlImage = await addUserProfileImage(
      request.body.userId,
      request.body.imageUrl,
    );

    response.status(201).json({
      url: responseUrlImage,
    });
    return;
  }

  // *** GET METHOD ***
  if (request.method === 'GET') {
    const responseUrlImageGET = await readUserProfileImage(request.body.userId);

    console.log('imgUrl:', responseUrlImageGET);
    if (!responseUrlImageGET) {
      response.status(405).json({
        errors: 'no image url in database',
      });
      return;
    }

    response.status(201).json({
      url: responseUrlImageGET,
    });
    return;
  }

  response.status(405).json({
    errors: 'Method not supported',
  });
}
