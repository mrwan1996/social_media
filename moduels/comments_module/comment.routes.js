import { Router } from "express";
import * as controllers from '../comments_module/comment_controler.js'
import { auth } from "../../middlewere/auth.js";
const commentrouter= Router()
commentrouter.get('/addcomment',auth(),controllers.addcomment)
commentrouter.get('/getcomment',controllers.getcomment)
commentrouter.delete('/deletecomment',auth(),controllers.deletecomment)

export default commentrouter