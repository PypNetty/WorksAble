import React from "react";
import { useAuth } from "@/hooks/useAuth";

const CandidateDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">Bienvenue, {user?.name} !</h1>
        <p className="text-gray-600">Dashboard Candidat</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-3xl font-bold text-primary-600 mb-2">5</div>
          <div className="text-gray-600">Offres consultées</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-3xl font-bold text-primary-600 mb-2">2</div>
          <div className="text-gray-600">Candidatures envoyées</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-3xl font-bold text-primary-600 mb-2">1</div>
          <div className="text-gray-600">Entretien programmé</div>
        </div>
      </div>

      {/* Matching suggestions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Offres recommandées</h2>
        <div className="space-y-4">
          {/* ... contenu des offres ... */}
          <p className="text-gray-600">Fonctionnalité à venir...</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
