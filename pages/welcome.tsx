import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  flexCenterWithWidthAndHeight,
  sectionOneLayout,
  sectionTwoLayout,
} from '../components/elements';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import imgTest from '../public/imgTest.png';

export default function Welcome() {
  return (
    <Layout>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <h1>Welcome X</h1>
      <p>It's great to have you with us.</p> */}
      <section css={sectionOneLayout}>
        <Navigation />
      </section>
      <section css={sectionTwoLayout}>
        <h1>Hello</h1>
        <div>
          <article>
            <h2>Text 1</h2>
            <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
            <button>Documents</button>
          </article>
          <article>
            <div>
              <h2>Text 1</h2>
              <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
              <Link href="/documents">
                <button>Documents</button>
              </Link>
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
            <div>
              <h2>Text 3</h2>
              <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum </p>
              <button>Profile</button>
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}
