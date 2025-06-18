export interface UserProps {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "intermediate" | "community_leader"
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface CommunityProps {
  id: string
  name: string
  province: string
  district: string
  population: number
  leaderId: string
  needsAssessment: {
    mosquitoNets: number
    clothing: number
    food: number
    hygiene: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface DonationProps {
  id: string
  campaignName: string
  items: DonationItemProps[]
  sourceOrganization: string
  intermediateId: string
  targetCommunityId: string
  status: "pendente" |"entregue"
  trackingCode: string
  estimatedDeliveryDate: Date
  actualDeliveryDate?: Date
  verificationCode?: string
  beneficiariesCount?: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface DonationItemProps {
  type: "redes-mosquiteiras" | "roupas" | "comida" | "produtos-higienicos" 
  description: string
  quantity: number
  unit: string
}

export interface IntermediateProps {
  id: string
  name: string
  phone: string
  email: string
  assignedProvinces: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthRequest extends Request {
  user?: UserProps
}