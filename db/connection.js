const mysql = require("mysql2");

const config = process.env.DB_CONNECTION_URL || {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "project_db",
};
const db = mysql.createPool(config);

module.exports = db.promise();