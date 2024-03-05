import { Router } from "express"
import { ArticleController } from "../controllers/article.controller"
import { CommentController } from "../controllers/article.controller"
import { AuthMiddleWare } from "../middleware/auth.middleware"

const router = Router()

router.post(
  "/create-blog",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  ArticleController.createArticle
)

router.patch(
  "/update-blog/:id",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  ArticleController.updateArticle
)

router.delete(
  "/delete-blog/:id",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  ArticleController.deleteArticle
)

router.get("/", AuthMiddleWare.isAuthenticated, ArticleController.getArticles)

router.get("/:id", AuthMiddleWare.isAuthenticated, ArticleController.getArticle)

router.post(
  "/:articleId/like",
  AuthMiddleWare.isAuthenticated,
  ArticleController.likeArticle
)

router.patch(
  "/comments/:commentId/update-comment",
  AuthMiddleWare.isAuthenticated,
  CommentController.updateComment
)

router.delete(
  "/comments/:commentId/delete-comment",
  AuthMiddleWare.isAuthenticated,
  CommentController.deleteComment
)

export default router
