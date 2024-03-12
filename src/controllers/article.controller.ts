import { Request, Response } from "express"
import { articleModel as Article } from "../models/article.model"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../helper/jwtSecret"
import { Types } from "mongoose"
import { commentModel as Comment } from "../models/comment.model"
import fs from "fs"
import blogSchema from "../validations/article.validation"

type User = {
  userId: string
  role: string
  email: string
}

export class ArticleController {
  static async createArticle(req: Request, res: Response) {
    try {
      const { title, summary, body } = req.body
      const image = req.file ? req.file.path : null

      const { error } = blogSchema.validate(req.body)

      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.details[0].message,
        })
      }

      const createdArticle = await Article.create({
        title,
        summary,
        body,
        cover: image,
      })

      return res.status(200).json({
        status: "success",
        data: createdArticle,
        msg: "Article successfully created!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async updateArticle(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { title, summary, body } = req.body
      let image = null

      if (req.file) {
        const oldArticle = await Article.findById(id)
        if (oldArticle && oldArticle.cover) {
          fs.unlinkSync(oldArticle.cover)
        }
        image = req.file.path
      }

      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        {
          title,
          summary,
          body,
          cover: image,
        },
        { new: true }
      )

      if (!updatedArticle) {
        return res.status(404).json({ msg: "Article not found" })
      }

      return res.status(200).json({
        status: "success",
        data: updatedArticle,
        msg: "Article successfully updated!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async deleteArticle(req: Request, res: Response) {
    try {
      const { id } = req.params

      const foundArticle = await Article.findById(id)

      if (foundArticle && foundArticle.cover) {
        fs.unlinkSync(foundArticle.cover)
      }

      const deletedArticle = await Article.findByIdAndDelete(id)

      if (!deletedArticle) {
        return res.status(404).json({ msg: "Article not found" })
      }

      return res.status(200).json({
        status: "success",
        msg: "Article successfully deleted!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async getArticles(req: Request, res: Response) {
    try {
      const articles = await Article.find()

      return res.status(200).json({
        status: "success",
        data: articles,
        msg: "Articles retrieved successfully!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async getArticle(req: Request, res: Response) {
    try {
      const { id } = req.params
      const article = await Article.findById(id)

      if (!article) {
        return res.status(404).json({ msg: "Article not found" })
      }

      return res.status(200).json({
        status: "success",
        data: article,
        msg: "Article retrieved successfully!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async likeArticle(req: Request, res: Response) {
    try {
      const { articleId } = req.params
      const authorization = req.headers.authorization as string
      const token = authorization.split(" ")[1]
      const user = jwt.verify(token, JWT_SECRET) as User
      const userId = new Types.ObjectId(user.userId)

      const article = await Article.findById(articleId)

      if (article?.likes.includes(userId)) {
        return res.status(400).json({ msg: "You already liked this article." })
      }

      article?.likes.push(userId)

      await article?.save()

      return res.status(200).json({ msg: "Article liked successfully." })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }
}

export class CommentController {
  static async commentArticle(req: Request, res: Response) {
    try {
      const { articleId } = req.params
      const { phrase } = req.body

      const authorization = req.headers.authorization as string
      const token = authorization.split(" ")[1]
      const user = jwt.verify(token, JWT_SECRET) as User
      const userId = new Types.ObjectId(user.userId)

      const createdComment = await Comment.create({
        user: userId,
        article: articleId,
        phrase,
      })

      return res.status(200).json({
        status: "success",
        data: createdComment,
        msg: "Comment successfully sent!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async updateComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params
      const { phrase } = req.body

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { phrase },
        { new: true }
      )

      if (!updatedComment) {
        return res.status(404).json({ msg: "Comment not found." })
      }

      return res.status(200).json({
        status: "success",
        data: updatedComment,
        msg: "Comment updated successfully.",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params

      const deletedComment = await Comment.findByIdAndDelete(commentId)

      if (!deletedComment) {
        return res.status(404).json({ msg: "Comment not found." })
      }

      return res.status(200).json({
        status: "success",
        msg: "Comment deleted successfully.",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async getAllComments(req: Request, res: Response) {
    try {
      const comments = await Comment.find()

      return res.status(200).json({
        status: "success",
        data: comments,
        msg: "All comments retrieved successfully.",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async getUserComment(req: Request, res: Response) {
    try {
      const { userId } = req.params

      const userComments = await Comment.find({ user: userId })

      return res.status(200).json({
        status: "success",
        data: userComments,
        msg: "User comments retrieved successfully.",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }
}
