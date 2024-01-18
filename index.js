const router = require('router.config')
const config = require("env.config")

const express = require('express')
const app = express()

app.use(express.json())
router.routerConfig(app)

app.listen(config.port)
