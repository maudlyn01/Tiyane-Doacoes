import mongoose, { Schema } from "mongoose"
import type { CommunityProps } from "../types/donation-types"

const communitySchema = new Schema<CommunityProps>(
  {
    name: { type: String, required: [true, "Nome da comunidade é obrigatório"],trim: true,},
    province: {type: String,required: [true, "Província é obrigatória"],trim: true,},
    district: {type: String,required: [true, "Distrito é obrigatório"],trim: true,},
    population: {type: Number,required: [true, "População é obrigatória"],min: [1, "População deve ser maior que 0"],},
    leaderId: {type: String,required: [true, "ID do líder é obrigatório"],},
    needsAssessment: {mosquitoNets: {type: Number,required: true, min: 0,},
      clothing: {
        type: Number,
        required: true,
        min: 0,
      },
      food: {
        type: Number,
        required: true,
        min: 0,
      },
      hygiene: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<CommunityProps>("Community", communitySchema)
