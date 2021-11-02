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

function pullDataQuery() {
  var roleTemp = [];
  var depTemp = [];
  var empTemp = [];

  const updateRoles = `SELECT title FROM empRole`;
  const updateDep = `SELECT department FROM department`;
  const updateEmp = `SELECT last_name FROM employee`;

  const employeeRole = db.promise().query(updateRoles);
  employeeRole
    .then((rows) => rows[0])
    .then((rows, err) => {
      roleTemp.length = 0;
      // console.log("Ln 29: Data: ", rows);
      if (err) {
        console.log(err);
        return;
      }
      // console.log(rows);
      for (var i = 0; i < rows.length; i++) {
        roleTemp.push(rows[i]["title"]);
      }
      return roleTemp;
    })
    .then((data) => {
      // console.log("ln 43 Data: ", data);
      roles = data;
      // console.log("ln 45 roles: ", roles);
      return roles;
    });
  const departmentTemp = db.promise().query(updateDep);
  departmentTemp
    .then((rows) => rows[0])
    .then((rows, err) => {
      depTemp.length = 0;
      // console.log("Ln 50: Data: ", rows);
      if (err) {
        console.log(err);
        return;
      }
      // console.log(rows);
      for (var i = 0; i < rows.length; i++) {
        depTemp.push(rows[i]["department"]);
      }
      return depTemp;
    })
    .then((data) => {
      // console.log("ln 64 Data: ", data);
      departments = data;
      // console.log("ln 67 departments: ", departments);
      return departments;
    });
  const employeeTemp = db.promise().query(updateEmp);
  employeeTemp
    .then((rows) => rows[0])
    .then((rows, err) => {
      empTemp.length = 0;
      // console.log("Ln 71: Data: ", rows);
      if (err) {
        console.log(err);
        return;
      }
      // console.log(rows);
      for (var i = 0; i < rows.length; i++) {
        empTemp.push(rows[i]["last_name"]);
      }
      return empTemp;
    })
    .then((data) => {
      // console.log("ln 89 Data: ", data);
      employees = data;
      // console.log("ln 91 Last Name: ", employees);
      return employees;
    });
}

// function fillData() {
//This function gets stuck in a promise where it is called prior to the data return. I can't figure it out.
//For now I will leave it in while I merge two functions to replace the split functions
// const updateRoles = `SELECT title FROM empRole`;
// const updateEmp = `SELECT last_name FROM employee`;
// const updateDep = `SELECT department FROM department`;

// roles = pullDataQuery(updateRoles, 'title')
// employees = pullDataQuery(updateEmp, "last_name");
// departments = pullDataQuery(updateDep, "department");

// console.log("Ln 47 Roles: ", roles);
// console.log("Ln 48 Employeees: ", employees);
// console.log("Ln 49 Departments: ", departments);
// }

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
          (sql = `SELECT employee.id, (employee.last_name) AS employee, empRole.title AS role FROM employee
        JOIN role ON employee.role_id = role.id
        WHERE employee.manager_id = ?`),
            (params = [managerId]),
            sqlQuery(sql, params);
        });
    case "View All Roles":
      console.log("View All Emp: ", choice);
      sql = `SELECT * FROM empRoles`;
      sqlQuery(sql);
      allChoices();
      break;
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
            name: "manager",
            //How can the manager be referenced by the manager id?
            message: "Who is the manager?",
            choices: employees,
          },
        ])
        .then(({ first_name, last_name, role, manager }) => {
          let roleId = roles.indexOf(role) + 1;
          let managerId;
          managerId = employees.indexOf(manager) + 1;
          sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?,?,?,?)`;
          params = [first_name, last_name, roleId, managerId];
          sqlQuery(sql, params);
          pullDataQuery();
          allChoices();
        })
        .catch((err) => {
          if (err) throw err;
        });
    case "Add Department":
      inquirer
        .prompt([
          {
            type: "input",
            name: "department",
            message: "What is the name of the new department?",
          },
          {
            type: "input",
            name: "description",
            message: "What is the new department's description?",
          },
        ])
        .then(({ department, description }) => {
          sql = `INSERT INTO department (department, description) VALUE (?,?)`;
          params = [department, description];
          sqlQuery(sql, params);
          pullDataQuery();
          allChoices();
        });
    case "Add Role":
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the name of the new role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?",
          },
          {
            type: "list",
            name: "department",
            message: "In which department does the role belong?",
            choices: departments,
          },
        ])
        .then(({ title, salary, department }) => {
          let departmentId = departments.indexOf(department);
          sql = `INSERT INTO empRole (title, salary, department_id) VALUE (?,?,?)`;
          params = [title, salary, departmentId];
          sqlQuery(sql, params);
          pullDataQuery();
          allChoices();
        });
    case "Remove Employee":
      console.log("Remove Employee: ", choice);
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Select an employee to remove:",
            choices: employees,
          },
        ])
        .then(({ employee }) => {
          let employeeId = employees.indexOf(employee);
          console.log(employeeId);
          sql = `DELETE FROM employee WHERE employee.id = ?`,
          params = [employeeId],
          sqlQuery(sql, params);
          pullDataQuery();
          allChoices();
        });
    case "Update Employee Role":
            console.log("Remove Employee: ", choice);
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Select an employee to remove:",
            choices: employees,
          },
        ])
        .then(({ employee }) => {
          let employeeId = employees.indexOf(employee);
          console.log(employeeId);
          sql = `DELETE FROM employee WHERE employee.id = ?`,
          params = [employeeId],
          sqlQuery(sql, params);
          pullDataQuery();
          allChoices();
        });
    case "Update Employee Manager":
            console.log("Remove Employee: ", choice);
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Select an employee:",
            choices: employees,
          },
          {
            type: "list",
            name: "manager",
            message: "Select a new manager:",
            choices: employees,
          },
        ])
        .then(({ employee, manager }) => {
          let employeeId = employees.indexOf(employee);
          let managerId = employees.indexOf(manager);
          console.log(employeeId);
          console.log(managerId);
          sql = `UPDATE employee SET manager_id = ?, WHERE employee.id = ?`,
          params = [managerId, employeeId],
          sqlQuery(sql, params);
          pullDataQuery();
          allChoices();
        });
  }
}

// fillData();

pullDataQuery();
allChoices();
