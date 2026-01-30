const {body, validationResult} = require('express-validator');
const carValidationRules = () => {
    return [
        body('year').isInt({gt:1500}).withMessage('Must be a valid year.'),
        body('odometer').isInt({min:0}).withMessage('Odometer Must be a number greater than zero.'),
        body('horsepower').isInt({gt:0}).withMessage('HorsePower Must be greater than zero.'),
        body('transmision').toLowerCase().isIn(["manual","automatic"]).withMessage('Wrong type of transmision.')
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map( err => extractedErrors.push( {[err.param] : err.msg}));
    return res.status(422).json( {errors : extractedErrors, });
};

module.exports = { carValidationRules, validate }