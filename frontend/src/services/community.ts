import api from "./axios-instance";


export interface community {
    
_id : string;
name: string;
province: string
district: string
population: number
leaderId: string
needsAssessment: string
Object: string
createdAt: string
updatedAt: number
__v: number
}

export const getAllCommunities = async (): Promise<community[]> => {
  try {
    const response = await api.get("/community");
    const community = response.data as community[];
    return community;
  } catch (error: any) {
    console.log("Erro ao buscar intermediários:", error);
    return [];
  }
}