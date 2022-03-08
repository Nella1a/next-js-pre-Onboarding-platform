// import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
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
import { productionBrowserSourceMaps } from '../next.config';
import imgTest from '../public/imgTest.png';
import { createCsrfToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';
// import { deleteSessionByToken } from '../util/database';
import { LoginResponseBody } from './api/login';

type Errors = { message: string }[];

type Props = {
  refreshUserProfile: () => void;
  userObject?: { username: string };
  csrfToken: string;
};

export default function Login(props: Props) {
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
                    csrfToken: props.csrfToken,
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
                props.refreshUserProfile();
                await router.push(`/`);
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  // 1. Check if there is a token
  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. check if token is valid and redirect to welcome page ->
    // thus user can't login multiple times
    const session = await getValidSessionByToken(token);

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }
  // 3. Generate CSRF token and render the page
  return {
    props: {
      csrfToken: createCsrfToken(),
    },
  };
}

/* export async function getServerSideProps(context: GetServerSidePropsContext) {
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
      destination: '/',
      permanent: false,
    },
  };

  // return {
  //   props: {},
  // };
} */
