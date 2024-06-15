// import thu vien
var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');

var app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/hello", function(req,res){
res.send("Hello World");
})
//data
DANHMUC =[
    {"ma":1,"Tên danh mục":"THOI TRANG NAM", "img":"1.jpg","link":"https://shopee.vn/Th%E1%BB%9Di-Trang-Nam-cat.11035567"},
    {"ma":2,"Tên danh mục":"điện thoại", "img":"1.jpg","link":"https://shopee.vn/%C4%90i%E1%BB%87n-Tho%E1%BA%A1i-Ph%E1%BB%A5-Ki%E1%BB%87n-cat.11036030"},
    {"ma":3,"Tên danh mục":"thiết bi dien tu", "img":"1.jpg","link":"https://shopee.vn/Thi%E1%BA%BFt-B%E1%BB%8B-%C4%90i%E1%BB%87n-T%E1%BB%AD-cat.11036132"},
    {"ma":4,"Tên danh mục":"laptop", "img":"1.jpg","link":"https://shopee.vn/M%C3%A1y-T%C3%ADnh-Laptop-cat.11035954"},
    {"ma":5,"Tên danh mục":"may quay phim", "img":"1.jpg","link":"https://shopee.vn/M%C3%A1y-%E1%BA%A2nh-M%C3%A1y-Quay-Phim-cat.11036101"},
]

SINHVIEN =[
    { "masinhvien":1,"tensinhvien":"dat"},
    { "masinhvien":2,"tensinhvien":"d"},
    { "masinhvien":3,"tensinhvien":"da"},
    { "masinhvien":4,"tensinhvien":"at"}
]
//API
app.get( "/danhmuc", function(req,res){
    console.log(DANHMUC);
    res.send(DANHMUC);
})

app.get("/danhsachsinhvien",function(req,res){
    console.log(SINHVIEN);
    res.send(SINHVIEN);
})

app.post("/themsinhvien",function(req,res){
    const{mssv, tensv}=req.body
    const sv ={"masinhvien":mssv,"tensinhvien":tensv}
    res.send([...SINHVIEN, sv])
})

app.post()

var server = app.listen(5555, function () {
var host = server.address().address
var port = server.address().port
console.log("Server is listening at http://%s:%s", host, port)
})

