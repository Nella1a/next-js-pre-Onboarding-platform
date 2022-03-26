exports.up = async (sql) => {
  await sql`
CREATE TABLE user_contract(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	starting_date DATE,
	job_title varchar(30),
	salary integer,
	benefits varchar(100),
	user_id integer UNIQUE REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)

`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE user_contract CASCADE
`;
};
