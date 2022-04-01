import { NextApiRequest, NextApiResponse } from 'next';
import {
  AddFileUrlToDB,
  AddUserEmergencyContact,
  SosContact,
  updateFormStepDb,
} from '../../util/database';

type Step = {
  currentStep: number;
};

export type FileUploadResponseBodyPost =
  | { errors: { message: string }[] }
  | { sosResponse: SosContact; stepInDB: Step };

type FileUrlResponseBody = FileUploadResponseBodyPost;

export default async function formInputHandler(
  request: NextApiRequest,
  response: NextApiResponse<FileUrlResponseBody>,
) {
  if (request.method === 'POST') {
    console.log('FormStepThree - request-body:', request.body);

    if (
      request.body.sosContactfullName ||
      request.body.sosContactPhone ||
      request.body.sosContactRelation
    ) {
      // add user emergency contact info to db
      const formResponseEmergencyContact = await AddUserEmergencyContact(
        request.body.userId,
        request.body.sosContactfullName,
        request.body.sosContactPhone,
        request.body.sosContactRelation,
      );
      console.log(
        'typeof url & xx',
        request.body.fileOneUrl,
        request.body.fileType,
      );

      // add file url to db
      if (request.body.fileOneUrl && request.body.fileType) {
        const fileUploadResponseBody = await AddFileUrlToDB(
          request.body.userId,
          request.body.fileOneUrl,
          request.body.fileType,
        );
        console.log(fileUploadResponseBody);
      }

      // update formStep in db
      const stepInDB = await updateFormStepDb(
        request.body.userId,
        request.body.formStep + 1,
      );
      console.log('FormStep 3 in DB:', stepInDB);
      response.status(200).json({
        stepInDB: stepInDB,
        sosResponse: formResponseEmergencyContact,
      });
      return;
    }
  }

  response.status(405).json({
    errors: [{ message: 'Method not supported, try POST instead' }],
  });
}
