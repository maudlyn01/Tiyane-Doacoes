
import  { useState, useEffect } from "react"

type Entrega = {
  id: string
  nomeFamilia: string
  doacoes: string[]
  assinatura: string
  dataEntrega: string
  horaEntrega:string
  nomeIntermediario:string
  sincronizado?: boolean

}

export const Intermediario = () => {
 
  const [nomeFamilia, setNomeFamilia] = useState("")
  const [doacoes, setDoacoes] = useState("")
  const [assinatura, setAssinatura] = useState("")
  const [dataEntrega, setDataEntrega] = useState ("")
  const [horaEntrega, setHoraEntrega] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [entregas, setEntregas] = useState<Entrega[]>([])

  

  
  useEffect(() => {
    const dados = localStorage.getItem("entregas")
    if (dados) {
      setEntregas(JSON.parse(dados))
    }
  }, [])

  
  useEffect(() => {
    localStorage.setItem("entregas", JSON.stringify(entregas))
  }, [entregas])

  const registrarEntrega = () => {
    if (!nomeFamilia || !doacoes || !assinatura || !  dataEntrega || ! horaEntrega){
      setMensagem("Preencha todos os campos.")
      return
    }

    const novaEntrega: Entrega = {
      id: crypto.randomUUID(),
      nomeFamilia,
      doacoes: doacoes.split(",").map((i) => i.trim()),
      assinatura: assinatura || "sem-assinatura",
      dataEntrega,
      horaEntrega,
      nomeIntermediario: "intermediario", 
      sincronizado: false
    }

    setEntregas((prev) => [...prev, novaEntrega])
    setNomeFamilia("")
    setDoacoes("")
    setAssinatura("");
    setDataEntrega("");
    setHoraEntrega("");
  
    setMensagem("Entrega registrada localmente!")
  }

  
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Painel do Intermediario</h1>

      <div className="max-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:text-gray-100 selection:bg-teal-500 selection:text-white transition-colors duration-500\ p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2"></h2>
         
      <h3 className="text-shadow-lg">Codigo da comunidade:</h3>
        <input
        
          type="text"
          placeholder="Digite o codigo da comunidade"
          value={nomeFamilia}
          onChange={(e) => setNomeFamilia(e.target.value)}
          className="border p-2 mb-2 w-full" required
        />
        <h3>Itens Entregues:</h3>
        <input
          type="text"
          placeholder="Digite o codigo recebido"
          value={doacoes}
          onChange={(e) => setDoacoes(e.target.value)}
          className="border p-2 mb-2 w-full" required
        />
      <h3>Assinatura:</h3>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={assinatura}
          onChange={(e) => setAssinatura(e.target.value)}
          className="border p-2 mb-2 w-full" required
        />
        <h3>Data da Entrega</h3>
        <input
            type="date"
            id="dataEntrega"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Selecione a data da entrega"
            title="Data da Entrega" 
          />


        
        <button
          onClick={registrarEntrega}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
         Confirmar Entrega
        </button>
        {mensagem && <p className="mt-2 text-green-700">{mensagem}</p>}
      </div>
    </div>
  )
}








  

  

