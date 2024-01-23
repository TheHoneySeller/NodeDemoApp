const router = require('./router.config')
const config = require("./env.config")


const mongooseService = require('./services/mongoose.service')

const express = require('express')
const cors = require('cors')

mongooseService.connectToMongoDB()

const app = express()

app.use(cors())

app.use(express.json())
router.routerConfig(app)

app.listen(config.PORT, () => console.log("Listening on port: %d", config.PORT))