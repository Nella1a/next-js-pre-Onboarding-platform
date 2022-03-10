exports.up = async (sql) => {
  await sql`
	CREATE TABLE civil_status(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		user_marital_status_id integer REFERENCES marital_status (id) ON DELETE CASCADE,
		user_id integer REFERENCES users (id) ON DELETE CASCADE
	)
	`;
};

exports.down = async (sql) => {
  await sql`
		DROP TABLE civil_status
`;
};
