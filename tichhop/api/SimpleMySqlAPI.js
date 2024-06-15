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
app.get('/iphones', function (req, res) {
    var sql = "SELECT * FROM iphones";
    con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
    });
    })
app.get('/iphones/:id', function (req, res) {
    const {id} = req.params
    var sql = "SELECT * FROM iphones where id="+id+""
    con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
});
})

app.post('/iphones', function (req, res) {
    const {id, ten, color, price, hinh, chip, ram, dungluong, sau, truoc, pin} = req.body
    //sample { id: 4, deviceName: 'DHT22' }
    var sql = "insert iphones values("+id+",'"+ten+"','"+price+"','"+color+"','"+hinh+"','"+chip+"','"+ram+"','"+dungluong+"','"+sau+"','"+truoc+"','"+pin+"');";
    con.query(sql, function(err, results) {
    if (err) throw err;
    res.send('Add device ok');
    });
    })

app.put('/iphones',function(req,res){
    const {id, ten, color, price, hinh, chip, ram, dungluong, sau, truoc, pin} = req.body
    var sql ="UPDATE iphones SET ten = '"+ten+"', price ='"+price+"', color ='"+color+"' , hinh ='"+hinh+"', chip ='"+chip+"', ram ='"+ram+"', dungluong ='"+dungluong+"', sau ='"+sau+"', truoc ='"+truoc+"', pin ='"+pin+"' WHERE id = "+id+"";
    con.query(sql, function(err, results) {
        if (err) throw err;
        res.send('Update device ok');
        });
})

app.delete('/iphones/:id', function(req, res){    
    const {id} = req.params
    var sql = "DELETE FROM iphones WHERE id= "+id+"";
    con.query(sql, function(err, results) {
        if (err) throw err;
        res.send("XOA SAN PHAM THANH CONG");
      
        });
})



    var server = app.listen(3001, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Server is listening at http://%s:%s", host, port)
    })
