import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-white text-lg font-bold mb-4">WorksAble</h2>
            <p className="text-sm">
              La première plateforme de matching dédiée aux travailleurs RQTH
              dans l'informatique
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/matching" className="hover:text-white">
                  Matching
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@worksable.fr"
                  className="hover:text-white"
                >
                  contact@worksable.fr
                </a>
              </li>
              <li>
                <a href="tel:+33100000000" className="hover:text-white">
                  01 00 00 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} WorksAble. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
