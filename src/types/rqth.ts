export interface RQTHProfileData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    birthDate?: string;
    address?: string;
    postalCode?: string;
  };
  healthInfo: {
    disabilityType: string[];
    evolution: "stable" | "degenerative" | "variable";
    contraindications: string[];
    treatments: {
      current: string[];
      frequency: string;
      constraints: string[];
    };
    dailyNeeds: string[];
    medicalFollowUp: {
      frequency: string;
      specialists: string[];
      hospitalProximity: boolean;
      regularCare: string[];
      emergencyProtocol?: string;
    };
  };
  schedule: {
    workHours: {
      preferred: {
        start: string;
        end: string;
      };
      maxPerDay: number;
      flexibilityNeeds: string[];
    };
    breaks: {
      frequency: string;
      duration: string;
      specific: string[];
    };
    adaptation: {
      remote: boolean;
      hybrid: boolean;
      specialArrangements: string[];
    };
  };
  professional: {
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
  };
}

export type StepValidationErrors = {
  [K in keyof RQTHProfileData]?: string[];
};
