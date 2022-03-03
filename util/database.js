import camelcaseKeys from 'camelcase-keys';
// 2. Connect to database by importing environment variables
import { config } from 'dotenv-safe';
// 1. Import postgres (= client library which connects to DBMS)
import postgres from 'postgres';

config();

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
