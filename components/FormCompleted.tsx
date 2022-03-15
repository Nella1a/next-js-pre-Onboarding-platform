import Head from 'next/head';
import { useEffect, useState } from 'react';
import { User, UserAddress } from '../util/database';
import { sectionTwoLayout } from './elements';
import Layout from './Layout';

export default function FormCompleted(props) {
  const [userAddress, setUserAddress] = useState<UserAddress | undefined>();

  // Get Guestlist from server
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/readUsersPersonalDetails');
      const allGuests = await response.json();
      setUserAddress(allGuests);
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
      <section css={sectionTwoLayout}>
        {console.log('userAddress:', userAddress)}
        <p> City: {userAddress && userAddress.address.city}</p>
        <p>Address: {userAddress && userAddress.address.address}</p>
        <p>ZipCode: {userAddress && userAddress.address.zipcode}</p>
        <p>City: {userAddress && userAddress.address.country}</p>

        <h2>Review your inputs! 🎉</h2>
      </section>
    </Layout>
  );
}
