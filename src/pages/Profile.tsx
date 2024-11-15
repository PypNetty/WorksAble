import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth"; // À implémenter

interface UserProfile {
  type: "candidate" | "recruiter";
  name: string;
  email: string;
  avatar?: string;
}

interface CandidateProfile extends UserProfile {
  skills: string[];
  experience: string[];
  rqthStatus: boolean;
  accommodations: string[];
  preferences: {
    workType: "remote" | "hybrid" | "office";
    location: string;
    salary: string;
  };
}

interface RecruiterProfile extends UserProfile {
  company: string;
  position: string;
  activeJobs: number;
}

const Profile = () => {
  // Simulons un utilisateur connecté pour le moment
  const [activeTab, setActiveTab] = useState("profile");
  const userType: "candidate" | "recruiter" = "candidate"; // À remplacer par le vrai type

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img
                  src="/api/placeholder/96/96"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-bold text-xl">John Doe</h2>
              <p className="text-gray-600">Développeur Frontend</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "profile"
                    ? "bg-primary-50 text-primary-600"
                    : "hover:bg-gray-50"
                }`}
              >
                Mon Profil
              </button>
              {userType === "candidate" ? (
                <>
                  <button
                    onClick={() => setActiveTab("applications")}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === "applications"
                        ? "bg-primary-50 text-primary-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Mes Candidatures
                  </button>
                  <button
                    onClick={() => setActiveTab("matches")}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === "matches"
                        ? "bg-primary-50 text-primary-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Mes Matches
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab("jobs")}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === "jobs"
                        ? "bg-primary-50 text-primary-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Mes Offres
                  </button>
                  <button
                    onClick={() => setActiveTab("candidates")}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === "candidates"
                        ? "bg-primary-50 text-primary-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    Candidats
                  </button>
                </>
              )}
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "settings"
                    ? "bg-primary-50 text-primary-600"
                    : "hover:bg-gray-50"
                }`}
              >
                Paramètres
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === "profile" && <ProfileTab userType={userType} />}
            {activeTab === "applications" && <ApplicationsTab />}
            {activeTab === "matches" && <MatchesTab />}
            {activeTab === "jobs" && <JobsTab />}
            {activeTab === "candidates" && <CandidatesTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </main>
      </div>
    </div>
  );
};

// Tabs Components
const ProfileTab: React.FC<{ userType: "candidate" | "recruiter" }> = ({
  userType,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mon Profil</h2>

      <div className="space-y-6">
        {/* Informations de base */}
        <section>
          <h3 className="text-lg font-semibold mb-4">
            Informations personnelles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                defaultValue="john@example.com"
              />
            </div>
          </div>
        </section>

        {userType === "candidate" ? (
          <>
            {/* Compétences */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Compétences</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                    React
                  </span>
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                    TypeScript
                  </span>
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                    Node.js
                  </span>
                </div>
                <button className="text-primary-600 hover:text-primary-700">
                  + Ajouter une compétence
                </button>
              </div>
            </section>

            {/* Aménagements */}
            <section>
              <h3 className="text-lg font-semibold mb-4">
                Aménagements nécessaires
              </h3>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                rows={4}
                placeholder="Décrivez les aménagements dont vous avez besoin..."
              />
            </section>
          </>
        ) : (
          <>
            {/* Informations entreprise */}
            <section>
              <h3 className="text-lg font-semibold mb-4">
                Informations entreprise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    defaultValue="TechCorp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Poste
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    defaultValue="Recruteur IT"
                  />
                </div>
              </div>
            </section>
          </>
        )}

        <div className="flex justify-end">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
            Sauvegarder les modifications
          </button>
        </div>
      </div>
    </div>
  );
};

const ApplicationsTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Mes Candidatures</h2>
    {/* Liste des candidatures */}
  </div>
);

const MatchesTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Mes Matches</h2>
    {/* Liste des matches */}
  </div>
);

const JobsTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Mes Offres</h2>
    {/* Liste des offres */}
  </div>
);

const CandidatesTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Candidats</h2>
    {/* Liste des candidats */}
  </div>
);

const SettingsTab = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Paramètres</h2>
    {/* Paramètres du compte */}
  </div>
);

export default Profile;
