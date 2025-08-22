import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import QuestionScreen from "./QuestionScreen";
import FinalScreen from "./FinalScreen";
import ProgressBar from "./ProgressBar";

export interface FormData {
  fullName: string;
  nickname: string;
  favoriteCharacter: string;
  favoriteCharacterCustom: string;
  superpowers: string[];
  superpowersCustom: string;
  favoriteWorlds: string[];
  favoriteWorldsCustom: string;
  musicStyle: string;
  musicStyleCustom: string;
  favoriteColor: string;
  hobbies: string[];
  hobbiesCustom: string;
  collectibles: string[];
  collectiblesCustom: string;
  prize: string;
  ambassador: string;
}

const BrioForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    nickname: "",
    favoriteCharacter: "",
    favoriteCharacterCustom: "",
    superpowers: [],
    superpowersCustom: "",
    favoriteWorlds: [],
    favoriteWorldsCustom: "",
    musicStyle: "",
    musicStyleCustom: "",
    favoriteColor: "",
    hobbies: [],
    hobbiesCustom: "",
    collectibles: [],
    collectiblesCustom: "",
    prize: "",
    ambassador: ""
  });

  const totalSteps = 13; // Welcome + 11 questions + Final

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      fullName: "",
      nickname: "",
      favoriteCharacter: "",
      favoriteCharacterCustom: "",
      superpowers: [],
      superpowersCustom: "",
      favoriteWorlds: [],
      favoriteWorldsCustom: "",
      musicStyle: "",
      musicStyleCustom: "",
      favoriteColor: "",
      hobbies: [],
      hobbiesCustom: "",
      collectibles: [],
      collectiblesCustom: "",
      prize: "",
      ambassador: ""
    });
  };

  if (currentStep === 0) {
    return <WelcomeScreen onStart={handleNext} />;
  }

  if (currentStep === totalSteps - 1) {
    return (
      <FinalScreen 
        nickname={formData.nickname} 
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
          totalSteps={11}
        />
        
        <QuestionScreen
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

export default BrioForm;