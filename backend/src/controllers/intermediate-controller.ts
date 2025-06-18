import type { Response, Request} from "express"
import Intermediate from "../models/intermediate-models"

export const getAllIntermediates = async (req: Request, res: Response) => {
  try {
    const { province, isActive } = req.query

    const filter: any = {}
    if (province) filter.assignedProvinces = province
    if (isActive !== undefined) filter.isActive = isActive === "true"

    const intermediates = await Intermediate.find(filter)
    res.json(intermediates)
  } catch (error: any) {
    console.error("Erro ao buscar intermediários:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const getIntermediateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const intermediate = await Intermediate.findById(id)

    if (!intermediate) {
       res.status(404).json({ error: "Intermediário não encontrado" })
    }

    res.json(intermediate)
  } catch (error: any) {
    console.error("Erro ao buscar intermediário:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const createIntermediate = async (req: Request, res: Response) => {
  try {
    const intermediateData = req.body

    const intermediate = new Intermediate(intermediateData)
    await intermediate.save()

    res.status(201).json({
      message: "Intermediário criado com sucesso",
      intermediate,
    })
  } catch (error: any) {
    console.error("Erro ao criar intermediário:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const updateIntermediate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updates = req.body

    const intermediate = await Intermediate.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!intermediate) {
       res.status(404).json({ error: "Intermediário não encontrado" })
    }

    res.json({
      message: "Intermediário atualizado com sucesso",
      intermediate,
    })
  } catch (error: any) {
    console.error("Erro ao atualizar intermediário:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const deleteIntermediate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const intermediate = await Intermediate.findByIdAndDelete(id)

    if (!intermediate) {
       res.status(404).json({ error: "Intermediário não encontrado" })
    }

    res.json({ message: "Intermediário deletado com sucesso" })
  } catch (error: any) {
    console.error("Erro ao deletar intermediário:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}
