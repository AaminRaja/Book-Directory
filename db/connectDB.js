// let mongoose = require('mongoose')

// let connectDataBase = (url) => {
//     return mongoose.connect(url)
// }

// module.exports = connectDataBase

// &&&&&&&

const mongoose = require('mongoose');

const connectDataBase = async (uri) => {
    // console.log(uri);
    try {
        // await mongoose.connect(uri, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });

        await mongoose.connect(uri)
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to database', error);
        throw error;
    }
};

module.exports = connectDataBase;
