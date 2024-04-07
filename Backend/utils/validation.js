const { body } = require('express-validator')

exports.createValidator = [
    body('name', 'Invalid name length').isLength({min:3, max:30}),
    body('email', 'Invalid entry, Enter email').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Minimum 3 chars required').isLength({ min: 3 }),
    body('password', 'Maximum 30 chars allowed').isLength({ max: 30 }),
]

exports.loginValidator = [
    body('email', 'Invalid entry, Enter email').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Invalid entry, Enter password').not().isEmpty(),
]

