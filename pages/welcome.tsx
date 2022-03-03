import Head from 'next/head';
import { sectionLayout } from '../components/elements';
import Header from '../components/Header';
import Layout from '../components/Layout';

export default function Welcome() {
  return (
    <Layout>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <h1>Welcome X</h1>
      <p>It's great to have you with us.</p>
      <section css={sectionLayout}>
        <article></article>
        <article>
          <div>
            <h2>Text 1</h2>
            <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
            <button>Documents</button>
          </div>
          <div>
            <h2>Text 2</h2>
            <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
            <button>Updates</button>
          </div>
          <div>
            <h2>Text 3</h2>
            <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
            <button>Profile</button>
          </div>
        </article>
      </section>
    </Layout>
  );
}
