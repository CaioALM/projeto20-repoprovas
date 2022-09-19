
import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import registerSchema from '../schemas/registerSchema.js';
import loginSchema from '../schemas/loginSchema.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';

const authRouter = Router();

authRouter.post("/register", validateSchemaMiddleware(registerSchema), authController.signUp);
authRouter.post("/login", validateSchemaMiddleware(loginSchema), authController.signIn);

export default authRouter;