import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

// Types
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  matchScore: number;
  skills: string[];
  accommodations: string[];
  description: string;
}

interface Filter {
  workType: string[];
  location: string;
  skills: string[];
}

const Matching = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<Filter>({
    workType: [],
    location: "",
    skills: [],
  });

  // Mock data
  const mockJobs: Job[] = [
    {
      id: "1",
      title: "Développeur Frontend React",
      company: "TechCorp",
      location: "Paris",
      type: "CDI",
      salary: "45-55k€",
      matchScore: 95,
      skills: ["React", "TypeScript", "Tailwind"],
      accommodations: ["Télétravail", "Horaires flexibles"],
      description:
        "Nous recherchons un développeur Frontend passionné pour rejoindre notre équipe...",
    },
    {
      id: "2",
      title: "Développeur Full Stack",
      company: "InnovTech",
      location: "Lyon",
      type: "CDI",
      salary: "40-50k€",
      matchScore: 88,
      skills: ["Node.js", "React", "MongoDB"],
      accommodations: ["Télétravail partiel", "Matériel adapté"],
      description: "Poste Full Stack au sein d'une équipe dynamique...",
    },
    // Ajouter d'autres offres mockées ici
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filtres */}
        <aside className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Filtres</h2>

            {/* Type de travail */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Type de travail</h3>
              <div className="space-y-2">
                {["Remote", "Hybride", "Sur site"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-primary-600 focus:ring-primary-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters((prev) => ({
                            ...prev,
                            workType: [...prev.workType, type],
                          }));
                        } else {
                          setFilters((prev) => ({
                            ...prev,
                            workType: prev.workType.filter((t) => t !== type),
                          }));
                        }
                      }}
                    />
                    <span className="ml-2">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Compétences */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Compétences</h3>
              <div className="space-y-2">
                {["React", "Node.js", "Python", "Java"].map((skill) => (
                  <label key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-primary-600 focus:ring-primary-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters((prev) => ({
                            ...prev,
                            skills: [...prev.skills, skill],
                          }));
                        } else {
                          setFilters((prev) => ({
                            ...prev,
                            skills: prev.skills.filter((s) => s !== skill),
                          }));
                        }
                      }}
                    />
                    <span className="ml-2">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Localisation */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Localisation</h3>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Ville ou région"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </aside>

        {/* Liste des offres */}
        <main className="lg:w-3/4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Offres correspondantes</h1>
            <p className="text-gray-600">
              {mockJobs.length} offres correspondent à votre profil
            </p>
          </div>

          {/* Liste des offres */}
          <div className="space-y-6">
            {mockJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                    <p className="text-primary-600 font-semibold mb-2">
                      {job.company}
                    </p>

                    {/* Informations principales */}
                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.salary}</span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Description courte */}
                    <p className="text-gray-600 line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  {/* Score de matching */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-xl">
                        {job.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Aménagements */}
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-semibold mb-2">
                    Aménagements disponibles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.accommodations.map((accommodation) => (
                      <span
                        key={accommodation}
                        className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm"
                      >
                        {accommodation}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bouton Postuler */}
                <div className="mt-4 flex justify-end">
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                    Postuler
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Matching;
