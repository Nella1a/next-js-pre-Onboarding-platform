import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  errorStyles,
  registerFlexCenterWithWidthAndHeight,
} from '../../components/elements';
import Layout from '../../components/Layout';
import login_image_left from '../../public/img/login_image_left.png';
import logo_login from '../../public/img/logo_login.png';
import { createCsrfToken } from '../../util/auth';
import { getValidSessionByToken } from '../../util/database';

type Errors = { message: string }[];

type Props = {
  refreshUserProfile: () => void;
  csrfToken: string;
};

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  const userRole = 1;

  console.log('errors:', errors);
  return (
    <Layout>
      <Head>
        <title>Register Page</title>
        <meta name="Login Page" content="Login to website " />
      </Head>

      <div css={registerFlexCenterWithWidthAndHeight}>
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
              <Image src={logo_login} alt="icon" width="166" height="36" />
            </div>
            <div>
              <h1>Create account</h1>
              <p>Create your account and get started. </p>
            </div>

            {/* show error message if username already exist  */}
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
                    csrfToken: props.csrfToken,
                    userRole: userRole,
                    firstName: firstName,
                    lastName: lastName,
                  }),
                });

                // response from api & check for error message
                const registerResponseBody = await registerResponse.json();
                if ('errors' in registerResponseBody) {
                  setErrors(registerResponseBody.errors);
                  return;
                }
                // Get the query parameter from the Next.js router
                const returnTo = router.query.returnTo;
                console.log('returnTo', returnTo);

                if (
                  returnTo &&
                  !Array.isArray(returnTo) &&
                  // Security: Validate returnTo parameter against valid path
                  // (because this is untrusted user input)
                  /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
                ) {
                  await router.push(returnTo);
                  return;
                }

                // Login worked, redirect to the homepage using the Next.js router
                props.refreshUserProfile();
                await router.push('/');
                console.log(registerResponseBody.user.id);
                console.log(registerResponseBody.user.username);
              }}
            >
              <div>
                <p>
                  {' '}
                  <label htmlFor="firstName">First name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.currentTarget.value)
                    }
                  />
                </p>
                <p>
                  <label htmlFor="lastName">Last name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.currentTarget.value)}
                  />
                </p>
              </div>
              <div>
                <p>
                  {' '}
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.currentTarget.value)}
                  />
                </p>

                <p>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </p>
              </div>
              <button>Sign Up</button>
              <p>
                Already have an account?
                <Link href="/employer/login">
                  <a> Login here.</a>
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
        destination: `https://${context.req.headers.host}/employer/register`,
        permanent: true,
      },
    };
  }

  // 1. Check if there is a token and valid

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
