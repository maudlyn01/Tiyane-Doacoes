export interface Community {
  _id: string
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
  createdAt?: Date
  updatedAt?: Date
}
 
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || "http://localhost:3001"

export const getAllCommunities = async (): Promise<Community[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/communities`)
    if (!response.ok) throw new Error("Erro ao buscar comunidades")
    return await response.json()
  } catch (error) {
    console.error("Erro ao buscar comunidades:", error)
    return []
  }
}

export const createCommunity = async (
  data: Omit<Community, "id" | "createdAt" | "updatedAt">
): Promise<Community> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text(); // ← lê a resposta do servidor
      console.error("Resposta do servidor:", errorText);
      throw new Error(`Erro ao criar comunidade: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao criar comunidade (catch):", error);
    throw error;
  }
};

export const updateCommunity = async (id: string, data: Partial<Community>): Promise<Community> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error("Erro ao atualizar comunidade")
    return await response.json()
  } catch (error) {
    console.error("Erro ao atualizar comunidade:", error)
    throw error
  }
}

export const deleteCommunity = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Erro ao deletar comunidade")
  } catch (error) {
    console.error("Erro ao deletar comunidade:", error)
    throw error
  }
}
