import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  indexSectionTwoLayout,
  sectionOneLayout,
  sectionTwoLayout,
} from '../components/elements';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import homeProfile from '../public/img/home/homeProfile.png';
import homeTeam from '../public/img/home/homeTeam.png';
import iconProfile from '../public/img/menu/iconProfile.png';
import { getUserByValidSessionToken, User } from '../util/database';

type Props = {
  user: User;
  userObject: User;
  userFirstName: string;
};

export default function Home(props: Props) {
  return (
    <Layout userObject={props.userObject} userFirstName={props.userFirstName}>
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

      <section css={indexSectionTwoLayout}>
        {/* <h1>
          Hello {props.user.username} User_id: {props.user.id}{' '}
        </h1> */}
        <div>
          <div>
            <Image
              src={homeTeam}
              alt="image group of employers"
              width="460"
              height="320"
            />
          </div>
          <article>
            <div>
              <Image src={homeProfile} alt="" width="460" height="146" />
            </div>
            <div>
              <h2>This is your profile</h2>
              <p>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum
              </p>
              <Link href="/" passHref>
                <button>
                  <span>
                    {' '}
                    <Image
                      src={iconProfile}
                      alt="image group of employers"
                      width="20"
                      height="20"
                    />
                  </span>
                  <span>Documents</span>
                </button>
              </Link>
            </div>
          </article>
        </div>
        {/* / *** ** * / */}
        <div>
          <article>
            <div>
              <Image src={homeProfile} alt="" width="460" height="146" />
            </div>
            <div>
              <h2>This is your profile</h2>
              <p>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum
              </p>
              <Link href="/" passHref>
                <button>
                  <span>
                    {' '}
                    <Image
                      src={iconProfile}
                      alt="image group of employers"
                      width="20"
                      height="20"
                    />
                  </span>
                  <span>Documents</span>
                </button>
              </Link>
            </div>
          </article>
          <article>
            <div>
              <Image src={homeProfile} alt="" width="460" height="146" />
            </div>
            <div>
              <h2>This is your profile</h2>
              <p>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum
              </p>
              <Link href="/" passHref>
                <button>
                  <span>
                    {' '}
                    <Image
                      src={iconProfile}
                      alt="image group of employers"
                      width="20"
                      height="20"
                    />
                  </span>
                  <span>Documents</span>
                </button>
              </Link>
            </div>
          </article>
        </div>
        {/* / **** *** / */}
        <div>
          <article>
            <div>
              <Image src={homeProfile} alt="" width="460" height="146" />
            </div>
            <div>
              <h2>This is your profile</h2>
              <p>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum
              </p>
              <Link href="/" passHref>
                <button>
                  <span>
                    {' '}
                    <Image
                      src={iconProfile}
                      alt="image group of employers"
                      width="20"
                      height="20"
                    />
                  </span>
                  <span>Documents</span>
                </button>
              </Link>
            </div>
          </article>
          <article>
            <div>
              <Image src={homeProfile} alt="" width="460" height="146" />
            </div>
            <div>
              <h2>This is your profile</h2>
              <p>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum
              </p>
              <Link href="/" passHref>
                <button>
                  <span>
                    {' '}
                    <Image
                      src={iconProfile}
                      alt="image group of employers"
                      width="20"
                      height="20"
                    />
                  </span>
                  <span>Documents</span>
                </button>
              </Link>
            </div>
          </article>
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
  // Error Handling: no session token
  if (!user) {
    return {
      redirect: {
        destination: '/employer/login',
        permanent: false,
      },
    };
  }

  // Good Case: valid token
  return {
    props: {
      user: user,
    },
  };
}

/* import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello</h1>
      </main>

      <footer>
        <p>This is a footer</p>
      </footer>
    </div>
  );
}
 */
