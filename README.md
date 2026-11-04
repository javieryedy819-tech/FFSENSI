const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function buildFallbackAnalysis(payload) {
  const answers = payload || {};
  const device = (answers.device || 'Android').toString();
  const model = (answers.model || 'Unknown').toString();
  const fingers = Number(answers.fingers || 2);
  const aimProblem = (answers.aimProblem || 'general tracking').toString().toLowerCase();
  const headAim = (answers.headAim || 'body').toString();
  const gameplay = (answers.gameplay || 'balanced').toString().toLowerCase();
  const currentSensitivity = Number(answers.currentSensitivity || 0);
  const language = answers.language || 'en';

  let general = 85;
  let redDot = 90;
  let twoX = 82;
  let fourX = 76;
  let sniper = 68;
  let freeLook = 74;
  let fireButton = 64;

  if (device.toLowerCase().includes('ipad') || device.toLowerCase().includes('tablet')) {
    general += 4;
    redDot += 5;
  }

  if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
    general += 2;
  }

  if (fingers <= 2) {
    general -= 6;
    redDot -= 6;
    fourX -= 3;
    sniper -= 4;
    fireButton += 8;
  } else if (fingers >= 4) {
    general += 6;
    redDot += 7;
    fourX += 5;
    sniper += 4;
    fireButton -= 6;
  }

  if (aimProblem.includes('track') || aimProblem.includes('recoil') || aimProblem.includes('lag')) {
    general += 4;
    redDot += 5;
    twoX += 3;
    fourX += 3;
  }

  if (headAim === 'above-head' || headAim === 'Arriba de la cabeza') {
    redDot -= 6;
    twoX -= 5;
    fourX -= 4;
    sniper -= 5;
  } else {
    redDot += 5;
    twoX += 4;
    fourX += 3;
    sniper += 2;
  }

  if (gameplay === 'aggressive') {
    general += 9;
    redDot += 8;
    twoX += 5;
    fourX += 4;
    sniper += 2;
  } else if (gameplay === 'balanced') {
    general += 4;
    redDot += 5;
  } else if (gameplay === 'defensive' || gameplay === 'passive') {
    general -= 4;
    redDot -= 2;
    freeLook -= 1;
  }

  if (currentSensitivity > 0) {
    const delta = (currentSensitivity - 70) * 0.25;
    general += delta;
    redDot += delta;
    twoX += delta * 0.8;
    fourX += delta * 0.7;
    sniper += delta * 0.6;
    freeLook += delta * 0.8;
  }

  const settings = {
    general: clamp(Math.round(general), 35, 100),
    redDot: clamp(Math.round(redDot), 35, 100),
    twoX: clamp(Math.round(twoX), 35, 100),
    fourX: clamp(Math.round(fourX), 35, 100),
    sniper: clamp(Math.round(sniper), 35, 100),
    freeLook: clamp(Math.round(freeLook), 35, 100),
    fireButton: clamp(Math.round(fireButton), 25, 100)
  };

  const explanation = language === 'es'
    ? `Ajusté la sensibilidad para ${device} ${model}, con ${fingers} dedos, enfocada en ${aimProblem} y estilo ${gameplay}. Como tu puntería se enfoca ${headAim === 'above-head' || headAim === 'Arriba de la cabeza' ? 'por encima de la cabeza' : 'en el cuerpo'}, reduje la sensibilidad de disparo rápido y aumenté el control en mira media para mantener precisión sin perder rapidez.`
    : `I tuned the sensitivity for ${device} ${model}, using ${fingers} fingers, focused on ${aimProblem} and a ${gameplay} style. Since your aim sits ${headAim === 'above-head' || headAim === 'Arriba de la cabeza' ? 'above the head' : 'on the body'}, I reduced fast-aim sensitivity and increased mid-range control to stay accurate without losing speed.`;

  const recommendations = {
    hud: language === 'es'
      ? 'Usa un HUD compacto con daño, minimapa y vida visibles en todo momento para reaccionar más rápido.'
      : 'Use a compact HUD with damage, minimap, and health visible at all times so you can react faster.',
    device: language === 'es'
      ? 'Activa rendimiento máximo, cierra apps en segundo plano y reduce efectos visuales si notas que el disparo se siente lento.'
      : 'Enable maximum performance mode, close background apps, and reduce extra effects if your shots feel delayed.',
    aim: language === 'es'
      ? 'Practica disparos cortos y seguimientos con ajustes de mira rápida, sin forzar la puntería cuando el objetivo está muy lejos.'
      : 'Practice short-range flicks and tracking with quick-aim tuning, while avoiding overcorrection when targets are farther away.'
  };

  return { settings, explanation, recommendations };
}

app.post('/api/generate', async (req, res) => {
  try {
    const payload = req.body || {};

    if (!openai) {
      const fallback = buildFallbackAnalysis(payload);
      return res.json({ ok: true, mode: 'local', ...fallback });
    }

    const systemPrompt = `You are a Free Fire sensitivity assistant. Reply with valid JSON only. Return an object with exactly: {"settings":{"general":int,"redDot":int,"twoX":int,"fourX":int,"sniper":int,"freeLook":int,"fireButton":int},"explanation":"string","recommendations":{"hud":"string","device":"string","aim":"string"}}. All values must be integers between 1 and 100. Base it on the user's device, model, finger count, aiming problems, whether the aim sits above the head or on the body, gameplay style, and current sensitivity.`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.6,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(payload) }
      ]
    });

    const content = completion.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content from AI model');
    }

    const parsed = JSON.parse(content);
    return res.json({ ok: true, mode: 'ai', ...parsed });
  } catch (error) {
    console.error('Generate error:', error);
    const fallback = buildFallbackAnalysis(req.body || {});
    return res.json({ ok: true, mode: 'fallback', ...fallback, warning: 'AI model unavailable, using offline tuning logic.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, status: 'healthy', ai: !!openai });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Free Fire Sensi AI is running on http://localhost:${PORT}`);
});
