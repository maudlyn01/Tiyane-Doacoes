import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Locate, Users, Eye, Zap } from "lucide-react";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 text-gray-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:text-gray-100 selection:bg-teal-500 selection:text-white transition-colors duration-500">
      
      <div className="text-center mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-600 to-pink-400 text-transparent bg-clip-text">
          Tiyane Doações
        </h1>
        <p className="text-gray-400">
          Doe redes mosquiteiras, alimentos e roupas para quem mais precisa.
        </p>
        <p className="text-gray-400 mb-6">
          Sua ajuda direta faz uma enorme diferença na vida de muitas famílias.
        </p>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition-colors duration-300">
          Painel administrativo
        </Button>
      </div>

      <section className="w-full mt-16">
        <h2 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl mb-8">
          Como funciona?
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Rastreamento",
              desc: "Acompanha cada etapa desde a coleta até a entrega final ao destinatário.",
              icon: <Locate className="w-10 h-10 text-teal-200 mb-4 mx-auto" />,
              hoverColor: "from-indigo-700 to-purple-700",
            },
            {
              title: "Impacto comunitário",
              desc: "Transformamos comunidades com cada doação realizada.",
              icon: <Users className="w-10 h-10 text-teal-200 mb-4 mx-auto" />,
              hoverColor: "from-fuchsia-700 to-pink-700",
            },
            {
              title: "Transparência",
              desc: "Você sabe exatamente onde sua doação está sendo usada.",
              icon: <Eye className="w-10 h-10 text-teal-200 mb-4 mx-auto" />,
              hoverColor: "from-blue-700 to-sky-700",
            },
            {
              title: "Rápido e Fácil",
              desc: "Um processo simples para fazer o bem de forma eficiente.",
              icon: <Zap className="w-10 h-10 text-teal-200 mb-4 mx-auto" />,
              hoverColor: "from-teal-700 to-green-700",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className={`rounded-xl text-white shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r ${item.hoverColor}`}
              style={{
                background: "linear-gradient(to right, #4B0082, #6A5ACD)",
              }}
            >
              <CardHeader className="text-center flex flex-col items-center">
                {item.icon}
                <CardTitle className="text-2xl sm:text-3xl">{item.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base px-2 mt-2 text-white/90">
                  {item.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="w-full mt-20 mb-16">
        <h2 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl mb-8">
          Impacto Visualizado
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              img: "/src/images/download (1).jpg",
              title: "Produtos de Higiene",
              desc: "Acreditamos que acesso à higiene é um direito de todos. Promovemos saúde e bem-estar com itens essenciais.",
            },
            {
              img: "/src/images/134452650_672099390127033_3902332876617489759_n.jpg",
              title: "Vestuário",
              desc: "Oferecendo conforto e dignidade com roupas adequadas para todas as idades.",
            },
            {
              img: "/src/images/images (3).jpg",
              title: "Redes que Salvam Vidas",
              desc: "Protegendo crianças da malária e outras doenças transmitidas por mosquitos.",
            },
            {
              img: "/src/images/images.jpg",
              title: "Alimentação e Nutrientes",
              desc: "Garantindo segurança alimentar e nutrição para famílias em vulnerabilidade.",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="rounded-xl text-white shadow-md"
              style={{
                background: "linear-gradient(to right, #4B0082, #6A5ACD)",
              }}
            >
              <CardHeader className="flex flex-col items-center">
                <CardContent className="w-full flex justify-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded-xl w-full h-48 object-cover"
                  />
                </CardContent>
                <CardTitle className="text-center text-xl sm:text-2xl mt-4">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-center text-sm sm:text-base px-4 mt-2 text-white/90">
                  {item.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
