exports.up = async (sql) => {
  await sql`
CREATE TABLE emergency_contact(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fullName varchar(50),
  phone varchar(20),
  user_id integer REFERENCES users (id) ON DELETE CASCADE,
  relationship_id integer REFERENCES relationship_emergency_contact (id) ON DELETE CASCADE
)
`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE emergency_contact
`;
};
