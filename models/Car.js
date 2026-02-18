const mongodb = require('mongoose');

const CarSchema = new mongodb.Schema({
    make:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    odometer:{
        type: Number,
        required: true
    },
    horsepower:{
        type: Number,
        required: true
    },
    transmision:{
        type: String,
        required: true
    }
});


module.exports = mongodb.model('Car', CarSchema);