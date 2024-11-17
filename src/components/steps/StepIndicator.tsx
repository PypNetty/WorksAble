import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface StepIndicatorProps {
  steps: Array<{
    id: number;
    label: string;
    icon: React.ElementType;
  }>;
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => (
  <div className="flex justify-between">
    {steps.map(({ id, label, icon: Icon }) => (
      <button
        key={id}
        onClick={() => onStepClick(id)}
        className={`flex flex-col items-center space-y-2 ${
          currentStep === id ? "text-primary-600" : "text-gray-400"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentStep === id ? "bg-primary-600 text-white" : "bg-gray-200"
          }`}
        >
          {currentStep > id ? (
            <CheckIcon className="w-6 h-6" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </button>
    ))}
  </div>
);

export default StepIndicator;
