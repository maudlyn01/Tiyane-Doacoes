"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCommunity } from "../../services/community"
import { toast } from "sonner"

interface CommunityModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const mozambiqueProvinces = [
  "Cabo Delgado",
  "Gaza",
  "Inhambane",
  "Manica",
  "Maputo",
  "Nampula",
  "Niassa",
  "Sofala",
  "Tete",
  "Zambezia",
]

export const CommunityModal = ({ isOpen, onClose, onSuccess }: CommunityModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    province: "",
    district: "",
    population: 0,
    leaderId: "",
    needsAssessment: {
      mosquitoNets: 0,
      clothing: 0,
      food: 0,
      hygiene: 0,
    },
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createCommunity(formData)
      toast.success("Comunidade criada com sucesso!")
      setFormData({
        name: "",
        province: "",
        district: "",
        population: 0,
        leaderId: "",
        needsAssessment: {
          mosquitoNets: 0,
          clothing: 0,
          food: 0,
          hygiene: 0,
        },
      })
      onSuccess?.() // Chama o callback para atualizar a lista
      onClose()
    } catch (error) {
      toast.error("Erro ao criar comunidade")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Comunidade</DialogTitle>
          <DialogDescription>
                        Preencha os dados abaixo para cadastrar uma nova Comunidade no sistema.

          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome da Comunidade *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="province">Província *</Label>
              <Select
                value={formData.province}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, province: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a província" />
                </SelectTrigger>
                <SelectContent>
                  {mozambiqueProvinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="district">Distrito *</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => setFormData((prev) => ({ ...prev, district: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="population">População *</Label>
              <Input
                id="population"
                type="number"
                min="1"
                value={formData.population}
                onChange={(e) => setFormData((prev) => ({ ...prev, population: Number.parseInt(e.target.value) || 0 }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="leaderId">ID do Líder *</Label>
              <Input
                id="leaderId"
                value={formData.leaderId}
                onChange={(e) => setFormData((prev) => ({ ...prev, leaderId: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold">Avaliação de Necessidades</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="mosquitoNets">Redes Mosquiteiras</Label>
                <Input
                  id="mosquitoNets"
                  type="number"
                  min="0"
                  value={formData.needsAssessment.mosquitoNets}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      needsAssessment: {
                        ...prev.needsAssessment,
                        mosquitoNets: Number.parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="clothing">Roupas</Label>
                <Input
                  id="clothing"
                  type="number"
                  min="0"
                  value={formData.needsAssessment.clothing}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      needsAssessment: {
                        ...prev.needsAssessment,
                        clothing: Number.parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="food">Comida</Label>
                <Input
                  id="food"
                  type="number"
                  min="0"
                  value={formData.needsAssessment.food}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      needsAssessment: {
                        ...prev.needsAssessment,
                        food: Number.parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="hygiene">Produtos de Higiene</Label>
                <Input
                  id="hygiene"
                  type="number"
                  min="0"
                  value={formData.needsAssessment.hygiene}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      needsAssessment: {
                        ...prev.needsAssessment,
                        hygiene: Number.parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Comunidade"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
