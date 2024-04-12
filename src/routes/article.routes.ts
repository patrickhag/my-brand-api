import { Router } from 'express'
import { ArticleController } from '../controllers/article.controller'
import { CommentController } from '../controllers/article.controller'
import { AuthMiddleWare } from '../middleware/auth.middleware'
import upload from '../middleware/multer.middleware'

const articleRouter = Router()

articleRouter.post(
  '/create-blog',
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  upload.single('image'),
  ArticleController.createArticle
)

articleRouter.put(
  '/update-blog/:id',
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  upload.single('image'),
  ArticleController.updateArticle
)

articleRouter.delete(
  '/delete-blog/:id',
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  ArticleController.deleteArticle
)

articleRouter.get('/', ArticleController.getArticles)

articleRouter.get('/:id', ArticleController.getArticle)

articleRouter.post(
  '/:articleId/like',
  AuthMiddleWare.isAuthenticated,
  ArticleController.likeArticle
)

articleRouter.post(
  '/:articleId/create-comment',
  CommentController.commentArticle
)

articleRouter.patch(
  '/:commentId/update-comment',
  AuthMiddleWare.isAuthenticated,
  CommentController.updateComment
)

articleRouter.delete(
  '/:commentId/delete-comment',
  AuthMiddleWare.isAuthenticated,
  CommentController.deleteComment
)

articleRouter.get(
  '/:articleId/all-comments',
  AuthMiddleWare.isAuthenticated,
  CommentController.getAllCommentsRelatedToArticle
)

export default articleRouter
