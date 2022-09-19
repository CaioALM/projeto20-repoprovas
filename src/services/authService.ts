import bcrypt from "bcrypt";
import * as authRepository from '../repositories/authRepository.js';
import jwt from 'jsonwebtoken'
import { UserInsert } from '../types/userTypes.js'

export async function signUp(email: string, password: string, confirmation: string) {
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = await authRepository.getUserByEmail(email);

    if (user) {
        throw { type: "Conflict", message: "Email already registered"}
    }

    await authRepository.createNewUser(email, passwordHash);
}

export async function signIn(email: string, password: string) {

    const user = await authRepository.getUserByEmail(email);
    if (!user) throw { type: "Unauthorized", message: "Incorrect email or password"};


    const isValid = bcrypt.compareSync(password, user.password);
 
    if (!isValid) throw { type: "Unauthorized", message: "Incorrect email or password"};

    const { id } = user;
    const token = jwt.sign(String(id) , process.env.JWT_TOKEN);
   
    
    return token;
}