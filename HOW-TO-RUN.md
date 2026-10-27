# Rahul_Restro — Restaurant Management & POS Setup Guide

Petpooja-style modern offline-first Restaurant POS system.

---

## 🚀 Quick Start (Ek Click me Run Karein)

Aapke project root folder me **`run-pos.bat`** file banayi gayi hai.

1. **`run-pos.bat`** par double click karein.
2. Ye automatically:
   - Database (PostgreSQL 16) start karega
   - Backend API (Port `4001`) start karega
   - Next.js Web POS (Port `3000`) start karega
   - Aapke browser me `http://localhost:3000/login` open kar dega

---

## 🔑 Login Credentials

- **Email**: `rp524917@gmail.com`
- **Password**: `11111111`
- **Quick PIN**: `1111`

---

## 🌐 URLs & Ports

| Service | URL | Vivran |
|---|---|---|
| **POS Web Interface** | `http://localhost:3000` | Counter POS, Tables, KDS, Menu, Inventory |
| **API & Swagger Docs** | `http://localhost:4001/api/docs` | Backend REST API & OpenAPI Documentation |
| **Customer Display** | `http://localhost:3000/customer-display` | Customer facing screen with dynamic UPI QR |
| **Kitchen Display (KDS)**| `http://localhost:3000/kds` | Kitchen Order Tickets (KOT) live board |

---

## 🗄️ Database Info

- **Database Engine**: PostgreSQL 16 (Installed at `C:\Program Files\PostgreSQL\16`)
- **Port**: `3003`
- **Database Name**: `orderrestro`
- **User**: `postgres`
- **Password**: `postgres`
- **Why PostgreSQL?**:
  Is project me 39 migrations, live synchronization triggers (`sync_install_triggers`), advisory locks, aur scalar array types (`allergens String[]`, `scopes String[]`) use hote hain. MySQL natively array types ya PL/pgSQL triggers support nahi karta, jabki aapke system par already PostgreSQL 16 install tha. Isliye database ko bina kisi code drift ya limitations ke natively configure kar diya gaya hai.

---

## 🛠️ Helpful Batch Scripts

| File | Kaam |
|---|---|
| `run-pos.bat` | Production mode me POS aur Backend start karega aur browser open karega |
| `run-dev.bat` | Developer hot-reload mode (`pnpm dev`) me chalayega |
| `start-database.bat` | PostgreSQL 16 database ko manually start karne ke liye |
| `stop-pos.bat` | Chal rahe POS aur backend services ko stop karne ke liye |
