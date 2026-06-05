import React, { useState, useEffect } from "react";
import { User } from "lucide-react";

const navItems = [
  { name: "Inicio", href: "#" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Tarifas", href: "#tarifas" },
  { name: "Contacto", href: "#contacto" },
];

interface HeaderProps {
  onLoginClick: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-white/70 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-lg shadow-slate-900/5" : "bg-transparent py-5 border-b border-transparent"}`}>
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
              <a key={item.name} href={item.href} className="px-5 py-2 text-sm font-bold text-saas-teal hover:text-saas-orange transition-all duration-300 rounded-xl hover:bg-white">
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={onLoginClick}
              className="group relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-saas-teal text-white font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-saas-teal/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <User size={18} className="relative z-10" />
              <span className="relative z-10">Ingresar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
