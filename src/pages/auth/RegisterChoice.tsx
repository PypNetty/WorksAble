import React from "react";
import { Link } from "react-router-dom";

const RegisterChoice = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">
        Rejoignez WorksAble
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Card Candidat */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="p-8 flex flex-col h-full">
            <div>
              <div className="text-4xl mb-4">👩‍💻</div>
              <h2 className="text-2xl font-bold mb-4">Je suis candidat</h2>
              <p className="text-gray-600 mb-6">
                Trouvez le poste IT qui correspond à vos compétences et à vos
                besoins spécifiques.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Matching intelligent basé sur vos compétences
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Entreprises sensibilisées à l'inclusion
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Aménagements adaptés à votre situation
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <Link
                to="/candidate"
                className="block w-full bg-primary-600 text-white text-center py-3 rounded-md hover:bg-primary-700"
              >
                S'inscrire comme candidat
              </Link>
            </div>
          </div>
        </div>

        {/* Card Recruteur */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="p-8 flex flex-col h-full">
            <div>
              <div className="text-4xl mb-4">🏢</div>
              <h2 className="text-2xl font-bold mb-4">Je recrute</h2>
              <p className="text-gray-600 mb-6">
                Accédez à des profils IT qualifiés et contribuez à une tech plus
                inclusive.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Candidats présélectionnés selon vos critères
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Accompagnement dans l'aménagement des postes
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Valorisez votre marque employeur inclusive
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <Link
                to="/recruiter"
                className="block w-full bg-primary-600 text-white text-center py-3 rounded-md hover:bg-primary-700"
              >
                S'inscrire comme recruteur
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Déjà inscrit ?{" "}
          <Link to="/login" className="text-primary-600 hover:text-primary-700">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterChoice;
