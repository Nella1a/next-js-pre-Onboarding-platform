import { useState } from 'react';
import { User } from '../../util/database';
// import { useForm } from 'react-hook-form';
import {
  errorStyles,
  flexStyle,
  formStyle,
  hideForm,
  showForm,
} from '../elements';

type Errors = { message: string }[];

interface ChildProps {
  formStep: number | undefined;
  setFormStep: React.Dispatch<React.SetStateAction<number | undefined>>;
  user: User;
}

export default function FormStepOneValues({
  formStep,
  setFormStep,
  user,
}: ChildProps) {
  // const requieredTrue = false;
  const [errorsApi, setErrorsApi] = useState<Errors>([]);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [socialSecNumber, setSocialSecNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!formStep) {
    return <>Test</>;
  }

  return (
    <>
      <h2> Step {formStep + 1} of 4</h2>
      <div css={errorStyles}>
        {errorsApi.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
      <form
        css={[formStyle, formStep === 0 ? showForm : hideForm]}
        onSubmit={async (event) => {
          event.preventDefault();

          // send form input to api
          const formInputResponse = await fetch('/api/formStepOneValues', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              dateOfBirth: dateOfBirth,
              socialSecNumber: parseInt(socialSecNumber),
              nationality: nationality,
              email: email,
              phone: parseInt(phone),
              userId: user.id,
              formStep: formStep,
            }),
          });

          // check response from api for errors
          const formInputResponseBody = await formInputResponse.json();
          if ('errors' in formInputResponseBody) {
            setErrorsApi(formInputResponseBody.errors);
            return;
          }
          setErrorsApi([]);

          // const getValuesFromDatabase = async () => {
          //   const response = await fetch('/api/formStepOneValues');
          //   const responseBody = await response.json();
          //   console.log('return formOneValue:', responseBody);
          // };

          // response from api okay ==> update formstep variable
          const nextFormStep = formStep + 1;
          setFormStep(nextFormStep);
        }}
      >
        <section>
          {/* <h2>Personal Details </h2> */}
          <p>
            <label htmlFor="email">
              <span>Email </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="janedoe@test.com"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </p>
          <div css={flexStyle}>
            <p>
              <label htmlFor="dateOfBirth">
                <span>Date of birth </span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.currentTarget.value)}
              />
            </p>
            <p>
              <label htmlFor="socialSecNumber">
                <span>Social Security No. </span>
              </label>
              <input
                type="tel"
                id="socialSecNumber"
                name="socialSecNumber"
                placeholder="XXX DDMMYY"
                // maxLength={15}
                value={socialSecNumber}
                onChange={(event) =>
                  setSocialSecNumber(event.currentTarget.value)
                }
              />
            </p>
          </div>

          <div css={flexStyle}>
            <p>
              <label htmlFor="nationality">
                <span>Nationality: </span>
              </label>
              <input
                id="nationality"
                name="nationality"
                value={nationality}
                onChange={(event) => setNationality(event.currentTarget.value)}
              />
            </p>
            <p>
              <label htmlFor="Phone">
                <span>Phone </span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                // maxLength={15}
                value={phone}
                placeholder="0043 06660 000 000"
                onChange={(event) => setPhone(event.currentTarget.value)}
              />
            </p>
          </div>
        </section>
        <button>Go to Step 2: </button>
      </form>
    </>
  );
}
