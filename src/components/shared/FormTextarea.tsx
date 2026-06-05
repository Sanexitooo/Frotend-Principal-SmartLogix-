import React from "react";
import { cn } from "@/lib/utils";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const textareaId = id || props.name;
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[10px] font-black text-saas-teal uppercase ml-1 tracking-widest"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saas-orange/40 focus:border-saas-orange transition-all text-sm font-bold text-saas-teal placeholder:text-slate-400 resize-none",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";

export { FormTextarea };
