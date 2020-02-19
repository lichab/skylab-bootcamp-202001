const express = require('express')
const path = require('path')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')

logger.level = logger.DEBUG
logger.path = path.join('./server.log')

const { argv: [, , port = 8080] } = process

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)
    process.exit(0)
})