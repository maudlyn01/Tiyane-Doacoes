import { Button } from "@/components/ui/button";
import {
  Card,
  
  
  CardContent,
  
  
  CardDescription,

  CardHeader,
  CardTitle,
} from "../components/ui/card"
export const Home = () => {
  return <div className="min-h-screen flex items-center flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:text-gray-100 selection:bg-teal-500 selection:text-white transition-colors duration-500">
    <div ><h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-600 to-pink-400 text-transparent bg-clip-text">Tiyane Doação</h1>
    </div>
    <p className="text-gray-400 dark:text-gray-400">
          Doe redes mosquiteiras, alimentos e roupas para quem mais precisa. 
          
        </p>
        <p className="text-gray-400 dark:text-gray-400">Sua ajuda direta faz uma enorme diferença na vida de muitas famílias.</p>
        <Button
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition-colors duration-300"
        >
          Painel administrativo
        </Button>
        <div className="w-full px-4 mt-10">
        
        <h1 className="flex justify-center font-bold text-5xl">Como funciona?</h1>

        
        <div className="h-90 mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          
          <Card>
  <CardHeader>
    <CardTitle className="flex justify-center text-4xl" >Rasteamento</CardTitle>
    <CardDescription>Acompanha cada etapa desde a coleta ate a entrega final ao destinatario</CardDescription>
  </CardHeader>
  
</Card>
    <Card>
  <CardHeader>
    <CardTitle className="flex flex-col justify-center text-4xl" ><div>Impacto</div>  <div>comunitario</div> </CardTitle>
    <CardDescription>Acompanha cada etapa desde a coleta ate a entrega final ao destinatario</CardDescription>
  </CardHeader>
  
</Card>
    <Card>
  <CardHeader>
    <CardTitle className="flex justify-center text-4xl" >Rasteamento</CardTitle>
    <CardDescription>Acompanha cada etapa desde a coleta ate a entrega final ao destinatario</CardDescription>
  </CardHeader>
  
</Card>
    <Card>
  <CardHeader>
    <CardTitle className="flex justify-center text-4xl" >Rápido e Facil</CardTitle>
    <CardDescription>Acompanha cada etapa desde a coleta ate a entrega final ao destinatario</CardDescription>
  </CardHeader>
  
</Card>
          
        </div>
      </div>
    
        <div className="w-full px-4 mt-10">
        
    <h1 className="flex justify-center font-bold text-5xl">Impacto Visualizado</h1>
        
        <div className="h-90 mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
    <Card>
  <CardHeader>
    <CardContent>
      <img src="/src/images/download (1).jpg" alt="" className="rounded-xl h-45" />
    </CardContent>
    <CardTitle className="text-center text-2xl">Productos de Higiene</CardTitle>
    <CardDescription className="text-center ">Acreditamos que acesso á higiene é um direito de todos por isso promovemos Saúde e bem estar através de productos de higiene essenciais</CardDescription>
  </CardHeader>
  
</Card>
    <Card>
  <CardHeader>
    <CardContent>
      <img src="/src/images/134452650_672099390127033_3902332876617489759_n.jpg" alt="" className="rounded-xl" />
      <CardTitle className="text-center text-2xl">Vestuario</CardTitle>
    </CardContent>
    <CardDescription className="px-6">Oferecendo conforto e dignidade através de roupas adequadas para todas as idades</CardDescription>
  </CardHeader>
  
</Card>
    <Card>
  <CardHeader>
    <CardContent>
      <img src="/src/images/images (3).jpg" alt="" className="rounded-xl" />
    </CardContent>
    <CardTitle className="text-center text-2xl">Redes que Salvam Vidas</CardTitle>
    <CardDescription className="px-6">Protegendo crianças da malária e outras doenças transmitidas por mosquitos.</CardDescription>
  </CardHeader>
  
</Card>

    <Card>
  <CardHeader>
    <CardContent>
      <img src="/src/images/images.jpg" alt="" className="rounded-xl" />
    </CardContent>
    <CardTitle className="text-center text-2xl">Alimentação e Nutrientes</CardTitle>
    <CardDescription className="px-3">Garantindo segurança alimentar e nutrição para familias em vulnerabilidade.</CardDescription>
  </CardHeader>
  
</Card>
      
        </div>
        
      </div>
    
    </div>
}
