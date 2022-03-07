import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { deleteSessionByToken } from '../util/database';

export default function Logout() {
  return (
    <Layout>
      <Head>
        <title>Logout</title>
        <meta name="description" content="Logout page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Logout was worked</h1>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. get the cookie from the context and get session token
  const token = context.req.cookies.sessionToken;
  console.log('cookie:', token);
  // if cookie is set
  if (token) {
    // 2.  we want want to delete the session from our database
    await deleteSessionByToken(token);

    // 3. wie want to set the cookie destruction
    // Send another respond header to client.
    // setting the maxAge to -1 = delete cookie
    context.res.setHeader(
      'Set-Cookie',
      cookie.serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }

  // 4. we need to redirect to the page that linked to logout

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };

  // return {
  //   props: {},
  // };
}
