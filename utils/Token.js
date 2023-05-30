import jwt from "jsonwebtoken"
import { config } from 'dotenv'
config()
export const tokenfunction = (
{
payload = {},
signuture = process.env.key,
genrate = true
}
)=>{
if (genrate , typeof payload == 'object')
{
   const token = jwt.sign(payload,signuture)
   return token 
}else{
    const decode = jwt.verify (payload,signuture)
    return decode

}
}