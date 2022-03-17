exports.up = async (sql) => {
  await sql`
	CREATE TABLE relationship_emergency_contact(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		contact_relation varchar(30) NOT NULL
	)
	`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE relationship_emergency_contact
 `;
};
