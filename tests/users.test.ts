import app from '../src/index.js';
import supertest from "supertest"
import { prisma } from "../src/config/database.js"
import userFactory from './factory/userFactory.js'
import { log } from 'console';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE;`;
});

describe("POST /register", () => {
    it("given both valid email and password it should return 201", async () => {
        const body = await userFactory() 
       
        const result = await supertest(app).post("/register").send(body);
          
        expect(result.status).toEqual(201);

        const createdUser = await prisma.users.findUnique({
            where: { email: body.email }
        });

        expect(createdUser).not.toBeNull();
    });

    it("given an email that is already in use it should return 409", async () =>{
        const body = {
            "email": "teste@email.com",
            "password": "1234567891"
        };

        const register = await supertest(app).post("/register").send(body);
        expect(register.status).toEqual(201);

        const result = await supertest(app).post("/register").send(body);  
       
        expect(result.status).toEqual(409);
    })

    it("given a password with less than 10 digits it should return 422", async ()=>{
        const user = await userFactory() 
        const body = {
            email: user.email,
            password: "12345678"
        }
        const result = await supertest(app).post("/register").send(body);
        const status = result.status;
        
        expect(status).toEqual(422);
    })

    it("given an invalid format of email or password", async ()=>{
        const body = {
            "email": "notEmail",
            "password": "1234567890"
        };
        const body2 = {
            "email": "email@email.com",
            "password": 123456
        };

        const result = await supertest(app).post("/register").send(body);
        expect(result.status).toEqual(422);
        const result2 = await supertest(app).post("/register").send(body);
        expect(result.status).toEqual(422);

    })
   
});

describe("POST /login", () => {
    it("given both valid email and password it should return 200 and a token", async () => {
        const body = await userFactory() 

        const signUpResult = await supertest(app).post("/register").send(body);
        const status = signUpResult.status;        
        expect(status).toEqual(201);

        const createdUser = await prisma.users.findUnique({
            where: { email: body.email }
        });
        expect(createdUser).not.toBeNull();

        const signInResult = await supertest(app).post("/login").send(body);

        const token = signInResult.text 
        const signInstatus = signInResult.status

        expect(token).not.toBeUndefined();
        expect(signInstatus).toBe(200)
           
    });
   

    it("given an invalid password should return 401", async ()=>{
        const bodyRegister = {
            "email": "teste2@email.com",
            "password": "1234567890"
        };

        const registerResult = await supertest(app).post("/register").send(bodyRegister);
      
        expect(registerResult.status).toEqual(201);

        const createdUser = await prisma.users.findUnique({
            where: { email: bodyRegister.email }
        });

        expect(createdUser).not.toBeNull();

        const bodyLogin = {
            "email": "teste1@driven.com",
            "password": "1234567880"
        };

        const result = await supertest(app).post("/login").send(bodyLogin);
 
        expect(result.status).toEqual(401);
    })

    it("given an invalid email should return 401", async ()=>{
        const bodyRegister = {
            "email": "teste1@email.com",
            "password": "1234567890"
        };

        const registerResult = await supertest(app).post("/register").send(bodyRegister);       
        expect(registerResult.status).toEqual(201);

        const createdUser = await prisma.users.findUnique({
            where: { email: bodyRegister.email }
        });

        expect(createdUser).not.toBeNull();

        const bodyLogin = {
            "email": "testeErrado@email.com",
            "password": "1234567890"
        };

        const result = await supertest(app).post("/login").send(bodyLogin);
        
        expect(result.status).toEqual(401);
    })   
});



afterAll(async () => {
    await prisma.$disconnect();
});