import path from 'path'
import dotenv from 'dotenv'
import xlsxFile from 'read-excel-file/node/index.commonjs.js'
import { connectDB } from '../config/db/dbConnection.js'

dotenv.config()
const database = process.env.DB_NAME
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const Candidate = connectDB(database, user, password).candidates
const __dirname = path.resolve()

const validCTCs = ['EUR', 'USD', 'INR']

const getAllCandidates = (req, res) => {
    Candidate.findAll()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.',
            })
        })
}

const addCandidates = (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send('Please upload an excel file!')
        }
        const file = __dirname + '\\uploads\\' + req.file.filename
        xlsxFile(file).then((rows) => {
            // skip header
            rows.shift()

            let candidates = []
            try {
                rows.forEach((row) => {
                    if (!validCTCs.includes(row[4])) {
                        throw new Error('Currency could only be of type EUR, USD or INR')
                    }

                    let candidate_data = {
                        ctc: {
                            value: row[5] || 'NA',
                            ctcUnit: row[6] || 'NA',
                            ctcCurrency: row[4],
                        },
                        candidateExperience: row[3] || 'NA',
                        company: {
                            name: row[2] || 'NA',
                        },
                        location: {
                            city: row[10] || 'NA',
                        },
                        linkedIn: row[9] || 'NA',
                    }
                    let candidate = {
                        name: row[0],
                        email_id: row[7],
                        phone_number: row[8],
                        candidates_data: candidate_data,
                    }
                    candidates.push(candidate)
                })
                // console.log(candidates)
                Candidate.bulkCreate(candidates, {
                    validate: true,
                })
                    .then(() => {
                        res.status(200).send({
                            message: 'Uploaded the file successfully: ' + req.file.originalname,
                        })
                    })
                    .catch((error) => {
                        res.status(500).send({
                            message: 'Fail to import data into database!',
                            error: `${error.errors[0].message}. Please check the uploaded data. One or more values could be invalid.`,
                        })
                    })
            } catch (error) {
                //error in row itration
                return res.status(500).send({
                    message: 'Fail to import data into database!',
                    error: `${error.message}. Please check the uploaded data. One or more values could be invalid.`,
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Could not upload the file: ' + req.file.originalname,
        })
    }
    // res.send(`Let's addCandidates! ${req.body.name}`)
}

const getCandidate = (req, res) => {
    Candidate.findOne({
        where: {
            candidate_id: req.params.id,
        },
    })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: 'No data found with this id',
                })
            } else res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.',
            })
        })
}

export { getAllCandidates, addCandidates, getCandidate }
