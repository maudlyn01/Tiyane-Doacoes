const entregas = [
  { comunidade: 'Mafalala', item: 'Rede', agente: 'Carlos', status: 'entregue', data: '2025-06-15' },
  { comunidade: 'Hulene', item: 'Sabão', agente: 'Maria', status: 'pendente', data: '2025-06-16' },
];

export default function TabelaEntregas() {
  return (
    <table className="w-full text-left border mt-2">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Comunidade</th>
          <th className="p-2">Item</th>
          <th className="p-2">Agente</th>
          <th className="p-2">Status</th>
          <th className="p-2">Data</th>
        </tr>
      </thead>
      <tbody>
        {entregas.map((e, i) => (
          <tr key={i}>
            <td className="p-2">{e.comunidade}</td>
            <td className="p-2">{e.item}</td>
            <td className="p-2">{e.agente}</td>
            <td className="p-2">{e.status}</td>
            <td className="p-2">{e.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}