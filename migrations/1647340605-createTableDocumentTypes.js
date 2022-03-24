exports.up = async (sql) => {
  await sql`
	CREATE TABLE document_types(
		id integer NOT NULL PRIMARY KEY,
		doc_name varchar(100) NOT NULL

	)`;
};

exports.down = async (sql) => {
  await sql`
 DROP TABLE document_types
 `;
};
