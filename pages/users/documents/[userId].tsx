import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import {
  formStyleContainer,
  sectionOneLayout,
  sectionTwoLayoutForm,
} from '../../../components/elements';
// import FormCard from '../../components/FormCard';
import FormCompleted from '../../../components/FormCompleted';
import FormStepOneValues from '../../../components/FormsPages/formStepOneValues';
import FormStepThreeValues from '../../../components/FormsPages/formStepThreeValues';
import FormStepTwoValues from '../../../components/FormsPages/formStepTwoValues';
import Layout from '../../../components/Layout';
import Navigation from '../../../components/Navigation';
import {
  AllPersonalInfo,
  getUserByValidSessionToken,
  readUserAllPersonalInfo,
  User,
} from '../../../util/database';

type Props = {
  user: User;
  userObject: User;
  userFirstName: string;
  cloudKey?: string;
  uploadPreset?: string;
  headerImage: string;
  userFormInput?: AllPersonalInfo;
};

export default function Documents(props: Props) {
  const [formStep, setFormStep] = useState(0);
  const [formValues, setFormValues] = useState([{}]);
  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
  console.log('formStep Documents:', formStep);

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

      <section css={sectionTwoLayoutForm}>
        <div>
          <h1>
            {' '}
            Personal Details: uName: {props.user.username} - uId:{' '}
            {props.user.id} - uRole: {props.user.roleId}
          </h1>
          <div css={formStyleContainer}>
            {/* <FormCard
            currentStep={formStep}
            prevFormStep={prevFormStep}
            css={displayFlexDiv}
          >*/}
            {formStep === 0 && (
              <FormStepOneValues
                userObject={props.userObject}
                userFirstName={props.userFirstName}
                headerImage={props.headerImage}
                userId={props.user.id}
                formStep={formStep}
                currentStep={formStep}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
                user={props.user}
                formValues={formValues}
                setFormValues={setFormValues}
              />
            )}
            {formStep === 1 && (
              <FormStepTwoValues
                userObject={props.userObject}
                userFirstName={props.userFirstName}
                headerImage={props.headerImage}
                userId={props.user.id}
                formStep={formStep}
                currentStep={formStep}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
                user={props.user}
                formValues={formValues}
                setFormValues={setFormValues}
              />
            )}
            {formStep === 2 && (
              <FormStepThreeValues
                userObject={props.userObject}
                userFirstName={props.userFirstName}
                headerImage={props.headerImage}
                userId={props.user.id}
                formStep={formStep}
                currentStep={formStep}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
                user={props.user}
                formValues={formValues}
                setFormValues={setFormValues}
                cloudKey={props.cloudKey}
                uploadPreset={props.uploadPreset}
              />
            )}

            {formStep === 3 && (
              <FormCompleted
                // userObject={props.userObject}
                userFirstName={props.userFirstName}
                // headerImage={props.headerImage}
                userId={props.user.id}
                currentStep={formStep}
                formStep={formStep}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
                user={props.user}
                formValues={formValues}
                setFormValues={setFormValues}
                userFormInput={props.userFormInput}
              />
            )}
            {/* </FormCard> */}
          </div>
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
    uploadPreset?: string;
    userFormInput?: AllPersonalInfo;
  }>
> {
  // 1. Get current user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  // 2. Retrieve user by valid sessionToken
  const user = await getUserByValidSessionToken(token);
  // TO DO CHECK ROLE Of USER

  const cloudKey = process.env.CLOUDKEY;
  const uploadPreset = process.env.UPLOAD_PRESET;

  // 3. If user exists, return user and render page
  if (user) {
    return {
      props: {
        user: user,
        cloudKey: cloudKey,
        uploadPreset: uploadPreset,
      },
    };
  }

  // 4. If user is undefined ( = no token) redirect to login
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
