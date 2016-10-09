var mysql = require('mysql');


var connection = mysql.createConnection({
  user: 'root',
  password: 'a',
  database: 'chat'
});

connection.connect();

module.exports = connection;
