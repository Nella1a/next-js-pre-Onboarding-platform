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

interface ChildProps {
  formStep: number;

  setFormStep: React.Dispatch<React.SetStateAction<number | undefined>>;
  // prevFormStep: number;
  user: User;
}

// type FormOneRequestBody = {
//   address: string;
//   city: string;
//   zipCode: number;
//   country: string;
//   maritalStatus: number;
//   sosContactfullName: string;
//   sosContactPhone: number;
//   sosContactRelation: string;
// };

// type FormValuesTwo = {
//   address: string;
//   city: string;
//   zipCode: number;
//   country: string;
//   maritalStatus: number;
//   sosContactfullName: string;
//   sosContactPhone: number;
//   sosContactRelation: number;
// };

type Errors = { message: string }[];

export default function FormStepTwoValues({
  user,
  formStep,
  setFormStep,
}: ChildProps) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  // const requieredTrue = false;
  const [errorsApi, setErrorsApi] = useState<Errors>([]);
  console.log('maritalStatus:', maritalStatus);

  return (
    <>
      <h1> Step {formStep + 1} of 4</h1>
      {/* show error message if username or password does not match  */}
      <div css={errorStyles}>
        {errorsApi.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
      <form
        css={[formStyle, formStep === 1 ? showForm : hideForm]}
        onSubmit={async (event) => {
          event.preventDefault();

          //   send input to api
          const formInputResponse = await fetch('/api/formStepTwoValues', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address: address,
              city: city,
              zipCode: parseInt(zipCode),
              country: country,
              maritalStatus: parseInt(maritalStatus),
              userId: user.id,
              formStep: formStep,
            }),
          });

          // get response from api & check for error message
          const formInputResponseBody = await formInputResponse.json();
          if ('errors' in formInputResponseBody) {
            setErrorsApi(formInputResponseBody.errors);
            return;
          }
          setErrorsApi([]);
          console.log('FormTwoResponse:', formInputResponseBody);

          const nextFormStep = formStep + 1;
          console.log('Formstep StepTWO:', formStep);
          setFormStep(nextFormStep);
        }}
      >
        <section>
          {/* <h2>Personal Details </h2> */}
          <p>
            <label htmlFor="address">
              <span>Address: </span>
            </label>
            <input
              id="address"
              data-test-id="userAddress-street"
              name="address"
              value={address}
              placeholder="Sunshinestreet 1/20"
              onChange={(event) => setAddress(event.currentTarget.value)}
            />
          </p>
          <div css={flexStyle}>
            <p>
              <label htmlFor="city">
                <span>City: </span>
              </label>
              <input
                id="city"
                data-test-id="userAddress-city"
                name="city"
                value={city}
                placeholder="Vienna"
                onChange={(event) => setCity(event.currentTarget.value)}
              />
            </p>
            <p>
              <label htmlFor="zipCode">
                <span>Postal Code: </span>
              </label>
              <input
                type="tel"
                min="0"
                id="zipCode"
                data-test-id="useAddress-zipCode"
                name="zipCode"
                value={zipCode}
                placeholder="1050"
                title="Please enter a Zip Code"
                pattern="^\s*?\d{4}(?:[-\s]\d{4})?\s*?$"
                // To be friendly to the user, this also permits whitespace before/after the string, which the developer will need to trim serverside.
                onChange={(event) => setZipCode(event.currentTarget.value)}
              />
            </p>
          </div>
          <div css={flexStyle}>
            <p>
              <label htmlFor="country">
                <span>Country: </span>
              </label>
              <input
                id="country"
                data-test-id="userAddress-country"
                name="country"
                value={country}
                placeholder="Austria"
                onChange={(event) => setCountry(event.currentTarget.value)}
              />
            </p>
            <p>
              <label htmlFor="maritalStatus">
                <span>Marital Status:</span>
              </label>
              <select
                id="maritalStatus"
                data-test-id="userMartital-status"
                name="martitalStatus"
                value={maritalStatus}
                onChange={(event) =>
                  setMaritalStatus(event.currentTarget.value)
                }
              >
                <option value="0">-- please select --</option>
                <option value="1">single</option>
                <option value="2">married</option>
                <option value="3">registered partnership</option>
                <option value="4">divorced</option>
                <option value="5">widowed</option>
                <option value="6">other</option>
              </select>
            </p>
          </div>
        </section>
        {/* <Link href="/users/uploads/" passHref> */}
        <button>Step 3</button>
        {/* </Link> */}
      </form>
      {/* </section> */}
      {/* </Layout> */}
    </>
  );
}
