import { css } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { FormResponseBodyGet } from '../pages/api/[userId]';
import { AllPersonalInfo } from '../util/database';
import { sectionTwoLayout } from './elements';
import Layout from './Layout';

const displayFlex = css`
  display: flex;
  gap: 0.5rem;
`;

export default function FormCompleted(props) {
  const [userFormInfo, setUserFormInfo] = useState<AllPersonalInfo>('');
  // const [addressOnEdit, setAddressOnEdit] = useState('');
  // const [cityOnEdit, setCityOnEdit] = useState('');
  // const [zipCodeOnEdit, setZipCodeOnEdit] = useState(0);
  // const [countryOnEdit, setCountryOnEdit] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // Get forminput from db
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/${props.userId}`);
      const responseBody = (await response.json()) as FormResponseBodyGet;
      setUserFormInfo(responseBody.userFormInfo);
    };
    fetchData().catch(() => {});
  }, [props.userId]);

  console.log('userFormInfo_FE:', userFormInfo);

  // console.log('userFormInfo_FE UserObject:', userFormInfo.formResponse);
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
          <h2>Part 2</h2>
          <p>
            <label htmlFor="email">
              <span>Email </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled={isDisabled}
              value={userFormInfo.email}
              // onChange={(event) => setEmailOnEdit(event.currentTarget.value)}
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
              value={userFormInfo.dateOfBirth}
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
              value={userFormInfo.socialSecNb}
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
              value={userFormInfo.nationality}
              // onChange={(event) =>
              //   setNationality(event.currentTarget.value.trim())
              // }
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
              value={userFormInfo.userPhone}
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
              value={userFormInfo.streetAndNbr}
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
              value={userFormInfo.city}
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
              value={userFormInfo.postalCode}
              title="Please enter a Zip Code"
              pattern="^\s*?\d{4}(?:[-\s]\d{4})?\s*?$"
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
              value={userFormInfo.country}
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
              value={userFormInfo.maritalTypeId}
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
              value={userFormInfo.fullname}
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
              value={userFormInfo.sosPhone}
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
              value={userFormInfo.relationshipId}
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
        <button
          onClick={() => {
            // updateAnimal(animal.id).catch(() => {});
            setIsDisabled(false);
            // setAddressOnEdit(userAddress.address);
            // setCityOnEdit(userAddress.city);
            // setZipCodeOnEdit(userAddress.zipcode);
            // setCountryOnEdit(userAddress.country);
          }}
        >
          edit
        </button>
        <div>
          {' '}
          <button
            onClick={() => {
              // updateAnimal(animal.id).catch(() => {});
              setIsDisabled(true);
            }}
          >
            Save and Submit
          </button>
        </div>
      </section>
    </Layout>
  );
}
