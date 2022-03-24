exports.up = async (sql) => {
  await sql`
	CREATE TABLE civil_status(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		marital_type_id integer REFERENCES marital_status (id) ON DELETE CASCADE,
		user_id integer UNIQUE REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
	)
	`;
};

exports.down = async (sql) => {
  await sql`
		DROP TABLE civil_status
`;
};
