import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getValidSessionByToken } from '../util/database';
import { navigationStyle } from './elements';

export default function Navigation(props) {
  console.log('props:', props.userId);
  return (
    <nav css={navigationStyle}>
      <ul>
        <li>
          <Image
            src="/img/table-list-solid.svg"
            alt="Documents Icon"
            width="20"
            height="20"
          />
          <Link href="/users/documents">
            <a>Documents</a>
          </Link>
        </li>
        <li>
          <Image
            src="/img/table-list-solid.svg"
            alt="Documents Icon"
            width="20"
            height="20"
          />
          <Link href="/welcome">
            <a>Updates</a>
          </Link>
        </li>
        <li>
          <Image
            src="/img/table-list-solid.svg"
            alt="Documents Icon"
            width="20"
            height="20"
          />
          <Link href={`/users/${props.userId}`}>
            <a>Profile</a>
          </Link>
        </li>
      </ul>

      {/* This should be a normal a link, thus we want the page to relode*/}
    </nav>
  );
}

// await router.push(`/users/${loginResponseBody.user.id}`);
/*
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Check if there is a token
  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. check if token is valid
    // TO DO CHECK ROLE Of USER
    const session = await getValidSessionByToken(token);
    if (session) {
      return {
        props: {
          userId: session.userId,
        },
      };
    }
  }

  // 3. if token is NOT valid redirect to login
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
} */
