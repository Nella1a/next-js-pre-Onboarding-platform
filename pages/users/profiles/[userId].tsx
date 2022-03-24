import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  sectionOneLayout,
  userProfileSectionTwoLayout,
} from '../../../components/elements';
import Layout from '../../../components/Layout';
import Navigation from '../../../components/Navigation';
import {
  getUserById,
  getValidSessionByToken,
  readUserProfileImage,
  User,
} from '../../../util/database';

type CloudUrl = {
  imageUrl: string;
};

type Props = {
  user?: User | null;
  userObject: User;
  userFirstName: string;
  img: CloudUrl;
  cloudKey: string;
  uploadPreset: string;
  headerImage: string;
};

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

export default function UserProfile(props: Props) {
  const [cloudinaryUpload, setCloudinaryUpload] = useState('');
  const [imageUrl, setImageUrl] = useState(props.img.imageUrl);
  const [userId, setUserId] = useState<number>(0);
  const [errors, setErrors] = useState('');

  console.log('Props.ImageUrl:', props);
  console.log('ImageUrl typeof:', props.img.imageUrl);
  const uploadImage = async () => {
    console.log('userIdFE:', userId);
    const formData = new FormData();
    formData.append('file', cloudinaryUpload);
    formData.append('upload_preset', props.uploadPreset);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${props.cloudKey}/image/upload`,
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
    // const imageUrlCloud = formDataResponse.url;

    setImageUrl(formDataResponse.url);
    console.log('ImageUrl StateVariable:', imageUrl);

    // Add image url to DB
    const addImageUrlToDB = await fetch(`/api/profile/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: formDataResponse.url,
        userId: userId,
      }),
    });
    const addImageUrlToDBResponseBody = await addImageUrlToDB.json();

    console.log('addImageUrlToDBResponseBody', addImageUrlToDBResponseBody);

    if ('errors' in addImageUrlToDBResponseBody) {
      setErrors(addImageUrlToDBResponseBody.errors);
      return;
    }
  };

  // read image url from DB
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`/api/profile/${userId}`);
  //     const responseBody = await response.json();
  //     setImageUrl(responseBody.url);
  //   };
  //   fetchData().catch(() => {});
  // }, []);

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

      <section css={userProfileSectionTwoLayout}>
        {/* <section css={sectionTwoLayout}> */}

        {/* <p> {`${props.user.username},  userId is: ${props.user.id} `}</p> */}
        <div>
          <article>
            {' '}
            <div>
              <Image src={imageUrl} width={300} height={300} alt="text" />
            </div>
            <p>Username: {props.user.username}</p>
            <p>User Id: {props.user.id}</p>{' '}
            <label htmlFor="uploadImage"> </label>
            <input
              id="uploadImage"
              name="uploadImage"
              type="file"
              onChange={(event) => {
                setUserId(props.user.id);
                setCloudinaryUpload(event.target.files[0]);
              }}
            />
            <button onClick={uploadImage}>Upload Image</button>
          </article>
          <article>
            <h2>User Profile</h2>
            <ul>
              <div>
                <li>Username:</li>
                <li>X</li>
              </div>
              <div>
                <li>Full Name:</li>
                <li>
                  {props.userFirstName} {props.user.lastName}
                </li>
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
    img?: string;
    uploadPreset?: string;
  }>
> {
  const token = context.req.cookies.sessionToken;

  // const userId = context.query.userId;
  // console.log('reslovedURL:', abec);

  const cloudKey = process.env.CLOUDKEY;
  const uploadPreset = process.env.UPLOAD_PRESET;

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

      // const uploadPreset = process.env.UPLOAD_PRESET;
      // if (typeof uploadPreset === 'undefined') {
      //   return {
      //     props: {
      //       errors: 'upload-preset is undefined',
      //     },
      //   };
      // }

      const imageUrlInDB = await readUserProfileImage(session.userId);
      if (!imageUrlInDB) {
        const imgPlaceholder = '/imgTest.png';
        return {
          props: {
            user: user,
            cloudKey: cloudKey,
            img: imgPlaceholder,
            uploadPreset: uploadPreset,
          },
        };
      }
      console.log('imageUrlInDB:', imageUrlInDB);
      return {
        props: {
          user: user,
          cloudKey: cloudKey,
          img: imageUrlInDB,
          uploadPreset: uploadPreset,
        },
      };
    }
  }
  return {
    props: {},
  };
}
