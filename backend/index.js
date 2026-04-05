import 'dotenv/config';   // 👈 MUST BE FIRST LINE

import express from 'express';
import cors from 'cors';
import analyzeRouter from './routes/analyze.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/analyze', analyzeRouter);

app.listen(PORT, () => {
  console.log('Openai api key loaded:', !!process.env.OPENAI_API_KEY);
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
