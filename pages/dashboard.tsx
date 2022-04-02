import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
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
  gap: 0.5rem;
  margin: 1rem 1rem;
`;

type Props = {
  userObject: User;
  userFirstName: string;
  headerImage: string;
  user?: User;
  newJoiners: ReadNewJoiners[];
};

export default function Dashboard(props: Props) {
  // const [required, setRequired] = useState(true);

  console.log('props.newJoiner:', props.newJoiners);
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
          </article>
          {props.newJoiners.map((joiner) => {
            const newStartingDate = new Date(
              joiner.startingDate,
            ).toLocaleDateString();

            return (
              <article key={`overview-${joiner.id}`} css={styleNewHire}>
                <div>{joiner.firstName}</div>
                <div>{joiner.lastName} </div>
                <div>{newStartingDate}</div>
                <div>{joiner.jobTitle}</div>
              </article>
            );
          })}
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
  // TO DO CHECK ROLE Of USER

  // if user exists but does not have the right role redirect to home
  if (user && user.roleId !== 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // if user does not exist (= no token) redirect to login
  if (!user) {
    return {
      redirect: {
        destination: '/employer/login',
        permanent: false,
      },
    };
  }

  // if user exists and has the right role return user and render page
  if (user.roleId === 1) {
    const userRoleId = 2;
    // get all new joiners
    // const newJoiners = await getAllNewJoiners(userRoleId);
    const readNewJoiners = await readAllNewJoiners(userRoleId);
    // console.log('newJoiners gSSP', newJoiners);
    console.log('readNewJoiner - gSSP:', readNewJoiners);

    return {
      props: {
        user: user,
        newJoiners: JSON.parse(JSON.stringify(readNewJoiners)),

        //  Fix the error using JSON.parse() and JSON.stringify()
      },
    };
  }

  return {
    props: {
      user: user,
    },
  };
}
