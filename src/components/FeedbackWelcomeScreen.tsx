import { Button } from "@/components/ui/button";

interface FeedbackWelcomeScreenProps {
  onStart: () => void;
}

const FeedbackWelcomeScreen = ({ onStart }: FeedbackWelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-brio-hero flex items-center justify-center relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute top-10 left-10 text-6xl float">⭐</div>
      <div className="absolute top-20 right-20 text-5xl bounce-gentle">🎯</div>
      <div className="absolute bottom-20 left-20 text-4xl float">🚀</div>
      <div className="absolute bottom-10 right-10 text-6xl bounce-gentle">✨</div>
      <div className="absolute top-1/2 left-10 text-3xl animate-pulse">💙</div>
      <div className="absolute top-1/3 right-10 text-4xl float">📝</div>
      
      <div className="text-center max-w-3xl mx-auto px-6">
        {/* Logo placeholder */}
        <div className="mb-8">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-4 shadow-lg">
            <h1 className="font-baloo text-4xl font-bold text-white">
              BRIO <span className="text-brio-yellow">Educação</span>
            </h1>
          </div>
        </div>
        
        {/* Título principal */}
        <h1 className="font-baloo text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Sua opinião vai ajudar a construir a Brio do seu jeito 👇
        </h1>
        
        {/* Descrição */}
        <div className="card-brio mb-8 text-left">
          <p className="font-poppins text-lg md:text-xl text-gray-800 mb-4 leading-relaxed">
          Lá no começo da nossa jornada com a Brio, a gente falou que tudo só faria sentido se fosse construído junto com vocês.
            Agora que vocês já usaram a plataforma por algumas semanas, chegou a hora de ouvir o que acharam!
          </p>
          <p className="font-poppins text-lg md:text-xl text-gray-800 leading-relaxed">
            Essa pesquisa leva só 3 a 5 min. Pode falar com sinceridade — elogios, ideias ou o que pode melhorar. 
            A sua opinião vai ajudar a deixar a Brio ainda mais a sua cara 💙
          </p>
        </div>
        
        {/* Botão de início */}
        <Button 
          onClick={onStart}
          className="btn-brio-hero text-2xl px-12 py-6 rounded-3xl transform hover:scale-110 transition-all duration-300 shadow-2xl"
        >
          🚀 Começar agora
        </Button>
        
        {/* Informação adicional */}
        <p className="font-poppins text-white/80 mt-8 text-lg">
          São apenas algumas perguntas rápidas e divertidas! ⏱️
        </p>
      </div>
    </div>
  );
};

export default FeedbackWelcomeScreen;
