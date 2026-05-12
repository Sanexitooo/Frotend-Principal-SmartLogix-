import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const codigosSII = [
  { "codigo": "011101", "nombre": "CULTIVO DE TRIGO" },
  { "codigo": "011102", "nombre": "CULTIVO DE MAÍZ" },
  { "codigo": "011103", "nombre": "CULTIVO DE AVENA" },
  { "codigo": "011104", "nombre": "CULTIVO DE CEBADA" },
  { "codigo": "011105", "nombre": "CULTIVO DE OTROS CEREALES" },
  { "codigo": "011306", "nombre": "CULTIVO DE HORTALIZAS Y MELONES" },
  { "codigo": "016100", "nombre": "ACTIVIDADES DE APOYO A LA AGRICULTURA" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    rut_empresa: "", razon_social: "", nombre_empresa: "",
    email: "", telefono: "", direccion: "",
    codigo_sii: "", password: ""
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Inicio", href: "#" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Tarifas", href: "#tarifas" },
    { name: "Contacto", href: "#contacto" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectCodigo = (item: {codigo: string, nombre: string}) => {
    setFormData({ ...formData, codigo_sii: item.codigo });
    setSearchTerm(`${item.codigo} - ${item.nombre}`);
    setShowDropdown(false);
  };

  const filteredCodigos = codigosSII.filter(item => 
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.codigo.includes(searchTerm)
  ).slice(0, 6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      const validUsers = [
        { email: "Alonzo@corp.cl", pass: "Alon1212" },
        { email: "Tomi@corp.cl", pass: "Tomi1212" },
        { email: "Fabian@corp.cl", pass: "Fabi1212" }
      ];

      const user = validUsers.find(u => u.email === formData.email && u.pass === formData.password);

      if (user) {
        window.location.href = "http://localhost:5173";
      } else {
        alert("Credenciales incorrectas");
      }
    } else {
      console.log("Datos de Registro:", formData);
      alert("Solicitud enviada para: " + formData.nombre_empresa);
      setIsLoginMode(true);
    }
  };

  return (
    <>
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
                onClick={() => { setIsLoginMode(true); setIsModalOpen(true); }} 
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

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-saas-teal/60 backdrop-blur-md" />
            
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className={`bg-white w-full ${isLoginMode ? 'max-w-md' : 'max-w-2xl'} rounded-[2.5rem] p-10 relative shadow-2xl border border-white/20 overflow-visible max-h-[90vh]`}
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-saas-orange transition-colors z-50">
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-saas-teal tracking-tighter">
                  {isLoginMode ? "¡Bienvenido!" : "Registro de Empresa"}
                </h2>
                <p className="text-slate-500 font-medium mt-2">
                  {isLoginMode ? "Accede a tu plataforma logística" : "Completa los datos para tu cuenta corporativa"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isLoginMode ? (
                  <>
                    <input name="email" type="email" placeholder="Email corporativo" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium" onChange={handleInputChange} required />
                    <input name="password" type="password" placeholder="Contraseña" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium" onChange={handleInputChange} required />
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="rut_empresa" placeholder="RUT Empresa" className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium" onChange={handleInputChange} required />
                    <input name="razon_social" placeholder="Razón Social" className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium" onChange={handleInputChange} required />
                    <input name="nombre_empresa" placeholder="Nombre " className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium" onChange={handleInputChange} required />
                    <input name="email" type="email" placeholder="Email de contacto" className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium" onChange={handleInputChange} required />
                    <input name="telefono" placeholder="Teléfono" className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium" onChange={handleInputChange} required />
                    <input name="direccion" placeholder="Dirección" className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium" onChange={handleInputChange} required />
                    
                    <div className="relative" ref={dropdownRef}>
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="Buscar Código SII..." 
                          className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 pr-10 text-sm text-slate-900 placeholder:text-slate-400 font-medium"
                          value={searchTerm}
                          onChange={(e) => { setSearchTerm(e.target.value); setShowDropdown(true); }}
                          onFocus={() => setShowDropdown(true)}
                        />
                        <Search className="absolute right-4 top-4 text-slate-900" size={18} />
                      </div>
                      <AnimatePresence>
                        {showDropdown && searchTerm.length > 0 && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-[210] w-full mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden text-black">
                            <div className="max-h-48 overflow-y-auto">
                              {filteredCodigos.length > 0 ? filteredCodigos.map((item) => (
                                <button key={item.codigo} type="button" className="w-full text-left p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none" onClick={() => handleSelectCodigo(item)}>
                                  <span className="font-bold text-saas-orange text-xs">{item.codigo}</span>
                                  <p className="text-[10px] text-saas-teal font-medium truncate uppercase">{item.nombre}</p>
                                </button>
                              )) : <div className="p-4 text-xs text-slate-400 text-center text-slate-900">Sin resultados</div>}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <input name="password" type="password" placeholder="Contraseña acceso" className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium" onChange={handleInputChange} required />
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="group relative w-full bg-saas-teal text-white py-4 rounded-2xl font-black overflow-hidden transition-all shadow-xl shadow-saas-teal/20 mt-4 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10">
                    {isLoginMode ? "Entrar al Dashboard" : "Registrar Empresa"}
                  </span>
                </button>
              </form>

              <p className="mt-8 text-center text-slate-500 text-sm font-bold uppercase tracking-widest">
                {isLoginMode ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
                <button onClick={() => setIsLoginMode(!isLoginMode)} className="ml-2 text-saas-orange hover:underline font-bold">
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