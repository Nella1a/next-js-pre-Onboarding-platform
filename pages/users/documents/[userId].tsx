import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
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
  AddFormStep,
  AllPersonalInfo,
  FormValuesOne,
  getUserByValidSessionToken,
  ReadAllPersonalInfo,
  readFormStepDb,
  readUserAddress,
  readUserAllPersonalInfo,
  readUserPersonalInfo,
  User,
} from '../../../util/database';

type Props = {
  user: User;
  userObject: User;
  userFirstName: string;
  cloudKey: string;
  uploadPreset: string;
  headerImage: string;
  userFormInput?: AllPersonalInfo;
  readAllUserInfo?: ReadAllPersonalInfo;
  userFormOne?: FormValuesOne;
};

export default function Documents(props: Props) {
  const [formStep, setFormStep] = useState<number>(0);

  console.log('props Documents', props);
  console.log('props.ReadAllUserInfo:', props.readAllUserInfo);
  console.log('Formstep:', formStep);

  if (!props.currentStep) {
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
                  // userObject={props.userObject}
                  // userFirstName={props.userFirstName}
                  // headerImage={props.headerImage}
                  // userId={props.user.id}
                  formStep={formStep}
                  // currentStep={formStep}
                  setFormStep={setFormStep}
                  // prevFormStep={prevFormStep}
                  user={props.user}
                  // formValues={formValues}
                  // setFormValues={setFormValues}
                />
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  useEffect(() => {
    setFormStep(props.currentStep.currentStep);
  }, [props.currentStep.currentStep]);

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
                // userObject={props.userObject}
                // userFirstName={props.userFirstName}
                // headerImage={props.headerImage}
                // userId={props.user.id}
                formStep={formStep}
                // currentStep={formStep}
                setFormStep={setFormStep}
                // prevFormStep={prevFormStep}
                user={props.user}
                // formValues={formValues}
                // setFormValues={setFormValues}
              />
            )}

            {formStep === 1 && (
              <FormStepTwoValues
                // userObject={props.userObject}
                // userFirstName={props.userFirstName}
                // headerImage={props.headerImage}

                formStep={formStep}
                // currentStep={formStep}
                // nextFormStep={nextFormStep}
                setFormStep={setFormStep}
                // prevFormStep={prevFormStep}
                user={props.user}
                // formValues={formValues}
                // setFormValues={setFormValues}
              />
            )}
            {formStep === 2 && (
              <FormStepThreeValues
                // userObject={props.userObject}
                // userFirstName={props.userFirstName}
                // headerImage={props.headerImage}

                formStep={formStep}
                // currentStep={formStep}
                setFormStep={setFormStep}
                // nextFormStep={nextFormStep}
                // prevFormStep={prevFormStep}
                user={props.user}
                // formValues={formValues}
                // setFormValues={setFormValues}
                cloudKey={props.cloudKey}
                uploadPreset={props.uploadPreset}
              />
            )}

            {formStep === 3 && (
              <FormCompleted
                readAllUserInfo={props.readAllUserInfo}
                userObject={props.userObject}
                userFirstName={props.userFirstName}
                headerImage={props.headerImage}
                userId={props.user.id}
                // currentStep={formStep}
                formStep={formStep}
                setFormStep={setFormStep}
                // nextFormStep={nextFormStep}
                // prevFormStep={prevFormStep}
                user={props.user}
                // formValues={formValues}
                // setFormValues={setFormValues}
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
    readAllUserInfo?: ReadAllPersonalInfo;
    // readFormOneValues?: FormValuesOne;
    currentStep: AddFormStep;
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
    // const readFormOneValues = await readUserPersonalInfo(user.id);
    const readCurrentFormStep = await readFormStepDb(user.id);

    console.log('readcurrent_step gSSP:', readCurrentFormStep);
    const userAddress = await readUserAddress(user.id);
    const readAllUserInfo = await readUserAllPersonalInfo(user.id);

    // readAllUserInfo.dateOfBirth = new Date(
    //   readAllUserInfo.dateOfBirth,
    // ).toLocaleDateString('en-US');

    console.log('userAddress:', userAddress);
    // console.log('FormOneValues', readFormOneValues);
    console.log('JoinreadPersonalDetails', readAllUserInfo);

    if (readAllUserInfo) {
      readAllUserInfo.dateOfBirth = new Date(
        readAllUserInfo.dateOfBirth,
      ).toLocaleDateString('en-US');
    }
    //   readFormOneValues.dateOfBirth = JSON.parse(
    //     JSON.stringify(readFormOneValues.dateOfBirth),
    //   );
    // }
    // console.log('FormOneValues', readFormOneValues);

    // if (!readCurrentFormStep.currentFormStep) {
    //   readCurrentFormStep.currentFormStep = 0;
    // }

    return {
      props: {
        user: user,
        cloudKey: cloudKey,
        uploadPreset: uploadPreset,
        readAllUserInfo: readAllUserInfo || '',
        // readFormOneValues: readFormOneValues || null,
        currentStep: readCurrentFormStep || null,
        // currentStep: readCurrentFormStep,
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
