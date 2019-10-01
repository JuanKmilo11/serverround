var mysq = require('mysql');

module.exports  =()   =>{
  return mysq.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database: 'santoto',
    port : 3306
  })
}
