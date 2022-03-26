import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import {
  addNewJoinerSectionTwoLayout,
  sectionOneLayout,
} from '../components/elements';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import {
  getUserById,
  getValidSessionByToken,
  readContractDetails,
  readUserProfileImage,
  User,
} from '../util/database';

export default function UserProfile(props) {
  const [startingDate, setStartingDate] = useState(
    props.readContract.startingDate,
  );
  const [jobTitle, setJobTitle] = useState(props.readContract.jobTitle);
  const [salary, setSalary] = useState(props.readContract.salary);
  const [benefits, setBenefits] = useState(props.readContract.benefits);
  const isDisabled = true;
  console.log('props_contract:', props);
  if (!props.user) {
    return (
      <Layout
        userObject={props.userObject}
        userFirstName={props.userFirstName}
        headerImage={props.headerImage}
      >
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>User not found</h1>
        Better luck next time
      </Layout>
    );
  }

  return (
    <Layout
      userObject={props.userObject}
      userFirstName={props.userFirstName}
      headerImage={props.headerImage}
    >
      <Head>
        <title>contract main points</title>
        <meta name="description" content="contract main points" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={sectionOneLayout}>
        <Navigation userId={props.user.id} userRole={props.user.roleId} />
      </section>

      <section css={addNewJoinerSectionTwoLayout}>
        <article>Picture</article>
        <article>
          <h2>Offer MOverview</h2>
          <ul>
            <div>
              {' '}
              <li>
                <label htmlFor="startingDate">Starting Date</label>
              </li>
              <li>
                {' '}
                <input
                  id="startingDate"
                  name="startingDate"
                  disabled={isDisabled}
                  value={startingDate}
                />{' '}
              </li>
            </div>
            <div>
              <li>
                {' '}
                <label htmlFor="jobTitle">Job Title</label>
              </li>
              <li>
                <input
                  id="jotTitle"
                  name="jobTitle"
                  disabled={isDisabled}
                  value={jobTitle}
                />
              </li>
            </div>

            <div>
              {' '}
              <li>
                <label htmlFor="salary">Annual salary</label>
              </li>
              <li>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  disabled={isDisabled}
                  value={salary}
                />
              </li>
            </div>

            <div>
              <li>
                <label htmlFor="benefits">Benefits</label>
              </li>
              <li>
                <input
                  id="benefits"
                  type="benefits"
                  name="benefits"
                  value={benefits}
                  disabled={isDisabled}
                />
              </li>
            </div>
            <div>
              {' '}
              <button> Download Contract</button>
            </div>
          </ul>
        </article>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<{
    user?: User;
    cloudKey?: string;
    uploadPreset?: string;
  }>
> {
  const token = context.req.cookies.sessionToken;
  const cloudKey = process.env.CLOUDKEY;
  const uploadPreset = process.env.UPLOAD_PRESET;

  if (token) {
    // 2. check if token is valid
    // TO DO CHECK ROLE Of USER
    const session = await getValidSessionByToken(token);
    const user = await getUserById(session.userId);
    const readContract = await readContractDetails(user.id);

    readContract.startingDate = new Date(
      readContract.startingDate,
    ).toLocaleDateString('en-US');

    console.log('readContract', readContract);
    if (session) {
      // User id is not correct type
      if (!session.userId || Array.isArray(session.userId)) {
        return { props: {} };
      }

      // read user from database
      if (!user) {
        context.res.statusCode = 404;
        return {
          // notFound: true, // also works, but generates a generic error page
          props: {},
        };
      }

      return {
        props: {
          user: user,
          readContract: readContract,
        },
      };
    }
  }
  return {
    props: {},
  };
}
