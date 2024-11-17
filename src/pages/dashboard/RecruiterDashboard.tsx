// src/pages/dashboard/RecruiterDashboard.tsx
import React from "react";
import {
  UsersIcon,
  ChartBarIcon,
  BriefcaseIcon,
  DocumentSearchIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

// Types
interface DashboardStats {
  openPositions: number;
  activeMatches: number;
  compatibilityRate: number;
}

interface CandidateMatch {
  id: string;
  name: string;
  role: string;
  compatibility: number;
  adaptations: string[];
  status: "pending" | "contacted" | "interviewing";
}

interface JobPosition {
  id: string;
  title: string;
  department: string;
  candidates: number;
  adaptations: string[];
  status: "active" | "paused" | "closed";
}

// Composants
const StatCard: React.FC<{
  icon: React.ElementType;
  title: string;
  value: number | string;
  trend?: string;
}> = ({ icon: Icon, title, value, trend }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <Icon className="w-8 h-8 text-primary-600" />
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-baseline">
          <p className="text-2xl font-bold">{value}</p>
          {trend && <span className="ml-2 text-sm text-gray-500">{trend}</span>}
        </div>
      </div>
    </div>
  </div>
);

const RecruiterDashboard: React.FC = () => {
  const stats: DashboardStats = {
    openPositions: 5,
    activeMatches: 12,
    compatibilityRate: 85,
  };

  const recentMatches: CandidateMatch[] = [
    {
      id: "1",
      name: "Jean Dupont",
      role: "Développeur Frontend React",
      compatibility: 95,
      adaptations: ["Télétravail possible", "Horaires flexibles"],
      status: "pending",
    },
    // Autres matchs...
  ];

  const activePositions: JobPosition[] = [
    {
      id: "1",
      title: "Développeur Full Stack",
      department: "Tech",
      candidates: 8,
      adaptations: ["Poste adapté", "Remote possible"],
      status: "active",
    },
    // Autres postes...
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Tableau de bord recruteur</h1>
          <p className="text-gray-600">Gérez vos recrutements RQTH</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={BriefcaseIcon}
            title="Postes ouverts"
            value={stats.openPositions}
            trend="+2 cette semaine"
          />
          <StatCard
            icon={UsersIcon}
            title="Matchs actifs"
            value={stats.activeMatches}
            trend="8 nouveaux"
          />
          <StatCard
            icon={ChartBarIcon}
            title="Taux de compatibilité"
            value={`${stats.compatibilityRate}%`}
            trend="+5% ce mois"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Matchs récents */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Matchs récents</h2>
                <div className="space-y-4">
                  {recentMatches.map((match) => (
                    <div key={match.id} className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{match.name}</h3>
                          <p className="text-sm text-gray-600">{match.role}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {match.compatibility}% compatible
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {match.adaptations.map((adaptation, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {adaptation}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Actions requises</h2>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <BellIcon className="w-5 h-5 text-primary-600 mr-2" />
                  <span>3 profils à évaluer</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Statistiques RQTH</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Taux d'inclusion</span>
                  <span className="font-semibold">18%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
