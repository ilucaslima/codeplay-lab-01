import bcrypt from "bcryptjs";

export const hashedPassword = async (password: string): Promise<string> => {
  const pass = await bcrypt.hash(password, 10);
  return pass;
};
