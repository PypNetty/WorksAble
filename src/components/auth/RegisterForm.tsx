import React, { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, error: authError } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get("type") || "candidate";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: defaultType as "candidate" | "recruiter",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(formData);
      // La navigation est gérée dans useAuth
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'inscription"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(error || authError) && (
        <div className="text-red-600 text-sm">{error || authError}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type de compte
        </label>
        <div className="mt-1 flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="candidate"
              checked={formData.userType === "candidate"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  userType: e.target.value as "candidate" | "recruiter",
                }))
              }
              className="form-radio"
            />
            <span className="ml-2">Candidat</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="recruiter"
              checked={formData.userType === "recruiter"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  userType: e.target.value as "candidate" | "recruiter",
                }))
              }
              className="form-radio"
            />
            <span className="ml-2">Recruteur</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nom complet
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Créer un compte
      </button>
    </form>
  );
};

export default RegisterForm;
