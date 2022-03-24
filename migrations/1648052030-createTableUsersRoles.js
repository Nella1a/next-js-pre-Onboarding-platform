exports.up = async (sql) => {
  await sql`
	CREATE TABLE users_roles(
		userid INTEGER ,
  roleid INTEGER,
  PRIMARY KEY (userid, roleid),
  FOREIGN KEY (userid) REFERENCES users(id),
  FOREIGN KEY (roleid) REFERENCES roles(id)
	)
	`;
};

exports.down = async (sql) => {
  await sql`
DROP TABLE users_roles`;
};
