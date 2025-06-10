import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

declare global {
    namespace Express {
        interface Request {
            user?: {id: number}
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({ message: 'No token provided' })
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
        req.user = { id: decoded.userId}
        next()
    } catch (error) {
        console.error('invalid token', error)
        res.status(401).json({ message: 'No token provided' })
        return;
    }
}