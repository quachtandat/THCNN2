const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("./products.json");
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
app.post('/api/post',(req,res)=>{
    (async ()=>{
        try
        {
            await db.collection('sanpham').doc('/'+ req.body.id+'/').create({
                name: req.body.name,
                color: req.body.color,
                price: req.body.price,
                mota:req.body.mota
            })
            return res.status(200).send();
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
//Doc thong tin theo id
app.get('/api/sreach/:id', (req,res) =>
{
    (async () => {
    try
    {
        const document = db.collection('sanpham').doc(req.params.id);
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

app.get('/api/read',(req,res) =>
{
    (async() => {
        try
        {
            let query = db.collection('sanpham');
            let response = [];

            await query.get().then(querySnashot => {
                let docs = querySnashot.docs;
                for (let doc of docs)
                {
                    const selectedItem = {
                        id: doc.id,
                        name: doc.data().name,
                        color: doc.data().color,
                        price: doc.data().price,
                        mota:doc.data().mota
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
app.put('/api/update/:id',(req,res) =>
{
    (async () => {
        try
        {
            
            const document = db.collection('sanpham').doc(req.params.id);
            
            await document.update({
                name: req.body.name,
                color: req.body.color,
                price: req.body.price
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
app.delete('/api/delete/:id', (req,res) => {
    (async ()=>{
        try 
        {
        
            const document = db.collection('sanpham').doc(req.params.id);
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
    
var server = app.listen(8001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is listening at http://%s:%s", host, port)
    })
    