import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Alert from "@/components/common/Alert";
import {
  ShieldIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Types améliorés
type AdaptationType = "visual" | "auditory" | "motor" | "cognitive";

interface AdaptationOption {
  id: string;
  label: string;
  icon?: string;
  details?: string;
}

interface ITSkill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

interface ProfileFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
  };
  techSkills: {
    primaryDomain: string;
    specializations: string[];
    skills: Record<string, ITSkill[]>;
  };
  adaptations: {
    visual: string[];
    auditory: string[];
    motor: string[];
    cognitive: string[];
    details: Record<string, string>;
  };
  workPreferences: {
    remoteWork: boolean;
    flexibleHours: boolean;
    maxHoursPerDay?: number;
    startTime?: string;
    endTime?: string;
    breakFrequency?: string;
  };
}

const ProfileSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProfileFormData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phone: "",
      city: "",
    },
    techSkills: {
      primaryDomain: "",
      specializations: [],
      skills: {},
    },
    adaptations: {
      visual: [],
      auditory: [],
      motor: [],
      cognitive: [],
      details: {},
    },
    workPreferences: {
      remoteWork: false,
      flexibleHours: false,
    },
  });

  // Validation par étape
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return (
          !!formData.personalInfo.firstName &&
          !!formData.personalInfo.lastName &&
          !!formData.personalInfo.email
        );
      case 2:
        return (
          !!formData.techSkills.primaryDomain &&
          formData.techSkills.specializations.length > 0
        );
      case 3:
        // Les adaptations sont optionnelles mais si sélectionnées doivent avoir des détails
        return Object.entries(formData.adaptations).every(([key, value]) => {
          if (key === "details") return true;
          return (
            value.length === 0 ||
            (value.length > 0 && !!formData.adaptations.details[key])
          );
        });
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      setError(
        "Veuillez remplir tous les champs obligatoires avant de continuer"
      );
      return;
    }
    setCurrentStep((prev) => prev + 1);
    setError(null);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      setLoading(true);
      // Ici, on enverrait les données à l'API
      // await submitProfile(formData);
      setSuccess("Profil mis à jour avec succès");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError("Erreur lors de la sauvegarde du profil");
    } finally {
      setLoading(false);
    }
  };

  // Composant de progression
  const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
      <div
        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentStep / 4) * 100}%` }}
      />
    </div>
  );

  // Rendu des sections
  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Informations personnelles</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) =>
              setFormData({
                ...formData,
                personalInfo: {
                  ...formData.personalInfo,
                  firstName: e.target.value,
                },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
        {/* Autres champs... */}
      </div>
    </div>
  );

  const renderTechSkills = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Compétences techniques</h2>
      {/* Contenu similaire à votre version mais avec validation améliorée */}
    </div>
  );

  const renderAdaptations = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Adaptations nécessaires</h2>
      {/* Contenu similaire mais avec meilleure séparation des préoccupations */}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {(error || success) && (
          <Alert
            type={error ? "error" : "success"}
            message={error || success}
            onClose={() => (error ? setError(null) : setSuccess(null))}
          />
        )}

        <ProgressBar />

        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderPersonalInfo()}
            {currentStep === 2 && renderTechSkills()}
            {currentStep === 3 && renderAdaptations()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md"
                >
                  <ChevronLeftIcon className="w-5 h-5 mr-2" />
                  Précédent
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto flex items-center px-4 py-2 bg-primary-600 text-white rounded-md"
                  disabled={!validateStep(currentStep)}
                >
                  Suivant
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto flex items-center px-4 py-2 bg-primary-600 text-white rounded-md"
                  disabled={loading || !validateStep(currentStep)}
                >
                  {loading ? "Enregistrement..." : "Terminer"}
                  <CheckIcon className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
