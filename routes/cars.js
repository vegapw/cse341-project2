const express = require('express');
const router = express.Router();
const controller = require('../controllers/cars');
const { carValidationRules, validate } = require('./validator');

router.get('/', controller.getAll);

router.get('/:id', controller.getCarById);

router.post('/', carValidationRules(), validate, controller.createCar);

router.put('/:id', carValidationRules(),validate ,controller.updateCar);

router.delete('/:id', controller.deleteCar);

module.exports = router;