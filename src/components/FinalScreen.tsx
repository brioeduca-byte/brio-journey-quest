import { Button } from "@/components/ui/button";

interface FinalScreenProps {
  nickname: string;
  onRestart: () => void;
}

const FinalScreen = ({ nickname, onRestart }: FinalScreenProps) => {
  return (
    <div className="min-h-screen bg-brio-hero flex items-center justify-center relative overflow-hidden">
      {/* Confetes animados */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {['🎉', '✨', '🌟', '🎊', '🏆'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
      
      {/* Elementos decorativos grandes */}
      <div className="absolute top-10 left-10 text-8xl float">🏆</div>
      <div className="absolute top-20 right-20 text-7xl bounce-gentle">🎯</div>
      <div className="absolute bottom-20 left-20 text-6xl float">⭐</div>
      <div className="absolute bottom-10 right-10 text-8xl bounce-gentle">🚀</div>
      
      <div className="text-center max-w-3xl mx-auto px-6 relative z-10">
        {/* Personagem comemorando */}
        <div className="mb-8">
          <div className="inline-block text-9xl animate-bounce">
            🎉
          </div>
        </div>
        
        {/* Título de sucesso */}
        <h1 className="font-baloo text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
          🎯 Muito obrigado(a),<br />
          <span className="text-brio-yellow">{nickname || "aventureiro(a)"}!</span>
        </h1>
        
        {/* Mensagem principal */}
        <div className="card-brio mb-8 transform hover:scale-105 transition-all duration-300">
          <p className="font-poppins text-xl md:text-2xl text-gray-800 mb-4 leading-relaxed">
            <strong>Sua jornada com a Brio vai começar!</strong>
          </p>
          <p className="font-poppins text-lg md:text-xl text-gray-700 leading-relaxed">
            Em breve, muitas aventuras, desafios e surpresas chegam para você! 
            Prepare-se para uma experiência incrível de aprendizado! 🌟
          </p>
        </div>
        
        {/* Personagem da Brio */}
        <div className="mb-8 text-8xl float">
          🧙‍♂️
        </div>
        
        {/* Botão opcional */}
        <Button 
          onClick={onRestart}
          className="btn-brio-secondary text-xl px-8 py-4 rounded-2xl transform hover:scale-110 transition-all duration-300"
        >
          🔄 Voltar para o início
        </Button>
        
        {/* Mensagem final */}
        <p className="font-poppins text-white/90 mt-8 text-lg">
          Continue essa jornada incrível com a Brio! 🚀✨
        </p>
      </div>
    </div>
  );
};

export default FinalScreen;