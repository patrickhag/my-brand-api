import * as joi from "joi";

interface IUser {
  fullName: string;
  email: string;
  password: string;
}

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userSchema = joi.object<IUser>({
  fullName: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().pattern(passwordRegex).required(),
});

export default userSchema;
