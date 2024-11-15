import React from "react";

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Notre Mission
            </h1>
            <p className="text-xl opacity-90">
              Faciliter l'inclusion professionnelle des travailleurs RQTH dans
              le secteur IT
            </p>
          </div>
        </div>
      </section>

      {/* Notre Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Notre Vision
            </h2>
            <p className="text-gray-600 mb-6">
              WorksAble est né d'un constat simple : le secteur IT offre de
              nombreuses opportunités d'emploi adaptables aux situations de
              handicap, mais les processus de recrutement traditionnels ne sont
              pas toujours adaptés aux besoins spécifiques des travailleurs
              RQTH.
            </p>
            <p className="text-gray-600">
              Notre plateforme vise à créer des connexions pertinentes entre les
              talents et les entreprises, en mettant l'accent sur les
              compétences et en facilitant la mise en place des aménagements
              nécessaires.
            </p>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              title="Inclusion"
              description="Nous croyons en un marché du travail qui valorise tous les talents, sans exception."
              icon="🤝"
            />
            <ValueCard
              title="Innovation"
              description="Nous utilisons la technologie pour créer des solutions adaptées aux besoins de chacun."
              icon="💡"
            />
            <ValueCard
              title="Impact"
              description="Nous agissons concrètement pour faciliter l'accès à l'emploi des personnes RQTH."
              icon="🎯"
            />
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard
              number="01"
              title="Inscription"
              description="Créez votre profil en spécifiant vos compétences et besoins"
            />
            <StepCard
              number="02"
              title="Matching"
              description="Notre algorithme identifie les opportunités les plus pertinentes"
            />
            <StepCard
              number="03"
              title="Connexion"
              description="Échangez directement avec les entreprises intéressées"
            />
            <StepCard
              number="04"
              title="Accompagnement"
              description="Bénéficiez d'un suivi personnalisé tout au long du processus"
            />
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Notre Équipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Contactez-nous</h2>
            <p className="text-gray-600 mb-8">
              Vous avez des questions ? Notre équipe est là pour vous aider.
            </p>
            <div className="space-y-4">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:contact@worksable.fr"
                  className="text-primary-600 hover:text-primary-700"
                >
                  contact@worksable.fr
                </a>
              </p>
              <p>
                <strong>Téléphone:</strong>{" "}
                <a
                  href="tel:+33100000000"
                  className="text-primary-600 hover:text-primary-700"
                >
                  01 00 00 00 00
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Composants
interface ValueCardProps {
  title: string;
  description: string;
  icon: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, icon }) => (
  <div className="text-center p-6 bg-white rounded-lg shadow-sm">
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
  <div className="text-center">
    <div className="text-primary-600 font-bold text-3xl mb-4">{number}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

const TeamCard: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  linkedin,
}) => (
  <div className="text-center">
    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-xl font-bold mb-1">{name}</h3>
    <p className="text-gray-600 mb-2">{role}</p>
    {linkedin && (
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 hover:text-primary-700"
      >
        LinkedIn
      </a>
    )}
  </div>
);

// Données mockées
const teamMembers = [
  {
    name: "Sarah Martin",
    role: "CEO & Co-fondatrice",
    image: "/api/placeholder/150/150", // Utilise un placeholder pour l'exemple
    linkedin: "https://linkedin.com",
  },
  {
    name: "Thomas Dubois",
    role: "CTO & Co-fondateur",
    image: "/api/placeholder/150/150",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Marie Chen",
    role: "Responsable Inclusion",
    image: "/api/placeholder/150/150",
    linkedin: "https://linkedin.com",
  },
];

export default About;
