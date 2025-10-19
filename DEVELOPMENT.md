# Development Guide

## 🛠️ Development Workflow

### Starting Development

1. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

2. **Start Backend Server** (Terminal 1)
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000 with auto-reload on file changes.

3. **Start Frontend Dev Server** (Terminal 2)
   ```bash
   cd client
   npm run dev
   ```
   App will run on http://localhost:5173 with hot module replacement.

### Project Architecture

#### Backend Architecture

```
server/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   ├── projectController.js   # Project CRUD logic
│   ├── taskController.js      # Task CRUD + reordering
│   └── aiController.js        # Gemini AI integration
├── models/
│   ├── Project.js         # Project schema with virtuals
│   └── Task.js            # Task schema with indexing
├── routes/
│   ├── projectRoutes.js   # Project API routes
│   ├── taskRoutes.js      # Task API routes
│   └── aiRoutes.js        # AI API routes
└── server.js              # Express app setup & middleware
```

**Key Design Patterns:**
- **MVC Pattern**: Controllers handle business logic, Models define data structure
- **REST API**: Standard HTTP methods for CRUD operations
- **Error Handling**: Consistent error responses with try-catch blocks
- **Middleware**: CORS, JSON parsing, request logging

#### Frontend Architecture

```
client/src/
├── api/
│   ├── axios.js           # Axios instance with interceptors
│   └── index.js           # API endpoint functions
├── components/
│   ├── Navbar.jsx         # Top navigation bar
│   ├── ProjectCard.jsx    # Project display card
│   ├── TaskCard.jsx       # Draggable task card
│   ├── Column.jsx         # Kanban column with droppable
│   └── Modal.jsx          # Reusable modal component
├── pages/
│   ├── Dashboard.jsx      # Project list & management
│   ├── ProjectBoard.jsx   # Kanban board with DnD
│   └── AIAssistant.jsx    # AI chat interface
├── store/
│   └── useStore.js        # Zustand global state
├── App.jsx                # Route configuration
├── main.jsx               # React entry point
└── index.css              # Global styles + Tailwind
```

**Key Design Patterns:**
- **Component Composition**: Reusable, modular components
- **State Management**: Zustand for global state (simpler than Redux)
- **Custom Hooks**: Encapsulated logic in store
- **Optimistic Updates**: Immediate UI feedback, revert on error

### State Management (Zustand)

The app uses a single Zustand store (`useStore.js`) with:

**State:**
- `projects`: Array of all projects
- `currentProject`: Currently selected project
- `tasks`: Tasks for current project
- `loading`, `error`: UI state
- `aiResponse`, `aiLoading`: AI interaction state

**Actions:**
- Project CRUD: `fetchProjects`, `createProject`, `updateProject`, `deleteProject`
- Task CRUD: `fetchTasks`, `createTask`, `updateTask`, `deleteTask`
- Task Reordering: `reorderTasks` (optimistic update)
- AI Operations: `summarizeProject`, `askQuestion`

### API Integration

**Axios Configuration** (`api/axios.js`):
- Base URL from environment variable
- Request/response interceptors
- Automatic error handling

**API Methods** (`api/index.js`):
- `projectAPI`: CRUD operations for projects
- `taskAPI`: CRUD + reorder for tasks
- `aiAPI`: Summarize and ask endpoints

### Drag and Drop Implementation

Using `@hello-pangea/dnd` (maintained fork of react-beautiful-dnd):

1. **DragDropContext**: Wraps the entire board
2. **Droppable**: Each column (To Do, In Progress, Done)
3. **Draggable**: Each task card

**Key Functions:**
- `handleDragEnd`: Updates task status and order
- `reorderTasks`: Sends updates to backend
- Optimistic UI update for instant feedback

### AI Integration (Gemini)

**Backend Implementation:**
1. Initialize Gemini AI client with API key
2. Build context from project and task data
3. Generate prompts for summarization or Q&A
4. Stream responses back to frontend

**Frontend Implementation:**
1. Chat history state for conversation flow
2. Quick question templates
3. Real-time loading indicators
4. Error handling with user-friendly messages

## 🎨 Styling Guide

### TailwindCSS Utilities

The app uses custom utility classes defined in `index.css`:

- `.glass`: Glassmorphism effect
- `.glass-card`: Glass card with hover effects
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`: Button styles
- `.input`, `.textarea`: Form input styles
- `.task-card`: Task card with animations
- `.kanban-column`: Kanban column styling
- `.custom-scrollbar`: Styled scrollbar

### Color Scheme

- **Primary**: Blue (#0ea5e9) to Purple (#9333ea) gradient
- **Background**: Dark slate with purple gradient
- **Accents**: Pink, green, yellow for status indicators
- **Glass Effect**: White/10 with backdrop blur

### Responsive Breakpoints

- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

## 🧪 Testing

### Manual Testing Checklist

**Projects:**
- [ ] Create project with validation
- [ ] Edit project details
- [ ] Delete project (with confirmation)
- [ ] Navigate to project board

**Tasks:**
- [ ] Create task in each column
- [ ] Edit task title and description
- [ ] Delete task
- [ ] Drag task within same column
- [ ] Drag task to different column
- [ ] Verify status update after drag

**AI Features:**
- [ ] Generate project summary
- [ ] Ask various questions
- [ ] Test quick questions
- [ ] Verify error handling for API failures

**UI/UX:**
- [ ] Test responsive design on mobile
- [ ] Verify animations and transitions
- [ ] Check glassmorphism effects
- [ ] Test dark theme readability

## 🐛 Common Development Issues

### Backend Issues

**MongoDB Connection Error:**
```
Solution: Check if MongoDB is running, verify connection string
```

**Gemini API Error:**
```
Solution: Verify API key, check quota limits
```

**CORS Error:**
```
Solution: Ensure frontend URL is allowed in CORS config
```

### Frontend Issues

**Module Not Found:**
```
Solution: Run npm install again, check import paths
```

**Drag and Drop Not Working:**
```
Solution: Ensure proper DnD context setup, check browser console
```

**State Not Updating:**
```
Solution: Check Zustand store mutations, verify API calls
```

## 🚀 Building for Production

### Frontend Build

```bash
cd client
npm run build
```

Output: `client/dist/` directory with optimized static files

### Backend Preparation

1. Set `NODE_ENV=production` in .env
2. Update CORS to allow production frontend URL
3. Use production MongoDB cluster
4. Add rate limiting for API endpoints (optional)

### Environment Variables for Production

**Backend:**
```env
MONGO_URI=mongodb+srv://...
PORT=5000
GEMINI_API_KEY=...
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 📊 Performance Optimization

### Backend Optimizations
- Database indexing on frequently queried fields
- Mongoose lean() for read-only queries
- Response caching for AI requests (optional)
- Connection pooling for MongoDB

### Frontend Optimizations
- Code splitting with React.lazy()
- Image optimization
- Debouncing user input
- Memoization with React.memo()
- Virtual scrolling for large task lists (optional)

## 🔐 Security Best Practices

- Never commit .env files
- Validate all user inputs
- Sanitize data before database operations
- Use HTTPS in production
- Implement rate limiting
- Add authentication/authorization (future enhancement)

## 📝 Code Style Guidelines

### JavaScript/React
- Use ES6+ syntax
- Functional components with hooks
- Descriptive variable names
- JSDoc comments for complex functions
- Consistent file naming (PascalCase for components)

### CSS
- Mobile-first approach
- Use Tailwind utilities when possible
- Custom classes for repeated patterns
- Meaningful class names

## 🔄 Git Workflow (Recommended)

```bash
# Feature development
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Merge to main
git checkout main
git merge feature/new-feature
```

## 📚 Additional Resources

- **React Patterns**: https://react.dev/learn
- **Zustand Guide**: https://github.com/pmndrs/zustand
- **TailwindCSS**: https://tailwindcss.com/docs
- **Express Best Practices**: https://expressjs.com/en/advanced/best-practice-performance.html
- **MongoDB Schema Design**: https://www.mongodb.com/docs/manual/core/data-modeling-introduction/

---

Happy coding! 🎉
