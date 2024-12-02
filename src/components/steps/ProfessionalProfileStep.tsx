import React, { useState } from "react";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon as CodeIcon,
  PlusIcon,
  TrashIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

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
  certifications: Certification[];
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
  certifications: [],
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

  const [newCertification, setNewCertification] = useState<
    Omit<Certification, "id">
  >({
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
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

  const handleAddCertification = () => {
    if (
      newCertification.name &&
      newCertification.issuer &&
      newCertification.date
    ) {
      const certification = {
        id: Date.now().toString(),
        ...newCertification,
      };
      onChange("certifications", [
        ...(data.certifications || []),
        certification,
      ]);
      setNewCertification({ name: "", issuer: "", date: "", expiryDate: "" });
    }
  };

  const handleRemoveCertification = (certId: string) => {
    onChange(
      "certifications",
      data.certifications.filter((cert) => cert.id !== certId)
    );
  };

  const inputStyles =
    "block w-full p-2 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="space-y-8 bg-white p-6 rounded-lg">
      <div className="flex items-center gap-4">
        <AcademicCapIcon className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold">Profil professionnel</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <CodeIcon className="w-5 h-5 text-gray-500" />
          Compétences techniques
        </h3>

        <div className="flex gap-2 items-center mb-4">
          <div className="relative grow">
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill({ ...newSkill, name: e.target.value })
              }
              className={`${inputStyles} w-full h-12 pl-10`}
              placeholder="Nouvelle compétence..."
            />
            <CodeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div className="min-w-[200px]">
            <select
              value={newSkill.level}
              onChange={(e) =>
                setNewSkill({ ...newSkill, level: e.target.value as any })
              }
              className={`${inputStyles} h-12 w-full bg-gray-50`}
            >
              {SKILL_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleAddSkill}
            className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 h-12 w-12 flex items-center justify-center"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="grid gap-2">
          {data.skills?.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <CodeIcon className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-gray-500">- {skill.level}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

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
                  className={inputStyles}
                  placeholder="Entreprise"
                />
                <input
                  type="text"
                  value={experience.role}
                  onChange={(e) =>
                    handleExperienceChange(index, "role", e.target.value)
                  }
                  className={inputStyles}
                  placeholder="Poste"
                />
                <input
                  type="text"
                  value={experience.duration}
                  onChange={(e) =>
                    handleExperienceChange(index, "duration", e.target.value)
                  }
                  className={inputStyles}
                  placeholder="Durée (ex: 2 ans)"
                />
                <textarea
                  value={experience.description}
                  onChange={(e) =>
                    handleExperienceChange(index, "description", e.target.value)
                  }
                  className={inputStyles}
                  rows={3}
                  placeholder="Description du poste..."
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <PlusIcon className="w-4 h-4" />
          Ajouter une expérience
        </button>
      </div>

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
            className={inputStyles}
            placeholder="Diplôme"
          />
          <input
            type="text"
            value={data.education.school}
            onChange={(e) => onChange("education.school", e.target.value)}
            className={inputStyles}
            placeholder="École/Université"
          />
          <input
            type="text"
            value={data.education.year}
            onChange={(e) => onChange("education.year", e.target.value)}
            className={inputStyles}
            placeholder="Année"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <DocumentCheckIcon className="w-5 h-5 text-gray-500" />
          Certifications
        </h3>

        <div className="grid gap-4">
          {data.certifications?.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="space-y-1">
                <div className="font-medium">{cert.name}</div>
                <div className="text-sm text-gray-500">
                  {cert.issuer} - Obtenue le {cert.date}
                  {cert.expiryDate && ` - Expire le ${cert.expiryDate}`}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCertification(cert.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={newCertification.name}
            onChange={(e) =>
              setNewCertification((prev) => ({ ...prev, name: e.target.value }))
            }
            className={inputStyles}
            placeholder="Nom de la certification"
          />
          <input
            type="text"
            value={newCertification.issuer}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                issuer: e.target.value,
              }))
            }
            className={inputStyles}
            placeholder="Organisme certificateur"
          />
          <input
            type="date"
            value={newCertification.date}
            onChange={(e) =>
              setNewCertification((prev) => ({ ...prev, date: e.target.value }))
            }
            className={inputStyles}
          />
          <input
            type="date"
            value={newCertification.expiryDate}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                expiryDate: e.target.value,
              }))
            }
            className={inputStyles}
            placeholder="Date d'expiration (optionnel)"
          />
        </div>

        <button
          type="button"
          onClick={handleAddCertification}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <PlusIcon className="w-4 h-4" />
          Ajouter une certification
        </button>
      </div>

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
