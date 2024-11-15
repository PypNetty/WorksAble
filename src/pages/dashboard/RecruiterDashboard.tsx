import React from "react";
import { useAuth } from "@/hooks/useAuth";

const RecruiterDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">Bienvenue, {user?.name} !</h1>
        <p className="text-gray-600">Dashboard Recruteur</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-3xl font-bold text-primary-600 mb-2">3</div>
          <div className="text-gray-600">Offres publiées</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-3xl font-bold text-primary-600 mb-2">12</div>
          <div className="text-gray-600">Candidatures reçues</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-3xl font-bold text-primary-600 mb-2">4</div>
          <div className="text-gray-600">Entretiens planifiés</div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700">
            Publier une nouvelle offre
          </button>
          <button className="border border-primary-600 text-primary-600 px-6 py-3 rounded-md hover:bg-primary-50">
            Voir les candidatures
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
