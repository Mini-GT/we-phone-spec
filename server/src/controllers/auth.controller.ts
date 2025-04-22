import type { Request, Response } from "express"

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log(name, email, password)
  res.status(201).json({ message: "User created" });
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password)
  res.status(200).json({ message: "Logged in" });
}

export {
  register,
  login,
}