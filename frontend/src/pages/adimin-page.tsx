import ResumoCard from "./resumoCard";
import { useState, useEffect } from "react";
import TabelaEntregas from "./tabledeliry";
import { getAllIntermediates, type Intermediate } from "../services/intermediate";

export const AdminPage = () => {
  const [openRecipients, setopenRecipients] = useState(false);
  const [openAgents, setOpenAgents] = useState(false);
  const [intermediates, setIntermediates] = useState<Intermediate[]>([]);

  // Só busca quando abrir o accordion dos agentes
  useEffect(() => {
    if (openAgents) {
      const fetchData = async () => {
        const data = await getAllIntermediates();
        setIntermediates(data);
      };
      fetchData();
    }
  }, [openAgents]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500">
      {/* Navbar */}
      <header className="bg-white text-black shadow p-4 flex justify-between items-center mb-6 rounded">
        <h1 className="text-xl  text-blue-500 font-bold">Painel do Administrador</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </header>

      {/* Cards de Resumo */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Resumo Geral</h2>
        <p className="text-gray-300 mb-6">Aqui você pode visualizar o resumo das doações, entregas e agentes de campo.</p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-6">
        <ResumoCard titulo="Total de Doacoes" corValor="text-blue-300" cor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500" valor={1000} />
        <ResumoCard titulo="Entregas Confirmadas" corValor="text-yellow-300" cor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500" valor={600} />
        <ResumoCard titulo="Entregas Pendentes" corValor="text-green-300" cor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500" valor={400} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Accordion - Receptores */}
        {openRecipients ? (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setopenRecipients(false)}
              className="text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▼ Receptores de Doações
            </button>
            {/* Atualize aqui se quiser listar outros dados de receptores */}
            <p className="text-gray-500 mb-4">Lista de famílias que receberam doações com seus respectivos status.</p>
          </div>
        ) : (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setopenRecipients(true)}
              className="w-full text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▶ Receptores de Doações
            </button>
            <div>
              <p className="text-gray-500 mb-4">Lista de famílias que receberam doações com seus respectivos status.</p>
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
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="p-2">Nome</th>
                  <th className="p-2">Telefone</th>
                  <th className="p-2">Email</th>
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
                    <td className="p-2">{item.assignedProvinces.join(", ")}</td>
                    <td className="p-2">
                      {item.isActive ? (
                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded">Sim</span>
                      ) : (
                        <span className="bg-red-200 text-red-800 px-2 py-1 rounded">Não</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setOpenAgents(true)}
              className="w-full text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▶ Agentes de Campo
            </button>
          </div>
        )}
      </div>

      {/* Tabela de Entregas */}
      <div className="bg-white p-4 rounded shadow text-black">
        <h2 className="text-lg font-semibold mb-2">Histórico de Entregas</h2>
        <TabelaEntregas />
      </div>
    </div>
  );
};