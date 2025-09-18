# 📱 WePhoneSpec Web App

## 📖 Overview
**WePhoneSpec Web App** allows users to search and view detailed specifications of smartphones.  

It provides a **modern and responsive frontend** for browsing, while the **backend** manages authentication, database storage, and real-time updates.

The project follows a **client–server architecture**:
- **Client**: React-based with React Router(framework mode. AKA Remix) for user interactions.
- **Server**: Bun.js/Express backend with PostgreSQL + MongoDB for data persistence.

---

## 📂 Project Structure
```bash
root/
│── client/ # Frontend (React + Vite/React Router(framework) + TailwindCSS)
│── server/ # Backend (Bun.js + Express + Prisma + PostgreSQL + MongoDB + Mongoose)
│── docker-compose.yml / # Deployment configs
│── README.md # 
```
---

## ⚙️ Technologies Used

### 🔹 Server (Backend)
The backend is built with **Bun.js** and **Express**, handling API routes, authentication, sessions, and database operations.

**Dependencies**:
- **Database & ORM**
  - `@prisma/client`, `prisma` – ORM for PostgreSQL
  - `pg` – PostgreSQL client
  - `mongoose` – MongoDB ODM
- **Authentication & Security**
  - `bcryptjs` – password hashing
  - `jsonwebtoken`, `jwt-decode` – JWT authentication
  - `passport`, `passport-local`, `passport-google-oauth20` – local & Google OAuth authentication
  - `cookie-parser` – cookie handling
- **Real-time & Communication**
  - `socket.io` – WebSocket for real-time updates
  - `nodemailer` – email sending (verification, reset links)
- **Validation & Utils**
  - `zod` – schema validation
  - `uuid` – unique ID generation
- **Middleware**
  - `cors` – cross-origin resource sharing
  - `express` – main framework

---

### 🔹 Client (Frontend)
The frontend is built with **React 19** and **React Router v7**, styled with **TailwindCSS**. It handles the UI, search functionality, and real-time updates via WebSocket.

**Dependencies**:
- **Core**
  - `react`, `react-dom` – React UI library
  - `react-router`, `@react-router/node`, `@react-router/serve` – routing
  - `axios` – HTTP client for API calls
  - `socket.io-client` – WebSocket communication with backend
- **UI & Styling**
  - `tailwind-merge`, `tw-animate-css` – styling utilities
  - `lucide-react` – icons
  - `motion` – animations
  - Radix UI components (`@radix-ui/react-avatar`, `dropdown-menu`, `label`, `slot`) – accessible UI primitives
  - `clsx`, `class-variance-authority` – conditional class handling
- **Data & State**
  - `@tanstack/react-query` – server state management
  - `lodash` – utility functions
  - `dayjs` – date/time formatting
- **Auth & Utils**
  - `js-cookie` – cookie management
  - `jwt-decode` – decode JWT tokens
  - `isbot` – bot detection
  - `nanoid` – unique ID generation
- **Validation**
  - `zod` – schema validation (client-side)

---

## 🔑 Features
- 🔍 **Search** for phone specifications by name or model  
- 🔐 **Authentication**:
  - Local signup/login with hashed passwords
  - Google OAuth 2.0 integration
  - Session + JWT support
  - Access token cycle and Refresh token
- 🗄️ **Database**:
  - PostgreSQL via Prisma (structured data, users, auth)
  - MongoDB via Mongoose (smartphones data)
- ⚡ **Real-Time**:
  - WebSocket (`socket.io`) for live updates (e.g., comments, notifications)
- 🎨 **UI/UX**:
  - Responsive, mobile-friendly interface with TailwindCSS
  - Smooth animations using Motion & Radix UI
- 🛡️ **Security**:
  - Encrypted passwords
  - JWT authentication
  - Input validation with Zod

---

## 🚀 Deployment

~ CURRENT USE
### 🔹 Server (Backend)
- **Runtime**: Bun.js
- **Hosting**: AWS EC2 t2.micro
- **Containerization**: Docker  
- **Reverse Proxy**: Nginx
- **SSL Certification**: Let's Encrypt with Certbot

### 🔹 Client (Frontend)
- **Runtime**: Bun.js
- **Hosting**: Vercel

~ NOT USED AS AWS EC2 IS ONLY USING t2.micro (Crashes in a couple of hours as it's too heavy. Migrated to vercel)
### 🔹 Client (Frontend)
- **Runtime**: Bun.js
- **Hosting**: AWS EC2 
- **Containerization**: Docker  
- **Reverse Proxy**: Nginx  

---

## 🧪 Tests

## Postman Endpoints
--- some endpoints are missing since they are tested end-to-end ---
<img width="283" height="644" alt="image" src="https://github.com/user-attachments/assets/1b2bf11d-cbec-4ef6-af4f-12f2c3d3a24e" />

