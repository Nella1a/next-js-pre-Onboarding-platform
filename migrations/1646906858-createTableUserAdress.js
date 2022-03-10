exports.up = async (sql) => {
  await sql`
	CREATE TABLE user_address(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		street_and_nbr varchar(100) NOT NULL,
		city varchar(100) NOT NULL,
		postal_code varchar(10) NOT NULL,
		country varchar(100) NOT NULL,
		user_id integer REFERENCES users (id) ON DELETE CASCADE
	)
	`;
};

exports.down = async (sql) => {
  await sql`
		DROP TABLE user_address
`;
};
