exports.up = async (sql) => {
  await sql`
	CREATE TABLE roles(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		role_name varchar(30) NOT NULL
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE roles
	`;
};
