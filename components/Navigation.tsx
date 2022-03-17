import Image from 'next/image';
import Link from 'next/link';
import { navigationStyle } from './elements';

type Props = {
  userId: number;
  userRole: number;
};

export default function Navigation(props: Props) {
  console.log('props userId:', props.userId);
  console.log('props RoleId:', props.userRole);
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
          <Link href={`/users/profiles/${props.userId}`}>
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
          <Link href={`/users/documents/${props.userId}`}>
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
            <Link href="/dashboard">
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
