exports.up = async (sql) => {
  await sql`
INSERT INTO roles
(id, roles_name)
VALUES
(1,'employer'),
(2,'new_hire')
`;
};

exports.down = async (sql) => {
  await sql`
 DELETE FROM roles
 `;
};
