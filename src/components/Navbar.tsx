import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const codigosSII = [
  { codigo: "011101", nombre: "CULTIVO DE TRIGO" },
  { codigo: "011102", nombre: "CULTIVO DE MAÍZ" },
  { codigo: "011103", nombre: "CULTIVO DE AVENA" },
  { codigo: "011104", nombre: "CULTIVO DE CEBADA" },
  { codigo: "011105", nombre: "CULTIVO DE OTROS CEREALES (EXCEPTO TRIGO, MAÍZ, AVENA Y CEBADA)" },
  { codigo: "011106", nombre: "CULTIVO DE POROTOS" },
  { codigo: "011107", nombre: "CULTIVO DE LUPINO" },
  { codigo: "011108", nombre: "CULTIVO DE OTRAS LEGUMBRES (EXCEPTO POROTOS Y LUPINO)" },
  { codigo: "011109", nombre: "CULTIVO DE SEMILLAS DE RAPS" },
  { codigo: "011110", nombre: "CULTIVO DE SEMILLAS DE MARAVILLA (GIRASOL)" },
  { codigo: "011111", nombre: "CULTIVO DE SEMILLAS DE CEREALES, LEGUMBRES Y OLEAGINOSAS (EXCEPTO SEMILLAS DE RAPS Y MARAVILLA)" },
  { codigo: "011200", nombre: "CULTIVO DE ARROZ" },
  { codigo: "011301", nombre: "CULTIVO DE PAPAS" },
  { codigo: "011302", nombre: "CULTIVO DE CAMOTES" },
  { codigo: "011303", nombre: "CULTIVO DE OTROS TUBÉRCULOS (EXCEPTO PAPAS Y CAMOTES)" },
  { codigo: "011304", nombre: "CULTIVO DE REMOLACHA AZUCARERA" },
  { codigo: "011305", nombre: "CULTIVO DE SEMILLAS DE HORTALIZAS" },
  { codigo: "011306", nombre: "CULTIVO DE HORTALIZAS Y MELONES" },
  { codigo: "011400", nombre: "CULTIVO DE CAÑA DE AZÚCAR" },
  { codigo: "011500", nombre: "CULTIVO DE TABACO" },
  { codigo: "011600", nombre: "CULTIVO DE PLANTAS DE FIBRA" },
  { codigo: "011901", nombre: "CULTIVO DE FLORES" },
  { codigo: "011902", nombre: "CULTIVOS FORRAJEROS EN PRADERAS MEJORADAS O SEMBRADAS; CULTIVOS SUPLEMENTARIOS FORRAJEROS" },
  { codigo: "011903", nombre: "CULTIVOS DE SEMILLAS DE FLORES; CULTIVO DE SEMILLAS DE PLANTAS FORRAJERAS" },
  { codigo: "012111", nombre: "CULTIVO DE UVA DESTINADA A LA PRODUCCIÓN DE PISCO Y AGUARDIENTE" },
  { codigo: "012112", nombre: "CULTIVO DE UVA DESTINADA A LA PRODUCCIÓN DE VINO" },
  { codigo: "012120", nombre: "CULTIVO DE UVA PARA MESA" },
  { codigo: "012200", nombre: "CULTIVO DE FRUTAS TROPICALES Y SUBTROPICALES (INCLUYE EL CULTIVO DE PALTAS)" },
  { codigo: "012300", nombre: "CULTIVO DE CÍTRICOS" },
  { codigo: "012400", nombre: "CULTIVO DE FRUTAS DE PEPITA Y DE HUESO" },
  { codigo: "012501", nombre: "CULTIVO DE SEMILLAS DE FRUTAS" },
  { codigo: "012502", nombre: "CULTIVO DE OTROS FRUTOS Y NUECES DE ÁRBOLES Y ARBUSTOS" },
  { codigo: "012600", nombre: "CULTIVO DE FRUTOS OLEAGINOSOS (INCLUYE EL CULTIVO DE ACEITUNAS)" },
  { codigo: "012700", nombre: "CULTIVO DE PLANTAS CON LAS QUE SE PREPARAN BEBIDAS (INCLUYE EL CULTIVO DE CAFÉ, TÉ Y MATE)" },
  { codigo: "012801", nombre: "CULTIVO DE ESPECIAS" },
  { codigo: "012802", nombre: "CULTIVO DE PLANTAS AROMÁTICAS, MEDICINALES Y FARMACÉUTICAS" },
  { codigo: "012900", nombre: "CULTIVO DE OTRAS PLANTAS PERENNES" },
  { codigo: "013000", nombre: "CULTIVO DE PLANTAS VIVAS INCLUIDA LA PRODUCCIÓN EN VIVEROS (EXCEPTO VIVEROS FORESTALES)" },
  { codigo: "014101", nombre: "CRÍA DE GANADO BOVINO PARA LA PRODUCCIÓN LECHERA" },
  { codigo: "014102", nombre: "CRÍA DE GANADO BOVINO PARA LA PRODUCCIÓN DE CARNE O COMO GANADO REPRODUCTOR" },
  { codigo: "014200", nombre: "CRÍA DE CABALLOS Y OTROS EQUINOS" },
  { codigo: "014300", nombre: "CRÍA DE LLAMAS, ALPACAS, VICUÑAS, GUANACOS Y OTROS CAMÉLIDOS" },
  { codigo: "014410", nombre: "CRÍA DE OVEJAS (OVINOS)" },
  { codigo: "014420", nombre: "CRÍA DE CABRAS (CAPRINOS)" },
  { codigo: "014500", nombre: "CRÍA DE CERDOS" },
  { codigo: "014601", nombre: "CRÍA DE AVES DE CORRAL PARA LA PRODUCCIÓN DE CARNE" },
  { codigo: "014602", nombre: "CRÍA DE AVES DE CORRAL PARA LA PRODUCCIÓN DE HUEVOS" },
  { codigo: "014901", nombre: "APICULTURA" },
  { codigo: "014909", nombre: "CRÍA DE OTROS ANIMALES N.C.P." },
  { codigo: "015000", nombre: "CULTIVO DE PRODUCTOS AGRÍCOLAS EN COMBINACIÓN CON LA CRÍA DE ANIMALES (EXPLOTACIÓN MIXTA)" },
  { codigo: "016100", nombre: "ACTIVIDADES DE APOYO A LA AGRICULTURA" },
  { codigo: "016200", nombre: "ACTIVIDADES DE APOYO A LA GANADERÍA" },
  { codigo: "016300", nombre: "ACTIVIDADES POSCOSECHA" },
  { codigo: "016400", nombre: "TRATAMIENTO DE SEMILLAS PARA PROPAGACIÓN" },
  { codigo: "017000", nombre: "CAZA ORDINARIA Y MEDIANTE TRAMPAS Y ACTIVIDADES DE SERVICIOS CONEXAS" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    setErrorMessage(null); // Limpiamos el error al escribir
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Obtenemos la URL del BFF desde el .env de Vite
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      if (isLoginMode) {
        // -----------------------------------------
        // 1. LÓGICA DE LOGIN (Conectando a ms-login)
        // -----------------------------------------
        const response = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          // Si el BFF devuelve error (ej. 401 Credenciales incorrectas)
          throw new Error(data.error || "Error al iniciar sesión");
        }

        // ¡Éxito! Guardamos el tesoro (JWT) y los datos del usuario en el navegador
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_info', JSON.stringify(data.usuario));

        // Redirigimos al Dashboard Privado
        // (Nota: Tu compañero puso 5173, pero si tu Dashboard React corre en el 3000, 
        // cambia este número a http://localhost:3000)
        window.location.href = "http://localhost:3000"; 

      } else {
        // -----------------------------------------
        // 2. LÓGICA DE REGISTRO (Conectando a ms-usuario)
        // -----------------------------------------
        const response = await fetch(`${apiUrl}/usuarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData) // Mandamos todo el formulario
        });

        const data = await response.json();

        if (!response.ok) {
          // Si el BFF devuelve error (ej. RUT inválido o correo existente)
          throw new Error(data.error || "Error al registrar la empresa");
        }

        alert("¡Empresa registrada con éxito! Ya puedes iniciar sesión.");
        
        // Limpiamos la contraseña por seguridad y pasamos al modo Login
        setFormData({ ...formData, password: "" });
        setIsLoginMode(true);
      }
    } catch (error: any) {
      // Atrapamos cualquier error y se lo mostramos al usuario
      setErrorMessage(error.message);
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
                {/* Renderizado condicional: Solo aparece si hay un error */}
                {errorMessage && (
                  <div className="text-red-500 text-sm font-semibold mt-2 mb-3 text-center bg-red-100 p-2 rounded">
                    ⚠️ {errorMessage}
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