import Sequelize from 'sequelize'
import { candidateModel } from '../../models/candidate.model.js'

const connectDB = (database, user, password) => {
    const sequelize = new Sequelize(database, user, password, {
        host: 'localhost',
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
    })
    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

    db.candidates = candidateModel(sequelize, Sequelize)
    return db
}

export { connectDB }
