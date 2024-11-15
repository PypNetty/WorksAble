import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trouvez votre emploi idéal en IT
            </h1>
            <p className="text-xl mb-8">
              La première plateforme de matching dédiée aux travailleurs RQTH
              dans l'informatique
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/register")}
              >
                Je suis candidat
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/register?type=employer")}
              >
                Je recrute
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎯"
              title="Matching Intelligent"
              description="Algorithme spécialisé prenant en compte vos besoins spécifiques"
            />
            <FeatureCard
              icon="🤝"
              title="Accompagnement Personnalisé"
              description="Suivi adapté et conseils pour votre recherche d'emploi"
            />
            <FeatureCard
              icon="📈"
              title="Opportunités Ciblées"
              description="Entreprises sensibilisées et postes adaptés à vos compétences"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Inscription"
              description="Créez votre profil en quelques minutes"
            />
            <StepCard
              number="2"
              title="Préférences"
              description="Précisez vos besoins et aspirations"
            />
            <StepCard
              number="3"
              title="Matching"
              description="Recevez des opportunités pertinentes"
            />
            <StepCard
              number="4"
              title="Connexion"
              description="Échangez directement avec les recruteurs"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Prêt à commencer votre nouvelle aventure ?
          </h2>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/register")}
          >
            Créer mon compte gratuitement
          </Button>
        </div>
      </section>
    </div>
  );
};

// Components
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="p-6 bg-white rounded-lg shadow-md text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
      {number}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
