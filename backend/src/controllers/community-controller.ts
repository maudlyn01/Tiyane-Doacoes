import type { Response,Request } from "express"
import Community from "../models/community-models"


//traga todas comunidades
export const getAllCommunities = async (req: Request, res: Response) => {
  try {
    const { province, district } = req.query

    const filter: any = {}
    if (province) filter.province = province
    if (district) filter.district = district

    const communities = await Community.find(filter)
    res.json(communities)
  } catch (error: any) {
    console.error("Erro ao buscar comunidades:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}
//traga uma comunidade
export const getCommunityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const community = await Community.findById(id)

    if (!community) {
       res.status(404).json({ error: "Comunidade não encontrada" })
    }

    res.json(community)
  } catch (error: any) {
    console.error("Erro ao buscar comunidade:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

//Crie comunidade
export const createCommunity = async (req: Request, res: Response) => {
  try {
    const communityData = req.body

    const community = new Community(communityData)
    await community.save()

    res.status(201).json({
      message: "Comunidade criada com sucesso",
      community,
    })
  } catch (error: any) {
    console.error("Erro ao criar comunidade:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

//Actualize comunidade
export const updateCommunity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updates = req.body

    const community = await Community.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!community) {
       res.status(404).json({ error: "Comunidade não encontrada" })
    }

    res.json({
      message: "Comunidade atualizada com sucesso",
      community,
    })
  } catch (error: any) {
    console.error("Erro ao atualizar comunidade:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

//Elimine Comunidade

export const deleteCommunity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const community = await Community.findByIdAndDelete(id)

    if (!community) {
       res.status(404).json({ error: "Comunidade não encontrada" })
    }

    res.json({ message: "Comunidade deletada com sucesso" })
  } catch (error: any) {
    console.error("Erro ao deletar comunidade:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}
