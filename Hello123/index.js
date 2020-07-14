const express = require('express');
const app = express();
const mysql = require('mysql');
const BodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'demoproject'
});
 
connection.connect();
app.use(BodyParser.json())
app.use(express.json());

const customers = [
{id:1, name:'customer1'},
{id:2, name:'customer2'},
{id:3, name:'customer3'},
{id:4, name:'customer4'},
{id:5, name:'customer5'},
];
 //connect to mysql
 //get all inserted data from mysqldb
 app.get('/orders', (req,res) =>{
  connection.query('SELECT * FROM orders', function (error, results, fields) {
    if (error) throw error;
    res.header("Content-Type",'application/json');
        res.send(JSON.stringify(results, null, 4));
 
  });
 });
 //insertig data to mysql db
 app.post('/orders', (req, res) => {
    
    connection.query("INSERT INTO orders (name, price) VALUES (?,?)", [req.body.name , req.body.price], function (err, result, fields){
        if (err) throw err;
        // if there is no error, you have the result
        console.log(result);
     });
 });


// listing all customers
app.get('/api/customers', function (req, res) {
    res.send(customers);
  });
  
//inserting data
app.post('/api/customer', function(req, res){
    const customer = {
        id:customers.length + 1,
        name: req.body.name
    };
    customers.push(customer);
    res.send(customer);
});
 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`) );