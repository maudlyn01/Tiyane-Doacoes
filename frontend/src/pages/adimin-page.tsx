import ResumoCard from "./resumoCard";
import { useState } from "react";
import TabelaEntregas from "./tabledeliry";

const dados = [
  { familia: "Família Silva", localizacao: "Beira", codigo: "FAM001", status: "entregue" },
  { familia: "Família Santos", localizacao: "Dondo", codigo: "FAM002", status: "pendente" },
];


export const AdminPage = () => {
  const [openRecipients, setopenRecipients] = useState(true);
  const [openAgents, setOpenAgents] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500">
      {/* Navbar */}
      <header className="bg-white text-black shadow p-4 flex justify-between items-center mb-6 rounded">
        <h1 className="text-xl font-bold">Painel do Administrador</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </header>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ResumoCard titulo="Total de Doacoes" valor={1000} cor="bg-blue-500" />
        <ResumoCard titulo="Entregas Confirmadas" valor={600} cor="bg-green-500" />
        <ResumoCard titulo="Entregas Pendentes" valor={400} cor="bg-yellow-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Accordion - Receptores */}
        {openRecipients ? (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setopenRecipients(false)}
              className="w-full text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▼ Receptores de Doações
            </button>

           
<tbody>
  {dados.map((item, index) => (
    <tr key={index} className="border-t">
      <td className="p-2">{item.familia}</td>
      <td className="p-2">{item.localizacao}</td>
      <td className="p-2">{item.codigo}</td>
      <td
        className={`p-2 font-semibold rounded ${
          item.status === "entregue"
            ? "bg-green-200 text-green-800"
            : item.status === "pendente"
            ? "bg-yellow-200 text-yellow-800"
            : ""
        }`}
      >
        {item.status}
      </td>
    </tr>
  ))}
</tbody>
          </div>
        ) : (
          <div className="bg-white p-4 rounded shadow text-black">
            <button
              onClick={() => setopenRecipients(true)}
              className="w-full text-left text-lg font-semibold mb-2 text-blue-600 hover:underline"
            >
              ▶ Receptores de Doações
            </button>
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

   <table className="min-w-full text-sm text-left">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-2">Nome</th>
      <th className="p-2">Província</th>
      <th className="p-2">Código</th>
      <th className="p-2">Relatório</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-t align-top">
      <td className="p-2">João Mussa</td>
      <td className="p-2">Sofala</td>
      <td className="p-2">AG001</td>
      <td className="p-2">
        <div className="bg-gray-100 p-2 rounded">
          Entregas concluídas com sucesso nas zonas de Mungassa e Estoril. Famílias satisfeitas e sem incidentes reportados.
        </div>
      </td>
    </tr>
    <tr className="border-t align-top">
      <td className="p-2">Ana Chongo</td>
      <td className="p-2">Nampula</td>
      <td className="p-2">AG002</td>
      <td className="p-2">
        <div className="bg-gray-100 p-2 rounded">
          Entregas atrasadas devido às chuvas. Foram entregues apenas 60% dos pacotes previstos. Continuação marcada para amanhã.
        </div>
      </td>
    </tr>
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