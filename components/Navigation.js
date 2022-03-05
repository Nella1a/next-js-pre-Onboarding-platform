import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { navigationStyle } from './elements';

export default function Navigation() {
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
          <Link href="/documents">
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
          <Link href="/welcome">
            <a>Profile</a>
          </Link>
        </li>
      </ul>

      {/* This should be a normal a link, thus we want the page to relode*/}
    </nav>
  );
}
