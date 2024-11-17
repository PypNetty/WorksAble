import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";

interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  birthDate?: string;
  address?: string;
  postalCode?: string;
}

const defaultData: PersonalInfoFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  birthDate: "",
  address: "",
  postalCode: "",
};

interface PersonalInfoStepProps {
  data?: PersonalInfoFormData;
  onChange: (field: keyof PersonalInfoFormData, value: string) => void;
  errors?: Record<string, string>;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  data = defaultData,
  onChange,
  errors = {},
}) => {
  const inputClassName = (error?: string) => `
    mt-1 block w-full rounded-md shadow-sm
    ${
      error
        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
    }
  `;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <UserIcon className="w-8 h-8 text-primary-600" />
        <h2 className="text-2xl font-bold">Informations personnelles</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prénom */}
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className={inputClassName(errors.firstName)}
            placeholder="Votre prénom"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        {/* Nom */}
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className={inputClassName(errors.lastName)}
            placeholder="Votre nom"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputClassName(errors.email)}
            placeholder="votre.email@exemple.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Téléphone */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputClassName(errors.phone)}
            placeholder="06 12 34 56 78"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Date de naissance */}
        <div className="space-y-2">
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700"
          >
            Date de naissance
          </label>
          <input
            id="birthDate"
            type="date"
            value={data.birthDate}
            onChange={(e) => onChange("birthDate", e.target.value)}
            className={inputClassName(errors.birthDate)}
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
          )}
        </div>

        {/* Adresse */}
        <div className="space-y-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Adresse
          </label>
          <input
            id="address"
            type="text"
            value={data.address}
            onChange={(e) => onChange("address", e.target.value)}
            className={inputClassName(errors.address)}
            placeholder="Numéro et nom de rue"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        {/* Code postal */}
        <div className="space-y-2">
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Code postal
          </label>
          <input
            id="postalCode"
            type="text"
            value={data.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
            className={inputClassName(errors.postalCode)}
            placeholder="75000"
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
          )}
        </div>

        {/* Ville */}
        <div className="space-y-2">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            Ville <span className="text-red-500">*</span>
          </label>
          <input
            id="city"
            type="text"
            required
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            className={inputClassName(errors.city)}
            placeholder="Votre ville"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>
      </div>

      {/* Indication champs obligatoires */}
      <p className="text-sm text-gray-500 mt-4">
        Les champs marqués d'un <span className="text-red-500">*</span> sont
        obligatoires
      </p>

      {/* Message d'erreur global */}
      {errors.global && (
        <div className="mt-4 text-sm text-red-600">{errors.global}</div>
      )}
    </div>
  );
};

export default PersonalInfoStep;
