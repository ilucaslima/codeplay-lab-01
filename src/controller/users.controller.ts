import { PrismaClient } from "@prisma/client";
import { IUserRegister, UserRegisterSchema } from "../schema/users.schema";
import { generateToken } from "../config/generate-token";
import { hashedPassword } from "../config/hashed-password";

const prisma = new PrismaClient({});

export const register = async (req: any, res: any) => {
  try {
    const validation = UserRegisterSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.message });
    }

    const { ...data } = validation.data;

    const IsExistingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (IsExistingUser) {
      return res.status(400).json({ error: "O usuário já existe!" });
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: await hashedPassword(data.password),
        age: data.age,
        createdAt: new Date(),
        role: "USER",
      },
    });

    (user as any).password = undefined;

    return res
      .status(201)
      .json({ user, token: generateToken({ id: user.id, role: "USER" }) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
