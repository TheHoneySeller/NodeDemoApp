const router = require('./router.config')
const config = require("./env.config")

const express = require('express')

//import exported data if available 


const app = express()

app.use(express.json())
router.routerConfig(app)

app.listen(config.port)
