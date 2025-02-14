import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

// Extend Request type to include userId becsause typescript doesn't recognise userId as a property of Request
interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function middleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? "";

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
