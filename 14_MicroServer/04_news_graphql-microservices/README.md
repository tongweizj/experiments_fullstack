# 🎓 Microservices & Micro-frontend Project

This project is a modern distributed application implementing **Microservices** and **Micro-frontend** architectures.

## 🌟 Core Architecture
- **Backend**: Built with **Apollo Federation**. An `Apollo Gateway` unifies multiple independently deployed GraphQL microservices.
- **Frontend**: Built with **Vite Module Federation**. The `shell-app` acts as the container (Host), dynamically integrating components from the `user-app` (Remote).
- **Authentication**: Cross-service security using **JWT** and **HTTP-only Cookies**.

---

## ⚙️ Environment Configuration (.env)

To ensure the project connects correctly to databases and services, you must manually configure `.env` files for each module.

### 1. API Gateway (`/server/.env`)
Create this file in the `/server` directory:
```env
PORT=4000
```

### 2. Auth Microservice (`/server/microservices/auth-service/.env`)
Create this file in the `/server/microservices/auth-service` directory:
```env
AUTH_PORT=4001
AUTH_MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_here
```

### 3. Community Microservice (`/server/microservices/community-service/.env`)
Create this file in the `/server/microservices/community-service` directory:
```env
COMMUNITY_PORT=4002
COMMUNITY_MONGO_URI=your_mongodb_connection_string
```

> **Important:** Ensure that `.env` files are included in your `.gitignore` and never commit sensitive credentials to version control.

---

## 🚀 Getting Started

### Step 1: Install Dependencies
Run the installation command in each directory:
```bash
# Root directory
npm install

# Server and Microservices
cd server && npm install
cd microservices/auth-service && npm install
cd ../community-service && npm install

# Frontend Applications
cd ../../client/shell-app && npm install
cd ../user-app && npm install
```

### Step 2: Start the Services
It is recommended to start the services in the following order:
1. **Start Microservices**:
   - `cd server/microservices/auth-service && npm run dev`
   - `cd server/microservices/community-service && npm run dev`
2. **Start API Gateway**:
   - `cd server`
   - `node gateway.js` (Listens on Port 4000 by default)
3. **Start Frontend**:
   - `cd client/user-app && npm run deploy` (Port 3001)
   - `cd client/community-app && npm run deploy` (Port 3001)
   - `cd client/shell-app && npm run dev` (Port 3000)

