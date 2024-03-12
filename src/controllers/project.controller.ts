import { Request, Response } from "express"
import { projectModel as Project } from "../models/project.model"
import fs from "fs"
import projectSchema from "../validations/project.validation"

export class ProjectController {
  static async createProject(req: Request, res: Response) {
    try {
      const { title, summary, body, tools } = req.body
      const image = req.file ? req.file.path : null

      const { error } = projectSchema.validate(req.body)

      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.details[0].message,
        })
      }

      const createdArticle = await Project.create({
        title,
        summary,
        body,
        cover: image,
        tools,
      })

      return res.status(200).json({
        status: "success",
        data: createdArticle,
        msg: "Project added successfully!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { title, summary, body, tools } = req.body
      let image = null

      if (req.file) {
        const oldProject = await Project.findById(id)
        if (oldProject && oldProject.cover) {
          fs.unlinkSync(oldProject.cover)
        }
        image = req.file.path
      }

      const updatedProject = await Project.findByIdAndUpdate(
        id,
        {
          title,
          summary,
          body,
          cover: image,
          tools,
        },
        { new: true }
      )

      if (!updatedProject) {
        return res.status(404).json({ msg: "Project not found" })
      }

      return res.status(200).json({
        status: "success",
        msg: "Project successfully updated!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params

      const foundProject = await Project.findById(id)

      if (foundProject) {
        fs.unlinkSync(foundProject.cover)
      } else {
        return res.status(404).json({ msg: "Project not found" })
      }

      const deletedProject = await Project.findByIdAndDelete(id)

      return res.status(200).json({
        status: "success",
        msg: "Project successfully deleted!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }
}
