# CodeUp - Plataforma de Aprendizado de Python

Uma plataforma interativa para aprender e praticar Python através de aulas estruturadas e desafios de programação. Desenvolvido com Next.js 16, React 19, TypeScript e integração com Supabase.

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- **Cadastro de usuários** com validação de email e força de senha
- **Login seguro** com autenticação Supabase
- **Proteção de rotas** - apenas usuários autenticados acessam a plataforma
- Armazenamento seguro de credenciais no Supabase Auth

### ✅ Interface de Usuário
- Design moderno e responsivo com Tailwind CSS
- Componentes reutilizáveis (AuthLayout, InputField, etc)
- Dark mode ready com tema em tons de roxo
- Animações suaves e transições

### ✅ Plataforma Principal
- **Abas de Navegação**: Aulas e Desafios
- **Seção de Aulas**: Conteúdo estruturado de Python com diferentes níveis (Básico, Intermediário, Avançado)
- **Seção de Desafios**: Exercícios práticos com executor de código integrado
- **Perfil de Usuário**: Dashboard com progresso, histórico de aulas e desafios completados

### ✅ Execução de Código
- Execução de Python no navegador usando Pyodide
- Runner de código seguro para desafios
- Suporte a stdout e stderr em tempo real

### ✅ Gerenciamento de Dados
- Estrutura de aulas (lessons.ts)
- Catálogo de desafios (challenges.ts)
- Dados de progresso do usuário (progress.ts)

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16
- **React**: 19.2.3
- **Linguagem**: TypeScript
- **Styles**: Tailwind CSS 4
- **UI Icons**: Lucide React
- **Backend**: Supabase (Auth + Database)
- **Python Runtime**: Pyodide
- **Package Manager**: pnpm

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (ou npm/yarn)
- Conta Supabase (gratuita em [supabase.com](https://supabase.com))

## 🚀 Como Começar

### 1. Clone e instale dependências

```bash
git clone <seu-repositorio>
cd tcc_project
pnpm install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e configure seus valores:

```bash
cp .env.example .env.local
```

Edite `.env.local` e adicione suas credenciais Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

**Onde encontrar:**
1. Acesse [app.supabase.com](https://app.supabase.com)
2. Abra seu projeto → Settings → API
3. Copie Project URL e anon public key

### 3. Configure o banco de dados (Supabase)

Execute os comandos SQL no Supabase SQL Editor:

```sql
-- Tabela de usuários (opcional, complementa auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Ativar Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política para usuários acessarem seus próprios dados
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  USING (auth.uid() = id);
```

### 4. Execute o servidor de desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/auth/
│   │   ├── login/route.ts          # Rota de autenticação de login
│   │   └── signup/route.ts         # Rota de cadastro de usuários
│   ├── Cadastro/page.tsx           # Página de registro
│   ├── Login/page.tsx              # Página de login
│   ├── Plataforma/page.tsx         # Dashboard principal
│   ├── Profile/page.tsx            # Perfil do usuário
│   └── globals.css                 # Estilos globais
├── components/
│   ├── AuthLayout.tsx              # Layout para páginas de auth
│   ├── InputField.tsx              # Componente de input reutilizável
│   ├── LessonsTab.tsx              # Abas de aulas
│   ├── ChallengesTab.tsx           # Abas de desafios
│   └── LandingPage.tsx             # Página inicial
├── data/
│   ├── lessons.ts                  # Conteúdo das aulas
│   ├── challenges.ts               # Desafios de programação
│   └── progress.ts                 # Dados de progresso
├── lib/
│   └── pyodide-runner.ts           # Executor de código Python
├── models/
│   └── supabase.ts                 # Clientes Supabase
└── public/
    └── pyodide-worker.js           # Worker para Pyodide
```

## 🔐 Fluxos de Autenticação

### Cadastro
1. Usuário preenche formulário (nome, email, senha)
2. Validações no cliente (email válido, senha forte, etc)
3. POST para `/api/auth/signup`
4. Supabase registra usuário em `auth.users`
5. Dados adicionais (opcional) salvos em `users` table
6. Redireciona para `/Plataforma`

### Login
1. Usuário entra com email e senha
2. Validações no cliente
3. POST para `/api/auth/login`
4. Supabase valida credenciais
5. Se inválidas, mostra erro
6. Se válidas, redireciona para `/Plataforma`

## 🌐 Deploy (Vercel)

### 1. Push para GitHub

```bash
git add .
git commit -m "Configuração final do projeto"
git push origin main
```

### 2. Configure no Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique em "Add New..." → "Project"
3. Selecione seu repositório GitHub
4. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Clique "Deploy"

### 3. Ative CORS no Supabase (se necessário)

Se receber erros de CORS, configure em Supabase:
- Settings → API → CORS Allowed Origins
- Adicione seu domínio Vercel

## 📝 Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Cria build de produção
pnpm start        # Inicia servidor de produção
```

## 🎨 Customização

### Alterar cores do tema
Edite as cores em:
- `src/components/AuthLayout.tsx`
- `src/components/InputField.tsx`
- Componentes de página

Busque por `#7C3AED` (roxo principal) para customizar.

### Adicionar novas aulas
1. Abra `src/data/lessons.ts`
2. Adicione um novo objeto à array `lessons`
3. Inclua: id, title, category, content, difficulty, duration

### Adicionar novos desafios
1. Abra `src/data/challenges.ts`
2. Adicione um novo objeto à array `challenges`
3. Inclua: id, title, description, difficulty, starter code, solution

## 🐛 Troubleshooting

### Erro 404 em uma página
- Verifique se `page.tsx` tem `export default`
- Confirme a rota está na pasta correta em `src/app/`

### Erro de variáveis de ambiente
- Confirme `.env.local` existe com valores corretos
- Reinicie o servidor: `pnpm dev`
- Em produção, configure no painel do host (Vercel, etc)

### Login/Cadastro não funciona
- Verifique credenciais Supabase em `.env.local`
- Confirme projeto Supabase está ativo
- Verifique console do navegador (DevTools) para erros
- Verifique que as rotas API existem em `src/app/api/auth/`

### Pyodide não carrega
- Confirme `pyodide-worker.js` existe em `public/`
- Verifique console de erros
- Tente hard refresh (Ctrl+Shift+R)

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Pyodide Documentation](https://pyodide.org)
- [React 19 Features](https://react.dev)

## 📄 Licença

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC).

## 👤 Autor

Clara Dinato

---

**Status**: ✅ Em desenvolvimento com funcionalidades core implementadas
**Última atualização**: 17 de março de 2026
