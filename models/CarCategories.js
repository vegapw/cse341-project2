const mongodb = require('mongoose');

const CarCategoriesSchema = new mongodb.Schema({
    name:{
        type: String,
        required: true
    },
    pricePerDay:{
        type: Number,
        required: true
    },
    pricePerHour:{
        type: Number,
        required: true
    },
    depositAmount:{
        type: Number,
        required: true
    }
});


module.exports = mongodb.model('CarCategories', CarCategoriesSchema);