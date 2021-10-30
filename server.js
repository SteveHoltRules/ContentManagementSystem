const inquirer = require("inquirer");
const db = require("./db/Connection");

//With these defined here, then they can be referenced in the switch cases
let roles = [];
let employees = [];
let departments = [];

function sqlQuery(query_str, params) {
  db.query(query_str, params, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
  });
}

function pullDataQuery(query_str, key) {
  var tempPull = [];
  const queryPull = db.promise().query(query_str);
  queryPull
    .then((rows) => rows[0])
    .then((rows, err) => {
      console.log("Ln 25: Data: ", rows);
      if (err) {
        console.log(err);
        return;
      }
      // console.log(rows);
      for (var i = 0; i < rows.length; i++) {
        tempPull.push(rows[i][key]);
      }
      console.log("Ln 34 tempPull: ", tempPull);
      return tempPull;
    })
    .then((data) => {
      console.log("ln 37 Data: ", data);
      return data;
    });
}

function fillData() {
  const updateRoles = `SELECT title FROM empRole`;
  const updateEmp = `SELECT last_name FROM employee`;
  const updateDep = `SELECT department FROM department`;

  console.log("Ln 47 pulldataQuery: ", pullDataQuery(updateRoles, 'title'));
  // employees = pullDataQuery(updateEmp, "last_name");
  // departments = pullDataQuery(updateDep, "department");

  console.log("Ln 47 Roles: ", roles);
  console.log("Ln 48 Employeees: ", employees);
  console.log("Ln 49 Departments: ", departments);
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

function nextUpPrompt(choice) {
  let sql;
  let params = [];

  console.log("In Nextup Prompt: ", choice);

  switch (choice) {
    case "View All Employees":
      console.log("View All Emp: ", choice);
      sql = `SELECT * FROM employee`;
      sqlQuery(sql);
      allChoices();
      break;
    case "View All Employees By Manager":
      inquirer
        .prompt([
          {
            type: "list",
            name: "manager",
            message: "Select a manager to view their employees:",
            choices: employees,
          },
        ])
        .then(({ manager }) => {
          let managerId = employees.indexOf(manager) + 1;
          (sql = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee, role.title AS role FROM employee
        JOIN role ON employee.role_id = role.id
        WHERE employee.manager_id = ?`),
            (params = [managerId]),
            sqlQuery(sql, params);
        });
      sql = `SELECT * FROM employee`;
      sqlQuery(sql);
    case "Add Employee":
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the last name?",
          },
          {
            type: "list",
            name: "role",
            message: "What is the role?",
            choices: roles,
          },
          {
            type: "list",
            name: "department",
            message: "What department?",
            choices: [...departments],
          },
          {
            type: "list",
            name: "manager",
            //How can the manager be referenced by the manager id?
            message: "Who is the manager?",
            choices: employees,
          },
        ])
        .then(({ first_name, last_name, role, department, manager }) => {
          sql = `INSERT INTO employee (first_name, last_name, role, department, manager) VALUE (?,?,?)`;
          params = [first_name, last_name, role, department, manager];
          sqlQuery(sql, params);
        })
        .catch((err) => {
          if (err) throw err;
        });
    case "Add Department":
    case "Add Role":
    case "View All Roles":
    case "Remove Employee":
    case "Update Employee Role":
    case "Update Employee Manager":
  }
}

// fillData();

fillData();
allChoices();
