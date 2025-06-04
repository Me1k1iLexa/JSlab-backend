import { Request, Response } from 'express';
import prisma from '../prisma/prisma.service'

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany()
        res.json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Something went wrong'})
    }
}