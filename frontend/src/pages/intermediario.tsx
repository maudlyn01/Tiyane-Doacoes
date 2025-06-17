
import  { useState, useEffect } from "react"

type Entrega = {
  id: string
  nomeFamilia: string
  doacoes: string[]
  assinatura: string
  data: string
  sincronizado?: boolean
}

export const Intermediario = () => {
 
  const [nomeFamilia, setNomeFamilia] = useState("")
  const [doacoes, setDoacoes] = useState("")
  const [assinatura, setAssinatura] = useState("")
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
    if (!nomeFamilia || !doacoes){
      setMensagem("Preencha todos os campos.")
      return
    }

    const novaEntrega: Entrega = {
      id: crypto.randomUUID(),
      nomeFamilia,
      doacoes: doacoes.split(",").map((i) => i.trim()),
      assinatura: assinatura || "sem-assinatura",
      data: new Date().toISOString(),
      sincronizado: false
    }

    setEntregas((prev) => [...prev, novaEntrega])
    setNomeFamilia("")
    setDoacoes("")
    setMensagem("Entrega registrada localmente!")
  }

  
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Painel do Intermediario</h1>

      <div className="max-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:text-gray-100 selection:bg-teal-500 selection:text-white transition-colors duration-500\ p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">Nova Entrega</h2>

        <input
          type="text"
          placeholder="Nome da Família"
          value={nomeFamilia}
          onChange={(e) => setNomeFamilia(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Doações"
          value={doacoes}
          onChange={(e) => setDoacoes(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
      
        <input
          type="text"
          placeholder="Assinatura"
          value={assinatura}
          onChange={(e) => setAssinatura(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={registrarEntrega}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Registrar Entrega
        </button>
        {mensagem && <p className="mt-2 text-green-700">{mensagem}</p>}
      </div>
    </div>
  )
}



