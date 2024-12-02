// src/pages/onboarding/RecruiterProfileSetup.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BuildingOfficeIcon,
  UserIcon,
  BriefcaseIcon,
  HeartIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Alert from "@/components/common/Alert";

interface RecruiterProfileData {
  companyInfo: {
    name: string;
    siret: string;
    address: string;
    postalCode: string;
    city: string;
    website?: string;
    size: string;
    sector: string;
  };
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
  };
  recruitmentNeeds: {
    positions: Array<{
      id: string;
      title: string;
      department: string;
      contractType: string;
      workingHours: {
        type: "full-time" | "part-time";
        hoursPerWeek?: number;
      };
      location: {
        remote: boolean;
        hybrid: boolean;
        onSite: boolean;
        address?: string;
      };
    }>;
  };
  adaptations: {
    available: Array<{
      id: string;
      type: "visual" | "auditory" | "motor" | "cognitive";
      description: string;
    }>;
    workplaceAccess: {
      hasAccessibility: boolean;
      details: string[];
    };
  };
}

const initialFormData: RecruiterProfileData = {
  companyInfo: {
    name: "",
    siret: "",
    address: "",
    postalCode: "",
    city: "",
    website: "",
    size: "",
    sector: "",
  },
  contactInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
  },
  recruitmentNeeds: {
    positions: [],
  },
  adaptations: {
    available: [],
    workplaceAccess: {
      hasAccessibility: false,
      details: [],
    },
  },
};

const RecruiterProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState<RecruiterProfileData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // TODO: Implement API call to save profile
      setSuccess("Profil mis à jour avec succès");
      setTimeout(() => navigate("/dashboard/recruiter"), 1500);
    } catch (err) {
      setError("Erreur lors de la sauvegarde du profil");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles =
    "block w-full p-2 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500";

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
          <h1 className="text-2xl font-bold mb-8">
            Configuration du profil recruteur
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations entreprise */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
                Informations entreprise
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    value={formData.companyInfo.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyInfo: {
                          ...formData.companyInfo,
                          name: e.target.value,
                        },
                      })
                    }
                    className={inputStyles}
                    required
                  />
                </div>

                {/* Ajoutez les autres champs d'entreprise ici */}
              </div>
            </section>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-blue-600" />
                Contact
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {/* Ajoutez les champs de contact ici */}
              </div>
            </section>

            {/* Boutons de soumission */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfileSetup;
