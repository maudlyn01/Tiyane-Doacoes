interface ResumeCardProps {
  titulo: string
  valor: number
  cor: string
  corValor: string
}

const ResumeCard = ({ titulo, valor, cor, corValor }: ResumeCardProps) => {
  return (
    <div className={`${cor} p-4 md:p-6 rounded-lg shadow-md`}>
      <h3 className="text-sm md:text-base font-medium text-gray-300 mb-2">{titulo}</h3>
      <p className={`text-2xl md:text-3xl font-bold ${corValor}`}>{valor}</p>
    </div>
  )
}

export default ResumeCard
