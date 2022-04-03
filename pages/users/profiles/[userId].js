// import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import {
  sectionOneLayout,
  userProfileSectionTwoLayout,
} from '../../../components/elements';
import Layout from '../../../components/Layout';
import Navigation from '../../../components/Navigation';
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
import {
  getUserById,
  getValidSessionByToken,
  readContractDetails,
  readUserProfileImage,
} from '../../../util/database';

// type CloudUrl = {
//   imageUrl: string,
// };

// type Props = {
//   user?: User | null,
//   userObject: User,
//   userFirstName: string,
//   profileImgUrl: CloudUrl,
//   cloudKey: string,
//   uploadPreset: string,
//   headerImage: string,
//   readContract: AddContractDetailsRequestBody,
// };

export default function UserProfile(props) {
  const [cloudinaryUpload, setCloudinaryUpload] = useState('');
  const [imageUrl, setImageUrl] = useState(`/profilePlaceholder.svg`);
  // const [userId, setUserId] = useState < number > 0;
  const [userId, setUserId] = useState(0);
  const [errors, setErrors] = useState('');
  console.log('Props_Profile_oi:', props);

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

    setImageUrl(formDataResponse.url);
    props.setUserHeaderImage(formDataResponse.url);
    console.log('ImageUrl StateVariable:', imageUrl);

    // fetch img-url to api route
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

    // check for errors in api response
    if ('errors' in addImageUrlToDBResponseBody) {
      setErrors(addImageUrlToDBResponseBody.errors);
      return;
    }
    console.log('API_Response_IMG:,', addImageUrlToDBResponseBody);
  };

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

      <section css={sectionOneLayout}>
        <Navigation userId={props.user.id} userRole={props.user.roleId} />
      </section>

      <section css={userProfileSectionTwoLayout}>
        {errors && <p>Message: {errors}</p>}
        {/* <section css={sectionTwoLayout}> */}

        {/* <p> {`${props.user.username},  userId is: ${props.user.id} `}</p> */}
        <div>
          <article>
            {' '}
            <div>
              <Image
                src={
                  props.profileImgUrl.imageUrl
                    ? props.profileImgUrl.imageUrl
                    : imageUrl
                }
                width={300}
                height={300}
                alt="text"
              />
            </div>
            <p>
              {props.user.firstName} {props.user.lastName}
            </p>
            <p>{props.readContract.jobTitle}</p>
            <div>
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
              <button onClick={uploadImage}>add image</button>
            </div>
          </article>
          <article>
            <h2>User Profile</h2>
            <ul>
              <div>
                <li>Username:</li>

                <li>{props.user.username}</li>
              </div>
              <div>
                <li>Full Name:</li>
                <li>
                  {props.user.firstName} {props.user.lastName}
                </li>
              </div>
              <div>
                <li>Position:</li>
                <li> {props.readContract.jobTitle}</li>
              </div>
              <div>
                <li>Start Date:</li>
                <li>{props.readContract.startingDate}</li>
              </div>
            </ul>
          </article>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.sessionToken;
  const cloudKey = process.env.CLOUDKEY;
  const uploadPreset = process.env.UPLOAD_PRESET;

  if (token) {
    // 2. check if token is valid
    // TO DO CHECK ROLE Of USER
    const session = await getValidSessionByToken(token);

    if (session) {
      // read img url from db
      const profileImgUrl = await readUserProfileImage(session.userId);
      // User id is not correct type
      if (!session.userId || Array.isArray(session.userId)) {
        return { props: {} };
      }
      const user = await getUserById(session.userId);
      if (user) {
        const readContract = await readContractDetails(user.id);

        if (readContract) {
          readContract.startingDate = new Date(
            readContract.startingDate,
          ).toLocaleDateString('de-DE');

          // readContract.startingDate =
          //   readContract.startingDate.toLocaleDateString('en-US');
        }
        console.log('imageUrlInDB:', profileImgUrl);
        return {
          props: {
            user: user,
            // readContract: readContract || '',
            readContract: readContract || '',
            // readContract: JSON.parse(JSON.stringify(readContract)),
            cloudKey: cloudKey,
            profileImgUrl: profileImgUrl || '',
            uploadPreset: uploadPreset,
          },
        };
      }

      context.res.statusCode = 404;
      return {
        // notFound: true, // also works, but generates a generic error page
        props: {},
        // };
      };
    }
  }
  return {
    props: {},
  };
}
