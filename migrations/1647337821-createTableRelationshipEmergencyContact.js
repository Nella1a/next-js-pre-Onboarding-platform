exports.up = async (sql) => {
  await sql`
	CREATE TABLE relationship_emergency_contact(
		id integer NOT NULL PRIMARY KEY,
		contact_relation varchar(30) NOT NULL
	)
	`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE relationship_emergency_contact
 `;
};
