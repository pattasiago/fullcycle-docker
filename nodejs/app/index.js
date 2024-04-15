import mysql from "mysql2"
import faker from "faker"
import util from "util"

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

con.connect();

con.query = util.promisify(con.query);

async function executeQuery(insertSql, selectSql) {
  try {
    await con.query(insertSql);
    const result = await con.query(selectSql);
    return result;
  } catch (err) {
    console.error(err);
  }
}

export default async function insertPerson() {
  const insertSql = `INSERT INTO people(name) VALUES ('${(faker.name.firstName())}')`;
  const selectSql = "SELECT name FROM people ORDER BY id ASC";
  const result = await executeQuery(insertSql, selectSql);
  const html = `<h1>Full Cycle Rocks!</h1>\n
  <ul>
  ${result.map((person) => {
      return `<li>${person.name}</li>`;
    }).join('')}
    </ul>`
  return html
}
