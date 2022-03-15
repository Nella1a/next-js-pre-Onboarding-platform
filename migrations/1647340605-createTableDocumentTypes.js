exports.up = async (sql) => {
  await sql`
	CREATE TABLE document_types(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name varchar(30) NOT NULL
	)
	`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE document_types
 `;
};
