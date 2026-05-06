import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => location.pathname === path;

  // Lista de navegación actualizada
  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Acerca de Nosotros", path: "/nosotros" }, // Cambio: de Rutas a Acerca de Nosotros
    { name: "Tarifas", path: "/tarifas" },
    { name: "Contacto", path: "/contacto" }
  ];

  return (
    <>
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-white/80 backdrop-blur-md border-slate-100 shadow-sm" 
            : "bg-white border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-black tracking-tighter text-saas-teal">
                  Smart<span className="text-saas-orange">Logix</span>
                </span>
              </Link>
            </div>

            {/* Desktop menu - Actualizado */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-bold transition-all hover:text-saas-orange ${
                      isActive(item.path) ? "text-saas-orange underline decoration-2 underline-offset-4" : "text-saas-teal"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <button
                onClick={() => {
                  setIsLoginMode(true);
                  setIsModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-saas-orange text-white font-bold hover:bg-[#e67700] transition-all shadow-lg shadow-saas-orange/20"
              >
                Iniciar Sesión
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="p-2 text-saas-teal">
                {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - Actualizado */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 animate-fade-in">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-4 text-base font-bold text-saas-teal border-b border-slate-50 hover:bg-slate-50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsLoginMode(true);
                  setIsModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full mt-6 py-4 rounded-xl bg-saas-orange text-white font-bold"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modal - Se mantiene igual */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-saas-teal/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 relative shadow-2xl animate-fade-in border border-slate-100">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-saas-teal transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-3xl font-black mb-2 text-center text-saas-teal">
              {isLoginMode ? "¡Hola de nuevo!" : "Únete a SmartLogix"}
            </h2>
            <p className="text-slate-500 text-center mb-8 font-medium">
              {isLoginMode ? "Elige cómo quieres ingresar" : "Regístrate para gestionar tu logística"}
            </p>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 p-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuar con Google
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
                <span className="bg-white px-4 text-slate-400">O vía email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {!isLoginMode && (
                <input 
                  type="text" 
                  placeholder="Nombre completo" 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-saas-teal focus:ring-2 focus:ring-saas-orange focus:border-transparent outline-none transition-all"
                />
              )}
              <input 
                type="email" 
                placeholder="Email corporativo" 
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-saas-teal focus:ring-2 focus:ring-saas-orange focus:border-transparent outline-none transition-all"
              />
              <input 
                type="password" 
                placeholder="Contraseña" 
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-saas-teal focus:ring-2 focus:ring-saas-orange focus:border-transparent outline-none transition-all"
              />
              
              <button className="w-full bg-saas-teal text-white p-4 rounded-xl font-black hover:bg-slate-800 transition-all shadow-lg shadow-saas-teal/10 mt-2">
                {isLoginMode ? "Entrar al Dashboard" : "Crear cuenta gratis"}
              </button>
            </form>

            <p className="mt-8 text-center text-slate-500 text-sm font-medium">
              {isLoginMode ? "¿Eres nuevo?" : "¿Ya tienes cuenta?"}
              <button 
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="ml-2 text-saas-orange font-black hover:underline"
              >
                {isLoginMode ? "Regístrate ahora" : "Inicia sesión"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;