import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import { createDonation, type Donation } from "../../services/donations"
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

const statusOptions = [
  { value: "pendente", label: "Pendente" },
  { value: "entregue", label: "Entregue" },
]

export const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  type DonationStatus = "pendente" | "entregue";

  const [formData, setFormData] = useState<{
    campaignName: string;
    items: DonationItem[];
    sourceOrganization: string;
    intermediateId: string;
    targetCommunityId: string;
    status: DonationStatus;
    trackingCode: string;
    estimatedDeliveryDate: string;
    actualDeliveryDate: string;
    verificationCode: string;
    beneficiariesCount: number;
    notes: string;
  }>({
    campaignName: "",
    items: [{ type: "", description: "", quantity: 0, unit: "" }],
    sourceOrganization: "",
    intermediateId: "",
    targetCommunityId: "",
    status: "pendente",
    trackingCode: "",
    estimatedDeliveryDate: "",
    actualDeliveryDate: "",
    verificationCode: "",
    beneficiariesCount: 0,
    notes: "",
  })
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate tracking code if not provided
      const trackingCode = formData.trackingCode || `TRK-${Date.now()}`

      await createDonation({
        ...formData,
        trackingCode,
        estimatedDeliveryDate: new Date(formData.estimatedDeliveryDate),
        actualDeliveryDate: formData.actualDeliveryDate ? new Date(formData.actualDeliveryDate) : undefined,
        items: formData.items.map((item) => ({
          ...item,
          type: item.type as "redes-mosquiteiras" | "roupas" | "comida" | "produtos-higienicos",
        })),
      })

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
        actualDeliveryDate: "",
        verificationCode: "",
        beneficiariesCount: 0,
        notes: "",
      })
      onClose()
    } catch (error) {
      toast.error("Erro ao criar doação")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Doação</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para cadastrar uma nova Doação no sistema.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="sourceOrganization">Organização Fonte *</Label>
              <Input
                id="sourceOrganization"
                value={formData.sourceOrganization}
                onChange={(e) => setFormData((prev) => ({ ...prev, sourceOrganization: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="intermediateId">ID do Intermediário *</Label>
              <Input
                id="intermediateId"
                value={formData.intermediateId}
                onChange={(e) => setFormData((prev) => ({ ...prev, intermediateId: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="targetCommunityId">ID da Comunidade Alvo *</Label>
              <Input
                id="targetCommunityId"
                value={formData.targetCommunityId}
                onChange={(e) => setFormData((prev) => ({ ...prev, targetCommunityId: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-base font-semibold">Items da Doação *</Label>
              <Button type="button" onClick={addItem} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Item
              </Button>
            </div>

            {formData.items.map((item, index) => (
              <div key={index} className="border rounded p-4 space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Item {index + 1}</span>
                  {formData.items.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeItem(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Tipo *</Label>
                    <Select value={item.type} onValueChange={(value) => updateItem(index, "type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
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
                    <Label>Unidade *</Label>
                    <Input
                      value={item.unit}
                      onChange={(e) => updateItem(index, "unit", e.target.value)}
                      placeholder="ex: kg, unidades, litros"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
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

                  <div>
                    <Label>Descrição *</Label>
                    <Input
                      onChange={(e) => updateItem(index, "description", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as DonationStatus }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="trackingCode">Código de Rastreamento</Label>
              <Input
                id="trackingCode"
                value={formData.trackingCode}
                onChange={(e) => setFormData((prev) => ({ ...prev, trackingCode: e.target.value }))}
                placeholder="Será gerado automaticamente se vazio"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="estimatedDeliveryDate">Data Estimada de Entrega *</Label>
              <Input
                id="estimatedDeliveryDate"
                type="date"
                value={formData.estimatedDeliveryDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, estimatedDeliveryDate: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="actualDeliveryDate">Data Real de Entrega</Label>
              <Input
                id="actualDeliveryDate"
                type="date"
                value={formData.actualDeliveryDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, actualDeliveryDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="verificationCode">Código de Verificação</Label>
              <Input
                id="verificationCode"
                value={formData.verificationCode}
                onChange={(e) => setFormData((prev) => ({ ...prev, verificationCode: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="beneficiariesCount">Número de Beneficiários</Label>
              <Input
                id="beneficiariesCount"
                type="number"
                min="0"
                value={formData.beneficiariesCount}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, beneficiariesCount: Number.parseInt(e.target.value) || 0 }))
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
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
