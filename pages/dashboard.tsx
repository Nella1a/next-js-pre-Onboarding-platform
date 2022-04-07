import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { dashboardStyle, sectionOneLayout } from '../components/elements';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import {
  getUserByValidSessionToken,
  readAllNewJoiners,
  ReadNewJoiners,
  User,
} from '../util/database';

const styleNewHire = css`
  display: flex;
  gap: 0.8rem;
  margin: 1rem 0rem;
`;

type Props = {
  userObject: User;
  userFirstName: string;
  headerImage: string;
  user?: User;
  newJoiners: ReadNewJoiners[];
};

export default function Dashboard(props: Props) {
  const [listOfAllNewHires, setListOfAllNewHires] = useState(props.newJoiners);

  const eventHandlerRemoveUser = (userId: number) => {
    const fetchData = async () => {
      const response = await fetch(`/api/dashboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
        }),
      });
      const allNewHires = await response.json();
      console.log('APIResponseNewHire:', allNewHires);
      if (allNewHires) {
        const copyOfNewHireslist = props.newJoiners.filter(
          (event) => !(event.id === userId),
        );
        console.log('FilterNewHiers:', copyOfNewHireslist);
        setListOfAllNewHires(copyOfNewHireslist);
      }
    };

    fetchData().catch(console.error);
  };

  console.log('ListofallnieHires:', listOfAllNewHires);
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
        <h1>You are not allowed to see this site</h1>
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
        <title>Welcome</title>
        <meta name="description" content="Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <h1>Welcome X</h1>
      <p>It's great to have you with us.</p> */}
      <section css={sectionOneLayout}>
        <Navigation userId={props.user.id} userRole={props.user.roleId} />
      </section>

      <section css={dashboardStyle}>
        <div>
          <article>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Start Date</div>
            <div>Job Title</div>
            <div> </div>
          </article>
          {listOfAllNewHires.length === 0 ? (
            <p> All positions are filled. You have currently no new joiners.</p>
          ) : (
            listOfAllNewHires.map((joiner) => {
              const newStartingDate = new Date(
                joiner.startingDate,
              ).toLocaleDateString('de-DE');

              return (
                <article key={`overview-${joiner.id}`} css={styleNewHire}>
                  <div>{joiner.firstName}</div>
                  <div>{joiner.lastName} </div>
                  <div>{newStartingDate}</div>
                  <div>{joiner.jobTitle}</div>
                  <div>
                    {' '}
                    <button onClick={() => eventHandlerRemoveUser(joiner.id)}>
                      X
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<{
    user?: User;
    newJoiners?: ReadNewJoiners[];
  }>
> {
  // 1. Get current user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;

  // 2. Retrieve user by valid sessionToken
  const user = await getUserByValidSessionToken(token);

  // if user exists but does not have the right role redirect to home
  if (user && user.roleId !== 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // if no token (= no user) redirect to login
  if (!user) {
    return {
      redirect: {
        destination: '/employer/login',
        permanent: false,
      },
    };
  }

  // if user and has the right role return user and render page
  if (user.roleId === 1) {
    const userRoleId = 2;
    // get all new joiners
    const readNewJoiners = await readAllNewJoiners(userRoleId);
    return {
      props: {
        user: user,
        newJoiners: JSON.parse(JSON.stringify(readNewJoiners)),
      },
    };
  }

  return {
    props: {
      user: user,
    },
  };
}
