// pages/onboarding/RecruiterOnboarding/index.tsx
import React from "react";

import { useNavigate } from "react-router-dom";

const RecruiterOnboarding = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/dashboard/recruiter");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <RecruiterProfileStep onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
};

export default RecruiterOnboarding;
