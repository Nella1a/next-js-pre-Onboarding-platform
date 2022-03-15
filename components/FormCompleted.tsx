import Head from 'next/head';
import { sectionTwoLayout } from './elements';
import Layout from './Layout';

export default function FormCompleted(props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2> Step {props.currentStep + 1} of 4</h2>
      <section css={sectionTwoLayout}>
        <h2>Review your inputs! 🎉</h2>
      </section>
    </Layout>
  );
}
