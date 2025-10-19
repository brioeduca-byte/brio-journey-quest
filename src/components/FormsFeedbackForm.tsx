import { useState } from "react";
import FeedbackWelcomeScreen from "./FeedbackWelcomeScreen";
import FeedbackQuestionScreen, { FeedbackFormData } from "./FeedbackQuestionScreen";
import FeedbackFinalScreen from "./FeedbackFinalScreen";
import ProgressBar from "./ProgressBar";

const FormsFeedbackForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FeedbackFormData>({
    // Seção 1 - Perguntas Abertas
    whatLiked: "",
    moreOrganized: "",
    tellFriend: "",
    
    // Seção 2 - Escala Likert (1-5)
    feltAccompanied: 0,
    schedulesHelped: 0,
    gamificationFun: 0,
    monitoringUseful: 0,
    
    // Seção 3 - NPS
    npsScore: -1,
    npsReason: "",
    
    // Seção 4 - Visão de Futuro
    futureOtherSubjects: "",
    
    // Seção 5 - Melhorias
    whatToImprove: "",
    useMoreIf: "",
    
    // Seção 6 - Espaço Livre
    freeMessage: ""
  });

  const totalSteps = 13; // Welcome + 12 questions + Final

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const updateFormData = (field: keyof FeedbackFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      whatLiked: "",
      moreOrganized: "",
      tellFriend: "",
      feltAccompanied: 0,
      schedulesHelped: 0,
      gamificationFun: 0,
      monitoringUseful: 0,
      npsScore: -1,
      npsReason: "",
      futureOtherSubjects: "",
      whatToImprove: "",
      useMoreIf: "",
      freeMessage: ""
    });
  };

  if (currentStep === 0) {
    return <FeedbackWelcomeScreen onStart={handleNext} />;
  }

  if (currentStep === totalSteps - 1) {
    return (
      <FeedbackFinalScreen 
        onRestart={resetForm}
        formData={formData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-brio-hero relative overflow-hidden">
      {/* Elementos decorativos flutuantes */}
      <div className="absolute top-10 left-10 text-6xl animate-pulse">⭐</div>
      <div className="absolute top-20 right-20 text-5xl float">🎯</div>
      <div className="absolute bottom-20 left-20 text-4xl bounce-gentle">🚀</div>
      <div className="absolute bottom-10 right-10 text-6xl float">✨</div>
      
      <div className="container mx-auto px-4 py-8">
        <ProgressBar 
          currentStep={currentStep - 1} 
          totalSteps={12}
        />
        
        <FeedbackQuestionScreen
          step={currentStep - 1}
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default FormsFeedbackForm;
