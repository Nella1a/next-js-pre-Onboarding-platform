import Head from 'next/head';
import { useEffect, useState } from 'react';
import { UserAddressResponseBody } from '../pages/api/[userId]';
import { AllPersonalInfo } from '../util/database';
import { sectionTwoLayout } from './elements';
import Layout from './Layout';

type Form = {};

export default function FormCompleted(props) {
  const [userFormInfo, setUserFormInfo] = useState();
  const [addressOnEdit, setAddressOnEdit] = useState('');
  const [cityOnEdit, setCityOnEdit] = useState('');
  const [zipCodeOnEdit, setZipCodeOnEdit] = useState(0);
  const [countryOnEdit, setCountryOnEdit] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // Get forminput from db
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/${props.userId}`);
      const responseBody = await response.json();
      setUserFormInfo(responseBody);
    };
    fetchData().catch(console.error);
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
      <section css={sectionTwoLayout}>
        {console.log('userAddress:')}
        <div>
          <label htmlFor="streetName">Streetname</label>
          <input
            id="userAddress"
            name="userAddress"
            disabled={isDisabled}
            // value={userFormInfo.formResponse.streetAndNbr}
            // value={
            //   isDisabled ? userAddress && userAddress.address : addressOnEdit
            // }
            // onChange={(event) => setAddressOnEdit(event.currentTarget.value)}
          />

          <label htmlFor="City">City:</label>
          <input
            id="city"
            name="city"
            disabled={isDisabled}
            // value={userFormInfo.formResponse.city}
            // value={isDisabled ? userAddress && userAddress.city : cityOnEdit}
            // onChange={(event) => setCityOnEdit(event.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="zipCode">Country</label>
          <input
            id="country"
            name="country"
            disabled={isDisabled}
            // value={userFormInfo.formResponse.country}
            // value={userAddress && userAddress.zipcode}
          />
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            disabled={isDisabled}
            // value={userFormInfo.userObject.country}
            // value={userAddress && userAddress.country}
          />
        </div>
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
