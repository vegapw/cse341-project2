const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const connectDB = require('./data/db');
const env = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

env.config();
const port = process.env.PORT || 3001;

require('./config/passport')(passport);

connectDB();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app .use(bodyParser.json())
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(session({
        secret: 'secretfv',
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']}))
    .use(cors({ origin: '*'}))
    .use('/', routes);

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught Exception: ${err}\n` + `Exception Origin: ${origin}`);
});


app.listen(port, () => {
    console.log(`Running on port: ${port} in ${process.env.NODE_ENV} mode`);
});

/*mongoDB.initDB((err) => {
    if (err){
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Running on port: ${port} in ${process.env.NODE_ENV} mode`);
        });
    }
});
*/