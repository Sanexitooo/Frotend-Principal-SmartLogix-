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
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLoginMode) {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
      const dashboardUrl =
        import.meta.env.VITE_DASHBOARD_URL || "http://localhost:5173";

      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user_info", JSON.stringify(data.usuario || {}));
          window.location.href = dashboardUrl;
        } else {
          setError(data.error || data.detail || "Error al iniciar sesión");
        }
      } catch {
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    } else {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/usuarios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok && data.id) {
          setError("");
          setSuccessMsg("Registro exitoso. Ya puedes iniciar sesión.");
          setTimeout(() => setSuccessMsg(""), 4000);
          setFormData(initialFormData);
          setIsLoginMode(true);
        } else {
          setError(data.error || data.detail || "Error al registrar");
        }
      } catch {
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
    setError("");
  };

  return {
    isLoginMode,
    formData,
    error,
    successMsg,
    loading,
    handleInputChange,
    handleSubmit,
    toggleMode,
  };
}
