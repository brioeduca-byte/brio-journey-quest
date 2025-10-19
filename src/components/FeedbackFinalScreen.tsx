import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FeedbackFormData } from "./FeedbackQuestionScreen";
import { env } from "@/config/env";

// API Configuration
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
 * Sends feedback data to Slack via the API
 * @param formData - The complete feedback form data
 * @returns Promise<SlackApiResponse> - The API response
 */
const sendFeedbackToSlack = async (formData: FeedbackFormData): Promise<SlackApiResponse> => {
  try {
    // Create a comprehensive message from the feedback data
    const message = `📋 # Feedback do Piloto Brio - Maple Bear\n\n` +
      `📝 **PERGUNTAS ABERTAS**\n` +
      `💙 **O que mais gostou:** ${formData.whatLiked || "Não informado"}\n` +
      `📚 **Mais organizado/motivado:** ${formData.moreOrganized || "Não informado"}\n` +
      `👥 **O que diria para um amigo:** ${formData.tellFriend || "Não informado"}\n\n` +
      
      `⭐ **AVALIAÇÕES (1-5)**\n` +
      `🤝 **Me senti acompanhado:** ${formData.feltAccompanied || "Não avaliado"}/5\n` +
      `📅 **Cronogramas ajudaram:** ${formData.schedulesHelped || "Não avaliado"}/5\n` +
      `🎮 **Gamificação divertida:** ${formData.gamificationFun || "Não avaliado"}/5\n` +
      `🎯 **Monitoria útil:** ${formData.monitoringUseful || "Não avaliado"}/5\n\n` +
      
      `📊 **NPS: ${formData.npsScore || "Não avaliado"}/10**\n` +
      `💭 **Motivo da nota:** ${formData.npsReason || "Não informado"}\n\n` +
      
      `🚀 **VISÃO DE FUTURO**\n` +
      `**Brio em outras matérias:** ${formData.futureOtherSubjects || "Não informado"}\n\n` +
      
      `🔧 **MELHORIAS SUGERIDAS**\n` +
      `**O que melhorar:** ${formData.whatToImprove || "Não informado"}\n` +
      `**Usaria mais se:** ${formData.useMoreIf || "Não informado"}\n\n` +
      
      `🎨 **ESPAÇO LIVRE**\n` +
      `**Mensagem final:** ${formData.freeMessage || "Não informado"}\n\n` +
      
      `🚀 **Status:** Formulário de feedback completo enviado com sucesso!`;

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

interface FeedbackFinalScreenProps {
  onRestart: () => void;
  formData: FeedbackFormData;
}

const FeedbackFinalScreen = ({ onRestart, formData }: FeedbackFinalScreenProps) => {
  const [slackStatus, setSlackStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [slackMessage, setSlackMessage] = useState('');

  useEffect(() => {
    // Send feedback data to Slack when component mounts
    if (formData) {
      sendFeedbackDataToSlack();
    }
  }, [formData]);

  const sendFeedbackDataToSlack = async () => {
    if (!formData) return;

    setSlackStatus('sending');
    try {
      const result = await sendFeedbackToSlack(formData);
      
      if (result.success) {
        setSlackStatus('success');
        setSlackMessage('Seu feedback foi enviado com sucesso! 🚀');
        console.log('Feedback sent to Slack successfully:', result.timestamp);
      } else {
        setSlackStatus('error');
        setSlackMessage(`Erro ao enviar feedback: ${result.error}`);
        console.error('Failed to send feedback to Slack:', result.error);
      }
    } catch (error) {
      setSlackStatus('error');
      setSlackMessage('Erro inesperado ao enviar feedback');
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
            {['🎉', '✨', '🌟', '🎊', '🏆', '💙', '📝', '🚀'][Math.floor(Math.random() * 8)]}
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
        <h1 className="font-baloo text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
          🎯 Muito obrigado(a)!<br />
          <span className="text-brio-yellow">Seu feedback é valioso!</span>
        </h1>
        
        {/* Mensagem principal */}
        <div className="card-brio mb-8 transform hover:scale-105 transition-all duration-300">
          <p className="font-poppins text-xl md:text-2xl text-gray-800 mb-4 leading-relaxed">
            <strong>Sua opinião vai ajudar a construir a Brio ainda melhor!</strong>
          </p>
          <p className="font-poppins text-lg md:text-xl text-gray-700 leading-relaxed">
            Cada sugestão, cada ideia e cada crítica construtiva nos ajuda a criar uma plataforma 
            que realmente faça sentido para vocês! 🌟
          </p>
        </div>

        {/* Slack Status */}
        {formData && (
          <div className="mb-6">
            {slackStatus === 'sending' && (
              <div className="flex items-center justify-center space-x-2 text-brio-yellow">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brio-yellow"></div>
                <span className="font-poppins text-lg">Enviando seu feedback...</span>
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
                  onClick={sendFeedbackDataToSlack}
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
          🔄 Dar outro feedback
        </Button>
        
        {/* Mensagem final */}
        <p className="font-poppins text-white/90 mt-8 text-lg">
          Continue ajudando a construir a Brio do seu jeito! 🚀✨
        </p>
      </div>
    </div>
  );
};

export default FeedbackFinalScreen;
