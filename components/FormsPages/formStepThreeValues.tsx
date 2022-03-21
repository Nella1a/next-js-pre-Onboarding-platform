import { useState } from 'react';
// import { useForm } from 'react-hook-form';
import {
  flexStyle,
  formStyle,
  hideForm,
  showForm,
  uploadFlexStyle,
  uploadFormStyle,
} from '../elements';

type FormValuesTwo = {
  fileUploadOne: string;
  fileUploadTwp: string;
};

export default function FormStepThreeValues(props) {
  const [fileUploadOne, setFileUploadOne] = useState('');
  const [fileUploadTwo, setFileUploadTwo] = useState('');
  // const [fileUploadThree, , setfileUploadThree] = useState('');
  const [fileUploadOneSelect, setFileUploadOneSelect] = useState();
  const [fileUploadTwoSelect, setFileUploadTwoSelect] = useState();

  return (
    <>
      <h2> Step {props.currentStep + 1} of 4</h2>
      <form
        css={[formStyle, props.formStep === 2 ? showForm : hideForm]}
        onSubmit={(event) => {
          event.preventDefault();

          // const formInputResponse = await fetch('/api/', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     // firstName: firstName,
          //     // lastName: lastName,
          //   }),
          // });

          props.nextFormStep();
        }}
      >
        <section css={uploadFormStyle}>
          <div>
            <p>
              <label htmlFor="fileUploadOne">Document 1</label>
              <input
                type="file"
                id="fileUploadOne"
                data-test-id="userFileUpload-one"
                name="fileUploadOne"
                value={fileUploadOne}
                onChange={(event) =>
                  setFileUploadOne(event.currentTarget.value)
                }
              />
            </p>
            <p>
              <select
                id="fileUploadOnes"
                data-test-id="fileUpload-one"
                name="fileUploadOnes"
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
          </div>
          <div>
            <p>
              <label htmlFor="fileUploadTwo">Document 2 </label>
              <input
                type="file"
                id="fileUploadTwo"
                data-test-id="userFileUpload-two"
                name="fileUploadTwo"
                value={fileUploadTwo}
                onChange={(event) =>
                  setFileUploadTwo(event.currentTarget.value)
                }
              />
            </p>
            <p>
              <select
                id="fileUploadTwo"
                data-test-id="fileUpload-one"
                name="fileUploadTwo"
                value={fileUploadTwoSelect}
                onChange={(event) =>
                  setFileUploadTwoSelect(event.currentTarget.value)
                }
              >
                <option value="0">-- please select ---</option>
                <option value="1">contract</option>
                <option value="2">ID</option>
                <option value="2">BankCard</option>
                <option value="4">other</option>
              </select>
            </p>
          </div>
        </section>
        <button>Step 4: Review &#38; Submit </button>
      </form>
      <button onClick={props.prevFormStep}>Back</button>
      {/* </section> */}
    </>
  );
}
