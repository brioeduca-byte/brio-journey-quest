interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="font-baloo text-white font-semibold text-lg">
          Pergunta {currentStep + 1} de {totalSteps}
        </span>
        <span className="font-poppins text-white/80 text-sm">
          {Math.round(progress)}% completo
        </span>
      </div>
      
      <div className="w-full bg-white/30 rounded-full h-4 shadow-inner">
        <div 
          className="progress-brio rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Emojis de progresso */}
      <div className="flex justify-between mt-2 px-1">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span 
            key={index}
            className={`text-2xl transition-all duration-300 ${
              index <= currentStep ? 'animate-bounce' : 'opacity-50'
            }`}
          >
            {index <= currentStep ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;