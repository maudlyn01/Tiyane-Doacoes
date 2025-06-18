import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import type { UserProps } from "../types/donation-types"

const userSchema = new Schema<UserProps>(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Telefone é obrigatório"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "intermediate", "community_leader"],
      required: [true, "Role é obrigatório"],
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter pelo menos 6 caracteres"],
    },
  },
  {
    timestamps: true,
  },
)

// Hash password antes de salvar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// // Método para comparar senha
// userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password)
// }

// Remover senha do JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

export default mongoose.model<UserProps>("User", userSchema)
