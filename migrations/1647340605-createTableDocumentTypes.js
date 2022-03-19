exports.up = async (sql) => {
  await sql`
	CREATE TABLE document_types(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		doc_name varchar(100) NOT NULL
	)
	`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE document_types
 `;
};
