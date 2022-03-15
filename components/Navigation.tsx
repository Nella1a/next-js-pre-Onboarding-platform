import Image from 'next/image';
import Link from 'next/link';
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
          <Link href="/">
            <a>Home</a>
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
        {props.userRole === 1 && (
          <li>
            <Image
              src="/img/table-list-solid.svg"
              alt="Documents Icon"
              width="20"
              height="20"
            />
            <Link href="/profiles/userDocuments">
              <a>Dashboard</a>
            </Link>
          </li>
        )}
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
      </ul>

      {/* This should be a normal a link, thus we want the page to relode*/}
    </nav>
  );
}
