import { Router } from 'express';
import * as testController from '../controllers/testController.js';
import testSchema from '../schemas/registerSchema.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { validateToken } from '../middlewares/validateToken.js'

const testRouter = Router();

testRouter.use(validateToken)
testRouter.post("/tests", validateSchemaMiddleware(testSchema), testController.createTest);
testRouter.get("/tests", testController.getAllTests);

export default testRouter;