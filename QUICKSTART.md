# Quick Start Guide

## 🚀 5-Minute Setup

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Configure Environment

**Create server/.env:**
```bash
cd server
cp .env.example .env
```

Then edit `.env` and add:
- Your MongoDB connection string
- Your Gemini API key from https://makersuite.google.com/app/apikey

**Create client/.env (optional):**
```bash
cd client
cp .env.example .env
```

### 3. Start the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on http://localhost:5173

### 4. Open Your Browser

Navigate to http://localhost:5173 and start creating projects!

## 📋 Quick Checklist

- [ ] Node.js installed (v18+)
- [ ] MongoDB running (local or Atlas)
- [ ] Gemini API key obtained
- [ ] Dependencies installed
- [ ] .env files configured
- [ ] Both servers running

## 🎯 First Steps

1. Click "New Project" to create your first project
2. Add a project name and description
3. Click on the project card to open the Kanban board
4. Add tasks using the "+" buttons
5. Drag tasks between columns
6. Click "AI Assistant" to get AI-powered insights

## ⚡ Common Commands

```bash
# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd client && npm install

# Start backend in development mode
cd server && npm run dev

# Start frontend in development mode
cd client && npm run dev

# Build frontend for production
cd client && npm run build
```

## 🔧 MongoDB Setup Options

### Option 1: Local MongoDB
```env
MONGO_URI=mongodb://localhost:27017/ai-project-management
```

### Option 2: MongoDB Atlas (Free Tier)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Replace username, password, and database name

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-project-management?retryWrites=true&w=majority
```

## 🤖 Getting Gemini API Key

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy and paste into your .env file

## 🎉 You're Ready!

Your AI-powered project management system is now running. Happy organizing!
