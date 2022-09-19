import { Request, Response } from 'express';
import * as testService from '../services/testService.js';

export async function createTest(req: Request, res: Response) {
    const { name, pdfUrl, cadegoriId, teachersDisciplineId } = req.body;
    await testService.createTest( name, pdfUrl, cadegoriId, teachersDisciplineId );
    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await authService.signIn(email, password);


    res.status(200).send({token});
}