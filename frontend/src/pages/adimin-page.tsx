"use client"

import ResumeCard from "../components/resume-card.tsx"
import { useState, useEffect } from "react"
import DeliveryTable from "../components/delivery-table"
import { getAllIntermediates, type Intermediate } from "../services/intermediate"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { IntermediateModal } from "../components/adminModals/intermediate.tsx"
import { CommunityModal } from "../components/adminModals/community.tsx"
import { DonationModal } from "../components/adminModals/donation.tsx"
import { getAllCommunities, type Community } from "../services/community"
import { getAllDonations, type Donation } from "../services/donations"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const AdminPage = () => {
  const [openRecipients, setopenRecipients] = useState(false)
  const [openAgents, setOpenAgents] = useState(false)
  const [intermediates, setIntermediates] = useState<Intermediate[]>([])
  const [communities, setCommunities] = useState<Community[]>([])
  const [donations, setDonations] = useState<Donation[]>([])
  const [openCommunities, setOpenCommunities] = useState(false)
  const [openDonations, setOpenDonations] = useState(false)   
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Modal states
  const [isIntermediateModalOpen, setIsIntermediateModalOpen] = useState(false)
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)

  useEffect(() => {
    if (openRecipients && communities.length === 0) {
      getAllCommunities().then((data: any) => {
        console.log("Dado recebido da API de comunidades:", data)
        if (Array.isArray(data)) {
          setCommunities(data)
        } else if (data && Array.isArray((data as { communities?: Community[] }).communities)) {
          setCommunities((data as { communities: Community[] }).communities)
        } else {
          setCommunities([])
        }
      })
    }
  }, [openRecipients, communities.length])

  useEffect(() => {
    if (openAgents) {
      const fetchData = async () => {
        const data = await getAllIntermediates()
        setIntermediates(data)
      }
      fetchData()
    }
  }, [openAgents])

  useEffect(() => {
    if (openCommunities) {
      const fetchCommunities = async () => {
        const data = await getAllCommunities()
        setCommunities(data)
      }
      fetchCommunities()
    }
  }, [openCommunities])

  useEffect(() => {
    if (openDonations) {
      const fetchDonations = async () => {
        const data = await getAllDonations()
        setDonations(data)
      }
      fetchDonations()
    }
  }, [openDonations])

  const handleIntermediateCreated = () => {
    if (openAgents) {
      const fetchData = async () => {
        const data = await getAllIntermediates()
        setIntermediates(data)
      }
      fetchData()
    }
  }

  const handleCommunityCreated = () => {
    if (openCommunities) {
      const fetchData = async () => {
        const data = await getAllCommunities()
        setCommunities(data)
      }
      fetchData()
    }
  }

  const handleDonationCreated = () => {
    if (openDonations) {
      const fetchData = async () => {
        const data = await getAllDonations()
        setDonations(data)
      }
      fetchData()
    }
  }

  const filteredDonations = donations.filter((donation) => {
    if (statusFilter === "all") return true
    return donation.status === statusFilter
  })

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500 p-4">
      {/* Navbar */}
      <header className="bg-white text-black shadow p-4 flex flex-col sm:flex-row justify-between items-center mb-6 rounded gap-4">
        <h1 className="text-xl font-bold">Painel Administrativo</h1>
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <Button
            onClick={() => setIsIntermediateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Novo </span>Intermediário
          </Button>
          <Button
            onClick={() => setIsCommunityModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Nova </span>Comunidade
          </Button>
          <Button
            onClick={() => setIsDonationModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Nova </span>Doação
          </Button>
        </div>
      </header>

      {/* Cards de Resumo */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-300">Resumo Geral</h2>
        <p className="text-gray-300 mb-6 text-sm sm:text-base">
          Aqui você pode visualizar o resumo das doações, entregas e agentes de campo.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <ResumeCard
          titulo="Total de Doações"
          corValor="text-blue-300"
          cor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500"
          valor={donations.length}
        />
        <ResumeCard
          titulo="Entregas Confirmadas"
          corValor="text-green-300"
          cor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500"
          valor={donations.filter((d) => d.status === "entregue").length}
        />
        <ResumeCard
          titulo="Entregas Pendentes"
          corValor="text-yellow-300"
          cor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500"
          valor={donations.filter((d) => d.status === "pendente").length}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Accordion - Comunidades */}
        <div className="bg-white p-4 rounded shadow text-black">
          <button
            onClick={() => setOpenCommunities(!openCommunities)}
            className="w-full text-left text-base sm:text-lg font-semibold mb-2 text-blue-600 hover:underline"
          >
            {openCommunities ? "▼ Receptores de Doações" : "▶ Receptores de Doações"}
          </button>

          {openCommunities ? (
            <div>
              <p className="text-gray-500 mb-4 text-sm">Lista de comunidades que receberam doações:</p>
            
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                        <th className="py-2 px-3 text-left">Nome</th>
                        <th className="py-2 px-3 text-left hidden sm:table-cell">Província</th>
                        <th className="py-2 px-3 text-left hidden md:table-cell">Distrito</th>
                        <th className="py-2 px-3 text-right">População</th>
                      </tr>
                    </thead>
                    <tbody>
                      {communities.map((comunidade) => (
                        <tr
                          key={comunidade.id || comunidade.name}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="py-2 px-3 text-left whitespace-nowrap font-semibold">{comunidade.name}</td>
                          <td className="py-2 px-3 text-left hidden sm:table-cell">{comunidade.province}</td>
                          <td className="py-2 px-3 text-left hidden md:table-cell">{comunidade.district}</td>
                          <td className="py-2 px-3 text-right">{comunidade.population}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 mb-4 text-sm">Lista de comunidades cadastrados no sistema.</p>
                </div>
              )}
            </div>
            
         

        {/* Accordion - Agentes */}
        <div className="bg-white p-4 rounded shadow text-black">
          <button
            onClick={() => setOpenAgents(!openAgents)}
            className="w-full text-left text-base sm:text-lg font-semibold mb-2 text-blue-600 hover:underline"
          >
            {openAgents ? "▼ Agentes de Campo" : "▶ Agentes de Campo"}
          </button>

          {openAgents ? (
            <div>
              <p className="text-gray-500 mb-4 text-sm">Lista de agentes de campo e suas informações.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm text-left">
                  <thead>
                    <tr>
                      <th className="p-2">Nome</th>
                      <th className="p-2 hidden sm:table-cell">Telefone</th>
                      <th className="p-2 hidden md:table-cell">Email</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {intermediates.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2 hidden sm:table-cell">{item.phone}</td>
                        <td className="p-2 hidden md:table-cell">{item.email}</td>
                        <td className="p-2">
                          {item.isActive ? (
                            <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">Ativo</span>
                          ) : (
                            <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs">Inativo</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 mb-4 text-sm">Lista de Intermediários cadastrados no sistema.</p>
            </div>
          )}
        </div>
      </div>

      {/* Doações Section */}
      <div className="bg-white p-4 rounded shadow text-black mb-6">
        <button
          onClick={() => setOpenDonations(!openDonations)}
          className="w-full text-left text-base sm:text-lg font-semibold mb-2 text-blue-600 hover:underline"
        >
          {openDonations ? "▼ Doações" : "▶ Doações"}
        </button>

        {openDonations && (
          <div>
            <p className="text-gray-500 mb-4 text-sm">Lista de doações registradas no sistema.</p>

            <div className="mb-4">
              <Label htmlFor="statusFilter" className="text-sm">
                Filtrar por Status:
              </Label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="entregue">Entregue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs sm:text-sm text-left">
                <thead>
                  <tr>
                    <th className="p-2">Campanha</th>
                    <th className="p-2 hidden sm:table-cell">Organização</th>
                    <th className="p-2">Status</th>
                    <th className="p-2 hidden md:table-cell">Código</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map((donation) => (
                    <tr key={donation.id} className="border-t">
                      <td className="p-2">{donation.campaignName}</td>
                      <td className="p-2 hidden sm:table-cell">{donation.sourceOrganization}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            donation.status === "entregue"
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {donation.status === "entregue" ? "Entregue" : "Pendente"}
                        </span>
                      </td>
                      <td className="p-2 font-mono text-xs hidden md:table-cell">{donation.trackingCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Tabela de Entregas */}
      <div className="bg-white p-4 rounded shadow text-black">
        <h2 className="text-base sm:text-lg font-semibold mb-2">Histórico de Entregas</h2>
        <DeliveryTable />
      </div>

      {/* Modals */}
      <IntermediateModal
        isOpen={isIntermediateModalOpen}
        onClose={() => setIsIntermediateModalOpen(false)}
        onSuccess={handleIntermediateCreated}
      />
      <CommunityModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
        onSuccess={handleCommunityCreated}
      />
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onSuccess={handleDonationCreated}
      />
    </div>
  )
}
