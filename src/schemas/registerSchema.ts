import Joi from 'joi';
import { UserInsert } from "../types/userTypes"

type newUserData = UserInsert & {
    confirmation: string;
}

const registerSchema = Joi.object<newUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
    confirmation: Joi.ref("password")
});


export default registerSchema;
