import { Router } from "express"
import { CrudController } from "../controllers/article.controller"
import { AuthMiddleWare } from "../middleware/authMiddleware"
import multer from "multer"

const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

router.post(
  "/create-blog",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  upload.single("file"),
  CrudController.createArticle
)
router.patch(
  "/update-blog/:id",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  CrudController.updateArticle
)

router.delete(
  "/delete-blog/:id",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  CrudController.deleteArticle
)

router.get("/all-articles", CrudController.getArticles)
router.get("/article/:id", CrudController.getArticle)

export default router
