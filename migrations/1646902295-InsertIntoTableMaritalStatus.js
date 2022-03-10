exports.up = async (sql) => {
  await sql`
INSERT INTO marital_status
(marital_status)
VALUES
('single'),
('married'),
('registered partnership'),
('divorced'),
('widowed'),
('other')
`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM marital_status
	`;
};
