exports.up = async (sql) => {
  await sql`
INSERT INTO marital_status
(id, marital_status)
VALUES
(1,'single'),
(2,'married'),
(3,'registered partnership'),
(4,'divorced'),
(5,'widowed'),
(6,'other')
`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM marital_status
	`;
};
