import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import AddNewJoiner from '../../components/AddNewJoiner';
import {
  flexStyle,
  formStyle,
  formStyleContainer,
  sectionOneLayout,
  sectionTwoLayout,
} from '../../components/elements';
import Layout from '../../components/Layout';
import Navigation from '../../components/Navigation';
import {
  getAllNewJoiners,
  getUserByValidSessionToken,
} from '../../util/database';

const styleNewHire = css`
  display: flex;
  gap: 0.5rem;
`;

export default function AllUserDocuments(props) {
  // const [required, setRequired] = useState(true);

  // const addNewJoinerHandler() {

  // }

  if (!props.user) {
    return (
      <Layout userObject={props.userObject}>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>You are not allowed to see this site</h1>
      </Layout>
    );
  }
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <h1>Welcome X</h1>
      <p>It's great to have you with us.</p> */}
      <section css={sectionOneLayout}>
        <Navigation userId={props.user.id} userRole={props.user.roleId} />
      </section>

      <section>
        <h1>
          {' '}
          Personal Details: Hello {props.user.username} User_id: {props.user.id}
          User_role: {props.user.roleId}{' '}
        </h1>
        <div>
          <AddNewJoiner />
        </div>
        <h2>List of all new hires</h2>

        {props.newJoiners.map((joiner) => {
          return (
            <div key={`overview-${joiner.id}`} css={styleNewHire}>
              <p> Id: {joiner.id} </p>
              <p> userName: {joiner.username} </p>
              <p> {joiner.roleId}</p>
              roleId:{' '}
            </div>
          );
        })}
        {/* <button onClick={addNewJoinerHandler}>Add New Joiner</button> */}
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get current user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;

  const abec = context.resolvedUrl;
  console.log('reslovedURL from UserDocuments:', abec);

  // 2. Retrieve user by valid sessionToken
  const user = await getUserByValidSessionToken(token);
  // TO DO CHECK ROLE Of USER

  // Error Handling: if user exists but does not have the right role redirect to home
  if (user && user.roleId !== 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Error Handling: if user does not exist (= no token) redirect to login
  if (!user) {
    return {
      redirect: {
        destination: '/employer/login',
        permanent: false,
      },
    };
  }

  // Good Case: if user exists and has the right role return user and render page
  if (user && user.roleId === 1) {
    // get all new joiners
    const newJoiners = await getAllNewJoiners();
    console.log('newJoiners', newJoiners);

    return {
      props: {
        user: user,
        newJoiners: newJoiners,
      },
    };
  }
}
