"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { AuthLayout } from "../../components/AuthLayout";
import { InputField } from "../../components/InputField";

export function Cadastro() {
  const navigate = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Informe seu nome";
    if (!email) e.email = "Informe seu e-mail";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "E-mail inválido";
    if (!password) e.password = "Crie uma senha";
    else if (password.length < 8) e.password = "Mínimo de 8 caracteres";
    if (!confirm) e.confirm = "Confirme sua senha";
    else if (confirm !== password) e.confirm = "As senhas não coincidem";
    if (!agreed) e.agreed = "Você precisa aceitar os termos";
    return e;
  };

  const strengthScore = (() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["", "Fraca", "Média", "Boa", "Forte"][strengthScore];
  const strengthColor = ["", "#EF4444", "#F59E0B", "#3B82F6", "#10B981"][strengthScore];

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || "Erro ao criar conta" });
        setLoading(false);
        return;
      }

      // Cadastro bem-sucedido
      setLoading(false);
      navigate.push("/Plataforma");
    } catch (error) {
      console.error("Erro:", error);
      setErrors({ submit: "Erro ao conectar com o servidor" });
      setLoading(false);
    }
  };

  return (
    <AuthLayout mode="signup">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          id="signup-name"
          label="Nome completo"
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(v) => { setName(v); setErrors((p) => ({ ...p, name: "" })); }}
          error={errors.name}
          icon={User}
        />

        <InputField
          id="signup-email"
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(v) => { setEmail(v); setErrors((p) => ({ ...p, email: "" })); }}
          error={errors.email}
          icon={Mail}
        />

        {/* Password + strength bar */}
        <div className="flex flex-col gap-1.5">
          <InputField
            id="signup-password"
            label="Senha"
            type={showPass ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
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
          {password.length > 0 && (
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{ background: i <= strengthScore ? strengthColor : "#E5E7EB" }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: strengthColor, fontFamily: "'Space Grotesk', sans-serif", minWidth: "36px" }}>
                {strengthLabel}
              </span>
            </div>
          )}
        </div>

        <InputField
          id="signup-confirm"
          label="Confirmar senha"
          type={showConfirm ? "text" : "password"}
          placeholder="Repita a senha"
          value={confirm}
          onChange={(v) => { setConfirm(v); setErrors((p) => ({ ...p, confirm: "" })); }}
          error={errors.confirm}
          icon={Lock}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="transition-opacity hover:opacity-70"
            >
              {showConfirm
                ? <EyeOff size={16} style={{ color: "#9CA3AF" }} />
                : <Eye size={16} style={{ color: "#9CA3AF" }} />
              }
            </button>
          }
        />

        {/* Erro de envio */}
        {errors.submit && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
            <AlertCircle size={16} style={{ color: "#EF4444" }} />
            <span style={{ fontSize: "0.85rem", color: "#DC2626", fontFamily: "'Space Grotesk', sans-serif" }}>
              {errors.submit}
            </span>
          </div>
        )}

        {/* Terms */}
        <div className="flex flex-col gap-1">
          <label className="flex items-start gap-3 cursor-pointer">
            <div
              onClick={() => { setAgreed((a) => !a); setErrors((p) => ({ ...p, agreed: "" })); }}
              className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-all mt-0.5 cursor-pointer"
              style={{
                background: agreed ? "#7C3AED" : "#fff",
                border: `2px solid ${agreed ? "#7C3AED" : errors.agreed ? "#EF4444" : "rgba(124,58,237,0.3)"}`,
                boxShadow: agreed ? "0 2px 8px rgba(124,58,237,0.3)" : "none",
              }}
            >
              {agreed && <CheckCircle size={12} color="#fff" strokeWidth={3} />}
            </div>
            <span style={{ fontSize: "0.8rem", color: "#6B7280", lineHeight: 1.5 }}>
              Li e concordo com os{" "}
              <span style={{ color: "#7C3AED", fontWeight: 600, cursor: "pointer" }}>Termos de Uso</span>
              {" "}e a{" "}
              <span style={{ color: "#7C3AED", fontWeight: 600, cursor: "pointer" }}>Política de Privacidade</span>
            </span>
          </label>
          {errors.agreed && (
            <div className="flex items-center gap-1.5 ml-8">
              <AlertCircle size={12} style={{ color: "#EF4444" }} />
              <span style={{ fontSize: "0.72rem", color: "#EF4444", fontFamily: "'Space Grotesk', sans-serif" }}>
                {errors.agreed}
              </span>
            </div>
          )}
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
            marginTop: "4px",
          }}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Criando conta...
            </>
          ) : (
            <>
              Criar conta
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default function Page() {
    return <Cadastro />
}

