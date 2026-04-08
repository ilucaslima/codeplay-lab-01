import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

interface TokenPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "É Necessário refazer o login" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(404).json({ error: "O token está inválido!" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token mal formatado!" });
  }

  const secret: Secret = process.env.SECRET as string;

  jwt.verify(token, secret, (err: any, decoded: unknown) => {
    if (err) return res.status(404).json({ error: "O token está inválido!" });

    const payload = decoded as TokenPayload;
    res.locals.userId = payload.id;
    res.locals.userRole = payload.role;
    req.userId = payload.id;
    req.userRole = payload.role;

    return next();
  });
};

export const checkRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = res.locals.userRole;

      if (!userRole) {
        return res
          .status(401)
          .json({ error: "Token inválido - role não encontrada" });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          error: "Você não tem permissão para realizar esta ação",
          requiredRoles: allowedRoles,
          userRole: userRole,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao verificar permissões" });
    }
  };
};

export default authMiddleware;
