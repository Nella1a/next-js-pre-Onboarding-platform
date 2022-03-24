exports.up = async (sql) => {
  await sql`
 INSERT INTO relationship_emergency_contact
  (id, contact_relation)
 VALUES
  (1,'friend'),
  (2,'partner'),
  (3,'sibling'),
  (4,'parent'),
  (5,'child'),
  (6,'other')
 `;
};

exports.down = async (sql) => {
  await sql`
  DELETE FROM relationship_emergency_contact
  `;
};
