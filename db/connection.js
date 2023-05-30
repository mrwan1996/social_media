import mongoose from 'mongoose';
import { config } from 'dotenv';
config()
const connection = async()=>
{
    return await mongoose
    .connect(process.env.connection)
    .then(() => console.log('Connected!'))
    .catch((error)=> console.log('cant connect',error))

}

export default connection