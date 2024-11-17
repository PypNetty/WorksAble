import React, { useState } from "react";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon as CodeIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface ProfessionalProfileData {
  skills: Array<{
    id: string;
    name: string;
    level: "débutant" | "intermédiaire" | "avancé" | "expert";
  }>;
  experience: {
    roles: Array<{
      company: string;
      role: string;
      duration: string;
      description: string;
    }>;
  };
  education: {
    degree: string;
    school: string;
    year: string;
  };
}

const defaultData: ProfessionalProfileData = {
  skills: [],
  experience: {
    roles: [],
  },
  education: {
    degree: "",
    school: "",
    year: "",
  },
};

const SKILL_LEVELS = [
  { value: "débutant", label: "Débutant" },
  { value: "intermédiaire", label: "Intermédiaire" },
  { value: "avancé", label: "Avancé" },
  { value: "expert", label: "Expert" },
];

interface ProfessionalProfileStepProps {
  data?: ProfessionalProfileData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

const ProfessionalProfileStep: React.FC<ProfessionalProfileStepProps> = ({
  data = defaultData,
  onChange,
  errors = {},
}) => {
  const [newSkill, setNewSkill] = useState<{
    name: string;
    level: "débutant" | "intermédiaire" | "avancé" | "expert";
  }>({
    name: "",
    level: "débutant",
  });

  const handleAddSkill = () => {
    if (newSkill.name) {
      const skill = {
        id: Date.now().toString(),
        ...newSkill,
      };
      onChange("skills", [...(data.skills || []), skill]);
      setNewSkill({ name: "", level: "débutant" });
    }
  };

  const handleRemoveSkill = (skillId: string) => {
    onChange(
      "skills",
      data.skills.filter((skill) => skill.id !== skillId)
    );
  };

  const handleAddExperience = () => {
    const newExperience = {
      company: "",
      role: "",
      duration: "",
      description: "",
    };
    onChange("experience.roles", [
      ...(data.experience?.roles || []),
      newExperience,
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    const newRoles = [...data.experience.roles];
    newRoles.splice(index, 1);
    onChange("experience.roles", newRoles);
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newRoles = [...data.experience.roles];
    newRoles[index] = {
      ...newRoles[index],
      [field]: value,
    };
    onChange("experience.roles", newRoles);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <AcademicCapIcon className="w-8 h-8 text-primary-600" />
        <h2 className="text-2xl font-bold">Profil professionnel</h2>
      </div>

      {/* Compétences */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <CodeIcon className="w-5 h-5 text-gray-500" />
          Compétences techniques
        </h3>

        <div className="grid gap-4">
          {data.skills?.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <span className="font-medium">{skill.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  {skill.level}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill.id)}
                className="text-red-600 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Nouvelle compétence..."
          />
          <select
            value={newSkill.level}
            onChange={(e) =>
              setNewSkill({ ...newSkill, level: e.target.value as any })
            }
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {SKILL_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        {errors.skills && (
          <p className="text-sm text-red-600">{errors.skills}</p>
        )}
      </div>

      {/* Expériences */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <BriefcaseIcon className="w-5 h-5 text-gray-500" />
          Expériences professionnelles
        </h3>

        {data.experience.roles.map((experience, index) => (
          <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between">
              <div className="space-y-4 flex-1">
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Entreprise"
                />
                <input
                  type="text"
                  value={experience.role}
                  onChange={(e) =>
                    handleExperienceChange(index, "role", e.target.value)
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Poste"
                />
                <input
                  type="text"
                  value={experience.duration}
                  onChange={(e) =>
                    handleExperienceChange(index, "duration", e.target.value)
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Durée (ex: 2 ans)"
                />
                <textarea
                  value={experience.description}
                  onChange={(e) =>
                    handleExperienceChange(index, "description", e.target.value)
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  rows={3}
                  placeholder="Description du poste..."
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
                className="text-red-600 hover:text-red-700 ml-4"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <PlusIcon className="w-4 h-4" />
          Ajouter une expérience
        </button>
      </div>

      {/* Formation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <AcademicCapIcon className="w-5 h-5 text-gray-500" />
          Formation
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            value={data.education.degree}
            onChange={(e) => onChange("education.degree", e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Diplôme"
          />
          <input
            type="text"
            value={data.education.school}
            onChange={(e) => onChange("education.school", e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="École/Université"
          />
          <input
            type="text"
            value={data.education.year}
            onChange={(e) => onChange("education.year", e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Année"
          />
        </div>
      </div>

      {/* Messages d'erreur */}
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 text-sm text-red-600">
          {Object.values(errors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessionalProfileStep;
