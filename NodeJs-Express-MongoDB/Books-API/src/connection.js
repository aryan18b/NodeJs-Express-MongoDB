import mongoose from 'mongoose'
import 'dotenv/config'

export const connectMongoDB = async function(connectionURL){
    return await mongoose.connect(connectionURL);
}