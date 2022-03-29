import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import header_icon_logout from '../public/img/header_icon_logout.png';
import logo_header from '../public/img/logo_header.png';
import imgTest from '../public/imgTest.png';
import { User } from '../util/database';
import { headerStyle } from './elements';

type Props = {
  userObject?: User;
  userFirstName?: string;
  headerImage?: string;
};

const divStyle = css`
  /* width: 60px;
  height: 60px; */
  border-radius: 50%;
`;

export default function Header(props: Props) {
  console.log('headerImg:', props.headerImage);
  return (
    <header css={headerStyle}>
      <nav>
        <Link href="/" passHref>
          <Image src={logo_header} alt="company logo" width="121" height="26" />
        </Link>

        {/* <Link href="/login">
          <a>Documents</a>
        </Link>
        <Link href="/login">
          <a>Updates</a>
        </Link>
        <Link href="/login">
          <a>Profile</a>
        </Link> */}

        <div>
          {' '}
          <p>
            Hello <strong>{props.userFirstName}</strong> Good to have you on the
            team
          </p>
        </div>
        <div>
          {props.userObject && (
            <p>
              {props.userObject.firstName} {props.userObject.lastName}
            </p>
          )}
          <div css={divStyle}>
            <Image
              src={props.headerImage ? props.headerImage : imgTest}
              alt="user image"
              width="50"
              height="50"
              css={divStyle}
            />
          </div>

          {/* <p>{props.userObject.username}Jane Doe</p> */}

          <Link href="/logout" passHref>
            <Image
              src={header_icon_logout}
              alt="icon logout"
              width="28"
              height="30"
            />
          </Link>

          {/*
          <a href="/logout">
            {' '}
            <Image
              src={header_icon_logout}
              alt="icon logout"
              width="28"
              height="30"
            />
          </a> */}
        </div>

        {/* This should be a normal a link, thus we want the page to relode*/}
      </nav>
    </header>
  );
}
