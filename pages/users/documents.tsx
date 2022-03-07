import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { sectionOneLayout, sectionTwoLayout } from '../../components/elements';
import Layout from '../../components/Layout';
import Navigation from '../../components/Navigation';
import { getUserById, getValidSessionByToken } from '../../util/database';

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
  // 1. Check if there is a token
  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. check if token is valid
    // TO DO CHECK ROLE Of USER
    const session = await getValidSessionByToken(token);
    if (session) {
      const user = await getUserById(session.userId);
      return {
        props: {
          user: user,
        },
      };
    }
  }

  // 3. if token is NOT valid redirect to login
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
