// const inquirer = require("inquirer");
// const mysql = require("mysql2");
const db = require("./Connection");

// const allEmp = db.connect(function (err) {
//   db.query("SELECT * FROM employee", function (err, result, fields) {
//     console.log(result);
//   });
// });

function allEmp(name) {
  // async new Promise(function (resolve, reject) {
    // var connection = getMySQL_connection();
    var query_str = `SELECT ${name} FROM employee`;

    // var query_var = [name];

    db.query(query_str, function (err, results, fields) {
      // if (err) {
      //   console.log(err);
      //   // return reject(err);
      // }
      // console.log(results);
      console.log(results);
    });
    return;
};
 
module.exports = allEmp;
