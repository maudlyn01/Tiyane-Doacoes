const DeliveryTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Data</th>
            <th className="p-2 hidden sm:table-cell">Doação</th>
            <th className="p-2">Status</th>
            <th className="p-2 hidden md:table-cell">Receptor</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2 text-xs sm:text-sm">Carregando...</td>
            <td className="p-2 text-xs sm:text-sm hidden sm:table-cell">-</td>
            <td className="p-2 text-xs sm:text-sm">-</td>
            <td className="p-2 text-xs sm:text-sm hidden md:table-cell">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DeliveryTable
