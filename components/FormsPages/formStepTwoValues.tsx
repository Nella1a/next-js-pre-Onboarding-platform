import { useState } from 'react';
// import { useForm } from 'react-hook-form';
import {
  errorStyles,
  flexStyle,
  formStyle,
  hideForm,
  showForm,
} from '../elements';

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

export default function FormStepTwoValues(props) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [sosContactfullName, setSosContactfullName] = useState('');
  const [sosContactPhone, setSosContactPhone] = useState('');
  const [sosContactRelation, setSosContactRelation] = useState('');
  const requieredTrue = false;
  const [errorsApi, setErrorsApi] = useState<Errors>([]);
  console.log('maritalStatus:', maritalStatus);

  return (
    <>
      <h2> Step {props.currentStep + 1} of 4</h2>
      {/* show error message if username or password does not match  */}
      <div css={errorStyles}>
        {errorsApi.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
      <form
        css={[formStyle, props.formStep === 1 ? showForm : hideForm]}
        onSubmit={async (event) => {
          event.preventDefault();
          // validations

          // send input to api
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
              sosContactfullName: sosContactfullName,
              sosContactPhone: sosContactPhone,
              sosContactRelation: parseInt(sosContactRelation),
              userId: props.userId,
            }),
          });

          // get response from api & check for error message
          const formInputResponseBody = await formInputResponse.json();
          if ('errors' in formInputResponseBody) {
            setErrorsApi(formInputResponseBody.errors);
            return;
          }
          setErrorsApi([]);
          console.log('Response from Api:', formInputResponseBody);
          props.nextFormStep();
        }}
      >
        <section>
          {/* <h2>Personal Details </h2> */}
          <p>
            <label htmlFor="address">
              <span>Adress: </span>
            </label>
            <input
              id="address"
              data-test-id="userAddress-street"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.currentTarget.value.trim())}
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
                onChange={(event) => setCity(event.currentTarget.value.trim())}
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
                onChange={(event) =>
                  setCountry(event.currentTarget.value.trim())
                }
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
                <option value="3">registered Partnership</option>
                <option value="4">divorced</option>
                <option value="5">widowed</option>
                <option value="6">widowed</option>
              </select>
            </p>
          </div>
          <p>Emergency Contact</p>
          <div css={flexStyle}>
            <p>
              <label htmlFor="userSosContactFullName">
                <span>Full Name </span>
              </label>
              <input
                id="userSosContactFullName"
                data-test-id="userSosContact-fullName"
                name="userSosContactFullName"
                value={sosContactfullName}
                onChange={(event) =>
                  setSosContactfullName(event.currentTarget.value)
                }
              />
            </p>
            <p>
              <label htmlFor="userSosContactPhone">
                <span>Phone </span>
              </label>
              <input
                type="tel"
                min={0}
                id="userSosContactPhone"
                data-test-id="userSosContact-phone"
                name="userSosContactPhone"
                value={sosContactPhone}
                onChange={(event) =>
                  setSosContactPhone(event.currentTarget.value)
                }
              />
            </p>

            <p>
              <label htmlFor="sosContactRelation">
                <span>Relationship to Contact</span>
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
                <option value="2">Partner</option>
                <option value="3">sibling</option>
                <option value="4">parent</option>
                <option value="5">child</option>
                <option value="6">other</option>
              </select>
            </p>
          </div>
        </section>
        {/* <Link href="/users/uploads/" passHref> */}
        <button>Step 3: Uploads</button>
        {/* </Link> */}
      </form>
      <button onClick={props.prevFormStep}>Back</button>
      {/* </section> */}
      {/* </Layout> */}
    </>
  );
}
