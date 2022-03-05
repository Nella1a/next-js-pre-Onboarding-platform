import { css } from '@emotion/react';
import Image from 'next/image';
import { headerStyle } from './elements';

export default function Header() {
  return (
    <header css={headerStyle}>
      <nav>
        <p>Logo</p>
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
          <p>Jane Doe</p>

          <a>
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
