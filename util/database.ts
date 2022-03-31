import camelcaseKeys from 'camelcase-keys';
// 2. Connect to database by importing environment variables
import { config } from 'dotenv-safe';
// 1. Import postgres (= client library which connects to DBMS)
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku.js';

setPostgresDefaultsOnHeroku();

config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

function connectOneTimeToDatabase() {
  let sql;

  // production:
  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  }
  // local environment:
  else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

// Connect to PostgresSQl
const sql = connectOneTimeToDatabase();

/* *************************** */
/*             Types           */
/* *************************** */

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
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

// CREATE
export async function createUser(
  username: string,
  passwordHash: string,
  firstName: string,
  lastName: string,
  userRole: number,
) {
  const [user] = await sql<[User]>`
  INSERT INTO users
  (username, password_hash, first_name, last_name, role_id)
  VALUES
  (${username}, ${passwordHash},${firstName},${lastName},${userRole})
  RETURNING
  id,
  username,
  role_id,
  first_name,
  last_name
  `;
  return camelcaseKeys(user);
}

// READ
export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      username,
      first_name,
      last_name,
      role_id
    FROM
      users
     WHERE
      id = ${id}
    `;
  console.log('User in DB', user);
  return user && camelcaseKeys(user);
}

/* *************************** */
/*       users role table       */
/* *************************** */

type UserRole = {
  userId: number;
  userRoleId: number;
};

// add user role
export async function addUserRole(userId: number, userRoleId: number) {
  const [userRole] = await sql<[UserRole]>`
  INSERT INTO users_roles
  (userid, roleid)
  VALUES
  (${userId}, ${userRoleId})
  RETURNING *
  `;
  return userRole;
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
      users.role_Id,
      users.first_name,
      users.last_name
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
export async function getAllNewJoiners(userRoleId: number) {
  const newJoiners = await sql<[User | undefined]>`
  SELECT
id,
  username,
  first_name,
  last_name,
  role_id
  FROM
  users
  WHERE
  users.role_Id = ${userRoleId}
  `;
  return camelcaseKeys(newJoiners);
}

export type AllPersonalInfo = {
  userId: number;
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

export type ReadAllPersonalInfo = {
  userId: number;
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
  relationshipId: number;
  fullname: string;
  sosPhone: number;
};

// READ
export async function readUserAllPersonalInfo(userId: number) {
  const [allPersonalInfo] = await sql<[ReadAllPersonalInfo]>`
  SELECT
  users.id,
  user_personal_details.date_of_birth as date_of_birth,
  user_personal_details.social_sec_nb as social_sec_nb,
  user_personal_details.nationality as nationality,
  user_personal_details.email,
  user_personal_details.user_phone as user_phone,
  user_address.street_and_nbr as street_and_nbr,
  user_address.city as city,
  user_address.postal_code,
  user_address.country as country,
  emergency_contact.fullName,
  emergency_contact.sos_phone,
  emergency_contact.relationship_id,
  civil_status.marital_type_id
  FROM
  users,
  user_personal_details,
  user_address,
  emergency_contact,
  civil_status
  WHERE
  users.id = ${userId} AND
  users.id =  user_personal_details.user_id AND
  users.id = user_address.user_id AND
  users.id = emergency_contact.user_id AND
  users.id = civil_status.user_id
  `;
  return camelcaseKeys(allPersonalInfo);
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
  camelcaseKeys(session);
}

/* ****************************** */
/* Table:  user personal details  */
/* ****************************** */

export type FormValuesOne = {
  userId: number;
  dateOfBirth: Date;
  socialSecNb: number;
  nationality: string;
  email: string;
  userPhone: number;
};

// ADD
export async function formInputPersonalDetails(
  userId: number,
  dateOfBirth: Date,
  socialSecNb: number,
  nationality: string,
  email: string,
  userPhone: number,
) {
  const [formOne] = await sql<FormValuesOne[]>`
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
  return camelcaseKeys(formOne);
}

export type ImgUrl = {
  imgUrl: string;
};

// check if user_id already in table
export async function getUserByImg(userId: string) {
  const [user] = await sql<[id: number | undefined]>`
  SELECT id FROM user_personal_details WHERE user_id = ${userId}
  `;
  return user && camelcaseKeys(user);
}

// ADD IMAGE
export async function addUserProfileImage(userId: number, imageUrl: string) {
  console.log('image in DB:', imageUrl);
  const [fileUpload] = await sql<[ImgUrl]>`
  INSERT INTO user_personal_details
  (user_id, image_url)
  VALUES
  (${userId}, ${imageUrl})
  RETURNING image_url
  `;
  return camelcaseKeys(fileUpload);
}

// UPDATE IMAGE
export async function updateUserProfileImage(userId: number, imageUrl: string) {
  const [imgUpdate] = await sql<[ImgUrl]>`
  UPDATE
  user_personal_details
  SET
  image_url = ${imageUrl}
  WHERE
  user_id = ${userId}
  RETURNING image_url
  `;
  return camelcaseKeys(imgUpdate);
}

// READ IMAGE
export async function readUserProfileImage(userId: number) {
  const [readImageUrl] = await sql<[ImgUrl | undefined]>`
  SELECT
  image_url
  FROM
  user_personal_details
  WHERE
  user_id = ${userId}
  `;
  return readImageUrl && camelcaseKeys(readImageUrl);
}

export type FormUpdateValues = {
  dateOfBirth: string;
  email: string;
  socialSecNb: number;
  nationality: string;
  userPhone: number;
};
// UPDATE
export async function updateUserPersonalInfo(
  userId: number,
  // dateOfBirth: string,
  socialSecNb: number,
  nationality: string,
  email: string,
  userPhone: number,
) {
  const [updateFormiInput] = await sql<[FormUpdateValues]>`
UPDATE
user_personal_details
SET
  social_sec_nb = ${socialSecNb},
  nationality = ${nationality},
  email =  ${email},
  user_phone = ${userPhone}
WHERE
  user_Id = ${userId}
  RETURNING
  social_sec_nb,
  nationality,
  email,
  user_phone
`;
  return camelcaseKeys(updateFormiInput);
}

// READ
export async function readUserPersonalInfo(userId: number) {
  const [readFormiInput] = await sql<[FormUpdateValues]>`
SELECT
  (user_personal_details.date_of_birth) as date_of_birth,
  user_personal_details.social_sec_nb as social_sec_nb,
  user_personal_details.nationality as nationality,
  user_personal_details.email as email,
  user_personal_details.user_phone as user_phone
FROM
user_personal_details
WHERE
user_personal_details.user_id = ${userId}
`;
  console.log('DB readUserPersonalInfo:', readFormiInput);
  return camelcaseKeys(readFormiInput);
}

/* ****************************** */
/*      Table:  user_address      */
/* ****************************** */

export type UserAddress = {
  userId?: number;
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
  const [userAddress] = await sql<[UserAddress | undefined]>`
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
  const [userAddress] = await sql<[UserAddress | undefined]>`
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
  const [updateAddress] = await sql<[UserAddress]>`
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
  return camelcaseKeys(updateAddress);
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
  return camelcaseKeys(userMaritalStatus);
}

// READ
export async function readUserMaritalStatus(userId: number) {
  const [userMaritalStatus] = await sql<[MaritalStatus]>`
SELECT
marital_type_id
FROM
civil_status
WHERE
civil_status.user_id = ${userId}
  `;
  return camelcaseKeys(userMaritalStatus);
}

// UPDATE
export async function updateUserMaritalStatus(
  userId: number,
  maritalStatus: number,
) {
  const [updateMaritalStatus] = await sql`
UPDATE
civil_status
SET
  marital_type_id = ${maritalStatus}
WHERE
 user_id = ${userId}
  RETURNING marital_type_id
`;
  return updateMaritalStatus;
}

/* ****************************** */
/*   Table: Emergency Contact     */
/* ****************************** */
export type SosContact = {
  relationshipId: number;
  fullName: string;
  sosPhone: number;
};

// CREATE
export async function AddUserEmergencyContact(
  userId: number,
  fullName: string,
  sosPhone: number,
  relationshipId: number,
) {
  const [userEmergencyContact] = await sql<[SosContact]>`
  INSERT INTO emergency_contact
    (user_id, fullName, sos_phone, relationship_id)
  VALUES
   (${userId}, ${fullName}, ${sosPhone}, ${relationshipId})
   RETURNING
  relationship_id,
   fullName,
   sos_phone
  `;
  return camelcaseKeys(userEmergencyContact);
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
  return camelcaseKeys(updateEmergencyContact);
}

/* *************************** */
/*        Table: documents     */
/* *************************** */

export type FileUrl = {
  userId: number;
  fileUrl: string;
  fileType: number;
};

// CREATE
export async function AddFileUrlToDB(
  userId: number,
  fileUrl: string,
  fileType: number,
) {
  const [fileUrlDB] = await sql<[FileUrl]>`
  INSERT INTO files
    (user_id, file_url, file_type_id)
  VALUES
   (${userId}, ${fileUrl}, ${fileType})
   RETURNING
  user_id,
  file_url,
   file_type_id
  `;
  return camelcaseKeys(fileUrlDB);
}

/* *************************** */
/*        Table: Contract      */
/* *************************** */

// CREATE
export type AddContractDetailsRequestBody = {
  userId: string;
  startingDate: string;
  jobTitle: number;
  salary: number;
  benefits: string;
};

export async function addContractDetails(
  userId: number,
  startingDate: string,
  jobTitle: string,
  salary: number,
  benefits: string,
) {
  const [contract] = await sql<[AddContractDetailsRequestBody]>`
  INSERT INTO user_contract
  (user_id, starting_date, job_title, salary, benefits)
  VALUES
  (${userId},${startingDate}, ${jobTitle}, ${salary}, ${benefits})
  RETURNING *
  `;
  return camelcaseKeys(contract);
}

// READ
export async function readContractDetails(userId: number) {
  const [contract] = await sql<[AddContractDetailsRequestBody | undefined]>`
  SELECT
  user_id,
  starting_date,
  job_title,
  salary,
  benefits
  FROM
  user_contract
  WHERE
  user_id = ${userId}
  `;
  return contract && camelcaseKeys(contract);
}

/* *************************** */
/*        Table: form_steps     */
/* *************************** */

export type AddFormStep = {
  currentStep: number;
};

// CREATE
export async function addFormStepDb(userId: number, currentFormStep: number) {
  const [formStep] = await sql<[AddFormStep]>`
  INSERT INTO form_steps
  (user_id, current_step)
  VALUES
  (${userId},${currentFormStep})
  RETURNING current_step
  `;
  console.log('Add FormStepDB:', formStep);
  return formStep;
}

// UPDATE
export async function updateFormStepDb(
  userId: number,
  currentFormStep: number,
) {
  const [formStep] = await sql<[{ currentStep: number }]>`
  UPDATE
  form_steps
  SET
  current_step = ${currentFormStep}
  WHERE
  form_steps.user_id=${userId}
  RETURNING current_step
  `;
  return camelcaseKeys(formStep);
}

// READ
export async function readFormStepDb(userId: number) {
  const [formStep] = await sql<[{ currentStep: number | undefined }]>`
  SELECT
  current_step
  FROM
  form_steps
  WHERE
  form_steps.user_id=${userId}
  `;
  console.log('fomStep in DB:', formStep);
  return camelcaseKeys(formStep);
}
