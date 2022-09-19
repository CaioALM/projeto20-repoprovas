import { Tests } from "@prisma/client";
import * as testRepository from "../repositories/testRepository.js";

export async function createTest(name: string, pdfUrl: string, categoryId: number, teachersDisciplineId: number){
    const category = await testRepository.findCategoryById(categoryId)
    const teacherDiscipline = await testRepository.findTeacherDisciplineById(teachersDisciplineId)

    if (!category) {
        throw { type: "NotFound", message: "Category not found"}
    }
    if (!teacherDiscipline) {
        throw { type: "NotFound", message: "teacherDiscipline not found"}
    }
    await testRepository.insertTest(name, pdfUrl, categoryId, teachersDisciplineId)
}


export async function getAllTests(groupBy: string){  
    if (!groupBy){
        throw { type: "NotFound", message: "You must send groupBy type"};
    } 
    if (groupBy!=="disciplines" && groupBy!== "teachers"){
        throw { type: "NotFound", message: "You must send groupBy discipliner or teachers"};
    } 
    if(groupBy  ===  "disciplines" ){
        const data = await testRepository.getAllTestsByDisciplines() 
    
        return data  
    } else {
        const data = await testRepository.getAllTestsByTeacher() 

        return data  
    }
   
 }
 