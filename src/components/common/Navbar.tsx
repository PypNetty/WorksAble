import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // Sans l'extension

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isButton?: boolean;
  isPrimary?: boolean;
}

const NavLink = ({
  to,
  children,
  isButton = false,
  isPrimary = false,
}: NavLinkProps) => {
  const baseClass = "hover:text-primary-600";
  const buttonClass = isPrimary
    ? "bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
    : "bg-white text-primary-600 border border-primary-600 px-4 py-2 rounded-md hover:bg-primary-50";
  const linkClass = isButton ? buttonClass : `text-gray-700 ${baseClass}`;

  return (
    <Link to={to} className={linkClass}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { isAuthenticated, logout, userType } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-primary-600">
            WorksAble
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/matching">Matching</NavLink>
            <NavLink to="/about">À propos</NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to={
                    userType === "recruiter"
                      ? "/dashboard/recruiter"
                      : "/dashboard"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink to="/profile">Profil</NavLink>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-600"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink to="/commencer" isButton isPrimary>
                  Commencer
                </NavLink>
                <NavLink to="/login" isButton={false}>
                  Se connecter
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
