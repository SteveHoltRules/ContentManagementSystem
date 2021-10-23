const inquirer = require("inquirer");
const allEmp = require("./db/index");

const allEmployees = () => {
   return inquirer.prompt([
       {
         type: "input",
         name: "title",
         message: "Do you want to pull all employees?",
         validate: (allEmps) => {
           if (allEmps) {
             return true;
           } else {
             return false;
           }
         },
       },
     ])
     .then((allEmps) => {
       return allEmp;
     });
};

allEmployees();

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
