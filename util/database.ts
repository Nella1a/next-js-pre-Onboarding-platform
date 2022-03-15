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
