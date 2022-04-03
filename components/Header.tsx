import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import header_icon_logout from '../public/img/header_icon_logout.png';
import logo_header from '../public/img/logo_header.png';
import placeholderProfileImg from '../public/profile-placeholder.svg';
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

        <div>
          {' '}
          <p>
            Hello <strong>{props.userFirstName}</strong>, good to have you on
            the team
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
              src={
                props.headerImage ? props.headerImage : placeholderProfileImg
              }
              alt="user image"
              width="50"
              height="50"
              css={divStyle}
            />
          </div>

          <Link href="/logout" passHref>
            <Image
              src={header_icon_logout}
              alt="icon logout"
              width="28"
              height="30"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
