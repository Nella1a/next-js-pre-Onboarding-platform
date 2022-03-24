exports.up = async (sql) => {
  await sql`

	CREATE TABLE users(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	username varchar(30) NOT NULL UNIQUE,
	password_hash varchar(60) NOT NULL,
	first_name varchar(50),
	last_name varchar(50),
	role_id integer UNIQUE REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE
	)

	`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE users
 `;
};
