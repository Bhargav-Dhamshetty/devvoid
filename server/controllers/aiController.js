import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Task from '../models/Task.js';
import Project from '../models/Project.js';

// ✅ Load environment variables
dotenv.config();

// ✅ Check for Gemini API key
if (!process.env.GEMINI_API_KEY) {
  console.error('⚠️  WARNING: GEMINI_API_KEY is not set in environment variables');
}

// ✅ Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Supported models in preferred order (best quality → fast)
const DEFAULT_MODELS = ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'];

function buildModelList() {
  const envModel = (process.env.GEMINI_MODEL || '').trim();
  const models = [];
  if (envModel) models.push(envModel);
  for (const m of DEFAULT_MODELS) if (!models.includes(m)) models.push(m);
  return models;
}

// ✅ Safe Gemini API call helper with model fallback
async function callGeminiAPI(prompt) {
  const models = buildModelList();
  let lastError = null;

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(`✅ Gemini response using model: ${modelName}`);
      return text;
    } catch (error) {
      const message = error?.message || String(error);
      lastError = error;
      console.warn(`⚠️  Model "${modelName}" failed: ${message}`);

      // Map common errors to clearer messages
      if (message.includes('API key')) {
        throw new Error('Invalid Gemini API key. Create a new key at https://aistudio.google.com/app/apikey and set GEMINI_API_KEY.');
      }
      if (message.toLowerCase().includes('quota')) {
        throw new Error('API quota exceeded. Please check your Google AI Studio usage limits.');
      }
      if (message.toUpperCase().includes('SAFETY')) {
        throw new Error('Content blocked by Gemini safety filters. Try rephrasing your request.');
      }

      // If the model is not found/unsupported/permission issue, try next candidate
      const shouldFallback =
        message.includes('not found') ||
        message.includes('not supported') ||
        message.includes('unsupported') ||
        message.includes('404') ||
        message.toLowerCase().includes('permission');

      if (!shouldFallback) {
        // Unknown/non-recoverable error — stop trying further models
        break;
      }
    }
  }

  // If we got here, all attempts failed
  console.error('🚨 Gemini API Error (all models failed):', lastError);
  throw new Error(`Gemini API error: ${lastError?.message || 'Unknown error'}`);
}

// ✅ Summarize all tasks in a project
export const summarizeProject = async (req, res) => {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ success: false, message: 'Please provide a project ID' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const tasks = await Task.find({ projectId });

    if (tasks.length === 0) {
      return res.status(200).json({
        success: true,
        summary: 'This project has no tasks yet. Add tasks to begin tracking progress!',
      });
    }

    const tasksByStatus = {
      'To Do': tasks.filter(t => t.status === 'To Do'),
      'In Progress': tasks.filter(t => t.status === 'In Progress'),
      'Done': tasks.filter(t => t.status === 'Done'),
    };

    const taskContext = `
Project Name: ${project.name}
Description: ${project.description}

Tasks Overview:
- Total: ${tasks.length}
- To Do: ${tasksByStatus['To Do'].length}
- In Progress: ${tasksByStatus['In Progress'].length}
- Done: ${tasksByStatus['Done'].length}

Detailed Tasks:
${tasks.map((t, i) => `${i + 1}. ${t.title} (${t.status}) - ${t.description}`).join('\n')}
`.trim();

    const prompt = `
You are an expert project management assistant. 
Analyze the project below and provide a clear, professional summary.

${taskContext}

Please include:
1. Overall project progress and current health
2. Key completed milestones
3. Ongoing focus areas
4. Next actionable steps

Write it in 3–4 concise paragraphs.
`;

    const summary = await callGeminiAPI(prompt);

    res.status(200).json({
      success: true,
      summary,
      stats: {
        total: tasks.length,
        todo: tasksByStatus['To Do'].length,
        inProgress: tasksByStatus['In Progress'].length,
        done: tasksByStatus['Done'].length,
      },
    });
  } catch (error) {
    console.error('❌ AI Summarization Error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Error generating project summary',
    });
  }
};

// ✅ Q&A about project tasks
export const askQuestion = async (req, res) => {
  try {
    const { projectId, question } = req.body;

    if (!projectId || !question) {
      return res.status(400).json({ success: false, message: 'Please provide both project ID and question' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const tasks = await Task.find({ projectId });

    if (tasks.length === 0) {
      return res.status(200).json({
        success: true,
        answer: 'This project has no tasks yet. Please add tasks before asking questions!',
      });
    }

    const taskContext = tasks.map((t, i) => `
Task ${i + 1}:
- Title: ${t.title}
- Description: ${t.description}
- Status: ${t.status}
- Created: ${t.createdAt.toLocaleDateString()}
`).join('\n');

    const prompt = `
You are a helpful AI project assistant.
Here’s the project data:

Project: ${project.name}
Description: ${project.description}

${taskContext}

User question: "${question}"

Answer accurately and concisely based on the above context. 
If you don't have enough information, say so politely.
`;

    const answer = await callGeminiAPI(prompt);

    res.status(200).json({
      success: true,
      answer,
      context: {
        projectName: project.name,
        totalTasks: tasks.length,
      },
    });
  } catch (error) {
    console.error('❌ AI Q&A Error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Error processing your question',
    });
  }
};
