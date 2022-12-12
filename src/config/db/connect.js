// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'practice'
});

// simple query
connection.query(
    'SELECT * FROM `USERS`',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  );
module.exports = connection