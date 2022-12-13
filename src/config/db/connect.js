// get the client
require('dotenv').config()
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE
});

// simple query
connection.query(
    'SELECT * FROM `USERS`',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  );
module.exports = connection