// Tipos
export interface DonationItem {
  type: "redes-mosquiteiras" | "roupas" | "comida" | "produtos-higienicos"
  description: string
  quantity: number
  unit: string
}

export interface Donation {
  id: string
  campaignName: string
  items: DonationItem[]
  sourceOrganization: string
  intermediateId: string
  targetCommunityId: string
  status: "pendente" | "entregue"
  trackingCode: string
  estimatedDeliveryDate: Date
  actualDeliveryDate?: Date
  verificationCode?: string
  beneficiariesCount?: number
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || "http://localhost:3001"

export const getAllDonations = async (): Promise<Donation[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donation`)
    if (!response.ok) throw new Error("Erro ao buscar doações")
    return await response.json()
  } catch (error) {
    console.error("Erro ao buscar doações:", error)
    return []
  }
}


export const createDonation = async (data: Omit<Donation, "id" | "createdAt" | "updatedAt">): Promise<Donation> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error("Erro ao criar doação")
    return await response.json()
  } catch (error) {
    console.error("Erro ao criar doação:", error)
    throw error
  }
}

export const updateDonation = async (id: string, data: Partial<Donation>): Promise<Donation> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donation/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error("Erro ao atualizar doação")
    return await response.json()
  } catch (error) {
    console.error("Erro ao atualizar doação:", error)
    throw error
  }
}

export const deleteDonation = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/donation/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Erro ao deletar doação")
  } catch (error) {
    console.error("Erro ao deletar doação:", error)
    throw error
  }
}
