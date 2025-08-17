import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-brio-hero flex items-center justify-center relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute top-10 left-10 text-6xl float">🌟</div>
      <div className="absolute top-20 right-20 text-5xl bounce-gentle">🚀</div>
      <div className="absolute bottom-20 left-20 text-4xl float">📚</div>
      <div className="absolute bottom-10 right-10 text-6xl bounce-gentle">🎯</div>
      <div className="absolute top-1/2 left-10 text-3xl animate-pulse">✨</div>
      <div className="absolute top-1/3 right-10 text-4xl float">🏆</div>
      
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Logo placeholder */}
        <div className="mb-8">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-4 shadow-lg">
            <h1 className="font-baloo text-4xl font-bold text-white">
              BRIO <span className="text-brio-yellow">Educação</span>
            </h1>
          </div>
        </div>
        
        {/* Título principal */}
        <h1 className="font-baloo text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          🎉 Bem-vindo(a) à sua<br />
          <span className="text-brio-yellow">Jornada Brio!</span>
        </h1>
        
        {/* Descrição */}
        <p className="font-poppins text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
          Vamos conhecer mais sobre você para deixar tudo com a sua cara. 
          Vai ser rápido, divertido e cheio de surpresas!
        </p>
        
        {/* Botão de início */}
        <Button 
          onClick={onStart}
          className="btn-brio-hero text-2xl px-12 py-6 rounded-3xl transform hover:scale-110 transition-all duration-300 shadow-2xl"
        >
          🚀 Começar agora
        </Button>
        
        {/* Informação adicional */}
        <p className="font-poppins text-white/80 mt-8 text-lg">
          São apenas 10 perguntas rápidas e divertidas! ⏱️
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;