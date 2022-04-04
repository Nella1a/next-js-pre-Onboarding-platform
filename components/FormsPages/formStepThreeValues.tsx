import { useState } from 'react';
import { User } from '../../util/database';
// import { useForm } from 'react-hook-form';
import { formStyle, hideForm, showForm, uploadFormStyle } from '../elements';

interface ChildProps {
  // userObject: User;
  user: User;
  uploadPreset: string;
  cloudKey: string;
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function FormStepThreeValues({
  user,
  uploadPreset,
  cloudKey,
  formStep,
  setFormStep,
}: ChildProps) {
  const [fileUploadOne, setFileUploadOne] = useState('');
  const [fileUploadOneSelect, setFileUploadOneSelect] = useState('');
  const [sosContactfullName, setSosContactfullName] = useState('');
  const [sosContactPhone, setSosContactPhone] = useState('');
  const [sosContactRelation, setSosContactRelation] = useState('');
  // const [responseFileUpload, setResponseFileUpload] = useState(false);

  // send file to cloud
  const uploadFile = async (event: any) => {
    const files = event.currentTarget.files;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', uploadPreset);
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudKey}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    const formDataResponse = await cloudinaryResponse.json();
    // setCloudinaryUpload(formDataResponse);
    console.log('Cloudinary Response PDF:', formDataResponse);

    if ('error' in formDataResponse) {
      console.log('Fehler');
    }

    const responseUrl = formDataResponse.url;
    // cloud response ok ==> update state variable
    setFileUploadOne(responseUrl);

    console.log('StateVariable:', responseUrl);
  };

  return (
    <>
      <h1> Step {formStep + 1} of 4</h1>
      <form
        css={[formStyle, formStep === 2 ? showForm : hideForm]}
        onSubmit={async (event) => {
          event.preventDefault();

          // send file url and contact details to api
          const formInputResponse = await fetch('/api/formStepThreeValues', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.id,
              fileOneUrl: fileUploadOne,
              fileType: parseInt(fileUploadOneSelect),
              sosContactfullName: sosContactfullName,
              sosContactPhone: sosContactPhone,
              sosContactRelation: parseInt(sosContactRelation),
              formStep: formStep,
            }),
          });

          const formInputResponseBody = await formInputResponse.json();
          console.log('SOSContact & fileUrl:', formInputResponseBody);

          const nextFormStep = formStep + 1;
          console.log('Formstep StepThree:', formStep);
          setFormStep(nextFormStep);
        }}
      >
        <section css={uploadFormStyle}>
          <h2>Emergency Contact</h2>

          <p>
            <label htmlFor="userSosContactFullName">
              <span>Full Name: </span>
            </label>
            <input
              id="userSosContactFullName"
              data-test-id="userSosContact-fullName"
              name="userSosContactFullName"
              value={sosContactfullName}
              placeholder="Jane Doe"
              onChange={(event) =>
                setSosContactfullName(event.currentTarget.value)
              }
            />
          </p>

          <article>
            <p>
              <label htmlFor="userSosContactPhone">
                <span>Phone:</span>
              </label>
              <input
                type="tel"
                min={0}
                id="userSosContactPhone"
                data-test-id="userSosContact-phone"
                name="userSosContactPhone"
                value={sosContactPhone}
                placeholder="0043 660 000 00 00"
                onChange={(event) =>
                  setSosContactPhone(event.currentTarget.value)
                }
              />
            </p>

            <p>
              <label htmlFor="sosContactRelation">
                <span>Relationship to Contact:</span>
              </label>
              <select
                id="sosContactRelation"
                data-test-id="userSosContact-relation"
                name="sosContactRelation"
                value={sosContactRelation}
                onChange={(event) =>
                  setSosContactRelation(event.currentTarget.value)
                }
              >
                <option value="0"> -- please select ---</option>
                <option value="1">friend</option>
                <option value="2">partner</option>
                <option value="3">sibling</option>
                <option value="4">parent</option>
                <option value="5">child</option>
                <option value="6">other</option>
              </select>
            </p>
          </article>
          <h2>Documents</h2>
          <article>
            <p>
              <label htmlFor="fileUploadOne"> </label>
              <input
                type="file"
                id="fileUploadOne"
                data-test-id="userFileUpload-one"
                name="fileUploadOne"
                // value={fileUploadOne}
                onChange={(event) => uploadFile(event)}
              />
            </p>

            <p>
              <select
                id="fileUploadOnes"
                data-test-id="fileUpload-one"
                name="fileUploadOnes"
                value={fileUploadOneSelect}
                // required={fileUploadOne ? true : false}
                onChange={(event) =>
                  setFileUploadOneSelect(event.currentTarget.value)
                }
              >
                <option value="0">-- please select ---</option>
                <option value="1">signed contract</option>
                <option value="2">documents</option>
                <option value="3">other</option>
              </select>
            </p>
          </article>
          {/* <button onClick={uploadImage}>Upload Image</button> */}
          {/* {responseFileUpload ? <p>Success</p> : <p>no Success</p>} */}
          {/* <div>
            <p>
              <label htmlFor="fileUploadTwo">Document 2 </label>
              <input
                type="file"
                id="fileUploadTwo"
                data-test-id="userFileUpload-two"
                name="fileUploadTwo"
                // value={fileUploadTwo}
                onChange={(event) => uploadFile(event)}
              />
            </p>
            <p>
              <select
                id="fileUploadTwo"
                data-test-id="fileUpload-one"
                name="fileUploadTwo"
                value={fileUploadOneSelect}
                onChange={(event) =>
                  setFileUploadOneSelect(event.currentTarget.value)
                }
              >
                <option value="0">-- please select ---</option>
                <option value="1">contract</option>
                <option value="2">ID</option>
                <option value="2">BankCard</option>
                <option value="4">other</option>
              </select>
            </p>
          </div> */}
          {/* <button onClick={uploadFile}>Upload Image</button> */}
        </section>
        <button>Step 4 - Review &#38; Submit </button>
      </form>

      {/* </section> */}
    </>
  );
}
