import mongoose from 'mongoose'
import 'dotenv/config'

export const connectMongoDB = async function(connectionURL: string){
    return await mongoose.connect(connectionURL);
}