import jwt from 'jsonwebtoken';

interface DecodedToken{
    token: string;
    userId: string;
    email: string;
    username: string;
    iat?: number;
    exp?: number;
}

export function verifyjwttoken(token: string): DecodedToken | null{
    try {
        
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        console.log(process.env.JWT_SECRET)
        return decoded;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
}