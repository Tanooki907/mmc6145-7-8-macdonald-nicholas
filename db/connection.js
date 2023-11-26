const mysql = require("mysql2");

const config = process.env.DB_CONNECTION_URL || {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: process.env.npm_package_config_DB_NAME,
};
const db = mysql.createPool(config);

module.exports = db.promise();