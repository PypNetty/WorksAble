import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  userType: "candidate" | "recruiter";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: "candidate" | "recruiter";
}

const USERS_KEY = "worksable_users";
const CURRENT_USER_KEY = "worksable_current_user";

const AuthContext = createContext<AuthContextType | null>(null);

const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (e) {
    return false;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      console.error(
        "localStorage n'est pas disponible. L'authentification peut ne pas fonctionner correctement."
      );
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log(
      "Utilisateurs dans localStorage au chargement:",
      JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
    );
    setLoading(false);
  }, []);

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Tentative d'enregistrement avec:", data);

      const rawExistingUsers = localStorage.getItem(USERS_KEY);
      console.log(
        "Données brutes des utilisateurs existants:",
        rawExistingUsers
      );

      let existingUsers: any[] = [];
      try {
        existingUsers = JSON.parse(rawExistingUsers || "[]");
      } catch (parseError) {
        console.error(
          "Erreur lors du parsing des utilisateurs existants:",
          parseError
        );
        existingUsers = [];
      }

      console.log("Utilisateurs existants:", existingUsers);

      if (
        existingUsers.some(
          (u) => u.email.toLowerCase() === data.email.toLowerCase()
        )
      ) {
        throw new Error("Cet email est déjà utilisé");
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        userType: data.userType,
      };

      const userToSave = {
        ...newUser,
        password: data.password,
      };

      localStorage.setItem(
        USERS_KEY,
        JSON.stringify([...existingUsers, userToSave])
      );
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

      console.log(
        "Utilisateurs sauvegardés dans localStorage:",
        JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
      );
      console.log("Nouvel utilisateur enregistré:", newUser);

      setUser(newUser);
      navigate(
        data.userType === "recruiter" ? "/dashboard/recruiter" : "/dashboard"
      );
    } catch (err) {
      console.error("Erreur lors de l'enregistrement:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'inscription"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Tentative de connexion avec:", credentials);

      const rawData = localStorage.getItem(USERS_KEY);
      console.log("Données brutes du localStorage:", rawData);

      let users = [];
      try {
        users = rawData ? JSON.parse(rawData) : [];
      } catch (parseError) {
        console.error(
          "Erreur lors du parsing des données utilisateurs:",
          parseError
        );
        users = [];
      }

      console.log("Utilisateurs trouvés:", users);

      const foundUser = users.find((u: User & { password: string }) => {
        console.log("Comparaison avec:", u);
        return (
          u.email.toLowerCase() === credentials.email.toLowerCase() &&
          u.password === credentials.password
        );
      });

      if (!foundUser) {
        throw new Error("Email ou mot de passe incorrect");
      }

      console.log("Utilisateur trouvé:", foundUser);

      const { password, ...userWithoutPassword } = foundUser;
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(userWithoutPassword)
      );
      setUser(userWithoutPassword);

      navigate(
        userWithoutPassword.userType === "recruiter"
          ? "/dashboard/recruiter"
          : "/dashboard"
      );
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la connexion"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};

export default useAuth;
