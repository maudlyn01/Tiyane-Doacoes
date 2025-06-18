import type { Request, Response } from "express"
import User from "../models/user-models"
import { generateToken } from "../middleware/auth-middleware"
import bcrypt from "bcrypt"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, role } = req.body

    // Validações
    if (!name || !email || !phone || !password || !role) {
     res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
       res.status(400).json({ error: "Email já cadastrado" })
    }

    // Criar usuário
    const user = new User({ name, email, phone, password, role })
    await user.save()

    // Gerar token
    //const token = generateToken(user._id.toString())

    res.status(201).json({
      message: "Usuário criado com sucesso",
      //token,
      user,
    })
  } catch (error: any) {
    console.error("Erro no registro:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
       res.status(400).json({ error: "Email e senha são obrigatórios" })
    }

    // Buscar usuário
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return;

    }
    //verificar se password e user sao os mesmos cadastrados
    const isEqual = await bcrypt.compare(password, user.password);
  if (!user || !isEqual) {
    res.status(401).json({ message: "Email ou palavra-passe incorreto." });
    return;
  }


    // Gerar token
    const token = generateToken(user._id.toString())

    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error: any) {
    console.error("Erro no login:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

