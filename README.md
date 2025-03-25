# FinX - Personal Finance Dashboard

## 📌 About the Project
**FinX** is a personal finance dashboard designed to help users monitor their finances in a simple and efficient way. The project follows a **modern and minimalist** style, inspired by platforms like **Investidor10**.

## 🚀 Technologies Used

### **Front-end:**
- **Next.js** – React framework for SSR and SSG
- **Tailwind CSS v4** – Fast and optimized styling

### **Back-end:**
- **Next.js API Routes** – For internal API endpoints
- **Prisma** – ORM for database interaction

### **Database:**
- **Supabase** – Cloud-hosted PostgreSQL database

## 🔧 Project Setup
### **1️⃣ Install dependencies**
```sh
npm install
```
### **2️⃣Configure environment variables**
Create a  `.env.local` file and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL="https://seu-supabase-url.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-anon-key-aqui"
DATABASE_URL="postgresql://seu-usuario:senha@host:porta/seu-banco"
NEXTAUTH_URL=url-your-project
NEXTAUTH_SECRET="your-next-auth-key"
DIRECT_URL="postgresql://postgres.seu-supabase-url:[your-pass]@aws-0-sa-east-1.pooler.supabase.com:porta/postgres"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-public-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```
### **3️⃣ Run the development server**
```sh
npm run dev
```


