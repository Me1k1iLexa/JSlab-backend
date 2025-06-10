import { Request, Response } from 'express';
import prisma from '../prisma/prisma.service'
import { hashPassword, comparePassword} from "../utils/hash";
import {createToken} from "../utils/jwt";

export const register = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({where: {email}});
    if (existingUser) {
        res.status(401).json({message: "User already exists"});
        return;
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({ data: { email, password: hashed} });
    const token = createToken(user.id)

    res
        .cookie('token', token, {httpOnly: true, sameSite:'strict'})
        .json({ id: user.id, email: user.email})
}

export const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
        res.status(404).json({message: "User not found"});
        return;
    }

    const valid = await comparePassword(password, user.password)
    if (!valid){
        res.status(401).json({message: "Invalid data"});
        return;
    }

    const token = createToken(user.id)
    res
        .cookie('token', token, {httpOnly: true, sameSite:'strict'})
        .json({id: user.id, email: user.email})
}
export const authMe = async(req: Request, res: Response) => {
    try{
        const userId = req.user!.id
        
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {id: true, email: true},
        })
        
        if (!user) {
            res.status(401).json({message: "Invalid data"});
            return;
        }
        
        res.json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Server error"});
    }
}


