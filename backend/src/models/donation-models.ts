import mongoose, { Schema } from "mongoose"
import type { DonationProps, DonationItemProps } from "../types/donation-types"

const donationItemSchema = new Schema<DonationItemProps>({
  type: {
    type: String,
    enum: ["redes-mosquiteiras", "roupas", "comida", "produtos-higienicos"],
    required: [true, "Tipo do item é obrigatório"],
  },
  description: {
    type: String,
    required: [true, "Descrição é obrigatória"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Quantidade é obrigatória"],
    min: [1, "Quantidade deve ser maior que 0"],
  },
  unit: {
    type: String,
    required: [true, "Unidade é obrigatória"],
    trim: true,
  },
})

const donationSchema = new Schema<DonationProps>(
  {
    campaignName: {
      type: String,
      required: [true, "Nome da campanha é obrigatório"],
      trim: true,
    },
    items: {
      type: [donationItemSchema],
      required: [true, "Items são obrigatórios"],
      validate: {
        validator: (items: DonationItemProps[]) => items.length > 0,
        message: "Deve haver pelo menos um item na doação",
      },
    },
    sourceOrganization: {
      type: String,
      required: [true, "Organização fonte é obrigatória"],
      trim: true,
    },
    intermediateId: {
      type: String,
      required: [true, "ID do intermediário é obrigatório"],
    },
    targetCommunityId: {
      type: String,
      required: [true, "ID da comunidade alvo é obrigatório"],
    },
    status: {
      type: String,
      enum: ["pendente", "entregue"],
      default: "pendente",
    },
    trackingCode: {
      type: String,
      required: true,
      unique: true,
    },
    estimatedDeliveryDate: {
      type: Date,
      required: [true, "Data estimada de entrega é obrigatória"],
    },
    actualDeliveryDate: {
      type: Date,
    },
    verificationCode: {
      type: String,
    },
    beneficiariesCount: {
      type: Number,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)



export default mongoose.model<DonationProps>("Donation", donationSchema)
