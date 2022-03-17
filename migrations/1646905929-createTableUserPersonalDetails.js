exports.up = async (sql) => {
  await sql`
	CREATE TABLE user_personal_details(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		first_name varchar(30),
		last_name varchar(30),
		date_of_birth DATE,
		social_sec_nb integer,
		nationality varchar(30),
		email varchar(320) UNIQUE,
		user_phone varchar(20),
		user_id integer REFERENCES users (id) ON DELETE CASCADE
	)
	`;
};

exports.down = async (sql) => {
  await sql`
		DROP TABLE user_personal_details
`;
};
