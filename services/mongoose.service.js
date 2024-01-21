const { default: mongoose } = require("mongoose")
const config = require('../env.config')

 

 exports.connectToMongoDB = function () {
    mongoose.connect(config.CONNECTION_STRING).then(() => {
        console.log("Connected to MongoDB %s", config.CONNECTION_STRING)
    }).catch( (err) => {
        console.log("Failed to connect to the MongoDB database")
        console.log(err)
    })
 }

 exports.mongoose = mongoose