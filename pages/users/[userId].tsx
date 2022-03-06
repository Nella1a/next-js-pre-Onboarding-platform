import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  flexCenterWithWidthAndHeight,
  sectionOneLayout,
  sectionTwoLayout,
} from '../../components/elements';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Navigation from '../../components/Navigation';
import { getUserById, User } from '../../util/database';
import imgTest from '../public/imgTest.png';

type Props = {
  user?: User | null;
};

export default function UserDetail(props: Props) {
  if (props.user === null) {
    return (
      <Layout>
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
    <Layout>
      <Head>
        <title>
          User #{props.user?.id} welcome: {props.user?.username}
        </title>
        <meta
          name="description"
          content={`User #${props.user?.id} has a username of ${props.user?.username}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <h1>Welcome X</h1>
      <p>It's great to have you with us.</p> */}
      <section css={sectionOneLayout}>
        <Navigation />
      </section>
      <section css={sectionTwoLayout}>
        <h1>
          Hello:{' '}
          {`${props.user?.username},  your userid is: ${props.user?.id} `}
        </h1>
        <div>
          <article>
            <h2>Text 1</h2>
            <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
            <button>Documents</button>
          </article>
          <article>
            <div>
              <h2>Text 1</h2>
              <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
              <Link href="/documents">
                <button>Documents</button>
              </Link>
            </div>
            <div>
              <h2>Text 2</h2>
              <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
              <button>Updates</button>
            </div>
            <div>
              <h2>Text 3</h2>
              <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
              <button>Profile</button>
            </div>
            <div>
              <h2>Text 3</h2>
              <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
              <button>Profile</button>
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
}
