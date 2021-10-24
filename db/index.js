const { restoreDefaultPrompts } = require("inquirer");
const mysql = require("mysql2");
const db = require("./Connection");

// const allEmp = db.connect(function (err) {
//   db.query("SELECT * FROM employee", function (err, result, fields) {
//     console.log(result);
//   });
// });

function allEmp(name, next) {
  return new Promise(function (resolve, reject) {
    // var connection = getMySQL_connection();
    var query_str = `SELECT ${name} FROM employee`;

    var query_var = [name];

    db.query(query_str, query_var, function (err, rows, fields) {
      if (err) {
        console.log(err);
        return reject(err);
      } resolve(rows);
    });
  });
}

module.exports = allEmp;
