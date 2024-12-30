const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongouri)
        console.log('MongoDB connected successfully');
    }catch(error){
        console.error('MongoDB connection Error:', error.message);
        process.exit(1);
    }
}

module.exports = {
    connectDB
}