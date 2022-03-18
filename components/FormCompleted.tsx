import { css } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  FormResponseBody,
  FormResponseBodyGet,
  UserAddressResponseBody,
} from '../pages/api/[userId]';
import { AllPersonalInfo } from '../util/database';
import { sectionTwoLayout } from './elements';
import Layout from './Layout';

const displayFlex = css`
  display: flex;
  gap: 0.5rem;
`;

export default function FormCompleted(props) {
  const [userFormInfo, setUserFormInfo] = useState<AllPersonalInfo>('');

  // State Variable with the id of the animal on editMode
  const [idFormEditId, setidFormEditId] = useState<number>();
  // State Variables for the on Edit inputs
  const [firstNameOnEdit, setFirstNameOnEdit] = useState('');
  const [lastNameOnEdit, setLastNameOnEdit] = useState('');
  const [emailOnEdit, setEmailOnEdit] = useState('');
  const [dateOfBirthOnEdit, setDateOfBirthOnEdit] = useState('');
  const [socialSecNumberOnEdit, setSocialSecNumberOnEdit] = useState(0);
  const [nationalityOnEdit, setNationalityOnEdit] = useState('');
  const [phoneOnEdit, setPhoneOnEdit] = useState(0);
  const [addressOnEdit, setAddressOnEdit] = useState('');
  const [cityOnEdit, setCityOnEdit] = useState('');
  const [zipCodeOnEdit, setZipCodeOnEdit] = useState(0);
  const [countryOnEdit, setCountryOnEdit] = useState('');
  const [maritalStatusOnEdit, setMaritalStatusOnEdit] = useState(0);
  const [sosContactfullNameOnEdit, setSosContactfullNameOnEdit] = useState('');
  const [sosContactPhoneOnEdit, setSosContactPhoneOnEdit] = useState(0);
  const [sosContactRelationOnEdit, setSosContactRelationOnEdit] = useState(0);

  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState('');

  // Update forminput
  async function updateUserFormInputs(userId: number) {
    const putResponse = await fetch(`/api/${props.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formResponse: {
          userId: userId,
          firstName: firstNameOnEdit,
          lastName: lastNameOnEdit,
          dateOfBirth: dateOfBirthOnEdit,
          socialSecNb: socialSecNumberOnEdit,
          nationality: nationalityOnEdit,
          email: emailOnEdit,
          userPhone: phoneOnEdit,
          streetAndNbr: addressOnEdit,
          city: cityOnEdit,
          postalCode: zipCodeOnEdit,
          country: cityOnEdit,
          maritalStatusId: maritalStatusOnEdit,
          fullname: sosContactfullNameOnEdit,
          sosPhone: sosContactPhoneOnEdit,
          relationshipId: sosContactRelationOnEdit,
        },
      }),
    });
    const putResponseBody =
      (await putResponse.json()) as UserAddressResponseBody;
    console.log('putREsponsebody: ', putResponseBody);

    if ('errors' in putResponseBody) {
      setError(putResponseBody.errors);
      return;
    }
    setUserFormInfo(putResponseBody.userFormInfo);
  }

  // Read forminput from db
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/${props.userId}`);
      const responseBody = (await response.json()) as FormResponseBodyGet;
      setUserFormInfo(responseBody.userFormInfo);
    };
    fetchData().catch(() => {});
  }, [props.userId]);

  console.log('userFormInfo_FE:', userFormInfo);

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2> Step {props.currentStep + 1} of 4</h2>
      <h2>Review your inputs! 🎉</h2>
      <section css={[sectionTwoLayout, displayFlex]}>
        {console.log('userAddress:')}
        <div>
          <h2>Part 1</h2>
          <p>
            <label htmlFor="firstName">
              <span>First Name </span>
            </label>
            <input
              id="firstName"
              name="firstname"
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.firstName : firstNameOnEdit}
              onChange={(event) =>
                setFirstNameOnEdit(event.currentTarget.value)
              }
            />
          </p>
          <p>
            <label htmlFor="lastName">
              <span>Last Name </span>
            </label>
            <input
              id="lastName"
              name="lastName"
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.lastName : lastNameOnEdit}
              onChange={(event) => setLastNameOnEdit(event.currentTarget.value)}
            />
          </p>
          <p>
            <label htmlFor="email">
              <span>Email </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.email : emailOnEdit}
              onChange={(event) => setEmailOnEdit(event.currentTarget.value)}
            />
          </p>

          <p>
            <label htmlFor="dateOfBirth">
              <span>Date of birth </span>
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.dateOfBirth : dateOfBirthOnEdit}
              onChange={(event) =>
                setDateOfBirthOnEdit(event.currentTarget.value)
              }
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
              disabled={isDisabled}
              value={
                isDisabled ? userFormInfo.socialSecNb : socialSecNumberOnEdit
              }
              onChange={(event) =>
                setSocialSecNumberOnEdit(parseInt(event.currentTarget.value))
              }
            />
          </p>

          <p>
            <label htmlFor="nationality">
              <span>Nationality: </span>
            </label>
            <input
              id="nationality"
              name="nationality"
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.nationality : nationalityOnEdit}
              onChange={(event) =>
                setNationalityOnEdit(event.currentTarget.value)
              }
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
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.userPhone : phoneOnEdit}
              onChange={(event) =>
                setPhoneOnEdit(parseInt(event.currentTarget.value))
              }
            />
          </p>
        </div>
        <div>
          <h2> Part 2</h2>
          <p>
            <label htmlFor="address">
              <span>Adress: </span>
            </label>
            <input
              id="address"
              data-test-id="userAddress-street"
              name="address"
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.streetAndNbr : addressOnEdit}
              onChange={(event) => setAddressOnEdit(event.currentTarget.value)}
            />
          </p>

          <p>
            <label htmlFor="city">
              <span>City: </span>
            </label>
            <input
              id="city"
              data-test-id="userAddress-city"
              name="city"
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.city : cityOnEdit}
              onChange={(event) => setCityOnEdit(event.currentTarget.value)}
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
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.postalCode : zipCodeOnEdit}
              title="Please enter a Zip Code"
              pattern="^\s*?\d{4}(?:[-\s]\d{4})?\s*?$"
              onChange={(event) =>
                setZipCodeOnEdit(parseInt(event.currentTarget.value))
              }
            />
          </p>
          <p>
            <label htmlFor="country">
              <span>Country: </span>
            </label>
            <input
              id="country"
              data-test-id="userAddress-country"
              name="country"
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.country : countryOnEdit}
              onChange={(event) => setCountryOnEdit(event.currentTarget.value)}
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
              disabled={isDisabled}
              value={
                isDisabled ? userFormInfo.maritalStatus : maritalStatusOnEdit
              }
              onChange={(event) =>
                setMaritalStatusOnEdit(parseInt(event.currentTarget.value))
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

          <p>Emergency Contact</p>

          <p>
            <label htmlFor="userSosContactFullName">
              <span>Full Name </span>
            </label>
            <input
              id="userSosContactFullName"
              data-test-id="userSosContact-fullName"
              name="userSosContactFullName"
              disabled={isDisabled}
              value={
                isDisabled ? userFormInfo.fullname : sosContactfullNameOnEdit
              }
              onChange={(event) =>
                setSosContactfullNameOnEdit(event.currentTarget.value)
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
              disabled={isDisabled}
              value={isDisabled ? userFormInfo.sosPhone : sosContactPhoneOnEdit}
              onChange={(event) =>
                setSosContactPhoneOnEdit(parseInt(event.currentTarget.value))
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
              disabled={isDisabled}
              value={
                isDisabled
                  ? userFormInfo.relationshipId
                  : sosContactRelationOnEdit
              }
              onChange={(event) =>
                setSosContactRelationOnEdit(parseInt(event.currentTarget.value))
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
      <section css={displayFlex}>
        {isDisabled ? (
          <button
            onClick={() => {
              // updateFormFields(props.userid).catch(() =>
              setIsDisabled(false);
              setFirstNameOnEdit(userFormInfo.firstName);
              setLastNameOnEdit(userFormInfo.lastName);
              setEmailOnEdit(userFormInfo.email);
              setDateOfBirthOnEdit(userFormInfo.dateOfBirth);
              setSocialSecNumberOnEdit(userFormInfo.socialSecNb);
              setNationalityOnEdit(userFormInfo.nationality);
              setPhoneOnEdit(userFormInfo.userPhone);
              setAddressOnEdit(userFormInfo.streetAndNbr);
              setCityOnEdit(userFormInfo.city);
              setZipCodeOnEdit(userFormInfo.postalCode);
              setCountryOnEdit(userFormInfo.country);
              setMaritalStatusOnEdit(userFormInfo.maritalStatus);
              setSosContactfullNameOnEdit(userFormInfo.fullname);
              setSosContactPhoneOnEdit(userFormInfo.sosPhone);
              setSosContactRelationOnEdit(userFormInfo.relationshipId);
            }}
          >
            edit
          </button>
        ) : (
          <div>
            {' '}
            <button
              onClick={() => {
                updateUserFormInputs(props.userId).catch(() => {});
                setIsDisabled(true);
              }}
            >
              Save and Submit
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
}
