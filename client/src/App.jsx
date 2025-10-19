import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProjectBoard from './pages/ProjectBoard';
import AIAssistant from './pages/AIAssistant';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project/:projectId" element={<ProjectBoard />} />
          <Route path="/project/:projectId/ai" element={<AIAssistant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
