import { Request, Response } from 'express';
import * as testService from '../services/testService.js';

export async function createTest(req: Request, res: Response) {
    const { name, pdfUrl, cadegoriId, teachersDisciplineId } = req.body;
    await testService.createTest( name, pdfUrl, cadegoriId, teachersDisciplineId );
    res.sendStatus(201);
}

export async function getAllTests(req: Request, res: Response) {
    // const  groupBy  = toString(req.query)
    // console.log("---------------------------------------", groupBy);
    // const test = typeof(groupBy)
    // console.log("------------------------------------------", test)
    // const tests = await testService.getAllTests(groupBy);


    res.status(200)
}