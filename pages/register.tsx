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

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Register Page</title>
        <meta name="Login Page" content="Login to website " />
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
              <h2>Create account</h2>
              <p>Creat your account and start your Pre-Onboarding </p>
            </div>

            {/* show error message if username already exists  */}
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
                const registerResponse = await fetch('/api/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                });

                // response from api & check for error message
                const registerResponseBody = await registerResponse.json();
                if ('errors' in registerResponseBody) {
                  setErrors(registerResponseBody.errors);
                  return;
                }
                // redirect user after login to welcome page
                await router.push('/welcome');
                console.log(registerResponseBody.user.id);
                console.log(registerResponseBody.user.username);
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
