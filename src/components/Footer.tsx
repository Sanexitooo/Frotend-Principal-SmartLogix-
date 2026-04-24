import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-saas-black border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Info de la Empresa */}
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-saas-orange to-amber-500 bg-clip-text text-transparent">
                SmartLogix
              </span>
            </a>
            <p className="text-gray-400 mb-4">
              Optimiza tu logística con nuestra solución tecnológica diseñada para empresas modernas de transporte.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" className="text-gray-400 hover:text-saas-orange transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="text-gray-400 hover:text-saas-orange transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-400 hover:text-saas-orange transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links de Producto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Producto</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-saas-orange transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Hoja de Ruta</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Documentación</a></li>
            </ul>
          </div>

          {/* Links de Compañía */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Compañía</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-saas-orange transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Contáctanos</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Sobre nosotros</a></li>
            </ul>
          </div>

          {/* Links Legales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-saas-orange transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-saas-orange transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright y Créditos Duoc */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm mb-2">
            © {new Date().getFullYear()} SmartLogix. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 font-medium">
            Página creada por estudiantes de <span className="text-white">Duoc UC</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;