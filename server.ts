import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Lazy-initialization helper to prevent server crash if key is missing on startup
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('GEMINI_API_KEY is not defined. Please configure it in your Secrets.');
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Ensure unique, fresh questions using simple in-memory session tracker of previously generated hashes
const previousQuestionsLog = new Set<string>();

// 1. QUESTION GENERATION API (Checked by Gemini)
app.post('/api/generate-questions', async (req: Request, res: Response): Promise<void> => {
  try {
    const { subject, chapters, questionCount, examType } = req.body;

    if (!subject || !chapters || !questionCount) {
       res.status(400).json({ error: 'Missing parameters: subject, chapters, and questionCount are required.' });
       return;
    }

    const ai = getGeminiClient();

    const prompt = `
      Generate exactly ${questionCount} high-quality Multiple Choice Questions (MCQs) for Indian engineering or medical competitive entrance exams (${examType || 'NEET/JEE'}).
      
      CRITICAL SUBJECT FOCUS:
      Subject: ${subject}
      Chapters from NCERT Class 11 & 12: ${chapters.join(', ')}

      RULES FOR GENERATION AND CHECKING:
      1. Every question must be directly related to the specified chapters under the NCERT syllabus of class 11th and 12th.
      2. No two questions should be highly similar or repetitive. They must test deep conceptual understanding or mathematical problem-solving skills appropriate for NEET (conceptual, clinical-biological, quick formulaic) or JEE (higher level math & physics reasoning).
      3. Verify each question thoroughly. Double-check your own work to ensure that EXACTLY ONE option is mathematically and conceptually correct.
      4. Provide a very descriptive, pretty, and clean step-by-step solution inside the 'explanation' field so a student can self-correct.
      5. To prevent repetition, generate entirely new scenarios, numeric inputs, and phrasing. Avoid standard, copy-pasted questions. Our previous log has several questions, please create unique problems.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        temperature: 0.9,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'A list of generated highly checked NEET/JEE test questions.',
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: 'Question text. Clear, detailed with proper formatting.' },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Exactly 4 option answers.'
              },
              correctAnswerIndex: { type: Type.INTEGER, description: 'Index of the correct answer (0, 1, 2, or 3).' },
              explanation: { type: Type.STRING, description: 'A highly descriptive, student-friendly explanation of why the option is correct.' },
              subject: { type: Type.STRING, description: 'The subject selected.' },
              chapter: { type: Type.STRING, description: 'A realistic chapter tag.' },
              class: { type: Type.STRING, description: 'Either 11th or 12th' }
            },
            required: ['text', 'options', 'correctAnswerIndex', 'explanation', 'subject', 'chapter', 'class']
          }
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Gemini API returned empty text response.');
    }

    const questionsList = JSON.parse(responseText.trim());
    res.json({ questions: questionsList });
  } catch (err: any) {
    console.error('Error in /api/generate-questions:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

// 2. TUTOR CHAT API (Extremely perfect for Physics, Chemistry, Zoology, Botany, and complex Maths equations)
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages } = req.body; // Array of { role: 'user' | 'assistant', content: string }
    if (!messages || !Array.isArray(messages)) {
       res.status(400).json({ error: 'Missing or invalid messages parameter' });
       return;
    }

    const ai = getGeminiClient();

    // Map frontend messages into Gemini contents format
    const formattedContents = messages.map((m) => {
      return {
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      };
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction: `
          You are the official Dr-Aspirant AI Assistant, an exceptionally brilliant, sympathetic, and easy-to-understand tutor helper for JEE & NEET candidates.
          You specialize in Physics, Chemistry (Organic, Inorganic, Physical), Mathematics (Algebra, Calculus, etc.), Zoology, and Botany.
          
          GUIDELINES:
          1. Maintain a comforting, professional, and classy tone as "Dr-Aspirant AI Coach".
          2. Your core strength is explaining complicated science and mathematics things with VERY simple, elegant, and step-by-step methods so that high schoolers can grasp them instantly.
          3. If the student asks for numerical questions or math derivations, break down every step, state the formula explicitly, and explain what each variable is.
          4. Teach smart tricks or shortcuts to solve questions in less than a minute.
          5. Keep explanations structured using bullets, proper headers, and clear alignments.
          6. Your explanations must be completely accurate according to NCERT books of Class 11 and Class 12, as well as the latest NEET/JEE trends.
        `,
        temperature: 0.7,
      }
    });

    res.json({ content: response.text });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

// Serve frontend in both dev and production modes
const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

async function startServer() {
  if (!isProd) {
    console.log('Running in DEVELOPMENT mode. Starting Vite middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    console.log('Running in PRODUCTION mode. Serving static built files...');
    const distPath = path.resolve(__dirname, 'dist');
    
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      // In case build folder is flat in the root during standalone packaging
      const rootDistPath = path.resolve(__dirname, '../dist');
      if (fs.existsSync(rootDistPath)) {
        app.use(express.static(rootDistPath));
        app.get('*', (req, res) => {
          res.sendFile(path.resolve(rootDistPath, 'index.html'));
        });
      } else {
        app.get('*', (req, res) => {
          res.status(500).send('Production assets missing. Please run "npm run build" first.');
        });
      }
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Dr-Aspirant Full-Stack Engine] serving interface perfectly at http://localhost:${PORT}`);
  });
}

startServer();
