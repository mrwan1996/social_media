import { Router } from "express";
import * as controllers from '../post_module/post.controller.js'
import { auth } from "../../middlewere/auth.js";
const postrouter= Router()

postrouter.get('/addpost',auth(),controllers.addpost)
postrouter.get('/mypost',auth(),controllers.mypost)
postrouter.get('/allpost',controllers.allposts)
postrouter.delete('/delete',auth(),controllers.deletepost)
postrouter.put('/like',auth(),controllers.like)
postrouter.put('/dislike',auth(),controllers.dislike)

export default postrouter