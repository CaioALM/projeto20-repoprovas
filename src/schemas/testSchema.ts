import Joi from "joi";
import { TestInsert } from "../types/testTypes.js";

const testSchema = Joi.object<TestInsert>({
    name : Joi.string().required(),
    pdfUrl : Joi.string().uri().required(),
    categoryId :  Joi.number().required(),
    teachersDisciplineId: Joi.number().required()
});

export default testSchema;