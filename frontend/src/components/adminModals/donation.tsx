"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { createDonation, type Donation } from "../../services/donations"
import { getAllCommunities, type Community } from "../../services/community"
import { getAllIntermediates, type Intermediate } from "../../services/intermediate"
import { toast } from "sonner"

export interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (newDonation: Donation) => void
}

interface DonationItem {
  type: string
  description: string
  quantity: number
  unit: string
}

const itemTypes = [
  { value: "redes-mosquiteiras", label: "Redes Mosquiteiras" },
  { value: "roupas", label: "Roupas" },
  { value: "comida", label: "Comida" },
  { value: "produtos-higienicos", label: "Produtos Higiênicos" },
]

export const DonationModal = ({ isOpen, onClose, onSuccess }: DonationModalProps) => {
  type DonationStatus = "pendente" | "entregue"

  const [formData, setFormData] = useState<{
    campaignName: string
    items: DonationItem[]
    sourceOrganization: string
    intermediateId: string
    targetCommunityId: string
    status: DonationStatus
    trackingCode: string
    estimatedDeliveryDate: string
    verificationCode: string
    beneficiariesCount: number
    notes: string
  }>({
    campaignName: "",
    items: [{ type: "", description: "", quantity: 0, unit: "" }],
    sourceOrganization: "",
    intermediateId: "",
    targetCommunityId: "",
    status: "pendente",
    trackingCode: "",
    estimatedDeliveryDate: "",
    verificationCode: "",
    beneficiariesCount: 0,
    notes: "",
  })

  const [loading, setLoading] = useState(false)
  const [communities, setCommunities] = useState<Community[]>([])
  const [intermediates, setIntermediates] = useState<Intermediate[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [communitiesData, intermediatesData] = await Promise.all([
          getAllCommunities(),
          getAllIntermediates(),
        ])
        setCommunities(communitiesData)
        setIntermediates(intermediatesData)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      }
    }

    if (isOpen) {
      fetchData()
    }
  }, [isOpen])

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { type: "", description: "", quantity: 0, unit: "" }],
    }))
  }

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const updateItem = (index: number, field: keyof DonationItem, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const generateVerificationCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.intermediateId) {
      toast.error("Por favor, selecione um intermediário válido.")
      setLoading(false)
      return
    }

    if (!formData.targetCommunityId) {
      toast.error("Por favor, selecione uma comunidade alvo válida.")
      setLoading(false)
      return
    }

    try {
      const trackingCode = formData.trackingCode || `TRK-${Date.now()}`
      const verificationCode = formData.verificationCode || generateVerificationCode()

      const donationPayload = {
        ...formData,
        trackingCode,
        verificationCode,
        estimatedDeliveryDate: new Date(formData.estimatedDeliveryDate),
        items: formData.items.map((item) => ({
          ...item,
          type: item.type as "redes-mosquiteiras" | "roupas" | "comida" | "produtos-higienicos",
        })),
      }

      console.log("Payload para createDonation:", donationPayload)

      const createdDonation = await createDonation(donationPayload)

      toast.success("Doação criada com sucesso!")

      setFormData({
        campaignName: "",
        items: [{ type: "", description: "", quantity: 0, unit: "" }],
        sourceOrganization: "",
        intermediateId: "",
        targetCommunityId: "",
        status: "pendente",
        trackingCode: "",
        estimatedDeliveryDate: "",
        verificationCode: "",
        beneficiariesCount: 0,
        notes: "",
      })

      onSuccess?.(createdDonation)
      onClose()
    } catch (error) {
      toast.error("Erro ao criar doação")
      console.error("Erro no handleSubmit:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Doação</DialogTitle>
          <DialogDescription>Preencha os dados essenciais para cadastrar uma nova doação.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="campaignName">Nome da Campanha *</Label>
              <Input
                id="campaignName"
                value={formData.campaignName}
                onChange={(e) => setFormData((prev) => ({ ...prev, campaignName: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="sourceOrganization">Organização *</Label>
              <Input
                id="sourceOrganization"
                value={formData.sourceOrganization}
                onChange={(e) => setFormData((prev) => ({ ...prev, sourceOrganization: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="intermediateId">Intermediário Responsável *</Label>
              <Select
                value={formData.intermediateId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, intermediateId: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um intermediário" />
                </SelectTrigger>
                <SelectContent>
                  {intermediates.map((intermediate) => (
                    <SelectItem key={intermediate.id} value={intermediate.id}>
                      {intermediate.name} - {intermediate.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetCommunityId">Comunidade Alvo *</Label>
              <Select
                value={formData.targetCommunityId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, targetCommunityId: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma comunidade" />
                </SelectTrigger>
                <SelectContent>
                  {communities.map((community) => (
                    <SelectItem key={community.id || community._id} value={community.id || community._id}>
                      {community.name} - {community.province}, {community.district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-base font-semibold">Itens da Doação *</Label>
              <Button type="button" onClick={addItem} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>

            {formData.items.map((item, index) => (
              <div key={index} className="border rounded p-3 space-y-3 mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Item {index + 1}</span>
                  {formData.items.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeItem(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Tipo *</Label>
                    <Select
                      value={item.type}
                      onValueChange={(value) => updateItem(index, "type", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {itemTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Quantidade *</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Label htmlFor="estimatedDeliveryDate">Data Estimada *</Label>
            <Input
              id="estimatedDeliveryDate"
              type="date"
              value={formData.estimatedDeliveryDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, estimatedDeliveryDate: e.target.value }))}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Doação"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
