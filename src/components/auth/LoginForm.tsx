import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(formData);
      navigate("/onboarding");
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la connexion"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Affichage des erreurs */}
      {(error || authError) && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md">
          {error || authError}
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="vous@exemple.com"
        />
      </div>

      {/* Mot de passe */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="••••••••"
        />
      </div>

      {/* Bouton de connexion */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                     shadow-sm text-sm font-medium text-white bg-primary-600 
                     hover:bg-primary-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-primary-500"
        >
          Se connecter
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
