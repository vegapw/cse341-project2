const express = require('express');
const router = express.Router();
const cars = require('./cars');
const swagger = require('./swagger');


router.use('/', swagger);

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hellows');
});

router.use('/cars', cars);

module.exports = router;