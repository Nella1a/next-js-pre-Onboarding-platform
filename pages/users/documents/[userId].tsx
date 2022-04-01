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
  getUserByValidSessionToken,
  ReadAllPersonalInfo,
  readFormStepDb,
  readUserAllPersonalInfo,
  User,
} from '../../../util/database';

type Props = {
  user: User;
  userObject: User;
  userFirstName: string;
  cloudKey: string;
  uploadPreset: string;
  headerImage: string;
  // userFormInput?: AllPersonalInfo;
  readAllUserInfo: ReadAllPersonalInfo;

  // readFullUserInfo: ReadAllPersonalInfo;
  // userFormOne?: FormValuesOne;
  currentStep: number | undefined;
};

export default function Documents(props: Props) {
  const [formStep, setFormStep] = useState(props.currentStep);

  console.log('props Documents', props);
  console.log('props.ReadAllUserInfo:', props.readAllUserInfo);
  console.log('Formstep:', formStep);

  // useEffect(() => {
  //   setFormStep(props.currentStep.currentStep);
  // }, [props.currentStep.currentStep]);

  if (!formStep) {
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
            <div css={formStyleContainer}>
              {/* <FormCard
              currentStep={formStep}
              prevFormStep={prevFormStep}
              css={displayFlexDiv}
            >*/}

              {/* {formStep === 0 && ( */}
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
              {/* )} */}
            </div>
          </div>
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

      <section css={sectionTwoLayoutForm}>
        <div>
          <div css={formStyleContainer}>
            {/* <FormCard
            currentStep={formStep}
            prevFormStep={prevFormStep}
            css={displayFlexDiv}
          >*/}
            {/*
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
            )} */}

            {formStep === 1 && (
              <FormStepTwoValues
                formStep={formStep}
                setFormStep={setFormStep}
                user={props.user}
              />
            )}
            {formStep === 2 && (
              <FormStepThreeValues
                formStep={formStep}
                setFormStep={setFormStep}
                user={props.user}
                cloudKey={props.cloudKey}
                uploadPreset={props.uploadPreset}
              />
            )}

            {formStep === 3 && (
              <FormCompleted
                readFullUserInfo={props.readAllUserInfo}
                userId={props.user.id}
                formStep={formStep}
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
    readAllUserInfo: ReadAllPersonalInfo;
    currentStep: number | undefined;
  }>
> {
  // 1. Get current user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  // 2. Retrieve user by valid sessionToken
  const user = await getUserByValidSessionToken(token);

  // 3. If user exists, return user and render page
  if (user) {
    // const readFormOneValues = await readUserPersonalInfo(user.id);

    // get current formstep
    const readCurrentFormStep = await readFormStepDb(user.id);

    // const userAddress = await readUserAddress(user.id);
    const readAllUserInfo = await readUserAllPersonalInfo(user.id);

    console.log('current_FormStep gSSP:', readCurrentFormStep);
    // console.log('userAddress:', userAddress);
    console.log('JoinreadPersonalDetails', readAllUserInfo);

    // const emptyFormInput = {
    //   dateOfBirth: '',
    //   socialSecNb: 0,
    //   nationality: '',
    //   email: '',
    //   userPhone: 0,
    //   streetAndNbr: '',
    //   city: '',
    //   postalCode: 0,
    //   country: '',
    //   maritalStatusId: 0,
    //   relationshipId: 0,
    //   fullname: '',
    //   sosPhone: 0,
    // };

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (readAllUserInfo) {
      readAllUserInfo.dateOfBirth = new Date(
        readAllUserInfo.dateOfBirth,
      ).toLocaleDateString('en-US');
    }

    return {
      props: {
        user: user,
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        readAllUserInfo: readAllUserInfo || null,
        // readFormOneValues: readFormOneValues || null,

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        currentStep: readCurrentFormStep ? readCurrentFormStep.currentStep : 0,

        // currentStep: readCurrentFormStep.currentStep,
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
