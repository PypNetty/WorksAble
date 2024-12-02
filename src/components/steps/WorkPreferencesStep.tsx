import React, { useState } from "react";
import {
  BriefcaseIcon,
  ClockIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface WorkPreferencesStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

const WorkPreferencesStep: React.FC<WorkPreferencesStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [newArrangement, setNewArrangement] = useState("");
  const [newFlexibility, setNewFlexibility] = useState("");

  const handleCheckboxChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(fieldName, e.target.checked);
    };

  const handleTimeChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Current data:", data);
      console.log("Field:", field);
      console.log("New value:", e.target.value);
      onChange(`workHours.preferred.${field}`, e.target.value);
    };

  const handleAddFlexibility = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newFlexibility.trim()) {
      const currentFlexibility = data.workHours?.flexibilityNeeds || [];
      onChange("workHours.flexibilityNeeds", [
        ...currentFlexibility,
        newFlexibility.trim(),
      ]);
      setNewFlexibility("");
    }
  };

  const handleAddArrangement = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newArrangement.trim()) {
      const currentArrangements = data.adaptation?.specialArrangements || [];
      onChange("adaptation.specialArrangements", [
        ...currentArrangements,
        newArrangement.trim(),
      ]);
      setNewArrangement("");
    }
  };

  const handleRemoveFlexibility = (indexToRemove: number) => {
    const currentFlexibility = data.workHours?.flexibilityNeeds || [];
    onChange(
      "workHours.flexibilityNeeds",
      currentFlexibility.filter(
        (_: string, index: number) => index !== indexToRemove
      )
    );
  };

  const handleRemoveArrangement = (indexToRemove: number) => {
    const currentArrangements = data.adaptation?.specialArrangements || [];
    onChange(
      "adaptation.specialArrangements",
      currentArrangements.filter(
        (_: string, index: number) => index !== indexToRemove
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <BriefcaseIcon className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold">Préférences de travail</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-gray-500" />
          Horaires de travail
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Heure de début préférée
            </label>
            <input
              type="time"
              defaultValue="09:00"
              onChange={handleTimeChange("start")}
              className="mt-1 block w-full rounded-md border border-gray-200 p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Heure de fin préférée
            </label>
            <input
              type="time"
              defaultValue="17:00"
              onChange={handleTimeChange("end")}
              className="mt-1 block w-full rounded-md border border-gray-200 p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nombre d'heures maximum par jour
          </label>
          <input
            type="number"
            min="1"
            max="12"
            value={data.workHours?.maxPerDay ?? ""}
            onChange={(e) => {
              const value =
                e.target.value === "" ? "" : parseInt(e.target.value);
              onChange("workHours.maxPerDay", value);
            }}
            className="mt-1 block w-full rounded-md border border-gray-200 p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Besoins de flexibilité
          </label>
          <input
            type="text"
            value={newFlexibility}
            onChange={(e) => setNewFlexibility(e.target.value)}
            onKeyDown={handleAddFlexibility}
            placeholder="Appuyez sur Entrée pour ajouter"
            className="mt-1 block w-full rounded-md border border-gray-200 p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {(data.workHours?.flexibilityNeeds || []).map(
              (need: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {need}
                  <button
                    type="button"
                    onClick={() => handleRemoveFlexibility(index)}
                    className="p-1 hover:bg-blue-200 rounded-full"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <HomeIcon className="w-5 h-5 text-gray-500" />
          Mode de travail
        </h3>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.adaptation?.remote || false}
              onChange={handleCheckboxChange("adaptation.remote")}
              className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Télétravail possible</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.adaptation?.hybrid || false}
              onChange={handleCheckboxChange("adaptation.hybrid")}
              className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Mode hybride possible</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Aménagements spéciaux
          </label>
          <input
            type="text"
            value={newArrangement}
            onChange={(e) => setNewArrangement(e.target.value)}
            onKeyDown={handleAddArrangement}
            placeholder="Appuyez sur Entrée pour ajouter"
            className="mt-1 block w-full rounded-md border border-gray-200 p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {(data.adaptation?.specialArrangements || []).map(
              (arrangement: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {arrangement}
                  <button
                    type="button"
                    onClick={() => handleRemoveArrangement(index)}
                    className="p-1 hover:bg-blue-200 rounded-full"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPreferencesStep;
