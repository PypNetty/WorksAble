import React from "react";
import { Link } from "react-router-dom";

const PublicMatching = () => {
  const demoJobs = [
    {
      id: "1",
      title: "Développeur Frontend React",
      company: "TechCorp",
      location: "Paris",
      matchScore: 95,
      skills: ["React", "TypeScript"],
      accommodations: ["Télétravail", "Horaires flexibles"],
    },
    {
      id: "2",
      title: "Développeur Full Stack",
      company: "InnovTech",
      location: "Lyon",
      matchScore: 88,
      skills: ["Node.js", "React"],
      accommodations: ["Télétravail partiel"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner CTA */}
      <div className="bg-primary-50 rounded-lg p-6 mb-8">
        {/* ... reste du code Banner ... */}
      </div>

      {/* Sample Matches */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Exemple d'offres correspondant à votre profil
        </h1>

        <div className="space-y-6">
          {demoJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-sm p-6 relative"
            >
              {/* Content avec flou par défaut */}
              <div className="blur-[2px]">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                    <p className="text-primary-600 font-semibold mb-2">
                      {job.company}
                    </p>
                    <p className="text-gray-600 mb-4">{job.location}</p>

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

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-xl">
                        {job.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay button toujours visible */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  to="/commencer"
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 z-10"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ce n'est qu'un aperçu des offres disponibles !
          </p>
          <Link
            to="/commencer"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-md hover:bg-primary-700"
          >
            Accéder à toutes les offres
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicMatching;
