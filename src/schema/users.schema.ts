import { z } from "zod";

export const UserRegisterSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.email("O e-mail é inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  photo: z.any().optional(),
  age: z.number().int().positive(),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

export type IUserRegister = z.infer<typeof UserRegisterSchema>;
