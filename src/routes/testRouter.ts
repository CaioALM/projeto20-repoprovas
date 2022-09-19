import { Router } from 'express';
import * as testController from '../controllers/authController.js';
import testSchema from '../schemas/registerSchema.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';

const testRouter = Router();

testRouter.post("/tests", validateSchemaMiddleware(testSchema), testController.signUp);
testRouter.get("/tests", testController.signIn);

export default testRouter;