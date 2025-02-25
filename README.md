# MyMoney - Dashboard Financeiro Pessoal

## 📌 Sobre o Projeto
O **MyMoney** é um dashboard financeiro pessoal desenvolvido para ajudar usuários a monitorar suas finanças de forma simples e eficiente. O projeto segue um estilo **moderno e minimalista**, inspirado em plataformas como **Investidor10**.

## 🚀 Tecnologias Utilizadas
### **Front-end:**
- **Next.js** - Framework React para SSR e SSG
- **Tailwind CSS v4** - Estilização rápida e otimizada

### **Back-end:**
- **Next.js API Routes** - Para criação de endpoints internos
- **Prisma** - ORM para interagir com o banco de dados

### **Banco de Dados:**
- **Supabase** - Banco de dados PostgreSQL hospedado na nuvem

## ⚡ Por que usar Next.js API Routes ao invés de Fastify?
O **Next.js** já vem com suporte a **API Routes**, permitindo criar um backend diretamente dentro do projeto, sem precisar configurar um servidor extra. Como o **MyMoney** é um dashboard financeiro pessoal, onde a API serve apenas ao próprio Next.js, a abordagem com API Routes é suficiente e simplifica o desenvolvimento.

### ✅ **Vantagens de usar Next.js API Routes:**
- 🚀 **Mais simples** → Tudo em um só projeto, sem necessidade de um backend separado.
- 🛠️ **Facilidade de deploy** → Ótima compatibilidade com Vercel.
- 🔄 **Menos manutenção** → Sem necessidade de gerenciar outro servidor.

Se, no futuro, houver necessidade de maior performance ou escalabilidade, podemos considerar um servidor dedicado como **Fastify**.

## 🔧 Configuração do Projeto
### **1️⃣ Instalar as dependências**
```sh
npm install
```
### **2️⃣ Configurar o ambiente**
Crie um arquivo `.env.local` e adicione as credenciais do Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL="https://seu-supabase-url.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-anon-key-aqui"
DATABASE_URL="postgresql://seu-usuario:senha@host:porta/seu-banco"
```
### **3️⃣ Rodar o servidor localmente**
```sh
npm run dev
```
O projeto estará acessível em **http://localhost:3000**.

## 📌 Próximos Passos
- Implementação do sistema de autenticação com Supabase
- Adição de gráficos interativos para visualização financeira
- Integração com APIs externas para importação automática de dados

---
✉️ Caso tenha dúvidas, entre em contato! 🚀

