const inquirer = require("inquirer");
const db = require("./db/Connection");

//With these defined here, then they can be referenced in the switch cases
let roles = [];
let employees = [];
let departments = [];

// function sqlQuery(query_str, params) {
//   try{ 
//   const otherRows = await db.query(query_str, params, (err, rows));
//   console.table(otherRows);
//   } catch (err) {
//     console.log(err);
//     return;
//   } finally {
//     await db.close();
//   };
// }

//How do I turn this into a promise statement?
function pullDataQuery(query_str, params) {
  var tempPull = [];
  try {
    const somerows = db.query(query_str, params);
    for (var i = 0; i < somerows.length; i++) {
      tempPull.push(somerows[i].name);
      console.log("Ln 29 Temp: ", tempPull);
    }
    if (query_str.includes("empRole")) {
      console.log("Ln 31 empRole: ", tempPull);
      roles = tempPull;
    } else if (query_str.includes("department")) {
      console.log("Ln 34 department: ", tempPull);
      departments = tempPull;
    } else {
      employees = tempPull;
    }
  } catch (err) {
    console.log(err);
    return;
  } finally {
    db.close();
  }
}

function fillData() {
  let updateRoles = `SELECT title FROM empRole`;
  let updateEmp = `SELECT last_name FROM employee`;
  let updateDep = `SELECT department FROM department`;

  // roles.push(pullDataQuery(updateRoles));
  employees.push(pullDataQuery(updateEmp));
  departments.push(pullDataQuery(updateDep));

  var roleObjList = [];
  // pullDataQuery(updateRoles).then(({data}) => {
  //   roleObjList.push(data)
  // });
  roleObjList.push(pullDataQuery(updateRoles));
  console.log("Ln 53 roleObjList: ", roleObjList);
  //My roleObjList is returning undefined. How can I reset it?
  // for(var i=0; i<roleObjList.length; i++) {
  //   var roleTemp = Object.values(roleObjList[i]);
  //   console.log("Ln 45 RoleTemp: ", roleTemp);
  // }
  // roleTemp = Object.values(roleObjList);
  // roles.push(roleTemp);
}

function allChoices() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
        ],
      },
    ])
    .then(({ choice }) => {
      console.log("Ln 42 DataChoice: ", choice);
      nextUpPrompt(choice);
    })
    .catch((err) => {
      if (err) throw err;
    });
}

// function nextUpPrompt(choice) {
//   let sql;
//   let params = [];

//   console.log("In Nextup Prompt: ", choice);

//   switch (choice) {
//     case "View All Employees":
//       console.log("View All Emp: ", choice);
//       sql = `SELECT * FROM employee`;
//       sqlQuery(sql);
//       allChoices();
//       break;
//     case "View All Employees By Manager":
//       inquirer
//         .prompt([
//           {
//             type: "list",
//             name: "manager",
//             message: "Select a manager to view their employees:",
//             choices: employees,
//           },
//         ])
//         .then(({ manager }) => {
//           let managerId = employees.indexOf(manager) + 1;
//           (sql = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee, role.title AS role FROM employee
//         JOIN role ON employee.role_id = role.id
//         WHERE employee.manager_id = ?`),
//             (params = [managerId]),
//             sqlQuery(sql, params);
//         });
//       sql = `SELECT * FROM employee`;
//       sqlQuery(sql);
//     case "Add Employee":
//       inquirer
//         .prompt([
//           {
//             type: "input",
//             name: "first_name",
//             message: "What is the first name?",
//           },
//           {
//             type: "input",
//             name: "last_name",
//             message: "What is the last name?",
//           },
//           {
//             type: "list",
//             name: "role",
//             message: "What is the role?",
//             choices: roles,
//           },
//           {
//             type: "list",
//             name: "department",
//             message: "What department?",
//             choices: departments,
//           },
//           {
//             type: "list",
//             name: "manager",
//             //How can the manager be referenced by the manager id?
//             message: "Who is the manager?",
//             choices: employees,
//           },
//         ])
//         .then(({ first_name, last_name, role, department, manager }) => {
//           sql = `INSERT INTO employee (first_name, last_name, role, department, manager) VALUE (?,?,?)`;
//           params = [first_name, last_name, role, department, manager];
//           sqlQuery(sql, params);
//         })
//         .catch((err) => {
//           if (err) throw err;
//         });
//     case "Add Department":
//     case "Add Role":
//     case "View All Roles":
//     case "Remove Employee":
//     case "Update Employee Role":
//     case "Update Employee Manager":
//   }
// }

fillData();
console.log(roles);
console.log(employees);
console.log(departments);
// allChoices();
