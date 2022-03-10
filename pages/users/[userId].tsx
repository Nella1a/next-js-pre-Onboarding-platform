import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import {
  sectionOneLayout,
  userProfileSectionTwoLayout,
} from '../../components/elements';
import Layout from '../../components/Layout';
import Navigation from '../../components/Navigation';
import { getUserById, getValidSessionByToken, User } from '../../util/database';

type Props = {
  user?: User | null;
  userObject: User;
};

export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <Layout userObject={props.userObject}>
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
    <Layout userObject={props.userObject}>
      <Head>
        <title>
          User #{props.user.id} welcome: {props.user.username}
        </title>
        <meta
          name="description"
          content={`User #${props.user.id} has a username of ${props.user.username}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <h1>Welcome X</h1>
      <p>It's great to have you with us.</p> */}
      <section css={sectionOneLayout}>
        <Navigation userId={props.user.id} userRole={props.user.roleId} />
      </section>
      <section css={userProfileSectionTwoLayout}>
        <h1>Your Profile </h1>
        <p> {`${props.user.username},  userId is: ${props.user.id} `}</p>
        <div>
          <article>
            <div>pic</div>
            <p>Username: {props.user.username}</p>
            <p>Starting Date: </p>
            <p>Position: </p>
            <p>Team: </p>

            <button>Upload Picture</button>
            <button>save</button>
          </article>
          <article>
            <div>
              <h2>Text 3</h2>
              <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
            </div>
            <div>
              <h2>Text 3</h2>
              <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ user?: User }>> {
  const token = context.req.cookies.sessionToken;

  const abec = context.resolvedUrl;
  console.log('reslovedURL:', abec);

  if (token) {
    // 2. check if token is valid
    // TO DO CHECK ROLE Of USER
    const session = await getValidSessionByToken(token);
    const user = await getUserById(session.userId);
    if (session) {
      // User id is not correct type
      if (!session.userId || Array.isArray(session.userId)) {
        return { props: {} };
      }

      // read user from database
      // const user = await getUserById(session.userId);

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
        },
      };
    }
  }
  return {
    props: {},
  };
}
/*
export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ user?: User }>> {
  // get userId from current login
  const userId = context.query.userId;

  // User id is not correct type
  if (!userId || Array.isArray(userId)) {
    return { props: {} };
  }

  // read user from database
  const user = await getUserById(parseInt(userId));

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
    },
  };
} */
