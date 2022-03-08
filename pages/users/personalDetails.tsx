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
        <Navigation userId={props.user.id} />
      </section>

      <section css={sectionTwoLayout}>
        <h1>
          {' '}
          Details: Hello {props.user.username} User_id: {props.user.id}{' '}
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
                  <label htmlFor="dateOfBirth">
                    <span>Date of birth </span>
                    <strong>
                      <abbr title="required">*</abbr>
                    </strong>
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    data-test-id="userPersonalDetails-dateOfBirth"
                    required
                  />
                </p>
                <p>
                  <label htmlFor="InsuranceNumber">
                    <span>Insurance Number </span>
                    <strong>
                      <abbr title="required">*</abbr>
                    </strong>
                  </label>
                  <input
                    id="InsuranceNumber"
                    type="number"
                    name="InsuranceNumber"
                    data-test-id="userPersonalDetails-insuranceNumber"
                    required
                  />
                </p>
              </div>
              <div css={flexStyle}>
                <p>
                  <label htmlFor="nationality">
                    <span>Nationality: </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                  </label>
                  <input
                    id="nationality"
                    name="nationality"
                    data-test-id="userPersonalDetails-nationality"
                    required
                  />
                </p>

                <p>
                  <label htmlFor="maritalStatus">
                    <span>Marital Status:</span>
                  </label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    data-test-id="userPersonalDetails-maritalStatus"
                    required
                  >
                    <option value="single">single</option>
                    <option value="married">married</option>
                    <option value="registerdPartnership">
                      registered Partnership
                    </option>
                    <option value="divorced">divorced</option>
                    <option value="widowed">widowed</option>
                  </select>
                </p>
              </div>
              <p>Emergency Contact</p>
              <div css={flexStyle}>
                <p>
                  <label htmlFor="emergencyContact-Name">
                    <span>Full Name </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                  </label>
                  <input
                    id="emergencyContact-Name"
                    name="emergencyContact-Name"
                    data-test-id="userPersonalDetails-emergencyContact-Name"
                    required
                  />
                </p>
                <p>
                  <label htmlFor="emergencyContact-phone">
                    <span>Phone </span>
                    <strong>
                      <abbr title="required" aria-label="required">
                        *
                      </abbr>
                    </strong>
                  </label>
                  <input
                    id="emergencyContact-phone"
                    name="emergencyContact-phone"
                    data-test-id="userPersonalDetails-emergencyContact-phone"
                    type="tel"
                    required
                  />
                </p>

                <p>
                  <label htmlFor="emergencyContactRelationship">
                    <span>Relationship to Contact</span>
                  </label>
                  <select
                    id="emergencyContactRelationship"
                    name="emergencyContactRelationship"
                    data-test-id="userPersonalDetails-memergencyContactRelationship"
                    required
                  >
                    <option value="friend">friend</option>
                    <option value="Partner">Partner</option>
                    <option value="sibling">sibling</option>
                    <option value="parent">parent</option>
                    <option value="child">child</option>
                    <option value="other">other</option>
                  </select>
                </p>
              </div>
            </section>
            <Link href="/users/uploads/" passHref>
              <button>Go to Step 3: </button>
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
