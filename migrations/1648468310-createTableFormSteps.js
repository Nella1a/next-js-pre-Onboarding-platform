exports.up = async (sql) => {
  await sql`
CREATE TABLE form_steps(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	current_step integer,
	user_id integer UNIQUE REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)
`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE form_steps
	`;
};
