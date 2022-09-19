import  { prisma }  from "../config/database.js";

export async function findCategoryById(categoryId:number) {
  return prisma.categories.findUnique({
    where: { id: categoryId }
  });
}

export async function findTeacherDisciplineById(teacherDisciplineId:number){
    return prisma.teachersDisciplines.findUnique({
        where: { id: teacherDisciplineId }
    });
}

export async function insertTest(name: string, pdfUrl: string, categoryId: number, teachersDisciplineId: number){
    return prisma.tests.create({
        data: { 
            name: name,
            pdfUrl: pdfUrl,
            categoryId: categoryId,
            teachersDisciplineId : teachersDisciplineId
         }
    });
}