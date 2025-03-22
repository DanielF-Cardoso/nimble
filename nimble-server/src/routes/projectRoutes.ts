import { Router } from 'express'
import {
  createProjects,
  getProjectById,
  getProjects,
} from '../controllers/projectController'

const router = Router()

router.get('/', getProjects)
router.post('/', createProjects)
router.get('/:projectId', getProjectById)

export default router
