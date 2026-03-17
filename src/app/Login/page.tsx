"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { AuthLayout } from "../../components/AuthLayout";
import { InputField } from "../../components/InputField";

export function Login() {
  const navigate = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = "Informe seu e-mail";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "E-mail inválido";
    if (!password) e.password = "Informe sua senha";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || "Erro ao fazer login" });
        setLoading(false);
        return;
      }

      // Login bem-sucedido
      setLoading(false);
      navigate.push("/Plataforma");
    } catch (error) {
      console.error("Erro:", error);
      setErrors({ submit: "Erro ao conectar com o servidor" });
      setLoading(false);
    }
  };

  return (
    <AuthLayout mode="login">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <InputField
          id="login-email"
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(v) => { setEmail(v); setErrors((p) => ({ ...p, email: "" })); }}
          error={errors.email}
          icon={Mail}
        />

        <InputField
          id="login-password"
          label="Senha"
          type={showPass ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(v) => { setPassword(v); setErrors((p) => ({ ...p, password: "" })); }}
          error={errors.password}
          icon={Lock}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="transition-opacity hover:opacity-70"
            >
              {showPass
                ? <EyeOff size={16} style={{ color: "#9CA3AF" }} />
                : <Eye size={16} style={{ color: "#9CA3AF" }} />
              }
            </button>
          }
        />

        {/* Erro de login */}
        {errors.submit && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
            <AlertCircle size={16} style={{ color: "#EF4444" }} />
            <span style={{ fontSize: "0.85rem", color: "#DC2626", fontFamily: "'Space Grotesk', sans-serif" }}>
              {errors.submit}
            </span>
          </div>
        )}

        <div className="flex justify-end -mt-2">
          <button
            type="button"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#7C3AED",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Esqueceu a senha?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl transition-all hover:opacity-90 active:scale-95"
          style={{
            background: loading ? "rgba(124,58,237,0.5)" : "linear-gradient(135deg, #7C3AED, #6D28D9)",
            color: "#fff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            boxShadow: loading ? "none" : "0 4px 20px rgba(124,58,237,0.3)",
            cursor: loading ? "not-allowed" : "pointer",
            border: "none",
          }}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              Entrar
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default function Page() {
    return <Login />
}