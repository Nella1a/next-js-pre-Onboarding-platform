import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { sectionOneLayout, sectionTwoLayout } from '../../components/elements';
import Layout from '../../components/Layout';
import Navigation from '../../components/Navigation';
import {
  getUserById,
  getUserByValidSessionToken,
  getValidSessionByToken,
} from '../../util/database';

export default function Documents(props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Login to Page</title>
        <meta name="Login Page" content="Login in Form " />
      </Head>
      <section css={sectionOneLayout}>
        <Navigation />
      </section>
      <section css={sectionTwoLayout}>
        <div>
          <h1>you only will see this if are logged in</h1>
          <div> user id is {props.user.id}</div>
          <div> user name is {props.user.username}</div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div>
            {' '}
            <label htmlFor="username">Username</label>
            <input id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get current user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  // 2. Retrieve user by valid sessionToken
  const user = await getUserByValidSessionToken(token);
  // TO DO CHECK ROLE Of USER

  // 3. If user exists, return user and render page
  if (user) {
    return {
      props: {
        user: user,
      },
    };
  }

  // 4. If user is undefined ( = no token) redirect to login
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
