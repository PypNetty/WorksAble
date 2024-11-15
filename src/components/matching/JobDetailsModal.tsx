interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    title: string;
    company: string;
    location: string;
    matchScore: number;
    skills: string[];
    accommodations: string[];
    description: string;
  };
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  isOpen,
  onClose,
  job,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Fermer</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {job.title}
              </h3>
              <p className="text-primary-600 font-semibold">{job.company}</p>
              <p className="text-gray-600">{job.location}</p>
            </div>

            {/* Match Score */}
            <div className="flex items-center mb-6">
              <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full font-semibold">
                Match : {job.matchScore}%
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Compétences requises</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Accommodations */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Aménagements disponibles</h4>
              <div className="flex flex-wrap gap-2">
                {job.accommodations.map((accommodation) => (
                  <span
                    key={accommodation}
                    className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                  >
                    {accommodation}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h4 className="font-semibold mb-2">Description du poste</h4>
              <p className="text-gray-600">{job.description}</p>
            </div>

            {/* CTA */}
            <div className="border-t pt-6">
              <div className="flex flex-col space-y-4">
                <p className="text-center text-gray-600 mb-4">
                  Intéressé(e) par ce poste ? Créez un compte pour postuler !
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/commencer"
                    className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
                  >
                    Créer un compte
                  </Link>
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Déjà inscrit ?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
