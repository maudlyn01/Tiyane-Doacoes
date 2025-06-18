import mongoose, { Schema } from "mongoose"
import type { IntermediateProps } from "../types/donation-types"

const intermediateSchema = new Schema<IntermediateProps>(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Telefone é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    assignedProvinces: {
      type: [String],
      required: [true, "Províncias atribuídas são obrigatórias"],
      validate: {
        validator: (provinces: string[]) => provinces.length > 0,
        message: "Deve haver pelo menos uma província atribuída",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IntermediateProps>("Intermediate", intermediateSchema)
