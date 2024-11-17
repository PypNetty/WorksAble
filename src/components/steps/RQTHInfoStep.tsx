import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { DISABILITY_TYPES } from "@/constants/onboarding";

interface RQTHInfoData {
  disabilityType: string[];
  evolution: "stable" | "degenerative" | "variable";
  contraindications: string[];
  treatments: {
    current: string[];
    frequency: string;
    constraints: string[];
  };
  dailyNeeds: string[];
  medicalFollowUp: {
    frequency: string;
    specialists: string[];
    hospitalProximity: boolean;
    regularCare: string[];
    emergencyProtocol?: string;
  };
}

const defaultData: RQTHInfoData = {
  disabilityType: [],
  evolution: "stable",
  contraindications: [],
  treatments: {
    current: [],
    frequency: "",
    constraints: [],
  },
  dailyNeeds: [],
  medicalFollowUp: {
    frequency: "",
    specialists: [],
    hospitalProximity: false,
    regularCare: [],
    emergencyProtocol: "",
  },
};

interface RQTHInfoStepProps {
  data?: RQTHInfoData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

const RQTHInfoStep: React.FC<RQTHInfoStepProps> = ({
  data = defaultData,
  onChange,
  errors = {},
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <HeartIcon className="w-8 h-8 text-primary-600" />
        <h2 className="text-2xl font-bold">Situation RQTH</h2>
      </div>

      {/* Types de handicap */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Type(s) de handicap <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(DISABILITY_TYPES).map(([key, type]) => (
            <div key={type.id} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={type.id}
                  checked={data.disabilityType.includes(type.id)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...data.disabilityType, type.id]
                      : data.disabilityType.filter((t) => t !== type.id);
                    onChange("disabilityType", newTypes);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor={type.id} className="ml-2 text-sm text-gray-700">
                  {type.label}
                </label>
              </div>
              {data.disabilityType.includes(type.id) && (
                <div className="ml-6 space-y-2">
                  {type.details.map((detail, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${type.id}-${index}`}
                        checked={data.treatments.current.includes(detail)}
                        onChange={(e) => {
                          const newDetails = e.target.checked
                            ? [...data.treatments.current, detail]
                            : data.treatments.current.filter(
                                (d) => d !== detail
                              );
                          onChange("treatments.current", newDetails);
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label
                        htmlFor={`${type.id}-${index}`}
                        className="ml-2 text-sm text-gray-600"
                      >
                        {detail}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {errors.disabilityType && (
          <p className="mt-1 text-sm text-red-600">{errors.disabilityType}</p>
        )}
      </div>

      {/* Évolution */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Évolution <span className="text-red-500">*</span>
        </label>
        <select
          value={data.evolution}
          onChange={(e) => onChange("evolution", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Sélectionnez une option</option>
          <option value="stable">Stable</option>
          <option value="degenerative">Dégénérative</option>
          <option value="variable">Variable</option>
        </select>
        {errors.evolution && (
          <p className="mt-1 text-sm text-red-600">{errors.evolution}</p>
        )}
      </div>

      {/* Suivi médical */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Suivi médical</h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Fréquence de suivi
          </label>
          <input
            type="text"
            value={data.medicalFollowUp.frequency}
            onChange={(e) =>
              onChange("medicalFollowUp.frequency", e.target.value)
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Ex: Mensuel, Trimestriel..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Proximité hôpital nécessaire
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="hospitalProximity"
              checked={data.medicalFollowUp.hospitalProximity}
              onChange={(e) =>
                onChange("medicalFollowUp.hospitalProximity", e.target.checked)
              }
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label
              htmlFor="hospitalProximity"
              className="text-sm text-gray-600"
            >
              Oui, je dois être proche d'un centre hospitalier
            </label>
          </div>
        </div>

        {/* Soins réguliers */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Soins réguliers nécessaires
          </label>
          <textarea
            value={data.medicalFollowUp.regularCare.join("\n")}
            onChange={(e) =>
              onChange(
                "medicalFollowUp.regularCare",
                e.target.value.split("\n").filter(Boolean)
              )
            }
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Un soin par ligne..."
          />
        </div>

        {/* Protocole d'urgence */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Protocole d'urgence
          </label>
          <textarea
            value={data.medicalFollowUp.emergencyProtocol || ""}
            onChange={(e) =>
              onChange("medicalFollowUp.emergencyProtocol", e.target.value)
            }
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Décrivez le protocole à suivre en cas d'urgence..."
          />
        </div>
      </div>

      {/* Message d'erreur global */}
      {errors.global && (
        <div className="mt-4 text-sm text-red-600">{errors.global}</div>
      )}
    </div>
  );
};

export default RQTHInfoStep;
