import express from 'express';
import { validateAnalyzeRequest } from '../utils/validateInput.js';
import { detectLanguageFromCode } from '../utils/detectLanguage.js';
import { buildAnalysisPrompt } from '../utils/buildPrompt.js';
import { callAI } from '../utils/aiClient.js';
import { safeJsonParse } from '../utils/safeJsonParse.js';
import { normalizeAnalysis } from '../utils/normalizeAnalysis.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const validation = validateAnalyzeRequest(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { code, language } = req.body;

    const detectedFromCode = detectLanguageFromCode(code);

    // 🚨 Manual language mismatch check
    if (language !== 'auto' && detectedFromCode !== 'unknown') {
      if (language !== detectedFromCode) {
        console.log('mismatch');
        return res.json({
          has_bugs: true,
          bug_report: [
            {
              line: 1,
              severity: 'critical',
              type: 'Language mismatch',
              message: `Selected language is "${language}", but the code appears to be "${detectedFromCode}".`,
              suggestion: 'Please select the correct language or use Auto Detect.'
            }
          ]
        });
      }
    }


    let resolvedLanguage = language;
    if (language === 'auto') {
      resolvedLanguage = detectLanguageFromCode(code);
      if (resolvedLanguage === 'unknown') {
        return res.status(400).json({ error: 'Unable to auto-detect language' });
      }
    }

    const prompt = buildAnalysisPrompt(code, resolvedLanguage);
    const aiResponse = await callAI(prompt);

    const parsed = safeJsonParse(aiResponse);

    if (!parsed) {
      console.error('Failed to parse AI response:', aiResponse);

      return res.status(500).json({
        has_bugs: true,
        bug_report: [
          {
            line: 1,
            severity: 'critical',
            type: 'AI Response Error',
            message: 'The analysis engine returned an invalid response.',
            suggestion: 'Please retry analysis.'
          }
        ]
      });
    }

    if (language === 'auto' && parsed.detected_language) {
      parsed.detected_language = parsed.detected_language.toLowerCase();
    }
    console.log(parsed);

    const normalized = normalizeAnalysis(parsed);
    return res.json(normalized);

  } catch (error) {
    console.error('AI Analysis Error:', error);
    return res.status(500).json({ error: 'AI analysis failed' });
  }
});

export default router;
