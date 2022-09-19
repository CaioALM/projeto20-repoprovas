
import app from "./../src/index.js"
import supertest from "supertest"
import { prisma } from "../src/config/database.js"
import userFactory from './factory/userFactory.js'


beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE;`;
});

async function login(){    

    const body = {
        email: "teste@email.com",
        password: "1234567891"
    }

    const registerResult = await supertest(app).post("/register").send(body); 
    expect(registerResult.status).toEqual(201);

    const createdUser = await prisma.users.findUnique({
        where: { email: body.email }
    });
    expect(createdUser).not.toBeNull();

    const loginResult = await supertest(app).post("/login").send(body);

    const token = loginResult.text 

    expect(token).not.toBeUndefined();
    expect(loginResult.status).toBe(200) 
    
    const tokenData = JSON.parse(token)
    
    return tokenData.token
            
}

describe("POST /tests", () => {

    it("given valid tests data and token it should return 201", async () => {       

        const token = await login() 
              
        const body = {
            "name": "PROVA DE PROGRAMACAO",
            "pdfUrl":"https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
            "categoryId": 0,
            "teachersDisciplineId" : 0
        };
      
        const result = await supertest(app).post("/tests").set("Authorization", token).send(body)
     
        expect(result.status).toEqual(201);

        const createdTest = await prisma.tests.findFirst({
            where: {  
                "name": "PROVA DE PROGRAMACAO",
                "pdfUrl":"https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
                "categoryId": 0,
                "teachersDisciplineId" : 0
            }
        });

        expect(createdTest).not.toBeNull();
    });   
});

describe("GET /tests?groupBy=disciplines", () => {

    it("given groupby equal discipline it should return 200", async () => {       

        const token = await login()     
        
        const result = await supertest(app).get("/tests?groupBy=disciplines").set('Authorization', token)

        expect(result.status).toEqual(200);   
    }); 
});



describe("GET /tests?groupBy=teachers", () => {

    it("given groupby equal teachers it should return 200", async () => {       

        const token = await login()     
        
        const result = await supertest(app).get("/tests?groupBy=teachers").set('Authorization', token)

        expect(result.status).toEqual(200);  
    });  
});

describe("GET /tests?groupBy=wrongQuery", () => {

    it("given undefined groupby value it should return 404", async () => {        
        
        const token = await login() 
        
        const result = await supertest(app).get("/tests?groupBy=").set('Authorization', token)

        expect(result.status).toEqual(404);   
    });
    
    it("given an unexisted groupby value it should return 404", async () => {       
    
        const token = await login()            
        
        const result = await supertest(app).get("/tests?groupBy=wrongFilter").set('Authorization', token)
                   
        expect(result.status).toEqual(404);   
    });
})



afterAll(async () => {
    await prisma.$disconnect();
});