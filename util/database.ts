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

export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
  userId: number;
};

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

// create user to database
export async function createUser(username: string, passwordHash: string) {
  const [user] = await sql<[User]>`
  INSERT INTO users
  (username, password_hash)
  VALUES
  (${username}, ${passwordHash})
  RETURNING
  id,
  username
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

export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return user && camelcaseKeys(user);
}

export async function getValidSessionByToken(token: string | undefined) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
      users
    WHERE
      token = ${token} AND
      expiry_timestamp > now()
  `;

  await deleteExpiredSessions();

  return session && camelcaseKeys(session);
}

// add token to session table
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

// delete expired session from session table
export async function deleteExpiredSessions() {
  const session = await sql<Session[]>`
DELETE FROM
  sessions
WHERE
  expiry_timestamp < NOW()
RETURNING *
`;
}
