import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";


export const blacklistedTokens: string[] = [];

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

  try {
    const auths: any = req.headers['authorization'];
    const token = auths.substring('Bearer '.length);
 
   if (!token) {
     return res.status(403).send('A token is required for authentication');
   }
    const decoded = jwt.verify(token, 'secret');
    if (blacklistedTokens.includes(token)) {
      return res.status(401).json({ msg: 'Token has been invalidated' });
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ statusCode: 401,
    error: "Unauthorized",
    message: "Not Authenticated, Invalid Token"});
  }
  return next();
};
