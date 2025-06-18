import ResumoCard from "./resumoCard"
import { useState, useEffect } from "react"
import TabelaEntregas from "./tabledeliry"
import { getAllIntermediates, type Intermediate } from "../services/intermediate"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { IntermediateModal } from "../components/adminModals/intermediate"
import { CommunityModal } from "../components/adminModals/community"
import { DonationModal } from "../components/adminModals/donation"
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

  // Só busca quando abrir o accordion dos agentes
  useEffect(() => {
    if (openAgents) {
      const fetchData = async () => {
        const data = await getAllIntermediates()
        setIntermediates(data)
      }
      fetchData()
    }
  }, [openAgents])

  // Busca comunidades quando abrir o accordion
  useEffect(() => {
    if (openCommunities) {
      const fetchCommunities = async () => {
        const data = await getAllCommunities()
        setCommunities(data)
      }
      fetchCommunities()
    }
  }, [openCommunities])

  // Busca doações quando abrir o accordion
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500">
      {/* Navbar */}
      <header className="bg-white text-black shadow p-4 flex justify-between items-center mb-6 rounded">
        
        <div className="flex gap-2 items-center justify-center">
          <Button onClick={() => setIsIntermediateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Intermediário
          </Button>
          <Button onClick={() => setIsCommunityModalOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Comunidade
          </Button>
          <Button onClick={() => setIsDonationModalOpen(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Doação
          </Button>
          <button className="bg-red-600 text-white px-4 py-2 rounded ml-4">Logout</button>
        </div>
      </header>

      {/* Cards de Resumo */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Resumo Geral</h2>
        <p className="text-gray-300 mb-6">
          Aqui você pode visualizar o resumo das doações, entregas e agentes de campo.
        </p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-6">
        <ResumoCard
          titulo="Total de Doacoes"
          corValor="text-blue-300"
          cor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500"
          valor={donations.length}
        />
        <ResumoCard
          titulo="Entregas Confirmadas"
          corValor="text-yellow-300"
          cor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500"
          valor={donations.filter(d => d.status === "entregue").length}
        />
        <ResumoCard
          titulo="Entregas Pendentes"
          corValor="text-green-300"
          cor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500"
          valor={donations.filter(d => d.status === "pendente").length}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Accordion - Comunidades */}
        {openCommunities ? (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setOpenCommunities(false)}
              className="w-full text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▼ Comunidades
            </button>
            <div>
              <p className="text-gray-500 mb-4">Lista de comunidades cadastradas no sistema.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="p-2">Nome</th>
                    <th className="p-2">Província</th>
                    <th className="p-2">Distrito</th>
                    <th className="p-2">População</th>
                    <th className="p-2">Necessidades</th>
                  </tr>
                </thead>
                <tbody>
                  {communities.map((community) => (
                    <tr key={community.id} className="border-t">
                      <td className="p-2">{community.name}</td>
                      <td className="p-2">{community.province}</td>
                      <td className="p-2">{community.district}</td>
                      <td className="p-2">{community.population.toLocaleString()}</td>
                      <td className="p-2">
                        <div className="text-xs">
                          <div>Redes: {community.needsAssessment.mosquitoNets}</div>
                          <div>Roupas: {community.needsAssessment.clothing}</div>
                          <div>Comida: {community.needsAssessment.food}</div>
                          <div>Higiene: {community.needsAssessment.hygiene}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setOpenCommunities(true)}
              className="w-full text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▶ Comunidades
            </button>
            <div>
              <p className="text-gray-500 mb-4">Lista de comunidades cadastradas no sistema.</p>
            </div>
          </div>
        )}

        {/* Accordion - Agentes */}
        {openAgents ? (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setOpenAgents(false)}
              className="w-full text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▼ Agentes de Campo
            </button>
            <div>
              <p className="text-gray-500 mb-4">Lista de agentes de campo e suas informações.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="p-2">Nome</th>
                    <th className="p-2">Telefone</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Comunidade</th>
                    <th className="p-2">Províncias</th>
                    <th className="p-2">Ativo</th>
                  </tr>
                </thead>
                <tbody>
                  {intermediates.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.phone}</td>
                      <td className="p-2">{item.email}</td>
                      <td className="p-2">
                        {item.communityId ? (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {communities.find((c) => c.id === item.communityId)?.name || "N/A"}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">Não atribuída</span>
                        )}
                      </td>
                      <td className="p-2 text-xs">{item.assignedProvinces.join(", ")}</td>
                      <td className="p-2">
                        {item.isActive ? (
                          <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">Sim</span>
                        ) : (
                          <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs">Não</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setOpenAgents(true)}
              className="w-full text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▶ Agentes de Campo
            </button>
             <div>
              <p className="text-gray-500 mb-4">Lista de Intermediários cadastrados no sistema.</p>
            </div>
          </div>
        )}

        {/* Accordion - Doações */}
        {openDonations ? (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setOpenDonations(false)}
              className="w-full text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▼ Doações
            </button>
            <div>
              <p className="text-gray-500 mb-4">Lista de doações registradas no sistema.</p>
            </div>

            {/* Adicionar filtro de status */}
            <div className="mb-4">
              <Label htmlFor="statusFilter">Filtrar por Status:</Label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                <SelectTrigger className="w-48">
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
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="p-2">Campanha</th>
                    <th className="p-2">Organização</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Código</th>
                    <th className="p-2">Entrega</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map((donation) => (
                    <tr key={donation.id} className="border-t">
                      <td className="p-2">{donation.campaignName}</td>
                      <td className="p-2">{donation.sourceOrganization}</td>
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
                      <td className="p-2 font-mono text-xs">{donation.trackingCode}</td>
                      <td className="p-2 text-xs">
                        {new Date(donation.estimatedDeliveryDate).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setOpenDonations(true)}
              className="w-full text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▶ Doações
            </button>
            <div>
              <p className="text-gray-500 mb-4">Lista de doações registradas no sistema.</p>
            </div>
          </div>
        )}
      </div>

      {/* Tabela de Entregas */}
      <div className="bg-white p-4 rounded shadow text-black">
        <h2 className="text-lg font-semibold mb-2">Histórico de Entregas</h2>
        <TabelaEntregas />
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
