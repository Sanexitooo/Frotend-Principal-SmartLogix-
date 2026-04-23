import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-saas-black bg-opacity-90 backdrop-blur-sm sticky top-0 z-50 border-b border-saas-darkGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Transformado a SmartLogix */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-saas-orange to-blue-400 bg-clip-text text-transparent">
                SmartLogix
              </span>
            </Link>
          </div>

          {/* Desktop menu - Traducido al Español */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "text-saas-orange"
                    : "text-white hover:text-saas-orange"
                }`}
              >
                Inicio
              </Link>
              <Link
                to=""
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/roadmap")
                    ? "text-saas-orange"
                    : "text-white hover:text-saas-orange"
                }`}
              >
                Rutas
              </Link>
              <Link
                to=""
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/pricing")
                    ? "text-saas-orange"
                    : "text-white hover:text-saas-orange"
                }`}
              >
                Tarifas
              </Link>
              <Link
                to=""
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/contact")
                    ? "text-saas-orange"
                    : "text-white hover:text-saas-orange"
                }`}
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* CTA Button - Personalizado */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className="btn-primary px-6 py-2 rounded-lg bg-saas-orange text-white font-medium hover:opacity-90 transition-all"
            >
              Iniciar Sesión
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Traducido */}
      {isOpen && (
        <div className="md:hidden bg-saas-darkGray">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 text-base font-medium ${
                isActive("/")
                  ? "text-saas-orange"
                  : "text-white hover:text-saas-orange"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to=""
              className={`block px-3 py-2 text-base font-medium ${
                isActive("/roadmap")
                  ? "text-saas-orange"
                  : "text-white hover:text-saas-orange"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Rutas
            </Link>
            <Link
              to=""
              className={`block px-3 py-2 text-base font-medium ${
                isActive("/pricing")
                  ? "text-saas-orange"
                  : "text-white hover:text-saas-orange"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Tarifas
            </Link>
            <Link
              to=""
              className={`block px-3 py-2 text-base font-medium ${
                isActive("/contact")
                  ? "text-saas-orange"
                  : "text-white hover:text-saas-orange"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
            <div className="mt-4 px-3 py-2">
              <Link
                to="/login"
                className="btn-primary w-full block text-center py-2 rounded-md bg-saas-orange text-white"
                onClick={() => setIsOpen(false)}
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;