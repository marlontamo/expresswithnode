const express = require('express');
const app = express();

app.use(express.json());

const customers = [
{id:1, name:'customer1'},
{id:2, name:'customer2'},
{id:3, name:'customer3'},
{id:4, name:'customer4'},
{id:5, name:'customer5'},
];
 
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