const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'weather_data',
});

// Function to execute a database query
function query(sql, values) {
  return new Promise((resolve, reject) => {
    // Get a connection from the pool
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
        return;
      }

      // Execute the query
      connection.query(sql, values, (error, results) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
}

module.exports = {
  query,
};