import { Request, Response } from "express"
import { skillModel as Skill } from "../models/skills.model"

export class SkillsController {
  static async createSkill(req: Request, res: Response) {
    try {
      const { name } = req.body
      const oldSkill = await Skill.find({ name })

      if (oldSkill.length > 0) {
        return res.status(409).json({ msg: "Skill already registered" })
      }

      await Skill.create({
        name,
      })

      return res.status(201).json({ msg: "Skill created successfully!" })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async updateSkill(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name } = req.body

      const updatedSkill = await Skill.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      )

      if (!updatedSkill) {
        return res.status(404).json({ msg: "Skill not found" })
      }

      return res
        .status(200)
        .json({ msg: "Skill updated successfully", data: updatedSkill })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }
}
