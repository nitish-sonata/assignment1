import express from 'express'
import candidates from './routes/candidates.route.js'
import { connectDB } from './config/db/dbConnection.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.APP_PORT || 3000
const database = process.env.DB_NAME
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/candidates', candidates)

app.get('/', (req, res) => {
    res.send(`Let's go!!`)
})

const startApp = async () => {
    try {
        await connectDB(database, user, password)
            .sequelize.sync({ force: true })
            .then(() => {
                console.log('Drop and re-sync db.')
            })
        app.listen(port, () => {
            console.log(`Server sucessfully started on port ${port}`)
        })
    } catch (error) {
        console.error(error)
    }
}

startApp()
