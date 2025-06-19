"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { createIntermediate } from "../../services/intermediate"
import { toast } from "sonner"
import { getAllCommunities, type Community } from "../../services/community"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface IntermediateModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const mozambiqueProvinces = [
  "Maputo Province",
  "Gaza",
  "Inhambane",
  "Sofala",
  "Manica",
  "Tete",
  "Zambezia",
  "Nampula",
  "Cabo Delgado",
  "Niassa",
  "Maputo City",
]

export const IntermediateModal = ({ isOpen, onClose, onSuccess }: IntermediateModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    assignedProvinces: [] as string[],
    isActive: true,
    communityId: "",
  })
  const [loading, setLoading] = useState(false)
  const [communities, setCommunities] = useState<Community[]>([])

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const data = await getAllCommunities()
        setCommunities(data)
      } catch (error) {
        console.error("Erro ao buscar comunidades:", error)
      }
    }

    if (isOpen) {
      fetchCommunities()
    }
  }, [isOpen])

  const handleProvinceChange = (province: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        assignedProvinces: [...prev.assignedProvinces, province],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        assignedProvinces: prev.assignedProvinces.filter((p) => p !== province),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createIntermediate(formData)
      toast.success("Intermediário criado com sucesso!")
      setFormData({
        name: "",
        phone: "",
        email: "",
        assignedProvinces: [],
        isActive: true,
        communityId: "",
      })
      onSuccess?.() // Chama o callback para atualizar a lista
      onClose()
    } catch (error) {
      toast.error("Erro ao criar intermediário")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>Criar Novo Intermediário</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="communityId">Comunidade Associada</Label>
            <Select
              value={formData.communityId || ""}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, communityId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma comunidade (opcional)" />
              </SelectTrigger>
              <SelectContent>
                {communities.map((community) => (
                  <SelectItem key={community.id} value={community.id}>
                    {community.name} - {community.province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Províncias Atribuídas *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded p-3">
              {mozambiqueProvinces.map((province) => (
                <div key={province} className="flex items-center space-x-2">
                  <Checkbox
                    id={province}
                    checked={formData.assignedProvinces.includes(province)}
                    onCheckedChange={(checked) => handleProvinceChange(province, checked as boolean)}
                  />
                  <Label htmlFor={province} className="text-sm">
                    {province}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked as boolean }))}
            />
            <Label htmlFor="isActive">Ativo</Label>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Criando..." : "Criar Intermediário"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
