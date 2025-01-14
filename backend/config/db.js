const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = 'mongodb+srv://arsalanahmed:password%40123@cluster0.86u7v.mongodb.net/Data_Visualization?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,  
            useCreateIndex: true,     
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
