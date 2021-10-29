const mysql = require("mysql2");
require("dotenv").config();
const util = require("util");

// Connect to database

//Using Promises
// class Database {
//   constructor(config) {
//     this.connection = mysql.createConnection(
//       {
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PW,
//         database: process.env.DB_NAME,
//       },
//       console.log(`Connected to the Content database.`)
//     );
//   }
//   query(sql, args) {
//     return new Promise((resolve, reject) => {
//       this.connection.query( sql, args, (err, rows) => {
//         if(err)
//           return reject(err);
//           resolve(rows);
//       });
//     });
//   }
//   close() {
//     return new Promise((resolve, reject) => {
//       this.connection.end( err => {
//         if(err)
//           return reject(err);
//         resolve();
//       });
//     });
//   }
// }

//Regular Connection
// const db = mysql.createConnection(
//   {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PW,
//     database: process.env.DB_NAME,
//   },
//   console.log(`Connected to the Content database.`)
// );

const config = { host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PW, database: process.env.DB_NAME}

function makeDb(config) {
  const connection = mysql.createConnection(
      {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
      },
      console.log(`Connected to the Content database.`)
    );
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    }
  };
}

const db = makeDb(config);

module.exports = db;