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
  // 1. get cookie & session token from context
  const token = context.req.cookies.sessionToken;
  console.log('cookie:', token);
  // check if cookie is set
  if (token) {
    // 2. delete the session from odatabase
    await deleteSessionByToken(token);

    // 3. set cookie destruction:
    // Send another respond header to client with context.setting the maxAge to -1 = delete cookie
    context.res.setHeader(
      'Set-Cookie',
      cookie.serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }

  // 4. redirect to login if no cookie is set
  return {
    redirect: {
      destination: '/employer/login',
      permanent: false,
    },
  };
}
