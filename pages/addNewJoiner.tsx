import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import AddNewJoiner from '../components/AddNewJoiner';
import AddContractDetails from '../components/contractDetails';
import {
  addNewJoinerSectionTwoLayoutColumn,
  contractAddNewJoiners,
  sectionOneLayout,
} from '../components/elements';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
// const divContainerforImage = css`
//   position: relative;
//   padding: 1rem;
//   img {
//     display: block;
//     border-radius: 50%;
//     width: 400px;
//     height: auto;
//     margin: 1rem;
//   }
// `;
import { getUserById, getValidSessionByToken, User } from '../util/database';

type Props = {
  user?: User | null;
  userObject: User;
  userFirstName: string;
  headerImage: string;
  cloudKey: string;
  uploadPreset: string;
};

export default function UserProfile(props: Props) {
  const [newJoinerUserId, setNewJoinerUserId] = useState<number>(0);
  const [addNewJoiner, setAddNewJoiner] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);

  console.log('Props_Profile_oi:', props);

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
        <title>
          User #{props.user.id} welcome: {props.user.username}
        </title>
        <meta
          name="description"
          content={`User ${props.user.id} has a username of ${props.user.username}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <h1>Welcome X</h1>
      <p>It's great to have you with us.</p> */}
      <section css={sectionOneLayout}>
        <Navigation userId={props.user.id} userRole={props.user.roleId} />
      </section>

      <section
        css={[addNewJoinerSectionTwoLayoutColumn, contractAddNewJoiners]}
      >
        {/* <section css={sectionTwoLayout}> */}{' '}
        <div>
          <article>
            <AddNewJoiner
              setNewJoinerUserId={setNewJoinerUserId}
              newJoinerUserId={newJoinerUserId}
            />
          </article>
          <article>
            <AddContractDetails
              apiResponse={apiResponse}
              setApiResponse={setApiResponse}
              setAddNewJoiner={setAddNewJoiner}
              newJoinerUserId={newJoinerUserId}
              cloudKey={props.cloudKey}
              uploadPreset={props.uploadPreset}
            />
          </article>
        </div>
        <div>
          {addNewJoiner && (
            <button
              onClick={() => {
                setNewJoinerUserId(0);
                setAddNewJoiner(false);
                setApiResponse(false);
              }}
            >
              Add New Joiner
            </button>
          )}
        </div>
      </section>
    </Layout>
  );
}

type ImageType = {
  imgUrl: string | null;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<{
    user?: User;
    cloudKey?: string;
    profileImgUrl?: ImageType;
    uploadPreset?: string;
  }>
> {
  const token = context.req.cookies.sessionToken;
  const cloudKey = process.env.CLOUDKEY;
  const uploadPreset = process.env.UPLOAD_PRESET;
  console.log('CloudKey', cloudKey);
  console.log('uploadPreset', uploadPreset);

  if (token) {
    // 2. check if token is valid
    // TO DO CHECK ROLE Of USER

    const session = await getValidSessionByToken(token);

    if (session) {
      const user = await getUserById(session.userId);

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

      // Error Handling: if user exists but does not have the right role redirect to home
      // TO DO: should return to the previous page
      if (user.roleId !== 1) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      return {
        props: {
          user: user,
          cloudKey: cloudKey,
          uploadPreset: uploadPreset,
        },
      };
    }
  }
  return {
    props: {},
  };
}
