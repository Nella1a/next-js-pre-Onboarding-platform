import { css } from '@emotion/react';
import Head from 'next/head';
import { User } from '../util/database';
import { styleMain } from './elements';
import Header from './Header';

// import Header from './Header';

const backgroundStyle = css`
  height: 100%;
  width: 100%;
  background-color: #fff;
  /* border-radius: 20px; */
  -webkit-box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
`;

type Props = {
  children?: React.ReactNode;
  userObject?: User;
  userFirstName?: string;
  headerImage?: string;
};

export default function Layout(props: Props) {
  return (
    <>
      <Head>
        {' '}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {console.log('userobject:', props.userObject)}
      {console.log('FirstName_Layout:', props.userFirstName)}
      {props.userObject ? (
        <div css={backgroundStyle}>
          {' '}
          <Header
            userObject={props.userObject}
            userFirstName={props.userFirstName}
            headerImage={props.headerImage}
          />
          <main css={styleMain}>
            {props.children}
            {/* <section>{props.children}</section> */}
          </main>
        </div>
      ) : (
        <main>
          {props.children}
          {/* <section>{props.children}</section> */}
        </main>
      )}

      {/* <main css={styleMain}>
          {props.children}
        </main>
 */}
    </>
  );
}
