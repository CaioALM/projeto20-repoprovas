import { Request, Response } from 'express';
import * as testService from '../services/testService.js';
import { TestInsert } from '../types/testTypes.js'

export async function createTest(req: Request, res: Response) {
    const data: TestInsert = req.body;

    await testService.createTest( data );
    res.sendStatus(201);
}

export async function getAllTests(req: Request, res: Response) {
    const {groupBy} = req.query
    const tests = await testService.getAllTests(groupBy);


    res.status(200).send(tests);
}