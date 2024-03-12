import joi from "joi"

interface ISkills {
  name: String
}

const skillSchema = joi.object<ISkills>({
  name: joi.string().required().min(5).max(15),
})

export default skillSchema
