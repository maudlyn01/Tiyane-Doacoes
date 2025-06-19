import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Package } from "lucide-react"
import { updateDonation } from "../services/donations"
import { toast } from "sonner"

export const DeliveryConfirmation = () => {
  const [verificationCode, setVerificationCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [donationInfo, setDonationInfo] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First, find the donation by verification code
      // In a real implementation, you'd have an endpoint to find by verification code
    
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3001"}/donation/verify/${verificationCode}`,
      )

      if (!response.ok) {
        throw new Error("Código de verificação inválido")
      }

      const donation = await response.json()

      // Update the donation status to "entregue"
      await updateDonation(donation.id, {
        status: "entregue",
        actualDeliveryDate: new Date(),
      })

      setDonationInfo(donation)
      setSuccess(true)
      toast.success("Entrega confirmada com sucesso!")
    } catch (error) {
      toast.error("Erro ao confirmar entrega. Verifique o código.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setVerificationCode("")
    setSuccess(false)
    setDonationInfo(null)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Entrega Confirmada!</CardTitle>
            <CardDescription>A doação foi marcada como entregue com sucesso.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {donationInfo && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>
                  <strong>Campanha:</strong> {donationInfo.campaignName}
                </p>
                <p>
                  <strong>Organização:</strong> {donationInfo.sourceOrganization}
                </p>
                <p>
                  <strong>Código:</strong> {donationInfo.trackingCode}
                </p>
                <p>
                  <strong>Data de Entrega:</strong> {new Date().toLocaleDateString("pt-BR")}
                </p>
              </div>
            )}
            <Button onClick={resetForm} className="w-full">
              Confirmar Nova Entrega
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Confirmar Entrega</CardTitle>
          <CardDescription>Digite o código de verificação para confirmar o recebimento da doação.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="verificationCode">Código de Verificação</Label>
              <Input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                placeholder="Digite o código"
                required
                className="text-center text-lg font-mono"
                maxLength={10}
              />
            </div>

            <Button type="submit" disabled={loading || !verificationCode} className="w-full">
              {loading ? "Confirmando..." : "Confirmar Entrega"}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Instruções:</p>
                <p>O código de verificação foi fornecido junto com a doação. Digite-o exatamente como aparece.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
