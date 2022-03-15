exports.up = async (sql) => {
  await sql`
 INSERT INTO relationship_emergency_contact
  (contact_relation)
 VALUES
  ('friend'),
  ('partner'),
  ('sibling'),
  ('parent'),
  ('child'),
  ('other')
 `;
};

exports.down = async (sql) => {
  await sql`
  DELETE FROM relationship_emergency_contact
  `;
};
