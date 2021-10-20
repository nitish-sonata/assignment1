import express from 'express'
import { getAllCandidates, getCandidate, addCandidates } from '../controllers/candidates.js'
import { uploadFile } from '../middlewares/uploadExcel.js'

const router = express.Router()

router.route('/').get(getAllCandidates).post(uploadFile.single('file'), addCandidates)
router.route('/:id').get(getCandidate)

export default router
