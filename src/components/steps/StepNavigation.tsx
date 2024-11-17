import React from "react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isValid: boolean;
  isLoading: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isValid,
  isLoading,
}) => (
  <div className="flex justify-between mt-8">
    {currentStep > 1 && (
      <button
        type="button"
        onClick={onPrevious}
        className="px-4 py-2 text-gray-600 hover:text-gray-800"
      >
        Précédent
      </button>
    )}
    <button
      type="button"
      onClick={onNext}
      disabled={!isValid || isLoading}
      className={`px-6 py-2 rounded-lg ${
        isValid && !isLoading
          ? "bg-primary-600 text-white hover:bg-primary-700"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      {currentStep === totalSteps ? "Terminer" : "Suivant"}
    </button>
  </div>
);

export default StepNavigation;
