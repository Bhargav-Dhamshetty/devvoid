# 🚀 AI-Powered Project & Task Management System

A full-featured MERN stack application that replicates a Trello-like experience with intelligent task summarization and Q&A capabilities powered by Google Gemini AI.

![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)

## ✨ Features

### 📊 Project Management
- ✅ Create, read, update, and delete projects
- ✅ Beautiful card-based project display
- ✅ Project descriptions and metadata
- ✅ Persistent storage with MongoDB

### 📋 Task Management
- ✅ Full CRUD operations for tasks
- ✅ Three-column Kanban board (To Do, In Progress, Done)
- ✅ Drag-and-drop task reordering between columns
- ✅ Task status updates via drag-and-drop
- ✅ Detailed task descriptions

### 🤖 AI-Powered Features
- ✅ **Project Summarization**: Get intelligent summaries of all project tasks
- ✅ **Smart Q&A**: Ask contextual questions about your tasks
- ✅ **AI Assistant Page**: Dedicated interface for AI interactions
- ✅ **Quick Questions**: Pre-built prompts for common queries
- ✅ **Real-time Stats**: Live task statistics and insights

### 🎨 Modern UI/UX
- ✅ Glassmorphism design with gradient effects
- ✅ Smooth animations and transitions
- ✅ Fully responsive layout (mobile, tablet, desktop)
- ✅ Dark theme with purple/blue gradients
- ✅ Custom scrollbars and hover effects
- ✅ Intuitive navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - State management
- **Axios** - HTTP client
- **@hello-pangea/dnd** - Drag and drop library
- **React Router DOM** - Routing
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Google Gemini AI** - AI integration
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
AIproject/
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/            # API service layer
│   │   │   ├── axios.js    # Axios configuration
│   │   │   └── index.js    # API endpoints
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── Column.jsx
│   │   │   └── Modal.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProjectBoard.jsx
│   │   │   └── AIAssistant.jsx
│   │   ├── store/          # State management
│   │   │   └── useStore.js # Zustand store
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── server/                  # Backend (Node + Express)
    ├── config/
    │   └── db.js           # MongoDB connection
    ├── controllers/        # Request handlers
    │   ├── projectController.js
    │   ├── taskController.js
    │   └── aiController.js
    ├── models/             # Mongoose schemas
    │   ├── Project.js
    │   └── Task.js
    ├── routes/             # API routes
    │   ├── projectRoutes.js
    │   ├── taskRoutes.js
    │   └── aiRoutes.js
    ├── server.js           # Entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

#### 1. Clone the Repository

```bash
cd AIproject
```

#### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb://localhost:27017/ai-project-management
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

**Using MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-project-management?retryWrites=true&w=majority
```

#### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

### 🏃 Running the Application

#### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

#### Option 2: Using the provided start script (if available)

The backend will run on `http://localhost:5000`  
The frontend will run on `http://localhost:5173`

### 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env` file

## 📡 API Endpoints

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Create new project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/:projectId` | Get all tasks for a project |
| POST | `/api/tasks/:projectId` | Create new task |
| PUT | `/api/tasks/:taskId` | Update task |
| DELETE | `/api/tasks/:taskId` | Delete task |
| PUT | `/api/tasks/reorder` | Reorder tasks (drag & drop) |

### AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/summarize` | Summarize project tasks |
| POST | `/api/ai/ask` | Ask questions about tasks |

## 🎯 Usage Guide

### Creating a Project
1. Navigate to the Dashboard
2. Click "New Project"
3. Enter project name and description
4. Click "Create Project"

### Managing Tasks
1. Click on a project card to open the Kanban board
2. Click the "+" button in any column to add a task
3. Drag and drop tasks between columns to update status
4. Click edit/delete icons on task cards to modify or remove tasks

### Using AI Features
1. Open a project board
2. Click "AI Assistant" button
3. Click "Summarize Project" for an overview
4. Type questions in the chat input or use quick questions
5. Example questions:
   - "Which tasks are in progress?"
   - "What should I focus on next?"
   - "Summarize completed tasks"

## 🎨 Design Features

- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Gradients**: Purple, blue, and pink color schemes
- **Animations**: Smooth transitions, fade-ins, and hover effects
- **Responsive**: Mobile-first design with breakpoints
- **Dark Theme**: Easy on the eyes with high contrast
- **Custom Scrollbars**: Styled scrollbars matching the theme

## 🔧 Configuration

### MongoDB Indexes

The application automatically creates indexes for:
- Project creation date (descending)
- Task project ID (ascending)
- Task status and order (compound index)

### CORS Configuration

By default, the backend accepts requests from `http://localhost:5173`. Update in `server.js` for production:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import repository in Vercel
3. Set root directory to `client`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`
5. Deploy

### Backend (Render/Railway)

1. Push code to GitHub
2. Create new Web Service
3. Set root directory to `server`
4. Add environment variables:
   - `MONGO_URI`
   - `GEMINI_API_KEY`
   - `PORT`
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your Vercel URL)
5. Deploy

### Recommended Production CORS Setup

You can allow multiple origins and Vercel preview URLs by configuring environment variables in your backend:

- `FRONTEND_URLS`: Comma-separated list of allowed origins (e.g., `https://your-app.vercel.app,https://your-custom-domain.com`).
- `CORS_ALLOW_ORIGIN_REGEX`: Optional regex to allow preview URLs (e.g., `^https://.*\\.vercel\\.app$`).

These are supported by the enhanced CORS configuration in `server/server.js`.

### Environment Templates

- `server/.env.example` – Backend environment template with `MONGO_URI`, `GEMINI_API_KEY`, and `GEMINI_MODEL`.
- `client/.env.example` – Frontend environment template with `VITE_API_URL`.

### GitHub Setup

1. Ensure `.env` files are ignored (already configured via `.gitignore`).
2. Commit and push to GitHub.
3. Configure environment variables in Render (backend) and Vercel (frontend) dashboards.

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or Atlas connection string is correct
- Check firewall settings for Atlas IP whitelist
- Verify username/password in connection string

### Gemini API Errors
- Verify API key is correct and active
- Check API quota limits
- Ensure network allows Google API access

### Frontend Not Loading
- Check if backend is running on port 5000
- Clear browser cache
- Check console for CORS errors

### Drag and Drop Not Working
- Ensure `@hello-pangea/dnd` is installed
- Check browser compatibility (modern browsers required)

## 📝 Environment Variables Reference

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/ai-project-management
PORT=5000
GEMINI_API_KEY=your_api_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173  # For production
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify as needed!

## 📄 License

MIT License - Free to use for personal and commercial projects.

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Google Gemini API](https://ai.google.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Zustand Guide](https://github.com/pmndrs/zustand)

## ✨ Features Showcase

### Dashboard
- Clean project grid layout
- Hover effects on project cards
- Quick create/edit/delete actions
- Real-time project count

### Kanban Board
- Three-column layout (To Do, In Progress, Done)
- Smooth drag-and-drop animations
- Task count badges
- Color-coded status indicators

### AI Assistant
- Chat-based interface
- Message history
- Quick question templates
- Real-time task statistics
- Project summarization

## 🔮 Future Enhancements

- User authentication and authorization
- Team collaboration features
- File attachments for tasks
- Task comments and mentions
- Due dates and reminders
- Email notifications
- Dark/light theme toggle
- Export projects to PDF/Excel
- Advanced AI features (task suggestions, priority recommendations)

## 💡 Tips for Best Results

1. **Be specific with task descriptions** - Better AI insights
2. **Use clear project names** - Easier organization
3. **Regular project summaries** - Stay on track
4. **Ask follow-up questions** - Get detailed AI responses
5. **Keep tasks updated** - Accurate AI analysis

---

**Made with ❤️ using MERN Stack + Google Gemini AI**

For questions or issues, please check the troubleshooting section or review the code comments.
#   d e v v o i d  
 