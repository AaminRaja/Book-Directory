const mongoose = require('mongoose');

const connectDataBase = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to database', error);
        throw error;
    }
};

module.exports = connectDataBase;
