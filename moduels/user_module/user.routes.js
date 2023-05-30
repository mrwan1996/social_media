import { Router } from "express";
import { auth } from "../../middlewere/auth.js";
import { validation } from "../../middlewere/validation.js";
import { loginvalidator } from "../../utils/loginvalidator.js";
import { signupvalidator } from "../../utils/uservalidation.js";
import * as controllers from './usercontroller.js'
const userrouter= Router()

userrouter.post('/adduser',validation(signupvalidator),controllers.signup)
userrouter.get('/conformationemail/:token',controllers.conformition)
userrouter.post('/login',validation(loginvalidator),controllers.login)
userrouter.post('/logout',auth(),controllers.logout)
userrouter.delete('/delete',auth(),controllers.deleteuser)
userrouter.get('/resetemail',controllers.forgetpasswordmail)
userrouter.put('/forgetpassword/:token',controllers.forgetpassword)
userrouter.put('/updatepassword',auth(),controllers.updatepassword)

export default userrouter