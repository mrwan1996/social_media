import Joi from 'joi'
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

export const signupvalidator = {
    body:Joi.object().required().keys({
    firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        username: Joi.string()
        .min(3)
        .max(30)
        .required(),
        gender: Joi.string()
        .alphanum()
        .required(),
    password:Joi.string().required().pattern(mediumRegex),
    cpass: Joi.ref('password'),
    age: Joi.number()
        .integer()
        .min(17)
        .max(60),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
}



