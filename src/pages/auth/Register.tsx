import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Inscription
        </h2>
        <RegisterForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Déjà un compte ?{" "}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
