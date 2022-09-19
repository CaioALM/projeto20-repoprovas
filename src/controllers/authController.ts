import { Request, Response } from 'express';
import * as authService from '../services/authService.js';

export async function signUp(req: Request, res: Response) {
    const { email, password, confirmation } = req.body;
    await authService.signUp(email, password, confirmation);
    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await authService.signIn(email, password);


    res.status(200).send({token});
}