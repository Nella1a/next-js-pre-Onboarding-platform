import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  errorStyles,
  flexCenterWithWidthAndHeight,
} from '../components/elements';
import Layout from '../components/Layout';
import imgTest from '../public/imgTest.png';

type Errors = { message: string }[];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Login to Page</title>
        <meta name="Login Page" content="Login in Form " />
      </Head>

      <div css={flexCenterWithWidthAndHeight}>
        <section>
          <article>
            <Image src={imgTest} alt="icon" width="161" height="97" />
            <h2>Pre-Onboarding</h2>
            <p>Login in to continue your Pre-Onboarding Process</p>
          </article>
          <article>
            <div>
              <h2>Welcome Back</h2>
              <p>Login to continue your Pre-Onboarding </p>
            </div>

            <form
              onSubmit={async (event) => {
                event.preventDefault();

                // send username & pw to api
                const createUserResponse = await fetch('/api/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                });

                // get response from api & check for error message
                const createUserResponseBody = await createUserResponse.json();
                if ('errors' in createUserResponseBody) {
                  setErrors(createUserResponseBody.errors);
                  return;
                }
                // redirect user after login to welcome page
                await router.push('/welcome');
              }}
            >
              <div>
                {' '}
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(event) => setUsername(event.currentTarget.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
              </div>
              <button>Login</button>
              <p>
                Don't have an account?
                <Link href="/register">
                  <a> Register Here</a>
                </Link>
              </p>
            </form>
          </article>
        </section>
      </div>
    </Layout>
  );
}
