const mongoose = require('mongoose')
require('dotenv/config')

exports.connectMongoDB = async function(connectionURL){
    return await mongoose.connect(connectionURL);
}