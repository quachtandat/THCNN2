var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var mysql = require('mysql'); //npm install mysql

var app = express();
app.use(cors());
app.use(bodyParser.json());

//MYSQL
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root123",
    insecureAuth : true,
    database: "nodejs_api"
});

// in workbench
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY

con.connect(function(err) {
    if (err) {
      console.error(err);
    }else{
        console.log("connected")
    }
  });
app.get('/products', function (req, res) {
    var sql = "SELECT * FROM products";
    con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
    });
    })
    app.get('/products/:id', function (req, res) {
    const {id} = req.params
    var sql = "SELECT * FROM products where id="+id+""
    con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
});
})

app.post('/devices', function (req, res) {
    const {id, ten, color, price} = req.body
    //sample { id: 4, deviceName: 'DHT22' }
    var sql = "insert products values("+id+",'"+ten+"','"+color+"','"+price+"');";
    con.query(sql, function(err, results) {
    if (err) throw err;
    res.send('Add device ok');
    });
    })

app.put('/sua',function(req,res){
    const {id, ten, color, price} = req.body
    var sql ="UPDATE products SET ten = '"+ten+"', color = '"+color+"', price ='"+price+"'  WHERE id = "+id+"";
    con.query(sql, function(err, results) {
        if (err) throw err;
        res.send('Update device ok');
        });
})

app.delete("/del", function(req, res){    
    const {id} = req.body
    var sql = "DELETE FROM products WHERE id= "+id+"";
    con.query(sql, function(err, results) {
        if (err) throw err;
        res.send('DELTE device ok');
        });
})



    var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Server is listening at http://%s:%s", host, port)
    })
