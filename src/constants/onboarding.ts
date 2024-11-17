import {
  UserIcon,
  BriefcaseIcon,
  HeartIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export const STEPS = [
  {
    id: 1,
    label: "Informations personnelles",
    icon: UserIcon,
  },
  {
    id: 2,
    label: "Situation RQTH",
    icon: HeartIcon,
  },
  {
    id: 3,
    label: "Préférences de travail",
    icon: BriefcaseIcon,
  },
  {
    id: 4,
    label: "Profil professionnel",
    icon: AcademicCapIcon,
  },
];

export const DISABILITY_TYPES = {
  MOTOR: {
    id: "motor",
    label: "Moteur",
    details: [
      "Membres supérieurs",
      "Membres inférieurs",
      "Dos/Colonne vertébrale",
      "Troubles musculaires",
      "Troubles articulaires",
    ],
  },
  VISUAL: {
    id: "visual",
    label: "Visuel",
    details: [
      "Cécité",
      "Malvoyance",
      "Troubles de la vision",
      "Sensibilité à la lumière",
    ],
  },
  AUDITORY: {
    id: "auditory",
    label: "Auditif",
    details: [
      "Surdité",
      "Malentendance",
      "Acouphènes",
      "Hypersensibilité au bruit",
    ],
  },
  COGNITIVE: {
    id: "cognitive",
    label: "Cognitif",
    details: [
      "Troubles de l'attention",
      "Troubles de la mémoire",
      "Troubles de l'apprentissage",
      "Troubles du spectre autistique",
    ],
  },
  PSYCHOLOGICAL: {
    id: "psychological",
    label: "Psychologique",
    details: [
      "Anxiété",
      "Dépression",
      "Troubles bipolaires",
      "Stress post-traumatique",
    ],
  },
  CHRONIC: {
    id: "chronic",
    label: "Maladie chronique",
    details: [
      "Diabète",
      "Sclérose en plaques",
      "Maladies auto-immunes",
      "Maladies cardiovasculaires",
    ],
  },
};

export const SKILL_LEVELS = [
  { value: "débutant", label: "Débutant" },
  { value: "intermédiaire", label: "Intermédiaire" },
  { value: "avancé", label: "Avancé" },
  { value: "expert", label: "Expert" },
];

export const WORK_ORGANIZATION = {
  SCHEDULE_TYPES: [
    "Temps plein",
    "Temps partiel",
    "Horaires flexibles",
    "Travail en journée uniquement",
    "Pas de travail tôt le matin",
    "Pas de travail tard le soir",
  ],
  BREAK_PATTERNS: [
    "Pauses régulières (toutes les heures)",
    "Pauses médicales",
    "Pauses plus longues",
    "Moments de repos",
    "Siestes courtes possibles",
  ],
  REMOTE_OPTIONS: [
    "Full remote",
    "Remote partiel",
    "Remote occasionnel",
    "Présentiel adapté",
    "Mix personnalisé",
  ],
};

export const ADAPTATION_TYPES = {
  WORKSTATION: [
    "Poste de travail ergonomique",
    "Siège adapté",
    "Support d'écran ajustable",
    "Clavier adapté",
    "Souris adaptée",
    "Repose-pieds",
    "Bureau à hauteur variable",
  ],
  SOFTWARE: [
    "Lecteur d'écran",
    "Logiciel de reconnaissance vocale",
    "Loupe d'écran",
    "Correcteur orthographique avancé",
    "Outils de dictée",
  ],
  ORGANIZATION: [
    "Télétravail",
    "Horaires aménagés",
    "Pauses supplémentaires",
    "Temps partiel",
    "Planning adapté aux RDV médicaux",
  ],
  COMMUNICATION: [
    "Interprète LSF",
    "Sous-titrage en direct",
    "Documents en braille",
    "Communications écrites systématiques",
    "Outils de communication adaptés",
  ],
  ENVIRONMENT: [
    "Éclairage adapté",
    "Isolation phonique",
    "Température contrôlée",
    "Accès PMR",
    "Sanitaires adaptés à proximité",
  ],
};
