const express = require('express');
const router = express.Router();
const controller = require('../controllers/cars');
const { carValidationRules, validate } = require('./validator');
const { ensureAuth } = require('../middleware/auth');

router.get('/', controller.getAll);

router.get('/:id', controller.getCarById);

router.post('/', ensureAuth, carValidationRules(), validate, controller.createCar);

router.put('/:id', ensureAuth, carValidationRules(),validate ,controller.updateCar);

router.delete('/:id', ensureAuth, controller.deleteCar);

module.exports = router;