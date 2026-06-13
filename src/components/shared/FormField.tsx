/*
 * ============================================
 * FormField — Input reutilizable con label
 * ============================================
 *
 * Abstraction over un <input> con label, usando forwardRef para
 * compatibilidad con react-hook-form.
 *
 * Props:
 *   - label: texto opcional del label (arriba del input)
 *   - name: se usa como id si no se pasa id explícito
 *   - className: se fusiona con los estilos base via cn()
 *   - El resto de props (type, placeholder, etc.) se pasan al <input>
 *
 * Patrón:
 *   Este componente y FormTextarea comparten la misma estructura visual
 *   (label + field), cambiando solo el elemento HTML. Ambos usan
 *   forwardRef y cn() por consistencia.
 */

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, label, id, type, ...props }, ref) => {
    const inputId = id || props.name;
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[10px] font-black text-saas-teal uppercase ml-1 tracking-widest"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={cn(
              "w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium",
              isPassword && "pr-12", // Espacio extra a la derecha para que el texto no tape el ícono
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-saas-orange transition-colors"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };
