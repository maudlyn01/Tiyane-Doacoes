interface Props {
  titulo: string
  valor: number
  cor: string
}

export default function ResumoCard({ titulo, valor, cor }: Props) {
  return (
    <div className={`p-4 rounded shadow text-white ${cor}`}>
      <h3 className="text-sm">{titulo}</h3>
      <p className="text-2xl font-bold">{valor}</p>
    </div>
  )
}