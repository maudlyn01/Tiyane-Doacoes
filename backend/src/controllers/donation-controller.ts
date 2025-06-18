import type { Response, Request as ExpressRequest } from "express"
import Donation from "../models/donation-models"
import Community from "../models/community-models"
import Intermediate from "../models/intermediate-models"
import { generateTrackingCode, generateVerificationCode } from "../utils/helpers-validation"

//Estender o objeto Request do Express para incluir a propriedade user
interface User {
  _id: string;
  role: string;
  [key: string]: any;
}

interface Request extends ExpressRequest {
  user?: User;
}



// Middleware de controle de acesso
const canAccessDonation = (user: any, donation: any) => {
  return user?.role !== "intermediate" || donation.intermediateId.equals(user._id)
}

export const getAllDonations = async (req: Request, res: Response) => {
  
  try {
    
    const { status, intermediateId, targetCommunityId, page = 1, limit = 20 } = req.query

    const filter: Record<string, any> = {}

    if (req.user?.role === "intermediate") {
      filter.intermediateId = req.user._id
    }

    if (status) filter.status = status
    if (intermediateId) filter.intermediateId = intermediateId
    if (targetCommunityId) filter.targetCommunityId = targetCommunityId

    const skip = (Number(page) - 1) * Number(limit)

    const donations = await Donation.find(filter)
      .populate("intermediateId targetCommunityId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))

    res.json(donations)
  } catch (error: any) {
    console.error("Erro ao buscar doações:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const getDonationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const donation = await Donation.findById(id).populate("intermediateId targetCommunityId")

    if (!donation) {
      res.status(404).json({ error: "Doação não encontrada" })
    }

    if (!canAccessDonation(req.user, donation)) {
      res.status(403).json({ error: "Acesso negado" })
    }

    res.json(donation)
  } catch (error: any) {
    console.error("Erro ao buscar doação:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const createDonation = async (req: Request, res: Response) => {
  try {
    const donationData = req.body
    console.log("req.body RECEBIDO:", req.body);

    const [community, intermediate] = await Promise.all([
      Community.findById(donationData.targetCommunityId),
      Intermediate.findById(donationData.intermediateId),
    ])

    if (!community) {
      res.status(400).json({ error: "Comunidade não encontrada" })
    }

    if (!intermediate) {
      res.status(400).json({ error: "Intermediário não encontrado" })
    }

    let trackingCode = generateTrackingCode()
    while (await Donation.findOne({ trackingCode })) {
      trackingCode = generateTrackingCode()
    }

    const donation = new Donation({
      ...donationData,
      trackingCode,
    })

    await donation.save()

    res.status(201).json({
      message: "Doação criada com sucesso",
      donation,
    })
  } catch (error: any) {
    console.error("Erro ao criar doação:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const updateDonation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updates = req.body

    const donation = await Donation.findById(id)
    if (!donation) {
      res.status(404).json({ error: "Doação não encontrada" })
    }

    if (!canAccessDonation(req.user, donation)) {
      res.status(403).json({ error: "Acesso negado" })
    }

    const allowedUpdates = ["status", "notes", "actualDeliveryDate"]
    const updateKeys = Object.keys(updates)

    const isValid = updateKeys.every(key => allowedUpdates.includes(key))
    if (!isValid) {
      res.status(400).json({ error: "Campos inválidos para atualização" })
    }

    if (updates.status === "entregue" && !updates.verificationCode) {
      updates.verificationCode = generateVerificationCode()
      updates.actualDeliveryDate = new Date()
    }

    const updatedDonation = await Donation.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    res.json({
      message: "Doação atualizada com sucesso",
      donation: updatedDonation,
    })
  } catch (error: any) {
    console.error("Erro ao atualizar doação:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const deleteDonation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const donation = await Donation.findById(id)

    if (!donation) {
      res.status(404).json({ error: "Doação não encontrada" })
    }

    if (!canAccessDonation(req.user, donation)) {
      res.status(403).json({ error: "Acesso negado" })
    }

    await Donation.findByIdAndDelete(id)

    res.json({ message: "Doação deletada com sucesso" })
  } catch (error: any) {
    console.error("Erro ao deletar doação:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}

export const getDonationByTrackingCode = async (req: Request, res: Response) => {
  try {
    const { trackingCode } = req.params
    const donation = await Donation.findOne({ trackingCode })

    if (!donation) {
      res.status(404).json({ error: "Doação não encontrada" })
    }

    res.json(donation)
  } catch (error: any) {
    console.error("Erro ao buscar doação por código:", error)
    res.status(500).json({ error: error.message || "Erro interno do servidor" })
  }
}
