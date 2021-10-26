const inquirer = require("inquirer");
const db = require("./db/Connection");
const mysql = require("mysql2");
const allEmp = require("./db/index");

//With these defined here, then they can be referenced in the switch cases
let roles = [];
let employees = [];
let departments = [];

function sqlQuery(query_str, params) {
  db.query(query_str, params, function (err, results) {
    if (err) {
      console.log(err);
      return;
    } console.log("Completed Query")
  })
};

function allEmployees() {
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
          "Update Employee Manager"
        ],
      },
    ])
    .then(({ datachoice}) => {
      nextUpPrompt(datachoice);
      }).catch(err => {
        if(err) throw err;
      })
};

function nextUpPrompt(choice) {
  let sql;
  let params = [];

  switch(choice) {
    case 'View All Employees':
      sql = `SELECT * FROM department`
      sqlQuery(sql);
      break;
    case 'View All Employees By Manager':
      inquirer.prompt([
        {
          type: 'list',
          name: 'manager',
          message: 'Select a manager to view their employees:',
          choices: employees
        }
      ]).then(({ manager }) => {
        let managerId = employees.indexOf(manager)+1;
        sql = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee, role.title AS role FROM employee
        JOIN role ON employee.role_id = role.id
        WHERE employee.manager_id = ?`,
        params = [managerId],
        sqlQuery(sql, params);
        break;
      })
      sql = `SELECT * FROM employee`
      sqlQuery(sql);
      break;
    case 'Add Employee':
      inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the first name?'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the last name?'
      },      
      {
        type: 'list',
        name: 'role',
        message: 'What is the role?',
        choices: roles
      },
      {
        type: 'list',
        name: 'department',
        message: 'What department?',
        choices: departments
      },
      {
        type: 'list',
        name: 'manager',
        //How can the manager be referenced by the manager id?
        message: 'Who is the manager?',
        choices: employees
      }
    ])
      .then(({first_name, last_name, role, department, manager}) => {
        sql = `INSERT INTO employee (first_name, last_name, role, department, manager) VALUE (?,?,?)`;
        params = [first_name, last_name, role, department, manager];
        sqlQuery(sql, params);
      }).catch(err => {
        if(err) throw err;
      })
      break;
    case 'Add Department':
    case 'Add Role':
    case 'View All Roles':
    case 'Remove Employee':
    case 'Update Employee Role':
    case 'Update Employee Manager':
  }

  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message"
    }
  ])
}

function updateTables() {
  const departmentTemp = [];
  const rolesTemp = [];
  const employeeTemp = [];

  allEmp();

}

allEmployees();

// const empName = () => {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "name",
//         message: "What is the employee name?",
//         validate: (employeeName) => {
//           if (!employeeName) {
//             console.log("Please enter the employee name");
//             return false;
//           } else {
//             return true;
//           }
//         },
//       },
//     ])
//     .then(({ name }) => {
//       if (role === "Manager") {
//         inquirer
//           .prompt({
//             type: "number",
//             name: "officeNumb",
//             message: "What is the office number of this manager?",
//           })
//           .then(({ officeNumb }) => {
//             this.manager = new Manager(name, id, email, officeNumb);
//             employeeData.push(this.manager);
//             console.log("Employee Data:", employeeData);
//             restart();
//           });
//       }
//     });
// };

// const apiRoutes = require("./routes/apiRoutes");
// const PORT = process.env.PORT || 3001;
// const app = express();

// //Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use("/api", apiRoutes);

// app.use((req, res) => {
//   res.status(404).end();
// });

// db.connect((err) => {
//   if(err) throw err;
//   console.log("Database connected");
//   app.listen(PORT, () => {
//     console.log(`Server running on ${PORT}!`);
//   });
// });
