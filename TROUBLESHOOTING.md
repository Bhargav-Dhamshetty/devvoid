# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 🗄️ Database Issues

#### MongoDB Connection Failed

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solutions:**
1. **Check if MongoDB is running:**
   ```powershell
   # Windows - check if MongoDB service is running
   Get-Service -Name MongoDB
   ```

2. **Start MongoDB:**
   ```powershell
   # If using MongoDB as a service
   Start-Service MongoDB
   
   # If running manually
   mongod
   ```

3. **Verify connection string in `.env`:**
   ```env
   # Local MongoDB
   MONGO_URI=mongodb://localhost:27017/ai-project-management
   
   # MongoDB Atlas
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

#### MongoDB Atlas IP Whitelist

**Error:** `MongoServerError: not authorized`

**Solution:**
1. Go to MongoDB Atlas dashboard
2. Network Access → Add IP Address
3. Click "Allow Access from Anywhere" (for development)
4. Or add your specific IP address

---

### 🤖 Gemini AI Issues

#### Invalid API Key

**Error:** `Error: API key not valid`

**Solution:**
1. Get a new API key from https://makersuite.google.com/app/apikey
2. Update `server/.env`:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Restart the backend server

#### API Quota Exceeded

**Error:** `Error: Quota exceeded`

**Solution:**
- Wait for quota to reset (usually daily)
- Check your quota at Google AI Studio
- Consider upgrading to a paid plan

#### API Request Failed

**Error:** `Failed to generate summary`

**Possible Causes:**
1. **No internet connection** - Check your network
2. **API service down** - Check Google Cloud status
3. **Invalid project data** - Ensure project has tasks

---

### 🌐 Frontend Issues

#### Blank Screen on Load

**Solution:**
1. **Check console for errors:**
   - Open browser DevTools (F12)
   - Look for red errors in Console tab

2. **Common causes:**
   - Backend not running
   - Wrong API URL in `.env`
   - CORS issues

3. **Verify backend is running:**
   ```powershell
   # Test backend health
   curl http://localhost:5000/health
   ```

#### API Requests Failing

**Error:** `Network Error` or `CORS Error`

**Solution:**
1. **Check backend is running on port 5000**
   ```powershell
   cd server
   npm run dev
   ```

2. **Verify CORS configuration in `server/server.js`:**
   ```javascript
   app.use(cors({
     origin: 'http://localhost:5173',  // Must match frontend URL
     credentials: true
   }));
   ```

3. **Check frontend API URL in `client/.env`:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

#### Drag and Drop Not Working

**Possible Causes:**
1. Tasks not loading properly
2. Browser compatibility issue
3. Console errors blocking functionality

**Solution:**
1. Check browser console for errors
2. Try refreshing the page
3. Clear browser cache
4. Use a modern browser (Chrome, Firefox, Edge)

---

### 📦 Installation Issues

#### npm install Fails

**Error:** `npm ERR! code ENOENT`

**Solution:**
1. **Delete node_modules and package-lock.json:**
   ```powershell
   cd server
   Remove-Item -Recurse -Force node_modules, package-lock.json
   npm install
   ```

2. **Check Node.js version:**
   ```powershell
   node --version  # Should be v18 or higher
   ```

3. **Update npm:**
   ```powershell
   npm install -g npm@latest
   ```

#### Permission Errors

**Error:** `EACCES: permission denied`

**Solution (Windows):**
- Run PowerShell as Administrator
- Or use `--force` flag (not recommended)

---

### 🔌 Port Conflicts

#### Port 5000 Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
1. **Find process using port 5000:**
   ```powershell
   netstat -ano | findstr :5000
   ```

2. **Kill the process:**
   ```powershell
   # Replace PID with the actual process ID
   Stop-Process -Id PID -Force
   ```

3. **Or change port in `server/.env`:**
   ```env
   PORT=5001
   ```
   Don't forget to update `client/.env` too!

#### Port 5173 Already in Use

**Error:** `Port 5173 is in use`

**Solution:**
- Vite will automatically try the next available port
- Or kill the process using that port
- Or specify a different port in `vite.config.js`

---

### 🎨 Styling Issues

#### TailwindCSS Not Working

**Error:** Styles not applying

**Solution:**
1. **Verify Tailwind is installed:**
   ```powershell
   cd client
   npm list tailwindcss
   ```

2. **Check `tailwind.config.js` content paths:**
   ```javascript
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ]
   ```

3. **Verify imports in `src/index.css`:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Restart dev server:**
   ```powershell
   # Stop with Ctrl+C, then
   npm run dev
   ```

---

### 🔄 State Management Issues

#### State Not Updating

**Problem:** Changes not reflected in UI

**Solution:**
1. **Check browser console for errors**
2. **Verify Zustand store is being used correctly:**
   ```javascript
   const { projects, fetchProjects } = useStore();
   ```
3. **Check if API call succeeded:**
   - Open Network tab in DevTools
   - Look for 200 OK responses

#### Optimistic Update Failed

**Problem:** UI reverts after drag-and-drop

**Cause:** Backend API call failed

**Solution:**
1. Check backend console for errors
2. Verify task IDs are correct
3. Check network connection
4. Backend may be down - restart it

---

### 🌍 Environment Variable Issues

#### Environment Variables Not Loading

**Problem:** `undefined` values for env variables

**Solution:**

**Backend:**
1. Verify `.env` file exists in `server/` directory
2. Variables must NOT have quotes:
   ```env
   # ✅ Correct
   PORT=5000
   
   # ❌ Wrong
   PORT="5000"
   ```
3. Restart server after changing .env

**Frontend:**
1. Vite requires `VITE_` prefix:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
2. Restart dev server after changing .env
3. Access with `import.meta.env.VITE_API_URL`

---

### 🚀 Deployment Issues

#### Vercel Build Fails

**Error:** `Build failed`

**Solution:**
1. **Set correct root directory:** `client`
2. **Add environment variables in Vercel dashboard**
3. **Check build command:** `npm run build`
4. **Check output directory:** `dist`

#### Backend Deployment Issues

**Error:** App crashes on start

**Solution:**
1. **Check environment variables are set on platform**
2. **Verify MongoDB connection string for production**
3. **Check logs on deployment platform**
4. **Ensure all dependencies are in `package.json`, not `devDependencies`**

---

### 📱 Browser Compatibility

#### Features Not Working in Older Browsers

**Solution:**
- Use modern browsers:
  - ✅ Chrome 90+
  - ✅ Firefox 88+
  - ✅ Edge 90+
  - ✅ Safari 14+
- Update browser to latest version

---

## 🆘 Still Having Issues?

### Debug Checklist

1. **Check all console logs:**
   - Backend terminal
   - Frontend terminal
   - Browser console (F12)

2. **Verify all services are running:**
   - [ ] MongoDB running
   - [ ] Backend server running (port 5000)
   - [ ] Frontend server running (port 5173)

3. **Check environment files:**
   - [ ] `server/.env` exists and configured
   - [ ] `client/.env` exists (optional)
   - [ ] All required variables set

4. **Test backend directly:**
   ```powershell
   # Test health endpoint
   curl http://localhost:5000/health
   
   # Test projects endpoint
   curl http://localhost:5000/api/projects
   ```

5. **Clear caches:**
   ```powershell
   # Clear npm cache
   npm cache clean --force
   
   # Clear browser cache
   # Ctrl+Shift+Delete in browser
   ```

### Getting Help

1. **Check the documentation:**
   - README.md - Complete guide
   - QUICKSTART.md - Setup guide
   - DEVELOPMENT.md - Developer guide

2. **Review error messages carefully:**
   - Read the full error message
   - Check the stack trace
   - Look for hints in error text

3. **Search for similar issues:**
   - Google the exact error message
   - Check GitHub issues for dependencies
   - Look for solutions on Stack Overflow

---

## 📝 Prevention Tips

1. **Always check logs first** - Most issues show clear error messages
2. **Keep dependencies updated** - Run `npm update` regularly
3. **Use version control** - Commit working code before making changes
4. **Test locally before deploying** - Ensure everything works locally first
5. **Document your changes** - Note any configuration changes you make

---

## 🔍 Quick Diagnosis

### Backend Won't Start
- Check MongoDB connection
- Verify .env file exists
- Check port availability
- Look for syntax errors in code

### Frontend Won't Start
- Check if dependencies installed
- Verify backend is running
- Check for port conflicts
- Look for import errors

### API Calls Failing
- Verify backend is running
- Check CORS configuration
- Verify API URL is correct
- Check network connectivity

### AI Features Not Working
- Verify Gemini API key
- Check API quota
- Ensure project has tasks
- Check internet connection

### Drag and Drop Issues
- Refresh the page
- Check console for errors
- Verify tasks loaded correctly
- Try different browser

---

**Remember:** Most issues can be solved by:
1. Reading error messages carefully
2. Checking if all services are running
3. Verifying environment configuration
4. Restarting servers after changes

**Happy debugging! 🐛🔨**
