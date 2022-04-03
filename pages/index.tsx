import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  indexSectionTwoLayout,
  sectionOneLayout,
} from '../components/elements';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import homeContract from '../public/img/home/homeContract.png';
import homeDashboard from '../public/img/home/homeDashboard.png';
import homeDocuments from '../public/img/home/homeDocuments.png';
import homeNews from '../public/img/home/homeNews.png';
import homeProfile from '../public/img/home/homeProfile.png';
import homeTeamTwo from '../public/img/home/homeTeamTwo.jpeg';
import iconAddNew from '../public/img/menu/iconAddNew.svg';
import iconContract from '../public/img/menu/iconContract.svg';
import iconDashboard from '../public/img/menu/iconDashboard.svg';
import iconProfile from '../public/img/menu/iconProfile.png';
// import iconUpdates from '../public/img/menu/iconUpdates.svg';
import { getUserByValidSessionToken, User } from '../util/database';

type Props = {
  user: User;
  userObject: User;
  userFirstName: string;
  headerImage: string;
};

export default function Home(props: Props) {
  if (props.user.roleId === 2) {
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

        <section css={sectionOneLayout}>
          <Navigation userId={props.user.id} userRole={props.user.roleId} />
        </section>

        <section css={indexSectionTwoLayout}>
          <div>
            <div>
              <Image
                src={homeTeamTwo}
                alt="image of a group of co-workers"
                width="460"
                height="320"
              />
            </div>
            <article>
              <div>
                <Image
                  src={homeProfile}
                  alt="Illustration of a laptop displaying a the cv of a person"
                  width="460"
                  height="146"
                />
              </div>
              <div>
                <h2>This is your profile</h2>
                <p>
                  Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                  Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                  Lorem Ipsum Lorem Ipsum
                </p>
                <Link href={`/users/profiles/${props.user.id}}`} passHref>
                  <button>
                    <span>
                      {' '}
                      <Image
                        src={iconProfile}
                        alt="icon of a person"
                        width="20"
                        height="20"
                      />
                    </span>
                    <span>Profile</span>
                  </button>
                </Link>
              </div>
            </article>
          </div>
          {/* / *** ** * / */}
          <div>
            <article>
              <div>
                <Image
                  src={homeContract}
                  alt="Illustration of a contract"
                  width="460"
                  height="146"
                />
              </div>
              <div>
                <h2>Here you'll find your contract</h2>
                <p>
                  Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                  Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                  Lorem Ipsum Lorem Ipsum
                </p>
                <Link href={`/users/contract/${props.user.id}}`} passHref>
                  <button>
                    <span>
                      {' '}
                      <Image
                        src={iconContract}
                        alt="icon of a contract"
                        width="20"
                        height="20"
                      />
                    </span>
                    <span>Contract</span>
                  </button>
                </Link>
              </div>
            </article>

            <article>
              <div>
                <Image
                  src={homeDocuments}
                  alt="Illustration of a file full of documents"
                  width="460"
                  height="146"
                />
              </div>
              <div>
                <h2>Fill out your personal details</h2>
                <p>
                  Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                  Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                  Lorem Ipsum Lorem Ipsum
                </p>
                <Link href={`/users/documents/${props.user.id}}`} passHref>
                  <button>
                    <span>
                      {' '}
                      <Image
                        src={iconProfile}
                        alt="icon of a person"
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
        </section>
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

      <section css={indexSectionTwoLayout}>
        {/* <div>
          <Image
            src={homeTeamTwo}
            alt="image of a group of co-workers"
            width="710,7"
            height="459,6"
          />
        </div> */}

        <div>
          <article>
            <div>
              <Image
                src={homeProfile}
                alt="Illustration of a laptop displaying a the cv of a person"
                width="460"
                height="146"
              />
            </div>
            <div>
              <h2>This is your profile</h2>
              <p>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum
              </p>
              <Link href={`/users/profiles/${props.user.id}}`} passHref>
                <button>
                  <span>
                    {' '}
                    <Image
                      src={iconProfile}
                      alt="icon of a person"
                      width="20"
                      height="20"
                    />
                  </span>
                  <span>Profile</span>
                </button>
              </Link>
            </div>
          </article>
          <article>
            <div>
              <Image
                src={homeDocuments}
                alt="Illustration of a file full of documents"
                width="460"
                height="146"
              />
            </div>
            <div>
              <h2>Fill out your personal details</h2>
              <p>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum
              </p>
              <Link href={`/users/documents/${props.user.id}}`} passHref>
                <button>
                  <span>
                    {' '}
                    <Image
                      src={iconProfile}
                      alt="icon of a person"
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
              <Image
                src={homeDashboard}
                alt="Illustration of a laptop"
                width="460"
                height="146"
              />
            </div>
            <div>
              <h2>All new joiners</h2>
              <p>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum
              </p>
              <Link href="/dashboard" passHref>
                <button>
                  <span>
                    {' '}
                    <Image
                      src={iconDashboard}
                      alt="icon of a browser window "
                      width="20"
                      height="20"
                    />
                  </span>
                  <span>Dashboard</span>
                </button>
              </Link>
            </div>
          </article>

          <article>
            <div>
              <Image
                src={homeNews}
                alt="illustration of desk with a computer, cup of tee and pad of paper"
                width="460"
                height="146"
              />
            </div>
            <div>
              <h2>Add new joiner</h2>
              <p>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum
              </p>
              <Link href="/addNewjoiner" passHref>
                <button>
                  <span>
                    {' '}
                    <Image
                      src={iconAddNew}
                      alt="icon of an newspaper"
                      width="20"
                      height="20"
                    />
                  </span>
                  <span>Add new joiner</span>
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

  // success: valid token
  return {
    props: {
      user: user,
    },
  };
}
