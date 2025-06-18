interface Props {
  titulo: string;
  valor: number;
  cor: string; // cor do fundo
  icone?: React.ReactNode;
  corValor?: string; 
}

export default function ResumoCard({ titulo, valor, cor, icone, corValor }: Props) {
  return (
    <div className={`p-4 rounded shadow text-white flex items-center space-x-4 ${cor}`}>
      {icone && <div>{icone}</div>}
      <div>
        <h3 className="text-sm">{titulo}</h3>
        <p className={`text-2xl font-bold ${corValor}`}>{valor}</p> {/* 👈 aplica a cor */}
      </div>
    </div>
  );
}
