import ResumoCard from "./resumoCard";
import { useState } from "react";
import TabelaEntregas from "./tabledeliry";

const dados = [
  { familia: "Família Silva", localizacao: "Beira", codigo: "FAM001", status: "entregue" },
  { familia: "Família Santos", localizacao: "Dondo", codigo: "FAM002", status: "pendente" },
];


export const AdminPage = () => {
  const [openRecipients, setopenRecipients] = useState(false);
  const [openAgents, setOpenAgents] = useState(false);

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
        <ResumoCard titulo="Entregas Confirmadas"corValor="text-yellow-300" cor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 transition-colors duration-500" valor={600} />
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
            <p className="text-gray-500 mb-4">Lista de agentes de campo com seus relatórios de entrega.</p>
</div>
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