const dotenv = require('dotenv');
dotenv.config();
const {MongoClient} = require('mongodb');

let _db;

const initDB = (cb) => {
    if (_db) {
        console.log('Database already initialized!');
        return cb(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client)=>{
        _db = client;
        return cb(null, _db);
    })
    .catch((err) => {
        return cb(err);
    });
};


const getDatabase = () => {
    if (!_db) {
        throw Error('Database not initialized.');
    }
    return _db;
};

module.exports = {initDB, getDatabase}