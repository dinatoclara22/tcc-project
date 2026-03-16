import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeUp – Aprenda Programação",
  description: "Plataforma interativa de aulas e desafios de programação.",
  keywords: ["programação", "cursos", "desafios", "aprender a programar"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
