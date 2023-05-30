import { usermodel } from "../../db/models/usermodel.js"
import bcrtpt from 'bcryptjs'
import { sendemail } from "../../services/sendemail.js"
import { tokenfunction } from "../../utils/Token.js"
export const signup = async (req,res)=>{
    try {
        const {firstname,lastname,username,email,password,cpass,age,gender}=req.body
    // check the email
    const emailcheck = await usermodel.findOne({email})
    if(!emailcheck)
    {
        // password haching
    const hashedpassword = bcrtpt.hashSync(password,+process.env.salt_round)
        // add user
    const newuser=new usermodel({
        firstname,
        lastname,
        username,
        email,
        password:hashedpassword,
        age,
        gender
    })
    // send confirmetion email
    const token = tokenfunction({payload:{user:newuser}})
        const conformationemail = `${req.protocol}://${req.headers.host}/api/v1/user/conformationemail/${token}`
        sendemail({to:newuser.email,
            message:`'<a href = ${conformationemail}> click to confirm </a>`,
            subject:'conformation email'})
        if(sendemail){
            res.json({ message: 'done', data: newuser })
        }else{
            res.json({ message: 'unknownn error' })
        }
    }else{
        res.json ({message:'email already exist'})
    }
    } catch (error) {
        res.json ({message:'catch error'})       
        console.log(error);
    }
}

export const conformition = async (req,res)=>{
    const {token}=req.params
    const decode = tokenfunction({payload:token,genrate:false})
    const conformiduser = new usermodel({...decode.user})
    await conformiduser.save()
    res.json ({message:'done try to log in'})
}

export const forgetpasswordmail = async (req,res)=>{
    const {email}=req.body
    // check the email
    const user = await usermodel.findOne({email})
    if (user){
    // send reset email
    const token = tokenfunction({payload:{user:user}})
        const resetemail = `${req.protocol}://${req.headers.host}/api/v1/user/resetemail/${token}`
        sendemail({to:user.email,
            message:`'<a href = ${resetemail}> click to confirm </a>`,
            subject:'reset email'})
        if(sendemail){
            res.json({ message: 'enter your new password' })
        }else{
            res.json({ message: 'unknownn error' })
        }
    }else{
        res.json ({message : 'mail not found'})
    }
}
export const forgetpassword= async (req,res)=>
{
try {
    const {_id}=req.headers
    const { newpassword,cpassword }= req.body
    const hashedpassword = bcrtpt.hashSync(newpassword,+process.env.salt_round)
    const user = await usermodel.findByIdAndUpdate ({_id},{password:hashedpassword})
    if (user) {
        res.json({ message: "done" })
    } else {
        res.json({ message: "error" })
    }
} catch (error) {
    res.json({message:'catch error'})
    console.log(error);
}
}
export const login = async (req,res)=>{
    try {
        const{username,email,password}=req.body
        if(email)
        {
            const user = await usermodel.findOne({email})
            if (user)
            {
                const pass= bcrtpt.compareSync(password,user.password)
                if (pass)
                {
                    const token = tokenfunction({payload:{user:user}})
                    const loged = await usermodel.updateOne(user,{logedin:true})
                    res.json ({message:'wellcome',data:token})
                }else{
                    res.json ({message:'wrong pass'})
                }
            }else{
                res.json ({message:'NOT FOUND'})
            }
        }else if (username){
            const user = await usermodel.findOne({username})
            if (user)
            {
                const pass= bcrtpt.compareSync(password,user.password)
                if (pass)
                {
                    const token = tokenfunction({payload:{user:user}})
                    const loged = await usermodel.updateOne(user, {logedin:true})
                    res.json ({message:'wellcome',data:token})
                }else{
                    res.json ({message:'wrong pass'})
                }
            }else{
                res.json ({message:'NOT FOUND'})
            }
        }else{
            res.json ({message:'please enter ur data'})
        }
    } catch (error) {
        res.json({message:'catch error'})
        console.log(error);
    }
}

export const logout = async (req,res)=>
{
    try {
        const {_id}=req.user
        const user = await usermodel.findOneAndUpdate(_id,{logedin:false})
        res.json({message:'done'})
    } catch (error) {
        res.json({message:'catch error'})
        console.log(error);
    }
}
export const deleteuser = async (req,res)=>{
    const {_id,password}=req.user
    const {password1}=req.body
    if(!password1)
    {
        res.json ({message:'please enter your password'})
    }else{
        const passwordcheck= bcrtpt.compareSync(password1,password)
        if (passwordcheck){
            const user = await usermodel.findByIdAndDelete(_id)
            res.json ({message:'done'})
        }else{
            res.json ({message:'please enter valid password'})
        }
    }

}

export const updatepassword= async (req,res)=>
{
try {
    const {_id,password}=req.user
    const { oldpassword, newpassword,cpassword }= req.body
    const check = bcrtpt.compareSync(oldpassword,password)
    if (check){
        const hashedpassword = bcrtpt.hashSync(newpassword,+process.env.salt_round)
        const user = await usermodel.findByIdAndUpdate ({_id},{password:hashedpassword})
        if (user) {
            res.json({ message: "done" })
        } else {
            res.json({ message: "error" })
        }
    }else{
        res.json({message:'wrong password'})
    }

} catch (error) {
    res.json({message:'catch error'})
    console.log(error);
}
}
