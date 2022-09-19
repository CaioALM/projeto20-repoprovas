import app from '../src/index.js';
import supertest from "supertest"
import { prisma } from "../src/config/database.js"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE;`;
});

describe("POST /register", () => {
    it("given both valid email and password it should return 201", async () => {
        const body = {
            "email": "teste@email.com",
            "password": "1234567891"
        };

        const result = await supertest(app).post("/register").send(body);
          
        expect(result.status).toEqual(201);

        const createdUser = await prisma.users.findUnique({
            where: { email: body.email }
        });

        expect(createdUser).not.toBeNull();
    });

    it("given an email that is already in use it should return 409", async () =>{
        const body = {
            "email": "teste@driven.com",
            "password": "1234567890"
        };

        const firstTry = await supertest(app).post("/signup").send(body);
        expect(firstTry.status).toEqual(201);

        const secondTry = await supertest(app).post("/signup").send(body);        
        expect(secondTry.status).toEqual(409);
    })

    it("given a password with less than 10 digits it should return 422", async ()=>{
        const body = {
            "email": "teste1@driven.com",
            "password": "12345678"
        };
        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;
        
        expect(status).toEqual(422);
    })

    it("given an invalid format of email or password", async ()=>{
        const body = {
            "email": "teste1@driven",
            "password": "12345678"
        };
        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;
        
        expect(status).toEqual(422);
    })
   
});

describe("POST /sign-in", () => {
    it("given both valid email and password it should return 200 and a token", async () => {
        const body = {
            "email": "teste@driven.com",
            "password": "1234567890"
        };

        const signUpResult = await supertest(app).post("/signup").send(body);
        const status = signUpResult.status;        
        expect(status).toEqual(201);

        const createdUser = await prisma.users.findUnique({
            where: { email: body.email }
        });
        expect(createdUser).not.toBeNull();

        const signInResult = await supertest(app).post("/sign-in").send(body);

        const token = signInResult.text 
        const signInstatus = signInResult.status

        expect(token).not.toBeUndefined();
        expect(signInstatus).toBe(200)
           
    });
   

    it("given an invalid password should return 401", async ()=>{
        const bodySignup = {
            "email": "teste1@driven.com",
            "password": "1234567890"
        };

        const signUpResult = await supertest(app).post("/signup").send(bodySignup);
        const signUpStatus = signUpResult.status;        
        expect(signUpStatus).toEqual(201);

        const createdUser = await prisma.users.findUnique({
            where: { email: bodySignup.email }
        });

        expect(createdUser).not.toBeNull();

        const bodySignIn = {
            "email": "teste1@driven.com",
            "password": "1234567880"
        };

        const result = await supertest(app).post("/sign-in").send(bodySignIn);
        const status = result.status;
        
        expect(status).toEqual(401);
    })

    it("given an invalid email should return 401", async ()=>{
        const bodySignup = {
            "email": "teste1@driven.com",
            "password": "1234567890"
        };

        const signUpResult = await supertest(app).post("/signup").send(bodySignup);
        const signUpStatus = signUpResult.status;        
        expect(signUpStatus).toEqual(201);

        const createdUser = await prisma.users.findUnique({
            where: { email: bodySignup.email }
        });

        expect(createdUser).not.toBeNull();

        const bodySignIn = {
            "email": "testeErrado@driven.com",
            "password": "1234567890"
        };

        const result = await supertest(app).post("/sign-in").send(bodySignIn);
        const status = result.status;
        
        expect(status).toEqual(401);
    })   
});



afterAll(async () => {
    await prisma.$disconnect();
});