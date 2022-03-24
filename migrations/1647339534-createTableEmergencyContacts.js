exports.up = async (sql) => {
  await sql`
CREATE TABLE emergency_contact(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fullName varchar(50),
  sos_phone varchar(20),
  user_id integer UNIQUE REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  relationship_id integer REFERENCES relationship_emergency_contact (id) ON DELETE CASCADE
)
`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE emergency_contact
`;
};
