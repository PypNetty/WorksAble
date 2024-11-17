import React from "react";
import { Link } from "react-router-dom";
import {
  CheckIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  ServerIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  UserGroupIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

interface FeatureCardProps {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface TechRoleCardProps {
  role: string;
  stack: string[];
  adaptations: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
    <Icon className="w-6 h-6 text-primary-600 mb-4" />
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TechRoleCard: React.FC<TechRoleCardProps> = ({
  role,
  stack,
  adaptations,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border hover:border-primary-500 transition-all">
    <h3 className="font-semibold text-lg mb-3">{role}</h3>
    <div className="flex flex-wrap gap-2 mb-4">
      {stack.map((tech, i) => (
        <span
          key={i}
          className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-sm"
        >
          {tech}
        </span>
      ))}
    </div>
    <div className="text-sm text-primary-600 flex items-center">
      <ShieldCheckIcon className="w-4 h-4 mr-2" />
      <span>{adaptations}</span>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Développez votre carrière IT sans limites
              </h1>
              <p className="text-xl">
                Premier matching intelligent qui comprend vraiment vos besoins
                techniques et valorise vos compétences dans l'IT.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                >
                  Je suis candidat
                  <ChevronRightIcon className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  to="/recruiter"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-500 transition-colors border border-white/20"
                >
                  Je recrute des talents IT
                  <ChevronRightIcon className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-1 gap-4">
              <TechRoleCard
                role="Senior Frontend Developer"
                stack={["React", "TypeScript", "Next.js"]}
                adaptations="Poste 100% remote possible"
              />
              <TechRoleCard
                role="DevOps Engineer"
                stack={["Kubernetes", "AWS", "Terraform"]}
                adaptations="Horaires flexibles disponibles"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Une approche tech-first
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              Icon={LightBulbIcon}
              title="Matching Intelligent"
              description="Algorithme qui comprend vraiment vos compétences techniques et vos contraintes spécifiques."
            />
            <FeatureCard
              Icon={ShieldCheckIcon}
              title="Données Sécurisées"
              description="Chiffrement de bout en bout de vos données sensibles."
            />
            <FeatureCard
              Icon={UserGroupIcon}
              title="Focus Tech"
              description="Une plateforme par des RQTH, pour des RQTH."
            />
          </div>
        </div>
      </section>

      {/* Tech Specialties Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Spécialités Tech
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              Icon={CodeBracketIcon}
              title="Développement"
              description="Frontend, Backend, Mobile & Cross-platform"
            />
            <FeatureCard
              Icon={CommandLineIcon}
              title="DevOps"
              description="Cloud, CI/CD, Infrastructure & SRE"
            />
            <FeatureCard
              Icon={ServerIcon}
              title="Data & IA"
              description="Data Engineering, Science & ML/AI"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à booster votre carrière tech ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez la première plateforme qui comprend réellement vos
            besoins.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Créer mon profil
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 bg-white text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
