exports.up = async (sql) => {
  await sql`
 INSERT INTO document_types
  (id, doc_name)
 VALUES
  (1,'signed_contract'),
  (2,'documents'),
  (3,'other')
 `;
};

exports.down = async (sql) => {
  await sql`
  DELETE FROM relationship_emergency_contact
  `;
};
