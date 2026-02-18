const express = require('express');
const router = express.Router();
const cars = require('./cars');
const categories = require('./carCategories');
const swagger = require('./swagger');
const auth = require('./auth');


router.use('/', swagger);

router.get('/', (req, res) => {
    //#swagger.tags=['Root']
    res.send(req.session.passport !== undefined ? "Logged in":"Logged out");
});

router.use('/google', auth);

router.use('/cars', cars);

router.use('/carCategories', categories);

module.exports = router;