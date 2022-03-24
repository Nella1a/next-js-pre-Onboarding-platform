exports.up = async (sql) => {
  await sql`
	CREATE TABLE marital_status(
		id integer NOT NULL PRIMARY KEY,
		marital_status varchar(30) NOT NULL
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE marital_status
 `;
};
