import { css } from '@emotion/react';
import Head from 'next/head';
import { getUserById, getValidSessionByToken } from '../util/database';
import { styleMain } from './elements';
import Header from './Header';

// import Header from './Header';

const backgroundStyle = css`
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
  -webkit-box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.16);
`;

// type Props = {
//   children?: React.ReactNode;
// };

export default function Layout(props) {
  return (
    <>
      <Head>
        {' '}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {console.log('userobject:', props.userObject)}
      {props.userObject ? (
        <div css={backgroundStyle}>
          {' '}
          <Header userObject={props.userObject} />
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
