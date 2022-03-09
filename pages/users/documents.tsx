import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
  flexStyle,
  formStyle,
  formStyleContainer,
  sectionOneLayout,
  sectionTwoLayout,
} from '../../components/elements';
import Layout from '../../components/Layout';
import Navigation from '../../components/Navigation';
import { getUserByValidSessionToken } from '../../util/database';

export default function Documents(props) {
  // const [required, setRequired] = useState(true);
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <h1>Welcome X</h1>
      <p>It's great to have you with us.</p> */}
      <section css={sectionOneLayout}>
        <Navigation userId={props.user.id} userRole={props.user.roleId} />
      </section>

      <section css={sectionTwoLayout}>
        <h1>
          {' '}
          Personal Details: Hello {props.user.username} User_id: {props.user.id}
          User_role: {props.user.roleId}{' '}
        </h1>
        <div css={formStyleContainer}>
          <form css={formStyle} onSubmit={(event) => event.preventDefault()}>
            <section>
              {/* <h2>Personal Details </h2> */}
              <p>
                Required fields are followed by
                <abbr title="required ">*</abbr>
              </p>

              <div css={flexStyle}>
                <p>
                  <label htmlFor="firstName">
                    <span>First Name: </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                    <input
                      // id="firstName"
                      name="lastName"
                      data-test-id="userPersonalDetails-firstName"
                      required
                    />
                  </label>
                </p>
                <p>
                  <label htmlFor="lastName">
                    <span>Last Name </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    data-test-id="userPersonalDetails-lastName"
                    required
                  />
                </p>
              </div>
              <div css={flexStyle}>
                <p>
                  <label htmlFor="adress">
                    <span>Adress: </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                  </label>
                  <input
                    id="adress"
                    name="adress"
                    data-test-id="userPersonalDetails-address"
                    required
                  />
                </p>
                <p>
                  <label htmlFor="city">
                    <span>City: </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                  </label>
                  <input
                    id="city"
                    name="city"
                    data-test-id="userPersonalDetails-city"
                    required
                  />
                </p>
              </div>
              <div css={flexStyle}>
                <p>
                  <label htmlFor="postalCode">
                    <span>Postal Code: </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                  </label>
                  {/* <input  id="postalCode" name="postalCode" type="number" /> */}
                  <input
                    placeholder="Zip Code"
                    title="Please enter a Zip Code"
                    pattern="^\s*?\d{4}(?:[-\s]\d{4})?\s*?$"
                    // To be friendly to the user, this also permits whitespace before/after the string, which the developer will need to trim serverside.
                    data-test-id="userPersonalDetails-postalCode"
                    required
                  />
                </p>
                <p>
                  <label htmlFor="country">
                    <span>Country: </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                  </label>
                  <input
                    id="country"
                    name="country"
                    data-test-id="userPersonalDetails-country"
                    required
                  />
                </p>
              </div>

              <div css={flexStyle}>
                <p>
                  <label htmlFor="Email">
                    <span>Email </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                  </label>
                  <input
                    id="Email"
                    name="Email"
                    data-test-id="userPersonalDetails-email"
                    required
                  />
                </p>
                <p>
                  <label htmlFor="Phone">
                    <span>Phone </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                  </label>
                  <input
                    type="tel"
                    id="Phone"
                    name="Phone"
                    data-test-id="userPersonalDetails-phone"
                    required
                  />
                </p>
              </div>
              {/*   <div>
                {!required ? (
                  <Link href="/">
                    <a>
                      <input
                        type="submit"
                        data-test-id="checkout-confirm-order"
                        value="Complete payment"
                      />
                    </a>
                  </Link>
                ) : (
                  <input
                    type="submit"
                    data-test-id="checkout-confirm-order"
                    value="Complete payment"
                  />
                )}
              </div> */}
            </section>
            <Link href="/users/personalDetails/" passHref>
              <button>Go to Step 2: </button>
            </Link>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get current user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  // 2. Retrieve user by valid sessionToken
  const user = await getUserByValidSessionToken(token);
  // TO DO CHECK ROLE Of USER

  // 3. If user exists, return user and render page
  if (user) {
    return {
      props: {
        user: user,
      },
    };
  }

  // 4. If user is undefined ( = no token) redirect to login
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
