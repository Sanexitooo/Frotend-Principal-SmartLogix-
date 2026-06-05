import React from "react";

const Footer = () => {
  return (
    <footer className="bg-saas-black border-t border-gray-800 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Sede Info */}
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-saas-orange to-amber-500 bg-clip-text text-transparent">
                SmartLogix
              </span>
            </a>
            <p className="text-gray-400 mb-6 text-sm">
              Optimiza tu logística con nuestra solución tecnológica diseñada para empresas modernas de transporte.
            </p>
            
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
              <p className="text-saas-orange font-bold text-xs uppercase tracking-widest mb-1">Ubicación</p>
              <p className="text-gray-200 text-sm">Antonio Varas 666, Providencia</p>
              <p className="text-gray-500 text-xs mt-1 italic">Sede Antonio Varas - Duoc UC</p>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-saas-orange transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-saas-orange transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>

          {/* Navigation Items */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Producto</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-saas-orange transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-saas-orange transition-colors">Acerca de Nosotros</a></li>
              <li><a href="#tarifas" className="hover:text-saas-orange transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Documentación</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Compañía</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-saas-orange transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Contáctanos</a></li>
              <li><a href="#nosotros" className="hover:text-saas-orange transition-colors">Sobre nosotros</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-saas-orange transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm mb-2">
            © {new Date().getFullYear()} SmartLogix.
          </p>
          <p className="text-gray-400 font-medium text-sm">
            Proyecto desarrollado por estudiantes de <span className="text-white font-bold">Duoc UC - Sede Antonio Varas</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;