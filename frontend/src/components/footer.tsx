export const Footer = () => {
return (
    <footer
      className="w-full py-8 text-center text-white text-lg" 
      style={{
        background: 'linear-gradient(to right, #4B0082, #6A5ACD)' 
      }}
    >
      <div className="flex items-center justify-center mb-2">
        
        <span className="text-red-400 text-3xl mr-2">❤️</span>
        <p className="text-white font-semibold">Feito com amor para um Moçambique melhor.</p>
      </div>

      <p className="text-gray-300 text-sm">
        © 2025 Plataforma de Rasteamento e Monitoramento. Todos os Direitos Reservados.
      </p>
      <p className="text-gray-400 text-xs">
        Simulação para fins demonstrativos.
      </p>
      
    </footer>
  );  
};
