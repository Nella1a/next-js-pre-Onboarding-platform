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
import { LoginResponseBody } from './api/login';

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

            {/* show error message if username or password does not match  */}
            <div css={errorStyles}>
              {errors.map((error) => {
                return (
                  <div key={`error-${error.message}`}>{error.message}</div>
                );
              })}
            </div>

            <form
              onSubmit={async (event) => {
                event.preventDefault();

                // send username & pw to api
                const loginResponse = await fetch('/api/login', {
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
                const loginResponseBody =
                  (await loginResponse.json()) as LoginResponseBody;
                if ('errors' in loginResponseBody) {
                  setErrors(loginResponseBody.errors);
                  return;
                }
                // Login worked, clear errors and redirect to the welcome page
                setErrors([]);
                await router.push(`/users/${loginResponseBody.user.id}`);
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