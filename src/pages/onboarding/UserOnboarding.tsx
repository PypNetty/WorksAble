import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// Types
interface WorkArrangement {
  id: string;
  label: string;
  description: string;
  needsDetails: boolean;
}

interface ITDomain {
  id: string;
  name: string;
  subDomains: {
    id: string;
    name: string;
    skills: string[];
  }[];
}

interface ProfileData {
  // Informations personnelles
  firstName: string;
  lastName: string;
  phone: string;
  city: string;

  // Domaines IT et compétences
  selectedDomain: string;
  selectedSubDomains: string[];
  skills: Record<string, string[]>;

  // RQTH et adaptations
  visualAdaptations: string[];
  visualAdaptationsDetails?: string;
  auditoryAdaptations: string[];
  auditoryAdaptationsDetails?: string;
  motorAdaptations: string[];
  motorAdaptationsDetails?: string;
  cognitiveAdaptations: string[];
  cognitiveAdaptationsDetails?: string;

  // Conditions environnementales
  environmentalNeeds: {
    lighting?: string;
    noise?: string;
    temperature?: string;
  };

  // Organisation du travail
  workSchedule: {
    preferredDays?: string[];
    preferredHours?: {
      start: string;
      end: string;
    };
    breakRequirements?: string;
    maxHoursPerDay?: number;
    medicalConstraints?: string[];
  };

  // Communication et support
  communicationPreferences: string[];
  supportNeeds: string[];

  // Urgence
  emergencyContact: {
    name: string;
    phone: string;
  };
  emergencyProcedures: string[];
  emergencyInstructions?: string;

  // Transport et accessibilité
  transportation: {
    mode: string;
    details?: string;
  };
  accessibilityNeeds: string[];
  accessibilityDetails?: string;

  // Formation
  trainingNeeds: string[];
  careerGoals?: string;
}

// Configuration statique des domaines IT (comme défini précédemment)
const IT_DOMAINS: ITDomain[] = [
  {
    id: "infrastructure",
    name: "Infrastructure & Systèmes",
    subDomains: [
      {
        id: "system-admin",
        name: "Administration Systèmes",
        skills: [
          "Windows Server",
          "Linux (RHEL/Debian)",
          "Active Directory",
          "VMware",
          "Hyper-V",
          "PowerShell",
          "Bash",
          "Ansible",
          "Monitoring (Nagios/Zabbix)",
          "Sauvegarde & Restauration",
        ],
      },
      {
        id: "network",
        name: "Réseaux",
        skills: [
          "TCP/IP",
          "Routage & Switching",
          "Firewalls",
          "VPN",
          "Load Balancing",
          "DNS/DHCP",
          "WiFi",
          "SDN",
          "QoS",
          "Protocoles réseau avancés",
        ],
      },
      {
        id: "cloud",
        name: "Cloud Computing",
        skills: [
          "AWS",
          "Azure",
          "GCP",
          "OpenStack",
          "Kubernetes",
          "Docker",
          "Terraform",
          "CloudFormation",
        ],
      },
    ],
  },
  // ... autres domaines IT comme définis précédemment
];

const WORK_ARRANGEMENTS: WorkArrangement[] = [
  {
    id: "flexible-hours",
    label: "Horaires flexibles",
    description: "Adaptation des horaires selon les besoins médicaux",
    needsDetails: true,
  },
  // ... autres arrangements comme définis précédemment
];

const ProfileSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    // Initialisation de tous les champs
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    selectedDomain: "",
    selectedSubDomains: [],
    skills: {},
    visualAdaptations: [],
    auditoryAdaptations: [],
    motorAdaptations: [],
    cognitiveAdaptations: [],
    environmentalNeeds: {},
    workSchedule: {},
    communicationPreferences: [],
    supportNeeds: [],
    emergencyContact: {
      name: "",
      phone: "",
    },
    emergencyProcedures: [],
    transportation: {
      mode: "",
    },
    accessibilityNeeds: [],
    trainingNeeds: [],
  });

  useEffect(() => {
    const loadExistingData = async () => {
      try {
        setLoading(true);
        // TODO: Charger les données existantes depuis l'API
        const savedData = await fetchUserProfile(user.id);
        if (savedData) {
          setFormData(savedData);
        }
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    loadExistingData();
  }, [user.id]);

  useEffect(() => {
    if (!hasChanges) return;

    const timer = setTimeout(() => {
      handleAutoSave();
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData, hasChanges]);

  const handleAutoSave = async () => {
    try {
      setLoading(true);
      // TODO: Implémenter la sauvegarde API
      await saveUserProfile(user.id, formData);
      setHasChanges(false);
    } catch (err) {
      setError("Erreur lors de la sauvegarde automatique");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // TODO: Validation finale et soumission
      await submitProfile(user.id, formData);
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de la soumission du profil");
    } finally {
      setLoading(false);
    }
  };

  // Fonctions de rendu pour chaque section
  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Informations personnelles</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Téléphone
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleFieldChange("phone", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ville</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => handleFieldChange("city", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>
    </div>
  );

  const renderITDomainSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Domaine IT et compétences</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Domaine IT principal
        </label>
        <select
          value={formData.selectedDomain}
          onChange={(e) => {
            handleFieldChange("selectedDomain", e.target.value);
            handleFieldChange("selectedSubDomains", []);
            handleFieldChange("skills", {});
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Sélectionnez un domaine</option>
          {IT_DOMAINS.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.name}
            </option>
          ))}
        </select>
      </div>

      {formData.selectedDomain && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Spécialisations
          </label>
          <div className="mt-2 space-y-2">
            {IT_DOMAINS.find(
              (d) => d.id === formData.selectedDomain
            )?.subDomains.map((subDomain) => (
              <div key={subDomain.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={subDomain.id}
                  checked={formData.selectedSubDomains?.includes(subDomain.id)}
                  onChange={(e) => {
                    const newSubDomains = e.target.checked
                      ? [...(formData.selectedSubDomains || []), subDomain.id]
                      : formData.selectedSubDomains?.filter(
                          (id) => id !== subDomain.id
                        );
                    handleFieldChange("selectedSubDomains", newSubDomains);
                  }}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor={subDomain.id}
                  className="ml-2 text-sm text-gray-700"
                >
                  {subDomain.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.selectedSubDomains?.length > 0 && (
        <div className="space-y-4">
          {formData.selectedSubDomains.map((subDomainId) => {
            const domain = IT_DOMAINS.find(
              (d) => d.id === formData.selectedDomain
            );
            const subDomain = domain?.subDomains.find(
              (sd) => sd.id === subDomainId
            );

            return (
              <div key={subDomainId}>
                <label className="block text-sm font-medium text-gray-700">
                  Compétences en {subDomain?.name}
                </label>
                <select
                  multiple
                  value={formData.skills?.[subDomainId] || []}
                  onChange={(e) => {
                    const values = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    handleFieldChange("skills", {
                      ...formData.skills,
                      [subDomainId]: values,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {subDomain?.skills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // Render function for all adaptations
  const renderAdaptations = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Adaptations spécifiques</h2>

      {/* Visual adaptations */}
      {/* ... (tous les blocs d'adaptation comme définis précédemment) ... */}

      {/* Environmental conditions */}
      {/* ... (toutes les conditions environnementales comme définies précédemment) ... */}

      {/* Communication and support */}
      {/* ... (toute la section communication comme définie précédemment) ... */}

      {/* Emergency protocol */}
      {/* ... (tout le protocole d'urgence comme défini précédemment) ... */}

      {/* Transport and accessibility */}
      {/* ... (toute la section transport comme définie précédemment) ... */}

      {/* Training and professional development */}
      {/* ... (toute la section formation comme définie précédemment) ... */}
    </div>
  );

  // Main render
  if (loading && !formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const steps = [
    "Informations personnelles",
    "Domaine IT",
    "Adaptations",
    "Organisation",
    "Préférences",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Status indicator */}
          <div className="mb-4 flex items-center justify-end text-sm text-gray-500">
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sauvegarde en cours...
              </div>
            ) : hasChanges ? (
              <div className="flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Modifications non sauvegardées
              </div>
            ) : (
              <div className="flex items-center text-green-600">
                Tout est sauvegardé
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`text-sm font-medium ${
                    currentStep > index + 1
                      ? "text-primary-600"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary-600 rounded-full transition-all"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step rendering */}
              {currentStep === 1 && renderPersonalInfo()}
              {currentStep === 2 && renderITDomainSelection()}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">
                    Adaptations spécifiques
                  </h2>

                  {/* Visual adaptations */}
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-md font-medium">
                      Adaptations visuelles
                    </h4>
                    <div className="space-y-2">
                      {[
                        { id: "screen-reader", label: "Lecteur d'écran" },
                        { id: "magnifier", label: "Logiciel d'agrandissement" },
                        {
                          id: "contrast",
                          label: "Réglages de contraste spécifiques",
                        },
                        { id: "braille", label: "Afficheur braille" },
                        { id: "voice-command", label: "Commandes vocales" },
                        { id: "large-display", label: "Grand écran" },
                      ].map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option.id}
                            checked={formData.visualAdaptations?.includes(
                              option.id
                            )}
                            onChange={(e) => {
                              const adaptations =
                                formData.visualAdaptations || [];
                              const newAdaptations = e.target.checked
                                ? [...adaptations, option.id]
                                : adaptations.filter((a) => a !== option.id);
                              handleFieldChange(
                                "visualAdaptations",
                                newAdaptations
                              );
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label
                            htmlFor={option.id}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                      <textarea
                        placeholder="Autres besoins visuels spécifiques..."
                        value={formData.visualAdaptationsDetails || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "visualAdaptationsDetails",
                            e.target.value
                          )
                        }
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Auditory adaptations */}
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-md font-medium">
                      Adaptations auditives
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          id: "hearing-aid",
                          label: "Compatibilité appareil auditif",
                        },
                        { id: "visual-alerts", label: "Alertes visuelles" },
                        {
                          id: "transcription",
                          label: "Transcription en temps réel",
                        },
                        {
                          id: "sign-interpreter",
                          label: "Interprète en langue des signes",
                        },
                        { id: "quiet-space", label: "Environnement calme" },
                      ].map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option.id}
                            checked={formData.auditoryAdaptations?.includes(
                              option.id
                            )}
                            onChange={(e) => {
                              const adaptations =
                                formData.auditoryAdaptations || [];
                              const newAdaptations = e.target.checked
                                ? [...adaptations, option.id]
                                : adaptations.filter((a) => a !== option.id);
                              handleFieldChange(
                                "auditoryAdaptations",
                                newAdaptations
                              );
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label
                            htmlFor={option.id}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                      <textarea
                        placeholder="Autres besoins auditifs spécifiques..."
                        value={formData.auditoryAdaptationsDetails || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "auditoryAdaptationsDetails",
                            e.target.value
                          )
                        }
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Motor adaptations */}
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-md font-medium">
                      Adaptations motrices
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          id: "ergonomic-desk",
                          label: "Bureau ergonomique ajustable",
                        },
                        { id: "adapted-chair", label: "Siège adapté" },
                        { id: "adapted-keyboard", label: "Clavier adapté" },
                        { id: "adapted-mouse", label: "Souris adaptée" },
                        { id: "voice-control", label: "Contrôle vocal" },
                        {
                          id: "mobility-assistance",
                          label: "Assistance à la mobilité",
                        },
                      ].map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option.id}
                            checked={formData.motorAdaptations?.includes(
                              option.id
                            )}
                            onChange={(e) => {
                              const adaptations =
                                formData.motorAdaptations || [];
                              const newAdaptations = e.target.checked
                                ? [...adaptations, option.id]
                                : adaptations.filter((a) => a !== option.id);
                              handleFieldChange(
                                "motorAdaptations",
                                newAdaptations
                              );
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label
                            htmlFor={option.id}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                      <textarea
                        placeholder="Autres besoins moteurs spécifiques..."
                        value={formData.motorAdaptationsDetails || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "motorAdaptationsDetails",
                            e.target.value
                          )
                        }
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Cognitive adaptations */}
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-md font-medium">
                      Adaptations cognitives
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          id: "task-organization",
                          label: "Outils d'organisation des tâches",
                        },
                        {
                          id: "time-management",
                          label: "Aide à la gestion du temps",
                        },
                        {
                          id: "written-instructions",
                          label: "Instructions écrites détaillées",
                        },
                        {
                          id: "noise-reduction",
                          label: "Réduction des distractions sonores",
                        },
                        { id: "stress-management", label: "Gestion du stress" },
                        {
                          id: "regular-breaks",
                          label: "Pauses régulières structurées",
                        },
                      ].map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option.id}
                            checked={formData.cognitiveAdaptations?.includes(
                              option.id
                            )}
                            onChange={(e) => {
                              const adaptations =
                                formData.cognitiveAdaptations || [];
                              const newAdaptations = e.target.checked
                                ? [...adaptations, option.id]
                                : adaptations.filter((a) => a !== option.id);
                              handleFieldChange(
                                "cognitiveAdaptations",
                                newAdaptations
                              );
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label
                            htmlFor={option.id}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                      <textarea
                        placeholder="Autres besoins cognitifs spécifiques..."
                        value={formData.cognitiveAdaptationsDetails || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "cognitiveAdaptationsDetails",
                            e.target.value
                          )
                        }
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Précédent
                  </button>
                )}

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Terminer
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
