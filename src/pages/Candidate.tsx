import React from "react";
import { Link } from "react-router-dom";

const Candidate = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trouvez l'emploi IT adapté à vos besoins
            </h1>
            <p className="text-xl mb-8">
              Accédez à des opportunités professionnelles qui prennent en compte
              votre situation RQTH
            </p>
            <Link
              to="/register?type=candidate"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition"
            >
              Créer mon profil
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi nous rejoindre ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎯"
              title="Matching intelligent"
              description="Des offres d'emploi présélectionnées en fonction de vos compétences et besoins spécifiques"
            />
            <FeatureCard
              icon="💼"
              title="Entreprises inclusives"
              description="Un réseau d'entreprises sensibilisées et engagées dans l'inclusion professionnelle"
            />
            <FeatureCard
              icon="🤝"
              title="Accompagnement dédié"
              description="Un suivi personnalisé tout au long de votre recherche d'emploi"
            />
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça marche ?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              <StepCard
                number="1"
                title="Créez votre profil"
                description="Renseignez vos compétences, expériences et les aménagements dont vous avez besoin"
              />
              <StepCard
                number="2"
                title="Recevez des matchs"
                description="Notre algorithme vous propose les opportunités les plus pertinentes"
              />
              <StepCard
                number="3"
                title="Échangez directement"
                description="Discutez avec les recruteurs et trouvez votre futur emploi"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ils nous font confiance
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              name="Marie D."
              role="Développeuse Frontend"
              content="Grâce à WorksAble, j'ai trouvé un poste qui correspond parfaitement à mes compétences et qui prend en compte mes besoins d'aménagement."
              image="/api/placeholder/64/64"
            />
            <TestimonialCard
              name="Thomas L."
              role="DevOps Engineer"
              content="Le processus de matching m'a permis de trouver rapidement une entreprise qui comprend ma situation et valorise mes compétences."
              image="/api/placeholder/64/64"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

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
  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
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
  <div className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  image,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <p className="text-gray-600 mb-6">"{content}"</p>
    <div className="flex items-center">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
  </div>
);

export default Candidate;
