import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FormData } from "./BrioForm";
import { env } from "@/config/env";

// API Configuration
// In development, use relative URL to leverage Vite's proxy
// In production, use the full API URL
const SLACK_FEEDBACK_ENDPOINT = import.meta.env.DEV 
  ? '/api/slack/send-message'
  : `${env.API_BASE_URL}/api/slack/send-message`;

// Types for the Slack API response
interface SlackApiResponse {
  success: boolean;
  timestamp?: string;
  error?: string;
}

// Types for the feedback request
interface FeedbackRequest {
  message: string;
}

/**
 * Sends form data to Slack via the API
 * @param formData - The form data collected from the user
 * @param nickname - The user's nickname
 * @returns Promise<SlackApiResponse> - The API response
 */
const sendFormToSlack = async (formData: FormData, nickname: string): Promise<SlackApiResponse> => {
  try {
    // Helper function to format array values with custom inputs
    const formatArrayWithCustom = (values: string[], customValue: string) => {
      if (!values || values.length === 0) return "Nenhuma seleção";
      
      const hasOther = values.includes("other");
      if (hasOther && customValue) {
        const otherValues = values.filter(v => v !== "other");
        if (otherValues.length > 0) {
          return `${otherValues.join(', ')} e "${customValue}"`;
        } else {
          return `"${customValue}"`;
        }
      }
      return values.join(', ');
    };

    // Helper function to format single values with custom inputs
    const formatSingleWithCustom = (value: string, customValue: string) => {
      if (value === "other" && customValue) {
        return `"${customValue}"`;
      }
      return value;
    };

    // Create a comprehensive message from the form data
    const message = `🎯 # Formulário Aluno!\n\n` +
      `👤 **Nome Completo:** ${formData.fullName}\n` +
      `🏷️ **Nickname:** ${formData.nickname}\n` +
      `⭐ **Personagem Favorito:** ${formatSingleWithCustom(formData.favoriteCharacter, formData.favoriteCharacterCustom)}\n` +
      `🦸 **Superpoderes:** ${formatArrayWithCustom(formData.superpowers, formData.superpowersCustom)}\n` +
      `🌍 **Mundos Favoritos:** ${formatArrayWithCustom(formData.favoriteWorlds, formData.favoriteWorldsCustom)}\n` +
      `🎵 **Estilo Musical:** ${formatSingleWithCustom(formData.musicStyle, formData.musicStyleCustom)}\n` +
      `🎨 **Cor Favorita:** ${formData.favoriteColor}\n` +
      `🎭 **Hobbies:** ${formatArrayWithCustom(formData.hobbies, formData.hobbiesCustom)}\n` +
      `🏆 **Colecionáveis:** ${formatArrayWithCustom(formData.collectibles, formData.collectiblesCustom)}\n` +
      `🎁 **Prêmio Escolhido:** ${formData.prize}\n` +
      `🌟 **Embaixador:** ${formData.ambassador}\n\n` +
      `🚀 **Status:** Formulário completo enviado com sucesso!`;

    // Prepare the request payload
    const payload: FeedbackRequest = {
      message: message,
    };

    // Make the POST request to the API
    const response = await fetch(SLACK_FEEDBACK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Parse the response
    const result: SlackApiResponse = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      console.error('API Error:', response.status, result);
      return {
        success: false,
        error: result.error || `HTTP ${response.status}: ${response.statusText}`
      };
    }

    return result;
  } catch (error) {
    console.error('Network or parsing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro de conexão desconhecido'
    };
  }
};

interface FinalScreenProps {
  nickname: string;
  onRestart: () => void;
  formData?: FormData; // Add formData prop
}

const FinalScreen = ({ nickname, onRestart, formData }: FinalScreenProps) => {
  const [slackStatus, setSlackStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [slackMessage, setSlackMessage] = useState('');

  useEffect(() => {
    // Send form data to Slack when component mounts
    if (formData) {
      sendFormDataToSlack();
    }
  }, [formData]);

  const sendFormDataToSlack = async () => {
    if (!formData) return;

    setSlackStatus('sending');
    try {
      const result = await sendFormToSlack(formData, nickname);
      
      if (result.success) {
        setSlackStatus('success');
        setSlackMessage('Dados enviados com sucesso! 🚀');
        console.log('Form data sent to Slack successfully:', result.timestamp);
      } else {
        setSlackStatus('error');
        setSlackMessage(`Erro ao enviar dados: ${result.error}`);
        console.error('Failed to send form data to Slack:', result.error);
      }
    } catch (error) {
      setSlackStatus('error');
      setSlackMessage('Erro inesperado ao enviar dados');
      console.error('Unexpected error sending to Slack:', error);
    }
  };
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

        {/* Slack Status */}
        {formData && (
          <div className="mb-6">
            {slackStatus === 'sending' && (
              <div className="flex items-center justify-center space-x-2 text-brio-yellow">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brio-yellow"></div>
                <span className="font-poppins text-lg">Enviando dados...</span>
              </div>
            )}
            {slackStatus === 'success' && (
              <div className="flex items-center justify-center space-x-2 text-green-500">
                <span className="text-2xl">✅</span>
                <span className="font-poppins text-lg">{slackMessage}</span>
              </div>
            )}
            {slackStatus === 'error' && (
              <div className="flex flex-col items-center justify-center space-y-3 text-red-500">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">❌</span>
                  <span className="font-poppins text-lg">{slackMessage}</span>
                </div>
                <Button 
                  onClick={sendFormDataToSlack}
                  className="btn-brio-secondary text-sm px-4 py-2 rounded-xl transform hover:scale-105 transition-all duration-300"
                >
                  🔄 Tentar novamente
                </Button>
              </div>
            )}
          </div>
        )}
        
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