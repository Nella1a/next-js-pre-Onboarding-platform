import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import {
  errorStyles,
  flexStyle,
  formStyle,
  hideForm,
  showForm,
} from '../elements';

export type Props = {
  // userObject: User;
  // userFirstName: string;
  // headerImage: string;
  // userId: number;
  formStep: number;
  currentStep: number;
  nextFormStep: number;
  // prevFormStep: number;
  // user: User;
  // formValues
  // setFormValues
  userFormInput?: AllPersonalInfo;
};

type FormValuesOne = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  socialSecNumber: number;
  nationality: string | undefined;
  email: string | undefined;
  phone: string | undefined;
};
type Errors = { message: string }[];

export default function FormStepOneValues(props: Props) {
  // const requieredTrue = false;
  const [errorsApi, setErrorsApi] = useState<Errors>([]);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [socialSecNumber, setSocialSecNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormValuesOne>();

  return (
    <>
      <h2> Step {props.currentStep + 1} of 4</h2>
      <div css={errorStyles}>
        {errorsApi.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
      <form
        css={[formStyle, props.formStep === 0 ? showForm : hideForm]}
        onSubmit={async (event) => {
          event.preventDefault();

          // send input to api
          // const formInputResponse = await fetch('/api/formStepOneValues', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     dateOfBirth: dateOfBirth,
          //     socialSecNumber: parseInt(socialSecNumber),
          //     nationality: nationality,
          //     email: email,
          //     phone: parseInt(phone),
          //     userId: props.userId,
          //   }),
          // });

          // // get response from api & check for error message
          // const formInputResponseBody = await formInputResponse.json();
          // if ('errors' in formInputResponseBody) {
          //   setErrorsApi(formInputResponseBody.errors);
          //   return;
          // }
          // setErrorsApi([]);
          // console.log('Response from Api:', formInputResponseBody);

          // const getValuesFromDatabase = async () => {
          //   const response = await fetch('/api/formStepOneValues');
          //   const responseBody = await response.json();
          //   console.log('return formOneValue:', responseBody);
          // };

          props.nextFormStep();
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
