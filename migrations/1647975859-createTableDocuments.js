exports.up = async (sql) => {
  await sql`
CREATE TABLE files_upload(
	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_id integer REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
	file_type_id integer REFERENCES document_types (id) ON DELETE CASCADE,
	file_url varchar(100) UNIQUE
)
`;
};
