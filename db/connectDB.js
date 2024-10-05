let mongoose = require('mongoose')

let connectDataBase = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDataBase