import { useState } from "react";

export interface AuthFormData {
  rut_empresa: string;
  razon_social: string;
  nombre_empresa: string;
  email: string;
  telefono: string;
  direccion: string;
  codigo_sii: string;
  password: string;
}

const initialFormData: AuthFormData = {
  rut_empresa: "", razon_social: "", nombre_empresa: "",
  email: "", telefono: "", direccion: "",
  codigo_sii: "", password: "",
};

export function useAuthForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState<AuthFormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      const dashboardUrl =
        import.meta.env.VITE_DASHBOARD_URL || "http://localhost:5173";
      window.location.href = dashboardUrl;
    } else {
      console.log("Datos de Registro:", formData);
      alert("Solicitud enviada para: " + formData.nombre_empresa);
      setIsLoginMode(true);
    }
  };

  const toggleMode = () => setIsLoginMode((prev) => !prev);

  return {
    isLoginMode,
    formData,
    handleInputChange,
    handleSubmit,
    toggleMode,
  };
}
