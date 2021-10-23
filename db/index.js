const mysql = require("mysql2");
const db = require("./Connection");

const allEmp = db.connect(function(err) {
  if(err) throw err;
  db.query("SELECT * FROM employee", function(err, result, fields) {
    if(err) throw err;
    console.log(result);
  })
});

module.exports = allEmp;
