import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import { useState } from 'react';
import {
  sectionOneLayout,
  userProfileSectionTwoLayout,
} from '../../../components/elements';
import Layout from '../../../components/Layout';
import Navigation from '../../../components/Navigation';
import {
  getUserById,
  getValidSessionByToken,
  User,
} from '../../../util/database';

type Props = {
  user?: User | null;
  userObject: User;
  userFirstName: string;
};

const divContainerforImage = css`
  position: relative;
  padding: 1rem;

  img {
    display: block;
    border-radius: 50%;
    width: 400px;
    height: auto;
    margin: 1rem;
  }
`;

export default function UserProfile(props: Props) {
  const [cloudinaryUpload, setCloudinaryUpload] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', cloudinaryUpload);
    formData.append('upload_preset', 'wc3os1wn');

    const cloudinaryResponse = await fetch(
      'https://api.cloudinary.com/v1_1/dirx112go/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    );

    const formDataResponse = await cloudinaryResponse.json();
    // setCloudinaryUpload(formDataResponse);
    console.log('Cloudinary:Response:', formDataResponse.url);

    if ('error' in formDataResponse) {
      console.log('Fehler up dote');
    }

    setImageUrl(formDataResponse.url);
  };

  if (!props.user) {
    return (
      <Layout userObject={props.userObject} userFirstName={props.userFirstName}>
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
    <Layout userObject={props.userObject} userFirstName={props.userFirstName}>
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
      <section css={userProfileSectionTwoLayout}>
        {/* <section css={sectionTwoLayout}> */}
        <div>
          <h1>Your Profile </h1>
          {/* <p> {`${props.user.username},  userId is: ${props.user.id} `}</p> */}
          <div>
            <article>
              {' '}
              <div css={divContainerforImage}>
                <img src={imageUrl} alt="plant" />
              </div>
              <p>Username: {props.user.username}</p>
              <p>User Id: {props.user.id}</p>
              <div>
                {' '}
                <label htmlFor="uploadImage">Upload Picture</label>
                <input
                  id="uploadImage"
                  name="uploadImage"
                  type="file"
                  onChange={(event) => {
                    setCloudinaryUpload(event.target.files[0]);
                  }}
                />
                <button onClick={uploadImage}>Upload Image</button>
              </div>
            </article>
            {/*         <article>
              <div>
                <h2>Text 3</h2>
                <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
              </div>
              <div>
                <h2>Text 3</h2>
                <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
              </div>
            </article> */}
            <article>
              <ul>
                <div>
                  <li>username:</li>
                  <li>X</li>
                </div>
                <div>
                  <li>Full Name:</li>
                  <li>X</li>
                </div>
                <div>
                  <li>Position:</li>
                  <li>X</li>
                </div>
                <div>
                  <li>Starting Date:</li>
                  <li>X</li>
                </div>
              </ul>
            </article>
          </div>
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
