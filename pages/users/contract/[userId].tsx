import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  addNewJoinerSectionTwoLayout,
  formAddNewJoiner,
  sectionOneLayout,
} from '../../../components/elements';
import Layout from '../../../components/Layout';
import Navigation from '../../../components/Navigation';
import contract from '../../../public/img/contract.jpeg';
// import homeTeam from '../../../public/img/home/homeTeam.png';
import {
  AddContractDetailsRequestBody,
  getUserById,
  getValidSessionByToken,
  readContractDetails,
  User,
} from '../../../util/database';

type Props = {
  userObject: User;
  userFirstName: string;
  headerImage: string;
  user?: User;
  // readContract: AddContractDetailsRequestBody | string;
};

export default function UserProfile(props: Props) {
  // const [jobTitle, setJobTitle] = useState(props.readContract.jobTitle);
  // const [salary, setSalary] = useState(props.readContract.salary);
  // const [benefits, setBenefits] = useState(props.readContract.benefits);
  // const [startingDate, setStartingDate] = useState(
  //   props.readContract.startingDate,
  // );

  const [jobTitle, setJobTitle] = useState();
  const [salary, setSalary] = useState();
  const [benefits, setBenefits] = useState();
  const [startingDate, setStartingDate] = useState('');
  const isDisabled = true;
  console.log(benefits);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/contract/${props.userObject.id}`);
      const data = await response.json();
      console.log('data_app:', data);
      if ('error' in data) {
        console.log('data not available');
      }
      setJobTitle(data.contractSummary.jobTitle);
      setSalary(data.contractSummary.salary);
      setBenefits(data.contractSummary.benefits);
      const dateFromApi = new Date(
        data.contractSummary.startingDate,
      ).toLocaleDateString('en-US');
      setStartingDate(dateFromApi);
    }

    fetchData().catch(() => {});
  }, [props.userObject.id]);

  // const downloadContract = async () => {
  //   const requestConstract = await fetch(props.readContract.benefits);
  //   const requestResponse = await requestConstract.json();
  //   console.log('contract, ', requestResponse);
  // };

  console.log('props_contract:', props);
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
        <title>contract main points</title>
        <meta name="description" content="contract main points" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={sectionOneLayout}>
        <Navigation userId={props.user.id} userRole={props.user.roleId} />
      </section>

      <section css={[addNewJoinerSectionTwoLayout, formAddNewJoiner]}>
        <article>
          <div>
            <Image
              src={contract}
              alt="image group of employers"
              width="460"
              height="320"
            />
          </div>
        </article>
        <article>
          <h2>Job Offer</h2>
          <ul>
            <div>
              {' '}
              <li>
                <label htmlFor="startingDate">Start Date</label>
              </li>
              <li>
                {' '}
                <input
                  id="startingDate"
                  name="startingDate"
                  disabled={isDisabled}
                  value={startingDate}
                />{' '}
              </li>
            </div>
            <div>
              <li>
                {' '}
                <label htmlFor="jobTitle">Job Title</label>
              </li>
              <li>
                <input
                  id="jotTitle"
                  name="jobTitle"
                  disabled={isDisabled}
                  value={jobTitle}
                />
              </li>
            </div>

            <div>
              {' '}
              <li>
                <label htmlFor="salary">Annual Salary</label>
              </li>
              <li>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  disabled={isDisabled}
                  value={salary}
                />
              </li>
            </div>

            {/* <div>
              <li>
                <label htmlFor="benefits">Benefits</label>
              </li>
              <li>
                <input
                  id="benefits"
                  type="benefits"
                  name="benefits"
                  value={benefits}
                  disabled={isDisabled}
                />
              </li>
            </div> */}
            <div>
              <li>
                <label htmlFor="benefits">Contract</label>
              </li>
              {/* <li>
                <button onClick={downloadContract}> Download Contract</button>
              </li> */}
              <li>
                <button> Read Contract</button>
              </li>
            </div>
            <div> </div>
          </ul>
        </article>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<{
    user?: User;
    readContract?: AddContractDetailsRequestBody | string;
  }>
> {
  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. check if token is valid
    // TO DO CHECK ROLE Of USER
    const session = await getValidSessionByToken(token);

    // check if not empty
    // if (readContract) {
    //   readContract.startingDate = new Date(
    //     readContract.startingDate,
    //   ).toLocaleDateString('en-US');
    // }

    // console.log('readContract', readContract);
    if (session) {
      const user = await getUserById(session.userId);

      // User id is not correct type
      if (!session.userId || Array.isArray(session.userId)) {
        return { props: {} };
      }

      if (!user) {
        context.res.statusCode = 404;
        return {
          // notFound: true, // also works, but generates a generic error page
          props: {},
        };
      }
      const readContract = await readContractDetails(user.id);
      console.log('contractDetails gSSP:', readContract);
      // check if not empty
      if (readContract) {
        readContract.startingDate = new Date(
          readContract.startingDate,
        ).toLocaleDateString('en-US');
      }

      return {
        props: {
          user: user,
          readContract: readContract ? readContract : '',
        },
      };
    }
  }
  return {
    props: {},
  };
}
