import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import sequelizeConn from './services/sequelize'

import astronautsRoute from './routes/astronauts'

import errorMiddleware from './middlewares/error'


const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/astronauts', astronautsRoute)

app.use(errorMiddleware)

const startApp = async () => {
    try {
        if (process.env.APP_STATE === "prod") {
            await sequelizeConn.sync()
        } else {
            await sequelizeConn.sync({ force: true })
        }

        app.listen(process.env.PORT, () => {
            console.log(`Listen on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
startApp()