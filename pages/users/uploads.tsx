import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import {
  flexStyle,
  formStyleContainer,
  sectionOneLayout,
  sectionTwoLayout,
  uploadformStyle,
} from '../../components/elements';
import Layout from '../../components/Layout';
import Navigation from '../../components/Navigation';
import { getUserByValidSessionToken } from '../../util/database';

export default function Uploads(props) {
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
          <form
            css={uploadformStyle}
            onSubmit={(event) => event.preventDefault()}
          >
            <section>
              {/* <h2>Personal Details </h2> */}
              {/*  <p>
                Required fields are followed by
                <abbr title="required ">*</abbr>
              </p> */}
              <div css={flexStyle}>
                <p>
                  <label htmlFor="fileUpload_1"> </label>
                  <input
                    id="fileUpload_1"
                    name="fileUpload_1"
                    data-test-id="userPersonalDetails-fileUpload_1"
                    type="file"
                    required
                  />
                  <select
                    id="fileUpload_1"
                    name="fileUpload_1"
                    data-test-id="userPersonalDetails-fileUpload_1"
                    required
                  >
                    <option value="contract">contract</option>
                    <option value="idcard">ID</option>
                    <option value="bankCard">BankCard</option>
                    <option value="other">other</option>
                  </select>
                </p>
              </div>
              <div css={flexStyle}>
                <p>
                  <label htmlFor="fileUpload_1"> </label>
                  <input
                    id="fileUpload_1"
                    name="fileUpload_1"
                    data-test-id="userPersonalDetails-fileUpload_1"
                    type="file"
                    required
                  />
                  <select
                    id="fileUpload_1"
                    name="fileUpload_1"
                    data-test-id="userPersonalDetails-fileUpload_1"
                    required
                  >
                    <option value="contract">contract</option>
                    <option value="idcard">ID</option>
                    <option value="bankCard">BankCard</option>
                    <option value="other">other</option>
                  </select>
                </p>
              </div>
              <div css={flexStyle}>
                <p>
                  <label htmlFor="fileUpload_1"> </label>
                  <input
                    id="fileUpload_1"
                    name="fileUpload_1"
                    data-test-id="userPersonalDetails-fileUpload_1"
                    type="file"
                    required
                  />
                  <select
                    id="fileUpload_1"
                    name="fileUpload_1"
                    data-test-id="userPersonalDetails-fileUpload_1"
                    required
                  >
                    <option value="contract">contract</option>
                    <option value="idcard">ID</option>
                    <option value="bankCard">BankCard</option>
                    <option value="other">other</option>
                  </select>
                </p>
              </div>
            </section>
            <button>Go to Step 4: Review &#38; Submit </button>
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
