var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (object, callback) {
      var queryString = 'INSERT INTO messages(userid, text) VALUES(?, ?)';

      db.query(queryString, [object.id, object.text], function(err, rows, field) {
        callback(err, rows);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (object, callback) {
      var queryString = 'INSERT INTO users(username) VALUES(?)';

      db.query(queryString, [object.username], function(err, rows, field) {
        callback(rows);
      });
    }
  }
};

// INSERT INTO tbl_name (a,b,c) VALUES(1,2,3),(4,5,6),(7,8,9);