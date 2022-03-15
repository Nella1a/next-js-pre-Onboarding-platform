exports.up = async (sql) => {
  await sql`
 INSERT INTO document_types
  (name)
 VALUES
  ('contract_signed'),
  ('state_id'),
  ('social_security_card'),
  ('other')
 `;
};

exports.down = async (sql) => {
  await sql`
  DELETE FROM relationship_emergency_contact
  `;
};
