import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { FormData } from "./BrioForm";

interface Option {
  value: string;
  label: string;
  desc?: string;
  hasInput?: boolean;
}

interface Question {
  id: string;
  title: string;
  emoji: string;
  type: "text" | "radio" | "checkbox";
  description: string;
  maxSelections?: number;
  options?: Option[];
}

interface QuestionScreenProps {
  step: number;
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const questions: Question[] = [
  {
    id: "fullName",
    title: "Qual é o seu nome completo?",
    emoji: "✍️",
    type: "text",
    description: "Queremos conhecer você melhor!"
  },
  {
    id: "nickname",
    title: "Como você quer que a gente te chame na Brio?",
    emoji: "💛",
    type: "text",
    description: "Escolha um apelido legal para sua jornada!"
  },
  {
    id: "schoolName",
    title: "Qual é o nome da sua escola?",
    emoji: "🏫",
    type: "text",
    description: "Exemplo: Maple Bear"
  },
  {
    id: "schoolUnit",
    title: "Qual é a unidade da sua escola?",
    emoji: "📍",
    type: "text",
    description: "Exemplo: Cantareira"
  },
  {
    id: "schoolYear",
    title: "Qual é o seu ano letivo?",
    emoji: "📚",
    type: "radio",
    description: "Selecione o ano que você está cursando.",
    options: [
      { value: "6ano", label: "6º ano" },
      { value: "7ano", label: "7º ano" },
      { value: "8ano", label: "8º ano" },
      { value: "9ano", label: "9º ano" }
    ]
  },
  {
    id: "favoriteCharacter",
    title: "Qual desses personagens você mais gosta?",
    emoji: "🎭",
    type: "radio",
    description: "Escolha o seu favorito ou escreva o seu se não estiver aqui.",
    options: [
      { value: "hero", label: "🦸 Herói ou Heroína", desc: "tipo super-heróis de HQ ou filmes" },
      { value: "wizard", label: "🧙 Mago ou Bruxa", desc: "mundo da magia e feitiços" },
      { value: "dragon", label: "🐉 Dragão Aventureiro", desc: "criatura mítica e poderosa" },
      { value: "robot", label: "🤖 Robô Futurista", desc: "tecnologia e invenções" },
      { value: "magical", label: "🦄 Criatura Mágica", desc: "unicórnios, fadas, etc." },
      { value: "pirate", label: "🏴‍☠️ Pirata Destemido", desc: "aventuras pelos mares" },
      { value: "other", label: "✏️ Outro", desc: "digite seu personagem favorito", hasInput: true }
    ]
  },
  {
    id: "superpowers",
    title: "Se você pudesse ter qualquer superpoder, qual seria?",
    emoji: "🪄✨",
    type: "checkbox",
    description: "Selecione até 2 opções.",
    maxSelections: 2,
    options: [
      { value: "fly", label: "🪂 Voar" },
      { value: "invisible", label: "👻 Ficar invisível" },
      { value: "strength", label: "💪 Superforça" },
      { value: "time", label: "⏳ Controlar o tempo" },
      { value: "mind", label: "🧠 Ler mentes" },
      { value: "create", label: "🎨 Criar coisas com a imaginação" },
      { value: "other", label: "✏️ Outro", hasInput: true }
    ]
  },
  {
    id: "favoriteWorlds",
    title: "Que tipo de mundos você acha mais legais?",
    emoji: "🌍",
    type: "checkbox",
    description: "Selecione até 3 opções.",
    maxSelections: 3,
    options: [
      { value: "futuristic", label: "🤖 Futurista/tecnológico" },
      { value: "medieval", label: "🏰 Medieval com castelos e cavaleiros" },
      { value: "space", label: "🚀 Espaço sideral" },
      { value: "forest", label: "🌲 Floresta mágica" },
      { value: "modern", label: "🏙️ Cidade moderna" },
      { value: "apocalyptic", label: "🧟 Mundo pós-apocalíptico" },
      { value: "other", label: "✏️ Outro", hasInput: true }
    ]
  },
  {
    id: "musicStyle",
    title: "Qual estilo de música você mais gosta?",
    emoji: "🎶💃",
    type: "radio",
    description: "Pode escolher o seu favorito ou escrever outro.",
    options: [
      { value: "pop", label: "🎵 Pop", desc: "músicas que tocam no rádio e nas playlists" },
      { value: "classical", label: "🎻 Música Clássica", desc: "orquestra, piano, grandes compositores" },
      { value: "rock", label: "🎸 Rock", desc: "guitarras e baterias animadas" },
      { value: "sertanejo", label: "🎤 Sertanejo", desc: "músicas do interior e sertão" },
      { value: "kpop", label: "🎧 K-Pop", desc: "pop coreano, com danças e grupos famosos" },
      { value: "mpb", label: "🎼 MPB", desc: "Música Popular Brasileira" },
      { value: "funk", label: "🎤 Funk", desc: "Música Popular Brasileira" },
      { value: "other", label: "✏️ Outro", hasInput: true }
    ]
  },
  {
    id: "favoriteColor",
    title: "Qual é a sua cor favorita?",
    emoji: "🎨",
    type: "radio",
    description: "Selecione 1 opção.",
    options: [
      { value: "red", label: "🔴 Vermelho" },
      { value: "orange", label: "🌸 Rosa" },
      { value: "yellow", label: "🟡 Amarelo" },
      { value: "green", label: "🟢 Verde" },
      { value: "blue", label: "🔵 Azul" },
      { value: "purple", label: "🟣 Roxo" },
      { value: "black", label: "⚫ Preto" },
      { value: "white", label: "⚪ Branco" }
    ]
  },
  {
    id: "hobbies",
    title: "O que você mais gosta de fazer no tempo livre?",
    emoji: "🎯",
    type: "checkbox",
    description: "Selecione até 3 opções.",
    maxSelections: 3,
    options: [
      { value: "sports", label: "🏃 Esportes" },
      { value: "games", label: "🎮 Games" },
      { value: "reading", label: "📚 Leitura" },
      { value: "drawing", label: "🎨 Desenhar/Pintar" },
      { value: "music", label: "🎤 Tocar instrumentos/Cantar" },
      { value: "movies", label: "🎬 Assistir filmes/séries" },
      { value: "other", label: "✏️ Outro", hasInput: true }
    ]
  },
  {
    id: "collectibles",
    title: "Se você pudesse colecionar qualquer coisa no mundo, o que seria?",
    emoji: "🏆",
    type: "checkbox",
    description: "Selecione até 2 opções ou escreva outro.",
    maxSelections: 2,
    options: [
      { value: "cards", label: "🃏 Cartas ou figurinhas raras" },
      { value: "coins", label: "🪙 Moedas antigas" },
      { value: "virtual", label: "🎮 Skins e itens virtuais" },
      { value: "toys", label: "🧸 Miniaturas ou bonecos" },
      { value: "music_items", label: "🎧 Produtos de música (CDs, vinis)" },
      { value: "books", label: "📚 Livros especiais" },
      { value: "other", label: "✏️ Outro", hasInput: true }
    ]
  },
  {
    id: "prize",
    title: "Se você pudesse ganhar um brinde agora por ter completado um desafio da Brio, o que escolheria?",
    emoji: "🎁",
    type: "radio",
    description: "Escolha seu prêmio dos sonhos!",
    options: [
      { value: "gift_card", label: "🕹️ Gift card de jogo" },
      { value: "briocoin", label: "💰 BrioCoin para subir no ranking da Brio" },
      { value: "skins", label: "🎨 Skins exclusivas para personalizar seu perfil" },
      { value: "bottle", label: "💧 Garrafa/Squeeze personalizada" },
      { value: "headphones", label: "🎧 Fones de ouvido" },
      { value: "tshirt", label: "👕 Camiseta temática" },
      { value: "stationery", label: "📓 Estojo ou kit de papelaria estilizado" }
    ]
  },
  {
    id: "ambassador",
    title: "🚀 Quer ser um Embaixador(a) da Brio na sua escola?",
    emoji: "🏆",
    type: "radio",
    description: "Como embaixador(a) da Brio Educação, você vai ter benefícios exclusivos, prêmios dentro da plataforma e a missão de engajar seus amigos e sua turma para participar cada vez mais dos desafios. Quando eles entrarem e participarem, você também ganha pontos, prêmios e vantagens especiais!",
    options: [
      { value: "yes", label: "✅ Sim, quero ser um Embaixador(a)!" },
      { value: "no", label: "❌ Não, obrigado(a)" }
    ]
  }
];

const QuestionScreen = ({
  step,
  formData,
  updateFormData,
  onNext,
  onBack
}: QuestionScreenProps) => {
  const question = questions[step];
  const nickname = formData.nickname || "aventureiro(a)";

  // Get the current question's custom input value from form data
  const getCustomInputValue = () => {
    const customFieldKey = `${question.id}Custom` as keyof FormData;
    return (formData as any)[customFieldKey] || "";
  };

  // Update the custom input value in form data
  const updateCustomInput = (value: string) => {
    const customFieldKey = `${question.id}Custom` as keyof FormData;
    updateFormData(customFieldKey, value);
  };

  if (!question) return null;

  const handleNext = () => {
    // Validação básica
    const currentValue = (formData as any)[question.id];
    if (question.type === "text" && !currentValue) {
      return;
    }
    if (question.type === "radio" && !currentValue) {
      return;
    }
    if (question.type === "checkbox" && (!currentValue || currentValue.length === 0)) {
      return;
    }

    // Additional validation for "other" options with custom input
    if (question.type === "radio" && currentValue === "other") {
      const customValue = getCustomInputValue();
      if (!customValue.trim()) {
        return; // Don't proceed if "other" is selected but no custom input
      }
    }

    if (question.type === "checkbox" && currentValue?.includes("other")) {
      const customValue = getCustomInputValue();
      if (!customValue.trim()) {
        return; // Don't proceed if "other" is selected but no custom input
      }
    }

    onNext();
  };

  const handleTextChange = (value: string) => {
    updateFormData(question.id as keyof FormData, value);
  };

  const handleRadioChange = (value: string) => {
    updateFormData(question.id as keyof FormData, value);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentValues = (formData as any)[question.id] || [];
    let newValues;

    if (checked) {
      if (question.maxSelections && currentValues.length >= question.maxSelections) {
        return;
      }
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v: string) => v !== value);
    }

    updateFormData(question.id as keyof FormData, newValues);
  };

  const currentValue = (formData as any)[question.id];
  const customInputValue = getCustomInputValue();

  const isValid = question.type === "text" ? !!currentValue :
    question.type === "radio" ? (currentValue === "other" ? !!customInputValue.trim() : !!currentValue) :
      question.type === "checkbox" ? currentValue && currentValue.length > 0 : false;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-brio mb-8 text-center">
        {/* Saudação personalizada */}
        {step > 1 && (
          <p className="font-poppins text-lg text-gray-600 mb-4">
            Oi, <span className="font-bold text-brio-blue">{nickname}</span>! 👋
          </p>
        )}

        {/* Pergunta */}
        <div className="mb-6">
          <div className="text-6xl mb-4">{question.emoji}</div>
          <h2 className="font-baloo text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {question.title}
          </h2>
          <p className="font-poppins text-lg text-gray-600">
            {question.description}
          </p>
        </div>

        {/* Campos de resposta */}
        <div className="mb-8">
          {question.type === "text" && (
            <Input
              value={currentValue || ""}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Digite sua resposta..."
              className="text-lg p-4 rounded-xl border-2 focus:border-brio-blue"
            />
          )}

          {question.type === "radio" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options?.map((option) => (
                <div key={option.value}>
                  <div
                    className={`option-card ${currentValue === option.value ? "selected" : ""}`}
                    onClick={() => handleRadioChange(option.value)}
                  >
                    <div className="font-poppins font-semibold text-lg mb-1">
                      {option.label}
                    </div>
                    {option.desc && (
                      <div className="font-poppins text-sm text-gray-600">
                        {option.desc}
                      </div>
                    )}
                  </div>

                  {option.hasInput && currentValue === option.value && (
                    <div className="mt-2">
                      <p className="font-poppins text-lg text-gray-900 text-start font-bold">
                        Qual?
                      </p>
                      <Input
                        value={customInputValue}
                        onChange={(e) => updateCustomInput(e.target.value)}
                        placeholder="Digite sua resposta..."
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {question.type === "checkbox" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options?.map((option) => {
                const isSelected = currentValue?.includes(option.value);
                const isDisabled = question.maxSelections &&
                  currentValue?.length >= question.maxSelections &&
                  !isSelected;

                return (
                  <div key={option.value}>
                    <div
                      className={`option-card ${isSelected ? "selected" : ""} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      onClick={() => !isDisabled && handleCheckboxChange(option.value, !isSelected)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-poppins font-semibold text-lg">
                          {option.label}
                        </span>
                        <span className="text-2xl">
                          {isSelected ? "✅" : "☐"}
                        </span>
                      </div>
                    </div>

                    {option.hasInput && isSelected && (
                      <div className="mt-2 text-start">
                        <p className="font-poppins text-lg text-gray-900 text-start font-bold">
                          Qual?
                        </p>
                      <Input
                        value={customInputValue}
                        onChange={(e) => updateCustomInput(e.target.value)}
                        placeholder="Digite sua resposta..."
                        className="mt-2"
                      />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Limitação de seleções */}
        {question.type === "checkbox" && question.maxSelections && (
          <p className="font-poppins text-sm text-gray-500 mb-4">
            {currentValue?.length || 0} de {question.maxSelections} selecionados
          </p>
        )}

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

export default QuestionScreen;