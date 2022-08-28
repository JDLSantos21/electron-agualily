const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  // localAddress:'10.0.0.98',
  user: 'root',
  password: '',
  database: 'agualily'
})

function getConnection() {
  return connection;
}


module.exports = {getConnection};

// const connection = mysql.createConnection({
//   host: 'SERVIDORLILY',
//   localAddress:'10.0.0.98',
//   user: 'despacho',
//   password: 'despachoDB021',
//   database: 'agualily'
// })