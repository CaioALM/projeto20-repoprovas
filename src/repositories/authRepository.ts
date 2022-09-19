import { prisma } from '../config/database.js';

export interface User {
    email: string;
    password: string;
}

export async function getUserByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email
        }
    });
}

export async function createNewUser(email: string, password: string) {
    return prisma.users.create({
        data: {
            email,
            password,
        },
    });
}

export async function getUserById(id: number) {
    return prisma.users.findFirst({
        where: {
            id
        }
    });
}