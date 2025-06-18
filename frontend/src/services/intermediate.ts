import api from "./axios-instance"

export interface Intermediate {
  communityId: any;
  id: string;
  name: string;
  phone: string;
  email: string;
  assignedProvinces: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getAllIntermediates = async (): Promise<Intermediate[]> => {
  try {
    const response = await api.get("/intermediate");
    const intermediates = response.data as Intermediate[];
    return intermediates;
  } catch (error: any) {
    console.log("Erro ao buscar intermediários:", error);
    return [];
  }
}
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || "http://localhost:3001"


export const createIntermediate = async (
  data: Omit<Intermediate, "id" | "createdAt" | "updatedAt">,
): Promise<Intermediate> => {
  try {
    const response = await fetch(`${API_BASE_URL}/intermediate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error("Erro ao criar intermediário")
    return await response.json()
  } catch (error) {
    console.error("Erro ao criar intermediário:", error)
    throw error
  }
}

export const updateIntermediate = async (id: string, data: Partial<Intermediate>): Promise<Intermediate> => {
  try {
    const response = await fetch(`${API_BASE_URL}/intermediate/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error("Erro ao atualizar intermediário")
    return await response.json()
  } catch (error) {
    console.error("Erro ao atualizar intermediário:", error)
    throw error
  }
}

export const deleteIntermediate = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/intermediate/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Erro ao deletar intermediário")
  } catch (error) {
    console.error("Erro ao deletar intermediário:", error)
    throw error
  }
}
