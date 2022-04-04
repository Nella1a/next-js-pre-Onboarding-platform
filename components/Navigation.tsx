import Image from 'next/image';
import Link from 'next/link';
import iconAddNew from '../public/img/menu/iconAddNew.svg';
import iconContract from '../public/img/menu/iconContract.svg';
import iconDashboard from '../public/img/menu/iconDashboard.svg';
import iconDocuments from '../public/img/menu/iconDocuments.svg';
import iconHome from '../public/img/menu/iconHome.svg';
import iconProfile from '../public/img/menu/iconProfile.png';
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
          <Image src={iconHome} alt="Home Icon" width="20" height="20" />
          <Link href="/" passHref>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Image
            src={iconProfile}
            alt="Documents Icon"
            width="20"
            height="20"
          />
          <Link href={`/users/profiles/${props.userId}`} passHref>
            <a>Profile</a>
          </Link>
        </li>
        {props.userRole === 2 && (
          <li>
            <Image
              src={iconContract}
              alt="Documents Icon"
              width="20"
              height="20"
            />
            <Link href={`/users/contract/${props.userId}`} passHref>
              <a>Contract</a>
            </Link>
          </li>
        )}

        {props.userRole === 1 && (
          <li>
            <Image
              src={iconAddNew}
              alt="Documents Icon"
              width="20"
              height="20"
            />
            <Link href="/addNewJoiner">
              <a>Add New Joiner </a>
            </Link>
          </li>
        )}
        <li>
          <Image
            src={iconDocuments}
            alt="Documents Icon"
            width="20"
            height="20"
          />
          <Link href={`/users/documents/${props.userId}`} passHref>
            <a>Documents</a>
          </Link>
        </li>
        {props.userRole === 1 && (
          <li>
            <Image
              src={iconDashboard}
              alt="Documents Icon"
              width="20"
              height="20"
            />
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
        )}
        {/* <li>
          <Image
            src={iconUpdates}
            alt="Documents Icon"
            width="20"
            height="20"
          />
          <Link href="/welcome">
            <a>Updates</a>
          </Link>
        </li> */}
      </ul>

      {/* This should be a normal a link, thus we want the page to relode*/}
    </nav>
  );
}
