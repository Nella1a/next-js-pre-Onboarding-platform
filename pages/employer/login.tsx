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
} from '../../components/elements';
import Layout from '../../components/Layout';
// import { productionBrowserSourceMaps } from '../../next.config';
import login_image_left from '../../public/img/login_image_left.png';
import logo_login from '../../public/img/logo_login.png';
import { createCsrfToken } from '../../util/auth';
import { getValidSessionByToken } from '../../util/database';
// import { deleteSessionByToken } from '../util/database';
import { LoginResponseBody } from '../api/login';

type Errors = { message: string }[];

type Props = {
  refreshUserProfile: () => void;
  // userObject?: { username: string };
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
            <div>
              <Image
                src={login_image_left}
                alt="icon"
                width="296"
                height="563"
              />
            </div>
          </article>
          <article>
            <div>
              <div>
                <Image src={logo_login} alt="icon" width="166" height="36" />
              </div>

              <div>
                <h1>Welcome Back</h1>
                <p>Login to continue your pre-onboarding </p>
              </div>
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
                const loginResponse = await fetch('../api/login', {
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
                  // placeholder="Choose your username"
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
                  // placeholder="Choose your password"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
              </div>
              <button>Login</button>
              <p>
                Don't have an account?
                <Link href="/employer/register">
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
        destination: `https://${context.req.headers.host}/employer/login`,
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
