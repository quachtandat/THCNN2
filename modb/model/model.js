const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    ten: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    color: {
        required: true,
        type: String
    }
})
datas=[
    {"id":"1","ten":"Iphone X","price":"30000000","color":"trang"},
    {"id":"2","ten":"Iphone 13","price":"50000000","color":"trang"}
]

module.exports = mongoose.model('Data', dataSchema)