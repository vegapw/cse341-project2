const express = require('express');
const router = express.Router();
const controller = require('../controllers/carCategories');
const { categoriesValidationRules, validate } = require('./validator');
const { ensureAuth } = require('../middleware/auth');

router.get('/', controller.getAll);

router.get('/:id', controller.getCategoryById);

router.post('/', ensureAuth, categoriesValidationRules(), validate, controller.createCarCategory);

router.put('/:id', ensureAuth, categoriesValidationRules(),validate ,controller.updateCarCategory);

router.delete('/:id', ensureAuth, controller.deleteCarCategory);

module.exports = router;