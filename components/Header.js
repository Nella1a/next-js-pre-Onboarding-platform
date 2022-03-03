import Link from 'next/link';
import { headerStyle } from './elements';

export default function Header() {
  return (
    <header css={headerStyle}>
      <nav>
        <p>Icon</p>
        <Link href="/login">
          <a>Register</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </nav>
    </header>
  );
}
