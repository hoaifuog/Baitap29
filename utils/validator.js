let { body, validationResult } = require('express-validator')
let constants = require('./constants')
let util = require('util')

let options = {
    password:{
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    },
    username:{
        minLength: 6
    }
}

module.exports = {
    validate: function (req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            CreateErrorResponse(res, 400, errors.array())
        } else {
            next();
        }
    },
    SignUpValidator: [
        body("username").isLength(options.username).withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME,options.username.minLength)),
        body("password").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
            options.password.minLength,
            options.password.minLowercase,
            options.password.minUppercase,
            options.password.minNumbers,
            options.password.minSymbols)),
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL)
    ],
    LoginValidator: [
        body("username").isLength(options.username).withMessage("username hoac password sai"),
        body("password").isStrongPassword(option.password).withMessage("username hoac password sai")
    ],

    ChangePasswordValidator: [
        body('oldpassword')
            .isLength({ min: options.password.minLength })
            .withMessage('Mật khẩu cũ không hợp lệ'),
        body('newpassword')
            .isStrongPassword(options.password)
            .withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
                options.password.minLength,
                options.password.minLowercase,
                options.password.minUppercase,
                options.password.minNumbers,
                options.password.minSymbols))
    ],

    ForgotPasswordValidator: [
        body('email')
            .isEmail()
            .withMessage(constants.VALIDATOR_ERROR_EMAIL)
    ],

    ResetPasswordValidator: [
        body('password')
            .isStrongPassword(options.password)
            .withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
                options.password.minLength,
                options.password.minLowercase,
                options.password.minUppercase,
                options.password.minNumbers,
                options.password.minSymbols))
    ],
    CreateUserValidator: [
        body('username')
            .isLength(options.username)
            .withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME, options.username.minLength)),
        body('password')
            .isStrongPassword(options.password)
            .withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
                options.password.minLength,
                options.password.minLowercase,
                options.password.minUppercase,
                options.password.minNumbers,
                options.password.minSymbols)),
        body('email')
            .isEmail()
            .withMessage(constants.VALIDATOR_ERROR_EMAIL),
        body('role')
            .isIn(constants.USER_PERMISSION)
            .withMessage('Vai trò không hợp lệ')
    ],

    UpdateUserValidator: [
        body('username')
            .optional()
            .isLength(options.username)
            .withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME, options.username.minLength)),
        body('email')
            .optional()
            .isEmail()
            .withMessage(constants.VALIDATOR_ERROR_EMAIL),
        body('role')
            .optional()
            .isIn(constants.USER_PERMISSION)
            .withMessage('Vai trò không hợp lệ')
    ],

    DeleteUserValidator: [
        param('id')
            .isUUID()
            .withMessage('ID không hợp lệ')
    ],

}
// multer