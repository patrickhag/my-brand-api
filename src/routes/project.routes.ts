import { Router } from 'express'
import { ProjectController } from '../controllers/project.controller'
import { AuthMiddleWare } from '../middleware/auth.middleware'
import upload from '../middleware/multer.middleware'

const projectRoutes = Router()

projectRoutes.post(
  '/create-project',
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  upload.single('image'),
  ProjectController.createProject
)

projectRoutes.put(
  '/update-project/:id',
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  ProjectController.updateProject
)

projectRoutes.delete(
  '/delete-project/:id',
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  ProjectController.deleteProject
)

projectRoutes.get('/', ProjectController.getProjects)

projectRoutes.get('/:id', ProjectController.getProject)

export default projectRoutes
