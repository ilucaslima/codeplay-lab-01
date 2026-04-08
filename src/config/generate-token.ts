import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

interface TokenParams {
  id: string;
  role?: string;
}

export const generateToken = (params: TokenParams) => {
  const secret: Secret = process.env.SECRET as string;
  return jwt.sign(params, secret, {
    expiresIn: 60,
  });
};
