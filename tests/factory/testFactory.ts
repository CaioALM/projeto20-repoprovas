import { faker } from '@faker-js/faker'

export async function createUser () {
    return {
      title: faker.lorem.word(2),
      pdfUrl:faker.internet.url(),
      categoryId:1,
      teachersDisciplineId: 1
  };


}