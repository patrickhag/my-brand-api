import { Request, Response } from "express"
import { articleModel as Article } from "../models/article.model"

export class CrudController {
  static async createArticle(req: Request, res: Response) {
    try {
      const { title, summary, body, cover, file } = req.body

      const createdArticle = await Article.create({
        title,
        summary,
        body,
        cover: file,
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
      const { title, summary, body, cover } = req.body

      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        {
          title,
          summary,
          body,
          cover,
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
}
