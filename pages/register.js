import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { flexCenterWithWidthAndHeight } from '../components/elements';
import Layout from '../components/Layout';
import imgTest from '../public/imgTest.png';

export default function Register() {
  return (
    <Layout>
      <Head>
        <title>Login Page</title>
        <meta name="Login Page" content="Login in Form " />
      </Head>

      <div css={flexCenterWithWidthAndHeight}>
        <section>
          <article>
            <Image src={imgTest} alt="icon" width="161" height="97" />
            <h2>Pre-Onboarding</h2>
            <p>Sign in to start your Pre-Onboarding Process</p>
          </article>
          <article>
            <div>
              <h2>Create new account</h2>
              <p>Creat your account and start your Pre-Onboarding </p>
            </div>
            <form>
              <div>
                {' '}
                <label htmlFor="username">Username</label>
                <input id="username" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" />
              </div>
              <button>Sign Up</button>
              <p>
                Already have an account?
                <Link href="/login">
                  <a> Login Here</a>
                </Link>
              </p>
            </form>
          </article>
        </section>
      </div>
    </Layout>
  );
}
