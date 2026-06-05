import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FormField } from "@/components/shared/FormField";
import SiiSearch from "@/components/shared/SiiSearch";
import { useAuthForm } from "./useAuthForm";
import type { SiiCode } from "@/types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const {
    isLoginMode,
    formData,
    handleInputChange,
    handleSubmit,
    toggleMode,
  } = useAuthForm();

  const handleSelectCodigo = (item: SiiCode) => {
    handleInputChange({
      target: { name: "codigo_sii", value: item.codigo },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-saas-teal/60 backdrop-blur-md"
          />
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`bg-white w-full ${isLoginMode ? 'max-w-md' : 'max-w-2xl'} rounded-[2.5rem] p-10 relative shadow-2xl border border-white/20 overflow-visible max-h-[90vh]`}
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-saas-orange transition-colors z-50"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-saas-teal tracking-tighter">
                {isLoginMode ? "¡Bienvenido!" : "Registro de Empresa"}
              </h2>
              <p className="text-slate-500 font-medium mt-2">
                {isLoginMode
                  ? "Accede a tu plataforma logística"
                  : "Completa los datos para tu cuenta corporativa"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isLoginMode ? (
                <>
                  <FormField name="email" type="email" placeholder="Email corporativo" onChange={handleInputChange} required />
                  <FormField name="password" type="password" placeholder="Contraseña" onChange={handleInputChange} required />
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField name="rut_empresa" placeholder="RUT Empresa" onChange={handleInputChange} required />
                  <FormField name="razon_social" placeholder="Razón Social" onChange={handleInputChange} required />
                  <FormField name="nombre_empresa" placeholder="Nombre" onChange={handleInputChange} required />
                  <FormField name="email" type="email" placeholder="Email de contacto" onChange={handleInputChange} required />
                  <FormField name="telefono" placeholder="Teléfono" onChange={handleInputChange} required />
                  <FormField name="direccion" placeholder="Dirección" onChange={handleInputChange} required />
                  <SiiSearch value={formData.codigo_sii} onSelect={handleSelectCodigo} />
                  <FormField name="password" type="password" placeholder="Contraseña acceso" onChange={handleInputChange} required />
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
              <button
                onClick={toggleMode}
                className="ml-2 text-saas-orange hover:underline font-bold"
              >
                {isLoginMode ? "Regístrate" : "Inicia sesión"}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
