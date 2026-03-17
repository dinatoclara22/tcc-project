"use client";

import { AlertCircle } from "lucide-react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  icon: React.ElementType;
  rightSlot?: React.ReactNode;
}

export function InputField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  rightSlot,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "0.82rem",
          color: "#374151",
        }}
      >
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon size={16} style={{ color: error ? "#EF4444" : "#A78BFA" }} />
        </div>

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          className="w-full outline-none transition-all duration-200"
          style={{
            paddingLeft: "2.5rem",
            paddingRight: rightSlot ? "3rem" : "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            borderRadius: "14px",
            border: `1.5px solid ${error ? "#FECACA" : "rgba(124,58,237,0.15)"}`,
            background: error ? "#FFF5F5" : "#FAFAFA",
            fontSize: "0.9rem",
            color: "#111827",
            fontFamily: "'Inter', sans-serif",
            boxShadow: error ? "0 0 0 3px rgba(239,68,68,0.08)" : "none",
          }}
          onFocus={(e) => {
            if (!error) {
              e.currentTarget.style.border = "1.5px solid #7C3AED";
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.currentTarget.style.border = "1.5px solid rgba(124,58,237,0.15)";
              e.currentTarget.style.background = "#FAFAFA";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        />

        {rightSlot && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5">
          <AlertCircle size={12} style={{ color: "#EF4444", flexShrink: 0 }} />
          <span
            style={{
              fontSize: "0.72rem",
              color: "#EF4444",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
