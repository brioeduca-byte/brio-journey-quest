import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

export interface FeedbackFormData {
  // Seção 0 - Identificação
  fullName: string;
  
  // Seção 1 - Perguntas Abertas
  whatLiked: string;
  moreOrganized: string;
  tellFriend: string;
  
  // Seção 2 - Escala Likert (1-5)
  feltAccompanied: number;
  schedulesHelped: number;
  gamificationFun: number;
  monitoringUseful: number;
  
  // Seção 3 - Visão de Futuro
  futureOtherSubjects: string;
  
  // Seção 4 - Espaço Livre
  freeMessage: string;
}

interface FeedbackQuestion {
  id: keyof FeedbackFormData;
  title: string;
  emoji: string;
  type: "textarea" | "likert" | "nps" | "nps-reason";
  description: string;
  placeholder?: string;
  suggestions?: string[];
}

interface FeedbackQuestionScreenProps {
  step: number;
  formData: FeedbackFormData;
  updateFormData: (field: keyof FeedbackFormData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const questions: FeedbackQuestion[] = [
  // Seção 0 - Identificação
  {
    id: "fullName",
    title: "Qual é o seu nome completo?",
    emoji: "✍️",
    type: "textarea",
    description: "Queremos conhecer você melhor!"
  },
  
  // Seção 1 - Perguntas Abertas
  {
    id: "whatLiked",
    title: "O que você mais gostou da sua experiência com a Brio até agora?",
    emoji: "💙",
    type: "textarea",
    description: "Pode falar sobre qualquer coisa que te chamou atenção!",
    placeholder: "Uma coisa que achei muito legal foi...",
    suggestions: [
      "Uma coisa que achei muito legal foi...",
      "O que mais me chamou atenção foi...",
      "Gostei bastante de..."
    ]
  },
  {
    id: "moreOrganized",
    title: "Você sente que ficou mais organizado ou motivado para estudar? Por quê?",
    emoji: "📚",
    type: "textarea",
    description: "Conta pra gente como a Brio te ajudou (ou não) nos estudos!",
    placeholder: "Sim, porque agora eu...",
    suggestions: [
      "Sim, porque agora eu...",
      "Antes eu tinha dificuldade com..., mas com a Brio...",
      "Acho que sim, porque..."
    ]
  },
  {
    id: "tellFriend",
    title: "Se você fosse contar para um amigo sobre a Brio, o que diria?",
    emoji: "👥",
    type: "textarea",
    description: "Imagina que um amigo te pergunta: 'O que é essa Brio?'",
    placeholder: "Eu diria que a Brio é tipo...",
    suggestions: [
      "Eu diria que a Brio é tipo...",
      "É uma plataforma que te ajuda a...",
      "Eu contaria que..."
    ]
  },
  
  // Seção 2 - Escala Likert
  {
    id: "feltAccompanied",
    title: "Com a Brio, eu me senti mais acompanhado nos estudos.",
    emoji: "🤝",
    type: "likert",
    description: "(1 = Discordo totalmente | 5 = Concordo totalmente)"
  },
  {
    id: "schedulesHelped",
    title: "Os cronogramas da Brio me ajudaram a me organizar melhor.",
    emoji: "📅",
    type: "likert",
    description: "(1 = Discordo totalmente | 5 = Concordo totalmente)"
  },
  {
    id: "gamificationFun",
    title: "A gamificação deixou o estudo mais divertido.",
    emoji: "🎮",
    type: "likert",
    description: "(1 = Discordo totalmente | 5 = Concordo totalmente)"
  },
  {
    id: "monitoringUseful",
    title: "A monitoria (chat de dúvidas) me ajudou a tirar dúvidas ou me manter no caminho certo.",
    emoji: "🎯",
    type: "likert",
    description: "(1 = Discordo totalmente | 5 = Concordo totalmente)"
  },
  
  
  // Seção 3 - Visão de Futuro
  {
    id: "futureOtherSubjects",
    title: "Se a Brio continuasse com você no ano que vem, em mais matérias, como você acha que isso te ajudaria?",
    emoji: "🚀",
    type: "textarea",
    description: "Imagina a Brio em todas as suas matérias!",
    placeholder: "Acho que me ajudaria a...",
    suggestions: [
      "Acho que me ajudaria a...",
      "Seria bom porque nas outras matérias eu também tenho dificuldade em...",
      "Me sentiria mais preparado para..."
    ]
  },
  
  // Seção 4 - Espaço Livre
  {
    id: "freeMessage",
    title: "Quer deixar mais alguma mensagem, ideia ou sugestão pra gente?",
    emoji: "🎨",
    type: "textarea",
    description: "Esse espaço é seu. Manda ver! 🚀",
    placeholder: "Uma coisa que eu queria dizer é…",
    suggestions: [
      "Uma coisa que eu queria dizer é…",
      "Já usei outra plataforma parecida, mas a Brio…",
      "Tive uma ideia que poderia ser legal…",
      "Senti que com a Brio eu…",
      "Só queria dizer que…"
    ]
  }
];

const FeedbackQuestionScreen = ({
  step,
  formData,
  updateFormData,
  onNext,
  onBack
}: FeedbackQuestionScreenProps) => {
  const question = questions[step];
  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  // Auto-rotate suggestions every 4 seconds
  useEffect(() => {
    if (!question.suggestions || question.suggestions.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % question.suggestions!.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [question.suggestions]);

  if (!question) return null;

  const handleNext = () => {
    const currentValue = formData[question.id];
    
    // Validação básica
    if (question.type === "textarea" && !currentValue) {
      return;
    }
    if (question.type === "likert" && !currentValue) {
      return;
    }
    if (question.type === "nps" && currentValue === undefined) {
      return;
    }
    if (question.type === "nps-reason" && !currentValue) {
      return;
    }

    onNext();
  };

  const handleTextareaChange = (value: string) => {
    updateFormData(question.id, value);
  };

  const handleLikertChange = (value: number) => {
    updateFormData(question.id, value);
  };

  const handleNpsChange = (value: number) => {
    updateFormData(question.id, value);
  };

  const currentValue = formData[question.id];

  const isValid = question.type === "textarea" ? !!currentValue :
    question.type === "likert" ? !!currentValue :
    question.type === "nps" ? currentValue !== undefined :
    question.type === "nps-reason" ? !!currentValue : false;

  // Rotate suggestions manually (overrides auto-rotation)
  const rotateSuggestion = () => {
    if (question.suggestions && question.suggestions.length > 1) {
      setCurrentSuggestion((prev) => (prev + 1) % question.suggestions!.length);
    }
  };

  const getLikertEmoji = (value: number) => {
    const emojis = ["😟", "😕", "😐", "🙂", "😄"];
    return emojis[value - 1] || "😐";
  };

  const getNpsColor = (value: number) => {
    if (value <= 6) return "bg-red-500";
    if (value <= 8) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-brio mb-8 text-center">
        {/* Pergunta */}
        <div className="mb-6">
          <div className="text-6xl mb-4">{question.emoji}</div>
          <h2 className="font-baloo text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            {question.title}
          </h2>
          <p className="font-poppins text-lg text-gray-600">
            {question.description}
          </p>
        </div>

        {/* Campos de resposta */}
        <div className="mb-8">
          {question.type === "textarea" && (
            <div className="space-y-4">
              <Textarea
                value={currentValue as string || ""}
                onChange={(e) => handleTextareaChange(e.target.value)}
                placeholder={question.placeholder}
                className="min-h-[120px] text-lg p-4 rounded-xl border-2 focus:border-brio-blue resize-none"
              />
              
              {/* Sugestões rotativas */}
              {question.suggestions && question.suggestions.length > 1 && (
                <div className="text-left">
                  <p className="font-poppins text-sm text-gray-500 mb-2">
                    <span className="font-bold">💬 Sugestão para começar sua resposta:</span>
                    <span className="text-xs text-gray-400 ml-2"></span>
                  </p>
                  <div className="bg-brio-blue-light/20 rounded-lg p-3 border border-brio-blue/30 transition-all duration-500 ease-in-out">
                    <p className="font-poppins text-gray-700 italic transition-opacity duration-300">
                      "{question.suggestions[currentSuggestion]}"
                    </p>
                    <button
                      type="button"
                      onClick={rotateSuggestion}
                      className="text-brio-blue text-sm font-semibold mt-2 hover:underline transition-colors duration-200"
                    >
                      Ver outra sugestão →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {question.type === "likert" && (
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleLikertChange(value)}
                    className={`w-16 h-16 rounded-full border-4 transition-all duration-300 hover:scale-110 ${
                      currentValue === value
                        ? "border-brio-blue bg-brio-blue/20 scale-110"
                        : "border-gray-300 bg-white hover:border-brio-blue/50"
                    }`}
                  >
                    <div className="text-2xl">{getLikertEmoji(value)}</div>
                    <div className="text-xs font-bold text-gray-600">{value}</div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Discordo totalmente</span>
                <span>Concordo totalmente</span>
              </div>
            </div>
          )}

          {question.type === "nps" && (
            <div className="space-y-4">
              <div className="flex justify-center space-x-2 flex-wrap">
                {Array.from({ length: 11 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleNpsChange(i)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                      currentValue === i
                        ? `${getNpsColor(i)} text-white border-white scale-110`
                        : "border-gray-300 bg-white hover:border-brio-blue/50"
                    }`}
                  >
                    <span className="font-bold">{i}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Não recomendaria</span>
                <span>Recomendaria muito!</span>
              </div>
            </div>
          )}

          {question.type === "nps-reason" && (
            <Textarea
              value={currentValue as string || ""}
              onChange={(e) => handleTextareaChange(e.target.value)}
              placeholder="Explica pra gente o que te levou a dar essa nota..."
              className="min-h-[100px] text-lg p-4 rounded-xl border-2 focus:border-brio-blue resize-none"
            />
          )}
        </div>

        {/* Botões de navegação */}
        <div className="flex justify-between items-center">
          <Button
            onClick={onBack}
            variant="outline"
            className="font-poppins px-6 py-3 rounded-xl"
            disabled={step === 0}
          >
            ← Voltar
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isValid}
            className={`btn-brio-primary px-8 py-3 ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Próxima →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackQuestionScreen;
