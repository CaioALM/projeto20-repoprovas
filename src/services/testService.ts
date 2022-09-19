import { Tests } from "@prisma/client";
import * as testRepository from "../repositories/testRepository.js";
import { TestInsert } from '../types/testTypes.js'
 
export async function createTest(data: TestInsert){
    console.log(data.categoryId)
    const category = await testRepository.findCategoryById(data.categoryId)
    const teacherDiscipline = await testRepository.findTeacherDisciplineById(data.teachersDisciplineId)
    console.log(category)
    if (!category) {
        throw { type: "NotFound", message: "Category not found"}
    }
    if (!teacherDiscipline) {
        throw { type: "NotFound", message: "teacherDiscipline not found"}
    }
    await testRepository.insertTest(data)
}


export async function getAllTests(groupBy){  
    console.log(groupBy)
    console.log(typeof(groupBy))
    if (!groupBy){
        throw { type: "NotFound", message: "You must send groupBy type"};
    } 
    if (groupBy!=="disciplines" && groupBy!== "teachers"){
        throw { type: "NotFound", message: "You must send groupBy discipliner or teachers"};
    } 
        const data = await testRepository.getAllTests(groupBy)
    return data
    
 }
 