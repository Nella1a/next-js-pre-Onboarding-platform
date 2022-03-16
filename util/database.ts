import camelcaseKeys from 'camelcase-keys';
// 2. Connect to database by importing environment variables
import { config } from 'dotenv-safe';
// 1. Import postgres (= client library which connects to DBMS)
import postgres from 'postgres';

config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  // When in development, connect only once to the database
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres();
  }
  const sql = globalThis.postgresSqlClient;
  return sql;
}

const sql = connectOneTimeToDatabase();

/* *************************** */
/*             Types           */
/* *************************** */

export type User = {
  id: number;
  username: string;
  roleId: number;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
  userId: number;
};

export type NewJoiners = User & {
  role: string;
};

export type FormValues = {
  userId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  socialSecNumber: number;
  nationality: string;
  email: string;
  phone: number;
};

export type UserFullName = {
  firstName: string;
  lastName: string;
};

/* *************************** */
/*        Table: roles         */
/* *************************** */

/* *************************** */
/*        Table: users         */
/* *************************** */

// check if username already exists in database
export async function getUserByUsername(username: string) {
  const [user] = await sql<[id: number | undefined]>`

  SELECT id FROM users WHERE username = ${username}

  `;
  return user && camelcaseKeys(user);
}

// get user with passwordhash
export async function getUserByUserWithPasswordHashByUsername(
  username: string,
) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
  SELECT
    id,
    username,
    password_hash
  FROM
    users
   WHERE
    username = ${username}
  `;
  return user && camelcaseKeys(user);
}

// add user to database
export async function createUser(
  username: string,
  passwordHash: string,
  userRole: Number,
) {
  const [user] = await sql<[User]>`
  INSERT INTO users
  (username, password_hash, role_id)
  VALUES
  (${username}, ${passwordHash}, ${userRole})
  RETURNING
  id,
  username,
  role_id
  `;
  return camelcaseKeys(user);
}

// get user by id
export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      username
    FROM
      users
     WHERE
      id = ${id}
    `;
  return user && camelcaseKeys(user);
}

/* *************************** */
/*       Join Tables:          */
/* *************************** */

// get user by session
export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username,
      users.role_id
    FROM
      users,
      sessions,
      roles

    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      users.role_id = roles.id AND
      sessions.expiry_timestamp > now()
  `;
  return user && camelcaseKeys(user);
}

// Read all new joiners
export async function getAllNewJoiners() {
  const newJoiners = await sql`
  SELECT
  id,
  username,
  role_id
  FROM
  users
  WHERE
  users.role_id = 2


  `;
  return newJoiners && camelcaseKeys(newJoiners);
}

type AllPersonalInfo = FormValues & UserAddress & MaritalStatus & SosContact;

// read all personal infos
export async function readUserAllPersonalInfo(userId: number) {
  const allPersonalInfo = await sql<AllPersonalInfo>`
  SELECT * FROM
  civil_status,
  user_personal_details,
  user_address,
  emergency_contact
  WHERE
  civil_status.user_id = ${userId} AND
  user_personal_details.user_id = ${userId} AND
  user_address.user_id = ${userId} AND
  emergency_contact.user_id = ${userId}
  `;
  return allPersonalInfo && camelcaseKeys(allPersonalInfo);
}

/* *************************** */
/*    Table: sessions          */
/* *************************** */

export async function getValidSessionByToken(token: string | undefined) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > now()
  `;

  await deleteExpiredSessions();

  return session && camelcaseKeys(session);
}

// add new token to session
export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
  INSERT INTO sessions
  (token, user_id)
  VALUES
  (${token}, ${userId})
  RETURNING
  id,
  token
  `;
  await deleteExpiredSessions();
  return camelcaseKeys(session);
}

export async function deleteSessionByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
  DELETE FROM
  sessions
  WHERE
  token = ${token}
  RETURNING *
  `;
  return session && camelcaseKeys(session);
}

// delete expired session
export async function deleteExpiredSessions() {
  const session = await sql<Session[]>`
DELETE FROM
  sessions
WHERE
  expiry_timestamp < NOW()
RETURNING *
`;
}

/* ****************************** */
/* Table:  user personal details  */
/* ****************************** */

export async function AddUsersFirstAndLastName(
  userId: number,
  firstName: string,
  lastName: string,
) {
  const fullName = await sql<UserFullName>`
  INSERT INTO user_personal_details
  (user_id,
  first_name,
  last_name
 )
  VALUES
  (${userId},${firstName}, ${lastName})
  RETURNING
  first_name,
  last_name
  `;
  return fullName && camelcaseKeys(fullName);
}

export async function formInputPersonalDetails(
  userId: number,
  dateOfBirth: Date,
  socialSecNumber: number,
  nationality: string,
  email: string,
  phone: number,
) {
  const formOne = await sql<FormValues[]>`
  INSERT INTO user_personal_details
  (user_id,
  first_name,
  last_name,
  date_of_birth,
  social_sec_nb,
  nationality,
  email,
  phone)
  VALUES
  (${userId},${''}, ${''}, ${dateOfBirth},${socialSecNumber}, ${nationality},${email},${phone})
  RETURNING *
  `;
  return formOne && camelcaseKeys(formOne);
}

/* ****************************** */
/*      Table:  user_address      */
/* ****************************** */

export type UserAddress = {
  userId: number;
  address: string;
  city: string;
  zipcode: number;
  country: string;
};

export async function AddUserAddress(
  userId: number,
  address: string,
  city: string,
  zipCode: number,
  country: string,
) {
  const [userAddress] = await sql<UserAddress | undefined>`
  INSERT INTO user_address
  (user_Id, street_and_nbr, city, postal_code, country)
  VALUES
  (${userId}, ${address}, ${city}, ${zipCode}, ${country})
  RETURNING *
  `;
  return userAddress && camelcaseKeys(userAddress);
}

export async function readUserAddress(userId: number) {
  const [userAddress] = await sql<UserAddress | undefined>`
  SELECT
  street_and_nbr as address,
  city as city,
  postal_code as zipCode,
  country as country
  FROM
  user_address
  WHERE
  user_id = ${userId}
  `;
  return userAddress && camelcaseKeys(userAddress);
}

/* ****************************** */
/*      Table:   Civil Status     */
/* ****************************** */

export type MaritalStatus = {
  maritalStatusId: number;
  maritalStatus: number;
};

export async function AddUserMaritalStatus(
  userId: number,
  maritalStatus: number,
) {
  const [userMaritalStatus] = await sql<[MaritalStatus]>`

  INSERT INTO civil_status
    (user_id, user_marital_status_id)
  VALUES
   (${userId}, ${maritalStatus})
   RETURNING
   id,
   user_marital_status_id
  `;
  return userMaritalStatus && camelcaseKeys(userMaritalStatus);
}

/* ****************************** */
/*   Table: Emergency Contact     */
/* ****************************** */
export type SosContact = {
  relationId: number;
  fullName: string;
  phone: number;
};

export async function AddUserEmergencyContact(
  userId: number,
  contactFullName: string,
  contactPhone: number,
  contactRelation: number,
) {
  const [userEmergencyContact] = await sql<[SosContact]>`

  INSERT INTO emergency_contact
    (user_id, fullName, phone, relationship_id)
  VALUES
   (${userId}, ${contactFullName}, ${contactPhone}, ${contactRelation})
   RETURNING
   relationship_id,
   fullName,
   phone

  `;
  return userEmergencyContact && camelcaseKeys(userEmergencyContact);
}
