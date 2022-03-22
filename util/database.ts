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
  socialSecNb: number;
  nationality: string;
  email: string;
  userPhone: number;
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

export type AllPersonalInfo = {
  userId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  socialSecNb: number;
  nationality: string;
  email: string;
  userPhone: number;
  streetAndNbr: string;
  city: string;
  postalCode: number;
  country: string;
  maritalStatusId: number;
  maritalStatus: number;
  relationshipId: number;
  fullname: string;
  sosPhone: number;
};

// read all personal infos
export async function readUserAllPersonalInfo(userId: number) {
  const [allPersonalInfo] = await sql<[AllPersonalInfo]>`
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

// read firstname
export async function readUserFirstName(userId: number) {
  const [userFirstName] = await sql`
  SELECT
  first_name
  FROM
  user_personal_details
  WHERE
  user_personal_details.user_id = ${userId}
  `;
  return userFirstName && camelcaseKeys(userFirstName);
}

// read all personal infos
// export async function readUserAllPersonalInfo(userId: number) {
//   const [allPersonalInfo] = await sql<[AllPersonalInfo]>`
//   SELECT
//   user_personal_details.first_name as first_name,
//   user_personal_details.last_name as last_name,
//   user_personal_details.date_of_birth as date_of_birth,
//   user_personal_details.social_sec_nb as social_sec_nb,
//   user_personal_details.nationality as nationality,
//   user_personal_details.email as email,
//   user_personal_details.user_phone as user_phone,
//   user_address.street_and_nbr as street_and_nbr,
//   user_address.city as city,
//   user_address.postal_code as postal_code,
//   user_address.country as country,
//   user_address.user_id as user_address_userId,
//   civil_status.marital_status as marital_status,
//   civil_status.id as civil_status_id,
//   emergency_contact.fullName as fullName,
//   emergency_contact.sos_phone as sos_phone,
//   emergency_contact.relationship_id as relationship_id
//   FROM
//   user_personal_details,
//   user_address,
//   civil_status,
//   emergency_contact,
//   users
//   WHERE
//   users.id = ${userId} AND
//   users.id = user_personal_details.user_id AND
//   user_address.user_id AND
//   emergency_contact.user_id AND civil_status.user_id
//   `;
//   return allPersonalInfo && camelcaseKeys(allPersonalInfo);
// }

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
  // firstName: string,
  // lastName: string,
  dateOfBirth: Date,
  socialSecNb: number,
  nationality: string,
  email: string,
  userPhone: number,
) {
  const formOne = await sql<FormValues[]>`
  INSERT INTO user_personal_details
  (user_id,
  date_of_birth,
  social_sec_nb,
  nationality,
  email,
  user_phone)
  VALUES
  (${userId}, ${dateOfBirth},${socialSecNb}, ${nationality},${email},${userPhone})
  RETURNING *
  `;
  return formOne && camelcaseKeys(formOne);
}

// export type FileUpload = {
//   url: string;
// };

// ADD IMAGE
export async function addUserProfileImage(userId: number, imageUrl: string) {
  const [fileUpload] = await sql`
  UPDATE user_personal_details
  SET
  image_url = ${imageUrl}
  WHERE
  user_id = ${userId}
  RETURNING image_url
  `;
  return fileUpload && camelcaseKeys(fileUpload);
}

// READ IMAGE
export async function readUserProfileImage(userId: number) {
  const [readImageUrl] = await sql`
  SELECT
  image_url
  FROM
  user_personal_details
  WHERE
  user_id = ${userId}
  `;
  return readImageUrl && camelcaseKeys(readImageUrl);
}

// UPDATE
export async function updateUserPersonalInfo(
  userId: number,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  socialSecNb: number,
  nationality: string,
  email: string,
  userPhone: number,
) {
  const updateFormiInput = await sql`

UPDATE
user_personal_details

SET
  first_name = ${firstName},
  last_name = ${lastName},
  date_of_birth = ${dateOfBirth},
  social_sec_nb =  ${socialSecNb},
  nationality = ${nationality},
  email =  ${email},
  user_phone = ${userPhone}
WHERE
  user_Id = ${userId}
  RETURNING *
`;
  return updateFormiInput && camelcaseKeys(updateFormiInput);
}

/* ****************************** */
/*      Table:  user_address      */
/* ****************************** */

export type UserAddress = {
  userId: number;
  streetAndNbr: string;
  city: string;
  postalCode: number;
  country: string;
};

// CREATE
export async function AddUserAddress(
  userId: number,
  streetAndNbr: string,
  city: string,
  postalCode: number,
  country: string,
) {
  const [userAddress] = await sql<UserAddress | undefined>`
  INSERT INTO user_address
  (user_Id, street_and_nbr, city, postal_code, country)
  VALUES
  (${userId}, ${streetAndNbr}, ${city}, ${postalCode}, ${country})
  RETURNING *
  `;
  return userAddress && camelcaseKeys(userAddress);
}

// READ
export async function readUserAddress(userId: number) {
  const [userAddress] = await sql<UserAddress | undefined>`
  SELECT
  street_and_nbr,
  city,
  postal_code,
  country
  FROM
  user_address
  WHERE
  user_id = ${userId}
  `;
  return userAddress && camelcaseKeys(userAddress);
}

// UPDATE
export async function updateUserAddress(
  userId: number,
  streetAndNbr: string,
  city: string,
  postalCode: number,
  country: string,
) {
  const updateAddress = await sql`

UPDATE
user_address

SET
  street_and_nbr = ${streetAndNbr},
  city = ${city},
  postal_code = ${postalCode},
  country = ${country}
WHERE
 user_id = ${userId}
  RETURNING *
`;
  return updateAddress && camelcaseKeys(updateAddress);
}

/* ****************************** */
/*      Table:   Civil Status     */
/* ****************************** */

export type MaritalStatus = {
  maritalStatusId: number;
  maritalStatus: number;
};

// CREATE
export async function AddUserMaritalStatus(
  userId: number,
  maritalStatus: number,
) {
  const [userMaritalStatus] = await sql<[MaritalStatus]>`

  INSERT INTO civil_status
    (user_id, marital_type_id)
  VALUES
   (${userId}, (SELECT id FROM marital_status WHERE id = ${maritalStatus} ))

   RETURNING
   id,
   marital_type_id
  `;
  return userMaritalStatus && camelcaseKeys(userMaritalStatus);
}

// UPDATE
export async function updateUserMaritalStatus(
  userId: number,
  maritalStatus: number,
) {
  const updateMaritalStatus = await sql`

UPDATE
civil_status

SET
  marital_type_id = ${maritalStatus}
WHERE
 user_id = ${userId}
  RETURNING *
`;
  return updateMaritalStatus && camelcaseKeys(updateMaritalStatus);
}

/* ****************************** */
/*   Table: Emergency Contact     */
/* ****************************** */
export type SosContact = {
  relationshipId: number;
  fullName: string;
  SosPhone: number;
};

// CREATE
export async function AddUserEmergencyContact(
  userId: number,
  fullName: string,
  SosPhone: number,
  relationshipId: number,
) {
  const [userEmergencyContact] = await sql<[SosContact]>`

  INSERT INTO emergency_contact
    (user_id, fullName, sos_phone, relationship_id)
  VALUES
   (${userId}, ${fullName}, ${SosPhone}, ${relationshipId})
   RETURNING
   relationship_id,
   fullName,
   sos_phone

  `;
  return userEmergencyContact && camelcaseKeys(userEmergencyContact);
}

// UPDATE
export async function updateUserEmergencyContact(
  userId: number,
  fullName: string,
  sosPhone: number,
  relationshipId: number,
) {
  const updateEmergencyContact = await sql`

UPDATE
emergency_contact

SET
fullName = ${fullName},
sos_phone = ${sosPhone},
relationship_id = ${relationshipId}
WHERE
 user_id = ${userId}
  RETURNING *
`;
  return updateEmergencyContact && camelcaseKeys(updateEmergencyContact);
}
