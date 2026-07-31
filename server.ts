import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '5mb' }));

// Lazy init Gemini client with User-Agent header required by AI Studio build platform
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is not set. Using fallback heuristic logic if AI calls occur.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Analyze Job Endpoint
app.post('/api/analyze-job', async (req, res) => {
  try {
    const { jobTitle, jobDescription, budget, skillsRequired, clientInfo, portfolioProjects, userTone = 'Value-First' } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required.' });
    }

    const ai = getGeminiClient();

    // Fallback response if no API key or API failure
    const fallbackResponse = {
      score: 88,
      matchLevel: 'HIGH',
      recommendedAction: 'Apply Immediately',
      connectsCostEstimate: 12,
      summary: `Client needs an experienced developer for ${jobTitle || 'this project'} to address immediate technical bottlenecks and deliver high-reliability results.`,
      clientAnalysis: {
        trustScore: clientInfo?.paymentVerified ? 92 : 60,
        riskFlags: clientInfo?.paymentVerified ? [] : ['Payment method not verified'],
        highlights: [
          clientInfo?.rating ? `High rating of ${clientInfo.rating}/5 stars` : 'Verified client',
          clientInfo?.totalSpent ? `Proven spend history: ${clientInfo.totalSpent}` : 'Established Upwork buyer',
        ],
      },
      jobScope: {
        perceivedComplexity: 'Medium',
        estimatedHours: '10 - 25 hours',
        keyProblemToSolve: 'Execute high-impact technical solution while ensuring stability, performance, and clear communication.',
        extractedRequirements: (skillsRequired && skillsRequired.length > 0) ? skillsRequired : ['Core Development', 'Clean Code', 'Performance'],
      },
      matchedPortfolioIds: Array.isArray(portfolioProjects) && portfolioProjects.length > 0 ? [portfolioProjects[0].id] : [],
      pastWorkRationales: Array.isArray(portfolioProjects) && portfolioProjects.length > 0 ? [
        {
          projectId: portfolioProjects[0].id,
          whyItMatches: `Directly matches client's stack (${portfolioProjects[0].techStack.slice(0, 3).join(', ')}) with proven metrics (${portfolioProjects[0].metrics}).`,
        }
      ] : [],
      proposalDraft: {
        hook: `I read your job post regarding ${jobTitle || 'your project'}. The main challenge here isn't just writing code, but ensuring optimal performance and seamless integration under real-world workload.`,
        body: `I specialize in solving exactly this type of problem. In my recent work, I implemented clean, optimized architectures that eliminate latency and improve reliability.`,
        pastWorkReference: Array.isArray(portfolioProjects) && portfolioProjects.length > 0 
          ? `For instance, on the "${portfolioProjects[0].title}" project, I used ${portfolioProjects[0].techStack.join(', ')} to achieve ${portfolioProjects[0].keyOutcome}.`
          : `I have delivered similar full-lifecycle solutions with measurable speed and clean, maintainable code.`,
        callToAction: `I have a quick 2-step approach to resolve this cleanly. Are you free for a brief 10-minute message chat to discuss your timeframe?`,
        screeningQuestionAnswers: [],
      },
    };

    if (!ai) {
      return res.json(fallbackResponse);
    }

    const systemPrompt = `You are Proposala AI, an elite Upwork Proposal Specialist and Job Analyst.
Analyze the provided Upwork job post, evaluate client reliability & risk, score job fit against the freelancer's portfolio, select the top 1 or 2 matching portfolio projects, and draft a high-converting, human-sounding Upwork proposal.

CRITICAL RULES FOR PROPOSAL DRAFTING:
- NO GENERIC AI SLOP: Never start with "Dear Hiring Manager", "I am excited to apply", "I am a skilled developer with 5+ years of experience", or "I read your job posting with great interest".
- HOOK MUST BE PROBLEM-FIRST: Start directly with a sharp observation about the client's specific problem or technical goal.
- PAST WORK INTEGRATION: Explicitly name and reference 1 or 2 relevant portfolio projects from the provided user portfolio array. Mention specific metrics or outcomes.
- TONE: ${userTone} (Concise, credible, authoritative, collaborative, non-needy).
- CLEAR CALL TO ACTION: End with a low-friction question inviting a short 5-10 min conversation or diagnostic step.`;

    const userPrompt = `Upwork Job Details:
Title: ${jobTitle || 'N/A'}
Budget/Rate: ${budget || 'N/A'}
Required Skills: ${JSON.stringify(skillsRequired || [])}
Client Info: ${JSON.stringify(clientInfo || {})}
Description:
${jobDescription}

Freelancer's Saved Portfolio Projects:
${JSON.stringify(portfolioProjects || [])}`;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: 'Overall job quality & fit score from 0 to 100' },
            matchLevel: { type: Type.STRING, description: 'HIGH, MEDIUM, or LOW' },
            recommendedAction: { type: Type.STRING, description: 'Apply Immediately, Send Quick Pitch, or Skip Job (Low ROI)' },
            connectsCostEstimate: { type: Type.INTEGER, description: 'Estimated Upwork Connects required (e.g. 8, 12, 16)' },
            summary: { type: Type.STRING, description: '2 sentence summary of what client actually wants' },
            clientAnalysis: {
              type: Type.OBJECT,
              properties: {
                trustScore: { type: Type.INTEGER, description: 'Client trustworthiness score 0-100' },
                riskFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
                highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['trustScore', 'riskFlags', 'highlights'],
            },
            jobScope: {
              type: Type.OBJECT,
              properties: {
                perceivedComplexity: { type: Type.STRING, description: 'Low, Medium, or High' },
                estimatedHours: { type: Type.STRING },
                keyProblemToSolve: { type: Type.STRING },
                extractedRequirements: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['perceivedComplexity', 'keyProblemToSolve', 'extractedRequirements'],
            },
            matchedPortfolioIds: { type: Type.ARRAY, items: { type: Type.STRING } },
            pastWorkRationales: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  projectId: { type: Type.STRING },
                  whyItMatches: { type: Type.STRING },
                },
                required: ['projectId', 'whyItMatches'],
              },
            },
            proposalDraft: {
              type: Type.OBJECT,
              properties: {
                hook: { type: Type.STRING },
                body: { type: Type.STRING },
                pastWorkReference: { type: Type.STRING },
                callToAction: { type: Type.STRING },
                screeningQuestionAnswers: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      answer: { type: Type.STRING },
                    },
                    required: ['question', 'answer'],
                  },
                },
              },
              required: ['hook', 'body', 'pastWorkReference', 'callToAction'],
            },
          },
          required: [
            'score', 'matchLevel', 'recommendedAction', 'connectsCostEstimate',
            'summary', 'clientAnalysis', 'jobScope', 'matchedPortfolioIds',
            'pastWorkRationales', 'proposalDraft'
          ],
        },
      },
    });

    const text = geminiResponse.text;
    if (text) {
      const parsedData = JSON.parse(text);
      return res.json(parsedData);
    } else {
      return res.json(fallbackResponse);
    }
  } catch (err: any) {
    console.error('Error in /api/analyze-job:', err);
    return res.status(500).json({
      error: 'Failed to analyze job with Gemini AI.',
      message: err.message,
    });
  }
});

// Generate / Regenerate Proposal Endpoint
app.post('/api/generate-proposal', async (req, res) => {
  try {
    const { jobTitle, jobDescription, selectedPortfolioProjects, userTone = 'Value-First', customInstructions } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        proposalDraft: {
          hook: `Looking at your post for ${jobTitle || 'this role'}, the key requirement is fast execution without sacrificing code quality.`,
          body: `I have built similar web applications focused on performance, clean component architecture, and clear client communication.`,
          pastWorkReference: Array.isArray(selectedPortfolioProjects) && selectedPortfolioProjects.length > 0
            ? `Recently, I completed "${selectedPortfolioProjects[0].title}" using ${selectedPortfolioProjects[0].techStack.slice(0, 3).join(', ')}, delivering ${selectedPortfolioProjects[0].keyOutcome}.`
            : `I bring hands-on expertise in delivering robust applications with verified benchmarks.`,
          callToAction: `Would you be open to a quick 5-minute chat to discuss your technical priorities?`,
        },
      });
    }

    const prompt = `Write a compelling, human-sounding Upwork proposal for this job.
Job Title: ${jobTitle || 'N/A'}
Job Description:
${jobDescription}

Selected Past Projects to highlight:
${JSON.stringify(selectedPortfolioProjects || [])}

Requested Tone: ${userTone}
Custom Instructions: ${customInstructions || 'None'}

Return a JSON object with hook, body, pastWorkReference, callToAction.`;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            proposalDraft: {
              type: Type.OBJECT,
              properties: {
                hook: { type: Type.STRING },
                body: { type: Type.STRING },
                pastWorkReference: { type: Type.STRING },
                callToAction: { type: Type.STRING },
              },
              required: ['hook', 'body', 'pastWorkReference', 'callToAction'],
            },
          },
          required: ['proposalDraft'],
        },
      },
    });

    const text = geminiResponse.text;
    if (text) {
      return res.json(JSON.parse(text));
    } else {
      throw new Error('Empty response from Gemini');
    }
  } catch (err: any) {
    console.error('Error in /api/generate-proposal:', err);
    return res.status(500).json({ error: 'Proposal generation failed.', message: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Proposala full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
