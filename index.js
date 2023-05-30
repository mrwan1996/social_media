import express from 'express'
import { config } from 'dotenv'
import * as allroutes from './index.routes.js'
import connection from './db/connection.js'
config()
connection()
const app = express()
const baseurl=process.env.base_url
app.use ( express.json())
app.use (`${baseurl}user`,allroutes.userroutes)
app.use (`${baseurl}post`,allroutes.postrouter)
app.use (`${baseurl}comment`,allroutes.commentrouter)

const port = process.env.port
app.listen (port , console.log(`server is running on port ${port}`))