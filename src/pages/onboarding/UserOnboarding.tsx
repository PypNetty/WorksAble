// src/pages/onboarding/UserOnboarding.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  BriefcaseIcon,
  HeartIcon,
  AcademicCapIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import {
  PersonalInfoStep,
  RQTHInfoStep,
  WorkPreferencesStep,
  ProfessionalProfileStep,
} from "@/components/steps";

import { RQTHProfileData } from "@/types/rqth";
import Alert from "@/components/common/Alert";

const STEPS = [
  {
    id: 1,
    label: "Informations personnelles",
    icon: UserIcon,
    component: PersonalInfoStep,
  },
  {
    id: 2,
    label: "Situation RQTH",
    icon: HeartIcon,
    component: RQTHInfoStep,
  },
  {
    id: 3,
    label: "Préférences de travail",
    icon: BriefcaseIcon,
    component: WorkPreferencesStep,
  },
  {
    id: 4,
    label: "Profil professionnel",
    icon: AcademicCapIcon,
    component: ProfessionalProfileStep,
  },
];

const initialFormData: RQTHProfileData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    birthDate: "",
    address: "",
    postalCode: "",
  },
  healthInfo: {
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
  },
  schedule: {
    workHours: {
      preferred: {
        start: "",
        end: "",
      },
      maxPerDay: 8,
      flexibilityNeeds: [],
    },
    breaks: {
      frequency: "",
      duration: "",
      specific: [],
    },
    adaptation: {
      remote: false,
      hybrid: false,
      specialArrangements: [],
    },
  },
  professional: {
    skills: [],
    experience: {
      roles: [],
    },
    education: {
      degree: "",
      school: "",
      year: "",
    },
  },
};

const UserOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RQTHProfileData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.personalInfo.firstName.trim()) {
          setError("Le prénom est requis");
          return false;
        }
        if (!formData.personalInfo.lastName.trim()) {
          setError("Le nom est requis");
          return false;
        }
        if (!formData.personalInfo.email.trim()) {
          setError("L'email est requis");
          return false;
        }
        break;

      case 2:
        if (formData.healthInfo.disabilityType.length === 0) {
          setError("Veuillez sélectionner au moins un type de handicap");
          return false;
        }
        break;

      case 3:
        if (
          !formData.schedule.workHours.preferred.start ||
          !formData.schedule.workHours.preferred.end
        ) {
          setError("Les horaires de travail sont requis");
          return false;
        }
        break;

      case 4:
        if (formData.professional.skills.length === 0) {
          setError("Veuillez ajouter au moins une compétence");
          return false;
        }
        break;
    }
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    try {
      setLoading(true);
      // TODO: Implémenter la sauvegarde API
      // await saveProfile(formData);
      setSuccess("Profil créé avec succès !");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError("Une erreur est survenue lors de la sauvegarde");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStepChange = (
    section: keyof RQTHProfileData,
    field: string,
    value: any
  ) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [parent]: {
            ...(prev[section] as any)[parent],
            [child]: value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const getCurrentComponent = () => {
    const step = STEPS[currentStep - 1];
    if (!step) return null;

    const StepComponent = step.component;
    const sectionKey = {
      1: "personalInfo",
      2: "healthInfo",
      3: "schedule",
      4: "professional",
    }[currentStep] as keyof RQTHProfileData;

    return (
      <StepComponent
        data={formData[sectionKey]}
        onChange={(field: string, value: any) =>
          handleStepChange(sectionKey, field, value)
        }
        errors={{}}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto">
        {(error || success) && (
          <Alert
            type={error ? "error" : "success"}
            message={error || success}
            onClose={() => (error ? setError(null) : setSuccess(null))}
          />
        )}

        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold mb-8 text-center">
            Complétez votre profil
          </h1>

          {/* Indicateur d'étapes */}
          <div className="flex justify-between mb-8">
            {STEPS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => validateStep(currentStep) && setCurrentStep(id)}
                className={`flex flex-col items-center space-y-2 ${
                  currentStep >= id ? "text-primary-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= id
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200"
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

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {getCurrentComponent()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Précédent
                </button>
              )}

              <button
                type={currentStep === STEPS.length ? "submit" : "button"}
                onClick={currentStep === STEPS.length ? undefined : handleNext}
                disabled={loading}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Chargement..."
                  : currentStep === STEPS.length
                    ? "Terminer"
                    : "Suivant"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;
