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

export async function getAllTestsByDisciplines(){
  const result = await prisma.terms.findMany({
    where :{},
     include:{
         disciplines:{
             select:{
                 id:true,
                 name:true,
                 teachersDiscipline:{
                     select:{
                         id:true,
                         disciplines:{},
                         teachers:{},
                         tests:{
                             select:{
                                 id:true,
                                 name:true,
                                 pdfUrl:true,
                                 categories:{}
                             }
                         }
                     }
                 },
                 terms:{}
             }
         }
     }
     
 })


}

export async function getAllTestsByTeacher(){
  return prisma.teachersDisciplines.findMany({
      where:{},
      select:{
          id:true,
          disciplines:{
              select:{
                  id:true,
                  name:true,
                  teachersDiscipline:{},
                  terms:{}
              }
          },
          tests:{
              select:{
                  id:true,
                  name:true,
                  pdfUrl:true,
                  categories:{}
              }
          },
          teachers:{},
          
          
      }
  })
}

