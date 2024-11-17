// src/pages/dashboard/CandidateDashboard.tsx

import React, { useState } from "react";
import {
  PersonalInfoStep,
  RQTHInfoStep,
  WorkPreferencesStep,
  ProfessionalProfileStep,
} from "@/components/steps";
import { RQTHProfileData } from "@/types/rqth";

const initialProfileData: RQTHProfileData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    birthDate: "",
    address: "",
    postalCode: "",
  },
  healthInfo: {
    disabilityType: [],
    evolution: "stable",
    contraindications: [],
    treatments: {
      current: [],
      frequency: "",
      constraints: [],
    },
    dailyNeeds: [],
    medicalFollowUp: {
      frequency: "",
      specialists: [],
      hospitalProximity: false,
      regularCare: [],
      emergencyProtocol: "",
    },
  },
  schedule: {
    workHours: {
      preferred: {
        start: "",
        end: "",
      },
      maxPerDay: 8,
      flexibilityNeeds: [],
    },
    breaks: {
      frequency: "",
      duration: "",
      specific: [],
    },
    adaptation: {
      remote: false,
      hybrid: false,
      specialArrangements: [],
    },
  },
  professional: {
    skills: [],
    experience: {
      roles: [],
    },
    education: {
      degree: "",
      school: "",
      year: "",
    },
  },
};

const CandidateDashboard: React.FC = () => {
  const [profileData, setProfileData] =
    useState<RQTHProfileData>(initialProfileData);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleProfileUpdate = (
    section: keyof RQTHProfileData,
    field: string,
    value: any
  ) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setProfileData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [parent]: {
            ...(prev[section] as any)[parent],
            [child]: value,
          },
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-8">Mon Profil RQTH</h1>

        {/* Section Informations personnelles */}
        <div className="bg-white rounded-lg shadow p-6">
          <PersonalInfoStep
            data={profileData.personalInfo}
            onChange={(field, value) =>
              handleProfileUpdate("personalInfo", field, value)
            }
            errors={errors.personalInfo || {}}
          />
        </div>

        {/* Section Situation RQTH */}
        <div className="bg-white rounded-lg shadow p-6">
          <RQTHInfoStep
            data={profileData.healthInfo}
            onChange={(field, value) =>
              handleProfileUpdate("healthInfo", field, value)
            }
            errors={errors.healthInfo || {}}
          />
        </div>

        {/* Section Préférences de travail */}
        <div className="bg-white rounded-lg shadow p-6">
          <WorkPreferencesStep
            data={profileData.schedule}
            onChange={(field, value) =>
              handleProfileUpdate("schedule", field, value)
            }
            errors={errors.schedule || {}}
          />
        </div>

        {/* Section Profil professionnel */}
        <div className="bg-white rounded-lg shadow p-6">
          <ProfessionalProfileStep
            data={profileData.professional}
            onChange={(field, value) =>
              handleProfileUpdate("professional", field, value)
            }
            errors={errors.professional || {}}
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
