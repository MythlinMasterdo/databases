var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT messages.text, messages.roomname, messages.id, users.username FROM (messages INNER JOIN users ON messages.userid = users.id)', 
          function(err,rows){
            if(err){
              throw err;
            }
            callback(rows)
          })
    }, // a function which produces all the messages
    post: function (object, callback) {
      var queryString = 'INSERT INTO messages(userid, text, roomname) VALUES(?, ?, ?)';

      db.query('SELECT id FROM users WHERE username = ?', [object.username], function(err, rows, field) {
        var nUserId;

        if (err) {
          console.log('error from models messages post', err);

        } else if (rows.length === 0) {

          module.exports.users.post(object, function(err, dataPacket) {
            console.log('new data check: ', dataPacket);
            nUserId = dataPacket.insertId;

            db.query(queryString, [nUserId, object.text, object.roomname], function(err, rows, field) {
              callback(err);
            });

          });
        } else {
          nUserId = rows[0].id;

          db.query(queryString, [nUserId, object.text, object.roomname], function(err, rows, field) {
            callback(err);
          });
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (object, callback) {
      var queryString = 'INSERT INTO users(username) VALUES(?)';

      db.query(queryString, [object.username], function(err, dataPacket) {
        callback(err, dataPacket);
      });
    }
  }
};