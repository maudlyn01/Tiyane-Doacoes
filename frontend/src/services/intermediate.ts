import api from "./axios-instance"

export interface Intermediate {
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