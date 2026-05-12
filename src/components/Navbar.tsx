import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenLogin: () => void;
}

const Navbar = ({ onOpenLogin }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Inicio", href: "#" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Tarifas", href: "#tarifas" },
    { name: "Contacto", href: "#contacto" }
  ];

  const handleModalOpen = () => {
    setIsLoginMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      const validUsers = [
        { email: "Alonzo@corp.cl", pass: "Alon1212" },
        { email: "Tomi@corp.cl", pass: "Tomi1212" },
        { email: "Fabian@corp.cl", pass: "Fabi1212" }
      ];

      const user = validUsers.find(u => u.email === email && u.pass === password);

      if (user) {
        window.location.href = "http://localhost:5174";
      } else {
        alert("Credenciales incorrectas");
      }
    } else {
      console.log("Registrando:", { fullName, email, password });
      setIsLoginMode(true);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled 
            ? "bg-white/70 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-lg shadow-slate-900/5" 
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            <div className="flex-shrink-0">
              <a href="#" className="group flex items-center gap-2">
                <div className="w-10 h-10 bg-saas-teal rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-saas-teal/20">
                  <span className="text-white font-black text-xl">S</span>
                </div>
                <span className="text-2xl font-black tracking-tighter text-saas-teal">
                  Smart<span className="text-saas-orange">Logix</span>
                </span>
              </a>
            </div>

            <div className="hidden md:flex items-center bg-slate-100/50 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-white/50">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-5 py-2 text-sm font-bold text-saas-teal hover:text-saas-orange transition-all duration-300 rounded-xl hover:bg-white"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <button
                onClick={handleModalOpen}
                className="group relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-saas-teal text-white font-bold overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <User size={18} />
                <span>Ingresar</span>
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`p-2 rounded-xl transition-colors ${scrolled ? "bg-saas-teal/5 text-saas-teal" : "text-saas-teal"}`}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100"
            >
              <div className="px-6 py-8 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-xl font-black text-saas-teal hover:text-saas-orange transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <button
                  onClick={() => {
                    handleModalOpen();
                    setIsOpen(false);
                  }}
                  className="w-full py-4 rounded-2xl bg-saas-orange text-white font-bold shadow-xl shadow-saas-orange/20 flex items-center justify-center gap-2"
                >
                  Iniciar Sesión <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-saas-teal/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl border border-white/20"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-saas-orange transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-saas-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-saas-orange">
                  <User size={32} />
                </div>
                <h2 className="text-3xl font-black text-saas-teal tracking-tighter">
                  {isLoginMode ? "¡Bienvenido!" : "Crea tu cuenta"}
                </h2>
                <p className="text-slate-500 font-medium mt-2">Accede a tu plataforma logística</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLoginMode && (
                  <input 
                    type="text" 
                    placeholder="Nombre completo" 
                    className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-saas-orange/20 outline-none transition-all text-slate-900" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                )}
                <input 
                  type="email" 
                  placeholder="Email corporativo" 
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-saas-orange/20 outline-none transition-all text-slate-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-saas-orange/20 outline-none transition-all text-slate-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                
                <button type="submit" className="w-full bg-saas-teal text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-saas-teal/20 mt-4 group">
                  {isLoginMode ? "Entrar al Dashboard" : "Empezar ahora"}
                </button>
              </form>

              <p className="mt-10 text-center text-slate-500 text-sm font-bold uppercase tracking-widest">
                {isLoginMode ? "¿No tienes cuenta?" : "¿Ya eres cliente?"}
                <button 
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="ml-2 text-saas-orange hover:underline underline-offset-4"
                >
                  {isLoginMode ? "Regístrate" : "Inicia sesión"}
                </button>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;