import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { ArrowLeft, Send, Loader2, Sparkles, FileText, MessageSquare } from 'lucide-react';

const AIAssistant = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const {
    currentProject,
    tasks,
    aiResponse,
    aiLoading,
    selectProject,
    summarizeProject,
    askQuestion,
    clearAIResponse,
  } = useStore();

  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (projectId && !currentProject) {
      selectProject(projectId);
    }
  }, [projectId, currentProject, selectProject]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, aiLoading]);

  const handleSummarize = async () => {
    clearAIResponse();
    setChatHistory((prev) => [
      ...prev,
      { type: 'user', content: 'Summarize this project', timestamp: new Date() },
    ]);

    try {
      const response = await summarizeProject(projectId);
      setChatHistory((prev) => [
        ...prev,
        { type: 'ai', content: response.summary, stats: response.stats, timestamp: new Date() },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: 'error',
          content: 'Failed to generate summary. Please try again.',
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userQuestion = question;
    setQuestion('');
    clearAIResponse();

    setChatHistory((prev) => [
      ...prev,
      { type: 'user', content: userQuestion, timestamp: new Date() },
    ]);

    try {
      const response = await askQuestion(projectId, userQuestion);
      setChatHistory((prev) => [
        ...prev,
        { type: 'ai', content: response.answer, timestamp: new Date() },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: 'error',
          content: 'Failed to get answer. Please try again.',
          timestamp: new Date(),
        },
      ]);
    }
  };

  const quickQuestions = [
    'Which tasks are in progress?',
    'What tasks are completed?',
    'What should I focus on next?',
    'Give me a brief overview',
  ];

  const handleQuickQuestion = (q) => {
    setQuestion(q);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/project/${projectId}`)}
            className="flex items-center space-x-2 text-white/70 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Board</span>
          </button>

          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">AI Assistant</h1>
              <p className="text-white/60">{currentProject?.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <button onClick={handleSummarize} className="btn-primary flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Summarize Project</span>
            </button>
            <div className="text-white/60 text-sm">
              {tasks?.length || 0} tasks • Ask questions or get a summary
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 h-[600px] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto custom-scrollbar mb-4 space-y-4">
                {chatHistory.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white/80 mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-white/60 text-sm">
                      Ask questions about your tasks or get a project summary
                    </p>
                  </div>
                )}

                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : message.type === 'error'
                          ? 'bg-red-500/20 border border-red-500/50 text-red-200'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.stats && (
                        <div className="mt-3 pt-3 border-t border-white/20 flex space-x-4 text-sm">
                          <span>✅ Done: {message.stats.done}</span>
                          <span>⚡ In Progress: {message.stats.inProgress}</span>
                          <span>📋 To Do: {message.stats.todo}</span>
                        </div>
                      )}
                      <p className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}

                {aiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-2xl p-4 flex items-center space-x-3">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                      <span className="text-white/80">AI is thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleAskQuestion} className="flex space-x-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question about your project..."
                  className="input flex-1"
                  disabled={aiLoading}
                />
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center w-12 h-12"
                  disabled={aiLoading || !question.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Questions</h3>
              <div className="space-y-2">
                {quickQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(q)}
                    className="w-full text-left px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
                    disabled={aiLoading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Task Stats */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Task Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Total Tasks</span>
                  <span className="font-bold text-white">{tasks?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">To Do</span>
                  <span className="font-bold text-gray-400">
                    {tasks?.filter((t) => t.status === 'To Do').length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">In Progress</span>
                  <span className="font-bold text-yellow-400">
                    {tasks?.filter((t) => t.status === 'In Progress').length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Done</span>
                  <span className="font-bold text-green-400">
                    {tasks?.filter((t) => t.status === 'Done').length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="glass rounded-2xl p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
              <h3 className="text-lg font-semibold text-white mb-2">💡 Tips</h3>
              <ul className="text-sm text-white/80 space-y-2">
                <li>• Ask specific questions for better answers</li>
                <li>• Use "Summarize" for project overview</li>
                <li>• AI understands all your task details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
