import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
dotenv.config();

// Middleware para verificar token JWT
export const authenticationToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
     res.status(401).json({ mensagem: "User not authenticated" });
     return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
       res.status(403).json({ mensagem: "Invalid token" });
    }

    (req as any).user = user;
    next();
  });
};

// Função utilitária para gerar token JWT
export const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  return jwt.sign({ userId }, jwtSecret, { expiresIn: "7d" });
};

// Middleware para verificar o papel (role) do usuário
export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || user.role !== role) {
      console.log("Acesso negado, somente admin");
       res.status(403).json({ mensagem: "Access Denied, Unauthorized access" });
    }

    next();
  };
};
