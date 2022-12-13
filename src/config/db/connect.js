// get the client
require('dotenv').config()
const mysql = require('mysql2');

const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME
const DB_DATABASE = process.env.DB_DATABASE


// create the connection to database
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  database: DB_DATABASE
});

// simple query
connection.query(
    'SELECT * FROM `USERS`',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  );
module.exports = connection