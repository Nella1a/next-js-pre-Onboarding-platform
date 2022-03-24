exports.up = async (sql) => {
  await sql`
	CREATE TABLE roles(
	id integer NOT NULL PRIMARY KEY,
		roles_name varchar(30) NOT NULL
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE roles
	`;
};
