import Link from 'next/link';
import { headerStyle } from './elements';

export default function Header() {
  return (
    <header css={headerStyle}>
      <nav>
        <p>Logo</p>
        <Link href="/login">
          <a>Documents</a>
        </Link>
        <Link href="/login">
          <a>Updates</a>
        </Link>
        <Link href="/login">
          <a>Profile</a>
        </Link>

        <a href="login">Logout</a>
        {/* This should be a normal a link, thus we want the page to relode*/}
      </nav>
    </header>
  );
}
