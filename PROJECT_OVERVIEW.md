# AI Project Management System

Full-featured MERN stack project management application with Google Gemini AI integration.

## 🌟 Highlights

- ✅ **Complete MERN Stack** - MongoDB, Express, React, Node.js
- 🤖 **AI-Powered** - Smart summaries and Q&A with Gemini AI
- 📋 **Kanban Board** - Drag-and-drop task management
- 🎨 **Modern UI** - Glassmorphism design with TailwindCSS
- 🚀 **Production Ready** - Clean, modular, and maintainable code

## 📂 What's Included

### Backend (server/)
- Express.js REST API
- MongoDB with Mongoose ODM
- Google Gemini AI integration
- Complete CRUD operations
- Error handling & validation

### Frontend (client/)
- React 18 with Vite
- TailwindCSS styling
- Zustand state management
- React Router DOM
- Drag-and-drop with @hello-pangea/dnd

## 🚀 Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for detailed setup instructions.

```bash
# Backend
cd server
npm install
# Configure .env
npm run dev

# Frontend
cd client
npm install
npm run dev
```

## 📖 Full Documentation

See [README.md](./README.md) for complete documentation including:
- Detailed feature list
- API endpoints
- Deployment guide
- Troubleshooting
- Configuration options

## 🎯 Key Features

### Project Management
- Create and manage multiple projects
- Beautiful card-based interface
- Project descriptions and metadata

### Task Management
- Kanban-style board (To Do, In Progress, Done)
- Drag-and-drop tasks between columns
- Full CRUD operations

### AI Features
- Project summarization
- Contextual Q&A
- Quick question templates
- Real-time insights

## 🛠️ Tech Stack

**Frontend:** React, Vite, TailwindCSS, Zustand, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**AI:** Google Gemini API  
**UI/UX:** Glassmorphism, Responsive Design, Dark Theme

## 📸 Project Structure

```
AIproject/
├── client/          # React frontend
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── store/
│   └── package.json
│
└── server/          # Express backend
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    └── server.js
```

## 🔑 Environment Setup

### Backend (.env)
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### Frontend (.env - optional)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 License

MIT License - Free for personal and commercial use

## 🎓 Learning Resource

This project demonstrates:
- MERN stack best practices
- RESTful API design
- State management with Zustand
- AI integration patterns
- Modern React patterns
- Responsive UI design

---

**Built with ❤️ using MERN Stack + Google Gemini AI**
