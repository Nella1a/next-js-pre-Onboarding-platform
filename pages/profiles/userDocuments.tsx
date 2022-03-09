import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
  flexStyle,
  formStyle,
  formStyleContainer,
  sectionOneLayout,
  sectionTwoLayout,
} from '../../components/elements';
import Layout from '../../components/Layout';
import Navigation from '../../components/Navigation';
import { getUserByValidSessionToken } from '../../util/database';

export default function AllUserDocuments(props) {
  // const [required, setRequired] = useState(true);

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

      <section css={sectionTwoLayout}>
        <h1>
          {' '}
          Personal Details: Hello {props.user.username} User_id: {props.user.id}
          User_role: {props.user.roleId}{' '}
        </h1>
        <div css={formStyleContainer}>
          <h2>List of all new hires</h2>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get current user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;

  const abec = context.resolvedUrl;
  console.log('reslovedURL ffrom UserDocuments:', abec);

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

  // Error Hanling: if user does not exist (= no token) redirect to login
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Good Case: if user exists and has the right role return user and render page
  if (user && user.roleId === 1) {
    return {
      props: {
        user: user,
      },
    };
  }
}
