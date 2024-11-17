// src/components/steps/WorkPreferencesStep.tsx
import React, { useEffect } from "react";
import {
  ClockIcon,
  HomeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

interface WorkHours {
  start?: string;
  end?: string;
  maxPerDay?: number;
  flexibilityNeeds?: string[];
}

interface WorkPreferences {
  workHours: WorkHours;
  breaks?: {
    frequency?: string;
    duration?: string;
  };
  remote?: boolean;
  hybrid?: boolean;
  specialNeeds?: string[];
}

const DEFAULT_WORK_HOURS: WorkHours = {
  start: "",
  end: "",
  maxPerDay: 8,
  flexibilityNeeds: [],
};

interface WorkPreferencesStepProps {
  data: WorkPreferences;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

const WorkPreferencesStep: React.FC<WorkPreferencesStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const workHours = {
    ...DEFAULT_WORK_HOURS,
    ...data.workHours,
  };

  useEffect(() => {
    if (!data.workHours) {
      onChange("workHours", DEFAULT_WORK_HOURS);
    }
  }, []);

  const handleTimeChange = (field: keyof WorkHours, value: string) => {
    const updatedWorkHours = {
      ...workHours,
      [field]: value,
    };
    onChange("workHours", updatedWorkHours);
  };

  const handleCheckboxChange = (
    field: keyof WorkPreferences,
    value: boolean
  ) => {
    onChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <ClockIcon className="w-8 h-8 text-primary-600" />
        <h2 className="text-2xl font-bold">Préférences de travail</h2>
      </div>

      {/* Section Horaires */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-gray-500" />
          Horaires
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Heure de début préférée
            </label>
            <input
              type="time"
              value={workHours.start}
              onChange={(e) => handleTimeChange("start", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Heure de fin préférée
            </label>
            <input
              type="time"
              value={workHours.end}
              onChange={(e) => handleTimeChange("end", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Besoins de flexibilité
          </label>
          <textarea
            value={workHours.flexibilityNeeds?.join("\n")}
            onChange={(e) =>
              handleTimeChange(
                "flexibilityNeeds",
                e.target.value.split("\n").filter(Boolean)
              )
            }
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Un besoin par ligne..."
          />
        </div>
      </div>

      {/* Section Mode de travail */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <HomeIcon className="w-5 h-5 text-gray-500" />
          Mode de travail
        </h3>

        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remote"
              checked={data.remote}
              onChange={(e) => handleCheckboxChange("remote", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="remote" className="ml-2 text-sm text-gray-700">
              Télétravail possible
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hybrid"
              checked={data.hybrid}
              onChange={(e) => handleCheckboxChange("hybrid", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="hybrid" className="ml-2 text-sm text-gray-700">
              Mode hybride possible
            </label>
          </div>
        </div>
      </div>

      {/* Section Besoins spéciaux */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <BriefcaseIcon className="w-5 h-5 text-gray-500" />
          Besoins spécifiques
        </h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Précisez vos besoins particuliers
          </label>
          <textarea
            value={data.specialNeeds?.join("\n")}
            onChange={(e) =>
              onChange(
                "specialNeeds",
                e.target.value.split("\n").filter(Boolean)
              )
            }
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Un besoin par ligne..."
          />
        </div>
      </div>
    </div>
  );
};

export default WorkPreferencesStep;
