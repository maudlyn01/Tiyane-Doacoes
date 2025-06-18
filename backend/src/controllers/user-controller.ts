import type { Response,Request } from "express"
import User from "../models/user-models"

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select("-password")

    if (!user) {
       res.status(404).json({ error: "Usuário não encontrado" })
    }

    res.json(user)
  } catch (error: any) {
    console.error("Erro ao buscar usuário:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}


export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updates = req.body

    // Remover campos que não devem ser atualizados diretamente
    delete updates.password
    delete updates._id
    delete updates.createdAt

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password")

    if (!user) {
       res.status(404).json({ error: "Usuário não encontrado" })
    }

    res.json({
      message: "Usuário atualizado com sucesso",
      user,
    })
  } catch (error: any) {
    console.error("Erro ao atualizar usuário:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await User.findByIdAndDelete(id)

    if (!user) {
       res.status(404).json({ error: "Usuário não encontrado" })
    }

    res.json({ message: "Usuário deletado com sucesso" })
  } catch (error: any) {
    console.error("Erro ao deletar usuário:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}
