const inquirer = require("inquirer");

const allEmp = require("./db/index");

const allEmployees = () => {
   inquirer
     .prompt([
       {
         type: "input",
         name: "title",
         message: "Do you want to pull all employees?",
         validate: (name) => {
           if (!name) {
             return false;
           } else {
             return true;
           }
         },
       },
     ])
     .then(() => {
       return allEmp('*', null);
     });
};

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
