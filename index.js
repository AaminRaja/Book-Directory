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

let startServer = async () => {
    console.log(process.env.MONGO_URI);
    console.log(typeof process.env.MONGO_URI);
    try {
        await connectDataBase(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');

        const port = process.env.PORT || 5100;
        app.listen(port, () => {
            console.log(`Server is running at port: http://192.168.0.117:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer()