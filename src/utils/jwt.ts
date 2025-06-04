import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const createToken = (userId: number)=>{
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: '7d'});
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as {userId: number};
}