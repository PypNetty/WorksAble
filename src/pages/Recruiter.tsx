import React from "react";
import { Link } from "react-router-dom";

const Recruiter = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Recrutez des talents IT diversifiés
            </h1>
            <p className="text-xl mb-8">
              Trouvez les meilleurs profils RQTH pour vos postes en IT
            </p>
            <Link
              to="/register?type=recruiter"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-indigo-50 transition"
            >
              Publier une offre
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Vos avantages
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon="🎯"
              title="Matching précis"
              description="Accédez à des profils présélectionnés selon vos critères et besoins spécifiques"
            />
            <BenefitCard
              icon="💪"
              title="Obligations légales"
              description="Remplissez vos objectifs d'inclusion et bénéficiez des aides à l'embauche"
            />
            <BenefitCard
              icon="🤝"
              title="Accompagnement complet"
              description="Bénéficiez de conseils pour l'aménagement des postes et l'intégration"
            />
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Notre processus
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              <ProcessCard
                number="1"
                title="Publiez votre offre"
                description="Décrivez le poste et les aménagements possibles"
              />
              <ProcessCard
                number="2"
                title="Recevez des candidatures ciblées"
                description="Notre algorithme présélectionne les meilleurs profils"
              />
              <ProcessCard
                number="3"
                title="Échangez et recrutez"
                description="Bénéficiez de notre accompagnement pour finaliser le recrutement"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard number="500+" label="Recrutements réussis" />
            <StatCard number="95%" label="Taux de satisfaction" />
            <StatCard number="300+" label="Entreprises partenaires" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à recruter autrement ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez les entreprises qui s'engagent pour une tech plus
            inclusive
          </p>
          <Link
            to="/register?type=recruiter"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>
    </div>
  );
};

// Components
interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface ProcessCardProps {
  number: string;
  title: string;
  description: string;
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  number,
  title,
  description,
}) => (
  <div className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
    <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label }) => (
  <div className="p-6">
    <div className="text-4xl font-bold text-indigo-600 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default Recruiter;
