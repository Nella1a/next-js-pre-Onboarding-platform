import { NextApiRequest, NextApiResponse } from 'next';
import {
  AddFileUrlToDB,
  AddUserEmergencyContact,
  FileUrl,
  SosContact,
} from '../../util/database';

// type FileUploadRequestBody = {
//   fileUrl: string;
//   fileType: number;
// };

// type FormOneNextApiRequest = Omit<NextApiRequest, 'body'> & {
//   body: FormOneRequestBody;
// };

export type FileUploadResponseBodyPost =
  | { errors: { message: string }[] }
  | { fileUrl: FileUrl | string; sosContactResp: SosContact | string };

type FileUrlResponseBody = FileUploadResponseBodyPost;

export default async function formInputHandler(
  request: NextApiRequest,
  response: NextApiResponse<FileUrlResponseBody>,
) {
  if (request.method === 'POST') {
    // validation: check if un or pw is not string or empty
    console.log('request-body:', request.body);

    if (
      request.body.sosContactfullName ||
      request.body.sosContactPhone ||
      request.body.sosContactRelation ||
      request.body.fileOneUrl ||
      request.body.fileType
    ) {
      // add user emergency contact info to db

      const formResponseEmergencyContact = await AddUserEmergencyContact(
        request.body.userId,
        request.body.sosContactfullName,
        request.body.sosContactPhone,
        request.body.sosContactRelation,
      );

      // add file url to db
      const fileUploadResponseBody = await AddFileUrlToDB(
        request.body.userId,
        request.body.fileOneUrl,
        request.body.fileType,
      );

      if (!fileUploadResponseBody && formResponseEmergencyContact) {
        response.status(200).json({
          fileUrl: 'no files provided',
          sosContactResp: formResponseEmergencyContact,
        });
        return;
      }
      if (!fileUploadResponseBody && !formResponseEmergencyContact) {
        response.status(400).json({
          errors: [{ message: 'url, filetype or sosContact not in db ' }],
        });
        return;
      }

      response.status(200).json({
        fileUrl: fileUploadResponseBody,
        sosContactResp: formResponseEmergencyContact,
      });
      return;
    }
  }
  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}
