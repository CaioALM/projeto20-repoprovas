import { Tests } from "@prisma/client";
import * as testRepository from "../repositories/testRepository.js";

export async function createTest(name: string, pdfUrl: string, categoryId: number, teachersDisciplineId: number){
    const category = await testRepository.findCategoryById(categoryId)
    const teacherDiscipline = await testRepository.findTeacherDisciplineById(teachersDisciplineId)

    if (!category) {
        throw { code: "NotFound", message: "Category not found"}
    }
    if (!teacherDiscipline) {
        throw { code: "NotFound", message: "teacherDiscipline not found"}
    }
    await testRepository.insertTest(name, pdfUrl, categoryId, teachersDisciplineId)
}
