import Image from 'next/image';
import Link from 'next/link';
import header_icon_logout from '../public/img/header_icon_logout.png';
import logo_header from '../public/img/logo_header.png';
import { User } from '../util/database';
import { headerStyle } from './elements';

type Props = {
  userObject?: User;
  userFirstName?: string;
};

export default function Header(props: Props) {
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
          <div>Foto</div>
          {props.userObject && <p>{props.userObject.username}</p>}

          {/* <p>{props.userObject.username}Jane Doe</p> */}

          <a href="/logout">
            {' '}
            <Image
              src={header_icon_logout}
              alt="icon logout"
              width="28"
              height="30"
            />
          </a>
        </div>

        {/* This should be a normal a link, thus we want the page to relode*/}
      </nav>
    </header>
  );
}
