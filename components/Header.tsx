import Image from 'next/image';
import Link from 'next/link';
import { User } from '../util/database';
import { headerStyle } from './elements';

type Props = {
  userObject?: User;
};

export default function Header(props: Props) {
  return (
    <header css={headerStyle}>
      <nav>
        <Link href="/">
          <a>Logo</a>
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
          <p>Good to have you on the team</p>
        </div>
        <div>
          <div>Foto</div>
          {props.userObject && <p>{props.userObject.username}</p>}
          {/* <p>{props.userObject.username}Jane Doe</p> */}

          <a href="/logout">
            {' '}
            <Image
              src="/img/right-from-bracket-solid.svg"
              alt="Documents Icon"
              width="20"
              height="20"
            />
          </a>
        </div>

        {/* This should be a normal a link, thus we want the page to relode*/}
      </nav>
    </header>
  );
}
