const mysql = require("mysql2");
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    password: "Txn@lgene11",
    database: "content",
  },
  console.log(`Connected to the Content database.
           ,....,
      ,::::::<
     ,::/^\"''.
    ,::/, '   e'.
   ,::; |        '.
   ,::|  \___,-.  c)
   ;::|     \   '-'
   ;::|      \
   ;::|   _.= \
    ;:|.=  _.= \
     '|_.=    __\
      \_..=='' /
      .'.___.-'.
     /          \
    ('--......--')
    /'--......--'\
   ('"--......--"')`
));

module.exports = db;