import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Connexion
        </h2>
        <LoginForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-700"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
