import Joi from 'joi'
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

export const loginvalidator = {
    body:Joi.object().required().keys({
    username: Joi.string()
        .min(3)
        .max(30)
        .optional(),
    password:Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
}



