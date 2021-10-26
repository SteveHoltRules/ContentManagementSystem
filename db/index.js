// const inquirer = require("inquirer");
// const mysql = require("mysql2");
const db = require("./Connection");

// const allEmp = db.connect(function (err) {
//   db.query("SELECT * FROM employee", function (err, result, fields) {
//     console.log(result);
//   });
// });

let departments = [];

function allEmp() {
    const departmentsTemp = [];
    var query_str = `SELECT * FROM employee`;

    db.query(query_str, function (err, results, fields) {
      if(!err) {
        for (var i = 0; i < results.length; i++) {
          departmentsTemp.push(results[i].name);
        }
        departments = departmentsTemp;
      } else { 
        console.log(err);
        return;
      }
    });
    return;
};
 
module.exports = allEmp;
