import  { prisma }  from "../config/database.js";
import { TestInsert } from '../types/testTypes.js'

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

export async function insertTest(data: TestInsert){
    return prisma.tests.create({
        data: { 
            name: data.name,
            pdfUrl: data.pdfUrl,
            categoryId: data.categoryId,
            teachersDisciplineId : data.teachersDisciplineId
         }
    });
}

export async function getAllTests(groupBy: string) {

    if(groupBy==='disciplines'){        
        
       return getAllTestsByDisciplines()
    }else{

        return getAllTestsByTeacher()
    } 

}

function getAllTestsByDisciplines(){
  const result = prisma.terms.findMany({
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
return result

}

function getAllTestsByTeacher(){
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

