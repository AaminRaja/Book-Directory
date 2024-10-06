let express = require('express')
let bookRoutes = require('./Routes/booksRouter')
let connectDataBase = require('./db/connectDB')
let cors = require('cors')
require('dotenv').config()

let app = express()
app.use(cors())
app.use(express.json())
app.use('/book', bookRoutes);

app.use("*", (req, res) => {
    res.json({ error: true, message: "Page not found" })
})

app.use((err, req, res, next) => {
    res.json({ error: true, message: err })
})

// let startServer = async () => {
//     try {
//         await (connectDataBase(process.env.MONGO_URI))
//         console.log('mongodb connected successfully');

//         app.listen(5100, () => {
//             console.log('server is running at port : http://localhost:5100');
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

let startServer = async () => {
    try {
        // Use the environment variable for MongoDB connection string
        await connectDataBase(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');

        // Use process.env.PORT to dynamically bind to the port provided by the hosting platform
        const port = process.env.PORT || 5100;  // Fallback to 5100 for local development
        app.listen(port, () => {
            console.log(`Server is running at port: http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};


startServer()