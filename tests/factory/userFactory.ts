import { faker } from '@faker-js/faker'

export default async function createUser () {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(10)
    };


}