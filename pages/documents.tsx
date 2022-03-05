import Head from 'next/head';
import Image from 'next/image';
import { sectionOneLayout, sectionTwoLayout } from '../components/elements';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';

export default function Documents() {
  return (
    <Layout>
      <Head>
        <title>Login to Page</title>
        <meta name="Login Page" content="Login in Form " />
      </Head>
      <section css={sectionOneLayout}>
        <Navigation />
      </section>
      <section css={sectionTwoLayout}>
        <form
          onSubmit={async (event) => {
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
