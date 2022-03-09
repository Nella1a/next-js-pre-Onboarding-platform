exports.up = async (sql) => {
  await sql`
INSERT INTO roles
(role_name)
VALUES
('employer'),
('new_hire')
`;
};

exports.down = async (sql) => {
  await sql`
 DELETE FROM roles
 `;
};
