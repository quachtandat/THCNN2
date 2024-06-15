const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("./iphones.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const express = require('express');
const app = express();
const db = admin.firestore();
const cors = require('cors');
app.use(cors({origin:true}));

//api
//Them thong tin
app.post('/iphones/post',(req,res)=>{
    (async ()=>{
        try
        {
            await db.collection('iphone').doc('/'+ req.body.id +'/').create({
                ten: req.body.ten, 
                color: req.body.color, 
                price: req.body.price, 
                hinh: req.body.hinh, 
                chip: req.body.chip, 
                ram: req.body.ram, 
                dungluong: req.body.dungluong, 
                sau: req.body.sau, 
                truoc: req.body.truoc, 
                pin: req.body.pin
            })
            return res.status(500).send();
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
//Doc thong tin theo id
app.get('/iphones/:id', (req,res) =>
{
    (async () => {
    try
    {
        const document = db.collection('iphone').doc(req.params.id);
        let product = await document.get();
        let response = product.data();

        return res.status(200).send(response);
    }
    catch
    {
        console.log(error);
        return res.status(500).send(error);
    }
})();
});
//Doc toan bo thong tin

app.get('/iphones',(req,res) =>
{
    (async() => {
        try
        {
            let query = db.collection('iphone');
            let response = [];

            await query.get().then(querySnashot => {
                let docs = querySnashot.docs;
                for (let doc of docs)
                {
                    const selectedItem = {
                        id: doc.id,
                        ten: doc.data().ten, 
                        color: doc.data().color, 
                        price: doc.data().price, 
                        hinh: doc.data().hinh, 
                        chip: doc.data().chip, 
                        ram: doc.data().ram, 
                        dungluong: doc.data().dungluong, 
                        sau: doc.data().sau, 
                        truoc: doc.data().truoc, 
                        pin: doc.data().pin
                    };
                    response.push(selectedItem);
                }
                return response;
            })
            return res.status(200).send(response);
        }
        catch
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
//Cap nhat thong tin
app.put('/iphones/:id',(req,res) =>
{
    (async () => {
        try
        {
            
            const document = db.collection('iphone').doc(req.params.id);
            
            await document.update({
                ten: req.body.ten, 
                color: req.body.color, 
                price: req.body.price, 
                hinh: req.body.hinh, 
                chip: req.body.chip, 
                ram: req.body.ram, 
                dungluong: req.body.dungluong, 
                sau: req.body.sau, 
                truoc: req.body.truoc, 
                pin: req.body.pin
                
            });
            return res.status(200).send();
        }
        catch
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
// Xóa thông tin
app.delete('/iphones/:id', (req,res) => {
    (async ()=>{
        try 
        {
        
            const document = db.collection('iphone').doc(req.params.id);
            await document.delete();
            return res.status(200).send();
                
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

exports.app = functions.https.onRequest(app);
    
// var server = app.listen(8000, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("Server is listening at http://%s:%s", host, port)
//     })
    