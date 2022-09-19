
import Joi from "joi";
import { UserInsert } from "../types/userTypes";


const loginSchema = Joi.object<UserInsert>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});

export default loginSchema