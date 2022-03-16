import Head from 'next/head';
import { useEffect, useState } from 'react';
import { User, UserAddress } from '../util/database';
import { sectionTwoLayout } from './elements';
import Layout from './Layout';

export default function FormCompleted(props) {
  const [userAddress, setUserAddress] = useState();
  // const [addressOnEdit, setAddressOnEdit] = useState('');
  // const [cityOnEdit, setCityOnEdit] = useState('');
  // const [zipCodeOnEdit, setZipCodeOnEdit] = useState(0);
  // const [countryOnEdit, setCountryOnEdit] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // Get Guestlist from server
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/readAllFormData');
      const responseAddress = await response.json();
      setUserAddress(responseAddress);
    };
    fetchData().catch(console.error);
  }, []);

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
        {console.log('userAddress:', userAddress)}
        <div>
          <label htmlFor="streetName">Streetname</label>
          <input
            id="userAddress"
            name="userAddress"
            disabled={isDisabled}
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
            // value={isDisabled ? userAddress && userAddress.city : cityOnEdit}
            // onChange={(event) => setCityOnEdit(event.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            name="zipCode"
            disabled={isDisabled}
            // value={userAddress && userAddress.zipcode}
          />
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            disabled={isDisabled}
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
