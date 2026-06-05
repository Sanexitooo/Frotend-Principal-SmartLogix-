import React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || props.name;
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
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 text-slate-900 placeholder:text-slate-400 font-medium",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };
