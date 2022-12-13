// get the client
// const mysql = require('mysql2');
import mysql from 'mysql2/promise';
// create the connection to database
console.log("creating connect pool ");
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejs'
});

// simple query


export default pool;