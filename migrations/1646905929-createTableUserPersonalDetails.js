exports.up = async (sql) => {
  await sql`
	CREATE TABLE user_personal_details(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		first_name varchar(30) NOT NULL,
		last_name varchar(30) NOT NULL,
		date_of_birth DATE NOT NULL,
		social_sec_nb integer NOT NULL,
		nationality varchar(30),
		email varchar(320) UNIQUE,
		phone varchar(20) NOT NULL,
		user_id integer REFERENCES users (id) ON DELETE CASCADE
	)
	`;
};

exports.down = async (sql) => {
  await sql`
		DROP TABLE user_personal_details
`;
};
