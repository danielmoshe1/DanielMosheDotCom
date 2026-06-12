/* =========================================================
   Orenj — Duolingo-style trainer for super-communication.
   Vanilla JS prototype. All state lives in localStorage.
   ========================================================= */
"use strict";

/* ---------------- Curriculum ---------------- */

const UNITS = [
  {
    id: "senses",
    emoji: "👁️",
    name: "The Impossible Senses",
    desc: "Explain sensations to someone who has never felt them. Forces analogies.",
    lessons: [
      {
        id: "orange",
        emoji: "🍊",
        title: "Explain orange",
        prompt: "Explain what the color orange is like to someone who has been blind since birth.",
        audience: "Your listener has never seen any color — but they can hear, touch, taste, and feel.",
        audienceWords: ["hear", "sound", "touch", "feel", "warm", "warmth", "taste", "smell", "music", "sun", "fire", "heat"],
        forbidden: ["red", "yellow", "bright", "looks"],
      },
      {
        id: "music",
        emoji: "🎵",
        title: "Explain music",
        prompt: "Explain what music is to someone who has been deaf since birth.",
        audience: "Your listener has never heard a sound — but they can see, feel vibration, and move.",
        audienceWords: ["see", "feel", "vibration", "rhythm", "dance", "pattern", "color", "wave", "heartbeat", "pulse"],
        forbidden: ["hear", "listen", "loud", "sound"],
      },
      {
        id: "spicy",
        emoji: "🌶️",
        title: "Explain spicy",
        prompt: "Explain what eating something spicy feels like to someone who has no sense of taste or smell.",
        audience: "Your listener knows touch, temperature, and pain — use those.",
        audienceWords: ["heat", "burn", "warm", "tingle", "sunburn", "fire", "skin", "touch", "sweat"],
        forbidden: ["flavor", "taste", "delicious"],
      },
    ],
  },
  {
    id: "alien",
    emoji: "👽",
    name: "Alien Anthropology",
    desc: "Explain everyday human things to a visitor with zero shared context. Forces perspective-taking.",
    lessons: [
      {
        id: "sleep",
        emoji: "😴",
        title: "Explain sleep",
        prompt: "Explain sleep to an alien whose species never sleeps and has never heard of it.",
        audience: "The alien understands machines, energy, and computers — connect to what it knows.",
        audienceWords: ["recharge", "battery", "energy", "shut", "restart", "reboot", "repair", "maintenance", "power", "machine", "computer"],
        forbidden: ["tired", "rest", "nap"],
      },
      {
        id: "laughter",
        emoji: "😂",
        title: "Explain laughter",
        prompt: "Explain laughter to a robot that processes everything literally.",
        audience: "The robot understands signals, errors, and logic — why do humans emit this strange noise?",
        audienceWords: ["signal", "error", "surprise", "expect", "pattern", "logic", "system", "response", "social", "bond"],
        forbidden: [],
      },
      {
        id: "money",
        emoji: "💸",
        title: "Explain money",
        prompt: "Explain money to an alien from a planet with no trade, no ownership, and no scarcity.",
        audience: "Start from something universal — energy, time, effort, promises.",
        audienceWords: ["promise", "trust", "trade", "time", "effort", "energy", "token", "agree", "exchange", "store"],
        forbidden: ["dollar", "currency", "cash"],
      },
    ],
  },
  {
    id: "timetravel",
    emoji: "⏳",
    name: "Time Travelers",
    desc: "Explain modern technology to people from the past. Forces translation into their world.",
    lessons: [
      {
        id: "internet",
        emoji: "🌐",
        title: "Explain the internet",
        prompt: "Explain the internet to a farmer from the year 1750.",
        audience: "They know letters, markets, libraries, roads, and town squares. Build with those bricks.",
        audienceWords: ["letter", "library", "market", "road", "messenger", "town", "village", "book", "post", "square", "horse"],
        forbidden: ["computer", "online", "wifi", "digital"],
      },
      {
        id: "phone",
        emoji: "📱",
        title: "Explain a smartphone",
        prompt: "Explain a smartphone to Leonardo da Vinci.",
        audience: "He's a genius inventor — he knows mirrors, lenses, gears, canvases, and messengers.",
        audienceWords: ["mirror", "lens", "canvas", "machine", "gear", "paint", "messenger", "window", "library", "workshop", "invention"],
        forbidden: ["app", "screen", "battery"],
      },
      {
        id: "gps",
        emoji: "🛰️",
        title: "Explain GPS",
        prompt: "Explain GPS navigation to a Roman general planning a march.",
        audience: "He knows stars, maps, scouts, signal towers, and roads.",
        audienceWords: ["star", "stars", "map", "scout", "tower", "signal", "road", "march", "legion", "messenger", "sky"],
        forbidden: ["satellite", "phone", "signal lock"],
      },
    ],
  },
  {
    id: "kids",
    emoji: "🧒",
    name: "Kid Mode",
    desc: "Explain grown-up ideas to small children. Forces radical simplicity.",
    lessons: [
      {
        id: "interest",
        emoji: "🏦",
        title: "Explain compound interest",
        prompt: "Explain compound interest to a 7-year-old.",
        audience: "Think snacks, toys, piggy banks, and things that grow.",
        audienceWords: ["piggy", "candy", "toy", "grow", "seed", "plant", "snowball", "magic", "extra", "more"],
        forbidden: ["percentage", "principal", "rate", "investment"],
      },
      {
        id: "sky",
        emoji: "☁️",
        title: "Explain the blue sky",
        prompt: "Explain why the sky is blue to a 5-year-old.",
        audience: "They know crayons, bouncy balls, water, and playgrounds.",
        audienceWords: ["bounce", "ball", "crayon", "light", "play", "water", "splash", "tiny", "little", "scatter"],
        forbidden: ["wavelength", "molecules", "scattering", "spectrum"],
      },
      {
        id: "job",
        emoji: "💼",
        title: "Explain your job",
        prompt: "Explain what you do at work to a kindergarten class.",
        audience: "They know helpers, builders, teachers, puzzles, and teams.",
        audienceWords: ["help", "build", "fix", "puzzle", "team", "friend", "make", "share", "story", "game"],
        forbidden: ["stakeholder", "synergy", "deliverable", "KPI"],
      },
    ],
  },
  {
    id: "abstract",
    emoji: "🌀",
    name: "Abstract Mastery",
    desc: "The black belt: make invisible ideas feel concrete.",
    lessons: [
      {
        id: "trust",
        emoji: "🤝",
        title: "Explain trust",
        prompt: "Explain what trust is — without ever using the word \"trust\".",
        audience: "Use a story, a picture, or a moment that makes the feeling land.",
        audienceWords: ["catch", "fall", "promise", "lean", "bridge", "rope", "secret", "safe", "rely", "count on"],
        forbidden: ["trust", "trustworthy", "trusting"],
      },
      {
        id: "irony",
        emoji: "🎭",
        title: "Explain irony",
        prompt: "Explain irony to someone who keeps confusing it with bad luck — and invent your own fresh example.",
        audience: "Your example must NOT involve rain, fire stations, or traffic jams.",
        audienceWords: ["expect", "opposite", "example", "instead", "twist", "imagine", "suppose"],
        forbidden: ["rain", "fire station", "traffic"],
      },
      {
        id: "time",
        emoji: "🦋",
        title: "Explain time",
        prompt: "Explain what a year feels like to a mayfly that lives for exactly one day.",
        audience: "Everything the mayfly knows happens within 24 hours: one sunrise, one sunset.",
        audienceWords: ["sunrise", "sunset", "morning", "noon", "moment", "wing", "river", "day", "light", "dark"],
        forbidden: ["calendar", "months", "weeks"],
      },
    ],
  },
];

const BASELINE_EXERCISE = {
  id: "baseline",
  emoji: "📧",
  title: "Placement test",
  prompt: "Explain how email gets from your computer to a friend on the other side of the world — to your 80-year-old grandmother who has never used a computer.",
  audience: "She knows letters, post offices, mail carriers, and telephones.",
  audienceWords: ["letter", "post", "mail", "envelope", "stamp", "carrier", "telephone", "address", "deliver"],
  forbidden: ["server", "protocol", "router", "SMTP"],
};

const CHECKPOINT_EVERY = 5; // lessons between checkpoint tests
const SKILLS = [
  { key: "analogy", name: "Analogy power", color: "#ff8c1a" },
  { key: "perspective", name: "Perspective-taking", color: "#b98aff" },
  { key: "concreteness", name: "Concreteness", color: "#5ab1ff" },
  { key: "simplicity", name: "Simplicity", color: "#4cd964" },
  { key: "structure", name: "Structure & flow", color: "#ffd23f" },
];

/* ---------------- State ---------------- */

const STORE_KEY = "orenj-v1";

function defaultState() {
  return {
    xp: 0,
    streak: 0,
    lastActiveDay: null,
    completed: {},        // lessonId -> best overall score
    history: [],          // { ts, lessonId, type: 'lesson'|'test', overall, scores:{...} }
    baselineDone: false,
    lessonsSinceTest: 0,
    apiKey: "",
  };
}

let S = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) { /* corrupted state — start fresh */ }
  return defaultState();
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(S)); }

function todayStr() { return new Date().toISOString().slice(0, 10); }

function bumpStreak() {
  const today = todayStr();
  if (S.lastActiveDay === today) return;
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  S.streak = (S.lastActiveDay === yesterday) ? S.streak + 1 : 1;
  S.lastActiveDay = today;
}

function level() { return Math.floor(S.xp / 200) + 1; }

/* ---------------- DOM helpers ---------------- */

const $ = (id) => document.getElementById(id);

function toast(msg, ms = 2600) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), ms);
}

function showScreen(name) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $("screen-" + name).classList.add("active");
  document.querySelectorAll(".tab").forEach((t) =>
    t.classList.toggle("active", t.dataset.screen === name));
  window.scrollTo({ top: 0 });
}

function renderStats() {
  $("stat-xp").textContent = S.xp;
  $("stat-streak").textContent = S.streak;
  $("stat-level").textContent = level();
}

/* ---------------- Home / path ---------------- */

function allLessonsFlat() {
  return UNITS.flatMap((u) => u.lessons.map((l) => ({ ...l, unit: u })));
}

function renderHome() {
  const hero = $("home-hero");
  if (S.baselineDone) {
    hero.classList.add("done");
    hero.innerHTML = `<h1>Keep the streak alive, super-communicator. 🔥</h1>`;
  }

  const flat = allLessonsFlat();
  const firstIncomplete = flat.findIndex((l) => !(l.id in S.completed));
  const path = $("path");
  path.innerHTML = "";

  // Checkpoint test banner when due
  if (S.baselineDone && S.lessonsSinceTest >= CHECKPOINT_EVERY) {
    const banner = document.createElement("div");
    banner.className = "checkpoint-banner";
    banner.innerHTML = `
      <div class="lesson-node">📊</div>
      <div class="lesson-info">
        <div class="lesson-title">Checkpoint test is ready!</div>
        <div class="lesson-meta">Retake the placement challenge to measure your intervention effect.</div>
      </div>`;
    banner.addEventListener("click", () => startExercise(BASELINE_EXERCISE, "test"));
    path.appendChild(banner);
  }

  UNITS.forEach((unit) => {
    const wrap = document.createElement("div");
    wrap.className = "unit";
    wrap.innerHTML = `
      <div class="unit-head">
        <div class="unit-emoji">${unit.emoji}</div>
        <div><div class="unit-name">${unit.name}</div><div class="unit-desc">${unit.desc}</div></div>
      </div>
      <div class="lesson-row"></div>`;
    const row = wrap.querySelector(".lesson-row");

    unit.lessons.forEach((lesson) => {
      const idx = flat.findIndex((l) => l.id === lesson.id);
      const done = lesson.id in S.completed;
      const isNext = idx === firstIncomplete;
      const locked = !done && !isNext;

      const el = document.createElement("div");
      el.className = "lesson" + (done ? " done" : "") + (isNext ? " next" : "") + (locked ? " locked" : "");
      const scoreBadge = done
        ? `<div class="lesson-score ${scoreClass(S.completed[lesson.id])}">${S.completed[lesson.id]}</div>`
        : "";
      el.innerHTML = `
        <div class="lesson-node">${done ? "✅" : locked ? "🔒" : lesson.emoji}</div>
        <div class="lesson-info">
          <div class="lesson-title">${lesson.title}</div>
          <div class="lesson-meta">${lesson.prompt}</div>
        </div>
        ${scoreBadge}`;
      if (!locked) el.addEventListener("click", () => startExercise({ ...lesson, unitName: unit.name, unitEmoji: unit.emoji }, "lesson"));
      row.appendChild(el);
    });
    path.appendChild(wrap);
  });
}

function scoreClass(s) { return s >= 75 ? "good" : s >= 50 ? "mid" : "low"; }

/* ---------------- Exercise flow ---------------- */

let current = null;   // { exercise, mode, startedAt, timerId }

function startExercise(exercise, mode) {
  current = { exercise, mode, startedAt: Date.now() };
  $("ex-unit").textContent = mode === "test" ? "📊 Checkpoint" : (exercise.unitName || "Lesson");
  $("ex-badge").textContent = exercise.emoji;
  $("ex-title").textContent = exercise.title;
  $("ex-prompt").textContent = exercise.prompt;
  $("ex-audience").textContent = "🎯 " + exercise.audience;

  const fb = $("ex-forbidden");
  if (exercise.forbidden && exercise.forbidden.length) {
    fb.innerHTML = `<span class="forbidden-label">Words you can't use:</span>` +
      exercise.forbidden.map((w) => `<span>${w}</span>`).join("");
    fb.style.display = "";
  } else {
    fb.style.display = "none";
  }

  $("ex-input").value = "";
  $("btn-submit").disabled = true;
  $("ex-wordcount").textContent = "0 words";

  clearInterval(current.timerId);
  current.timerId = setInterval(() => {
    const s = Math.floor((Date.now() - current.startedAt) / 1000);
    $("ex-timer").textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }, 1000);
  $("ex-timer").textContent = "0:00";

  showScreen("exercise");
  $("ex-input").focus();
}

function wordCount(text) { return (text.trim().match(/\S+/g) || []).length; }

/* ---------------- Heuristic coaching engine ----------------
   Scores 5 communication techniques 0–100 from the raw text.
   This is the offline fallback; Claude replaces it when a key
   is configured. Deliberately simple — it's a prototype.        */

const ANALOGY_MARKERS = /\b(like|as if|as though|imagine|think of|similar to|just as|akin to|picture|it'?s as|kind of like|sort of like|the way|same as|reminds)\b/gi;
const SENSORY_WORDS = /\b(warm|hot|cold|cool|soft|rough|smooth|sweet|sour|bright|heavy|light|loud|quiet|sticky|sharp|gentle|tingl\w*|buzz\w*|glow\w*|burn\w*|bounc\w*|splash\w*|crackl\w*|hum\w*|pulse|heartbeat|sunshine|sand|honey|velvet|thunder|breeze)\b/gi;
const JARGON_WORDS = /\b(utilize|leverage|paradigm|synerg\w*|bandwidth|optimi[sz]\w*|infrastructure|implementation|functionality|methodology|interface|protocol|algorithm|stakeholder|deliverable|scalab\w*|parameter|configur\w*)\b/gi;

function heuristicAnalysis(text, exercise) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const n = words.length;
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const lower = text.toLowerCase();

  // 1. Analogy
  const analogyHits = (text.match(ANALOGY_MARKERS) || []).length;
  const analogy = clamp(20 + analogyHits * 30, 0, 100);

  // 2. Perspective-taking: second person + listener's-world vocabulary
  const youHits = (lower.match(/\byou(r|'ve|'re|'d)?\b/g) || []).length;
  const worldHits = (exercise.audienceWords || []).filter((w) => lower.includes(w.toLowerCase())).length;
  const perspective = clamp(youHits * 10 + worldHits * 18, 0, 100);

  // 3. Concreteness: sensory/physical words per 50 words
  const sensoryHits = (text.match(SENSORY_WORDS) || []).length;
  const concreteness = clamp(15 + sensoryHits * 22, 0, 100);

  // 4. Simplicity: short words, short sentences, no jargon, no forbidden words
  const avgWordLen = words.reduce((a, w) => a + w.replace(/[^a-zA-Z]/g, "").length, 0) / Math.max(n, 1);
  const avgSentLen = n / Math.max(sentences.length, 1);
  const jargonHits = (text.match(JARGON_WORDS) || []).length;
  const forbiddenUsed = (exercise.forbidden || []).filter((w) =>
    new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(text));
  let simplicity = 100;
  if (avgWordLen > 4.6) simplicity -= (avgWordLen - 4.6) * 22;
  if (avgSentLen > 18) simplicity -= (avgSentLen - 18) * 2.5;
  simplicity -= jargonHits * 15 + forbiddenUsed.length * 20;
  simplicity = clamp(simplicity, 0, 100);

  // 5. Structure: enough substance, sentence variety, not rambling
  let structure = 0;
  if (n >= 15) structure += 35;
  if (n >= 35) structure += 25;
  if (sentences.length >= 3) structure += 25;
  if (n > 150) structure -= 20; // rambling
  const lens = sentences.map((s) => wordCount(s));
  if (lens.length >= 2 && Math.max(...lens) - Math.min(...lens) >= 5) structure += 15; // rhythm variety
  structure = clamp(structure, 0, 100);

  const scores = { analogy, perspective, concreteness, simplicity, structure };
  const overall = Math.round((analogy + perspective + concreteness + simplicity + structure) / 5);

  // --- tips ---
  const strengths = [];
  const improvements = [];

  if (analogyHits >= 2) strengths.push("Strong analogy use — you bridged the unknown with the known more than once.");
  else if (analogyHits === 1) strengths.push("Good instinct reaching for an analogy.");
  else improvements.push("Try an analogy: connect the idea to something your listener already knows (“it's like…”, “imagine…”). Analogies are the #1 tool of great explainers.");

  if (worldHits >= 2) strengths.push("You spoke in your listener's vocabulary — that's real perspective-taking.");
  else improvements.push(`Step into their shoes: ${exercise.audience} Build your explanation from things in THEIR world, not yours.`);
  if (youHits === 0) improvements.push("Address the listener directly (“you”) — it turns a lecture into a conversation.");

  if (sensoryHits >= 2) strengths.push("Nice concrete, sensory language — abstract ideas landed in the body.");
  else improvements.push("Make it physical: things you can touch, feel, or do beat abstract descriptions every time.");

  if (forbiddenUsed.length) improvements.push(`You used forbidden word${forbiddenUsed.length > 1 ? "s" : ""}: “${forbiddenUsed.join("”, “")}”. The constraint exists to push you toward fresher framing.`);
  if (jargonHits) improvements.push("Watch the jargon — every technical term is a small door you close on your listener.");
  if (avgSentLen > 22) improvements.push("Your sentences run long. Short sentences hit harder. Like this.");
  if (n < 15) improvements.push("Too brief to teach — give the idea at least 3–4 sentences of room.");
  if (n > 150) improvements.push("Trim it down: a great explanation is the shortest path to the “aha”, not the most complete one.");

  if (!strengths.length) strengths.push("You showed up and took a swing — that's how the skill gets built.");

  return { scores, overall, strengths: strengths.slice(0, 3), improvements: improvements.slice(0, 4), rewrite: null, source: "built-in coach" };
}

function clamp(v, lo, hi) { return Math.round(Math.min(hi, Math.max(lo, v))); }

/* ---------------- Claude coaching ----------------
   Optional. Calls the Anthropic Messages API directly from the
   browser using a user-supplied key (prototype only — production
   moves this behind a backend). Falls back to heuristics on error. */

const CLAUDE_MODEL = "claude-opus-4-8";

async function claudeAnalysis(text, exercise) {
  const schema = {
    type: "object",
    properties: {
      scores: {
        type: "object",
        properties: {
          analogy: { type: "integer" },
          perspective: { type: "integer" },
          concreteness: { type: "integer" },
          simplicity: { type: "integer" },
          structure: { type: "integer" },
        },
        required: ["analogy", "perspective", "concreteness", "simplicity", "structure"],
        additionalProperties: false,
      },
      overall: { type: "integer" },
      strengths: { type: "array", items: { type: "string" } },
      improvements: { type: "array", items: { type: "string" } },
      rewrite: { type: "string" },
    },
    required: ["scores", "overall", "strengths", "improvements", "rewrite"],
    additionalProperties: false,
  };

  const system = `You are the coach inside Orenj, an app that trains people to become exceptional explainers. Score the user's explanation 0-100 on five techniques: analogy (bridging unknown to known), perspective (building from the listener's world and addressing them directly), concreteness (sensory, physical, tangible language), simplicity (short words, short sentences, zero jargon, respecting forbidden words), structure (a clear path to the "aha" — enough substance, no rambling). "overall" is your holistic 0-100 judgment, not an average. Give 1-3 specific strengths and 1-4 specific, actionable improvements — coach warmly but honestly, like a great teacher, and reference the user's actual wording. "rewrite" is a short model explanation (3-5 sentences) demonstrating the techniques for this exact prompt and audience.`;

  const userMsg = `EXERCISE: ${exercise.prompt}
AUDIENCE: ${exercise.audience}
FORBIDDEN WORDS: ${(exercise.forbidden || []).join(", ") || "none"}

THE USER'S EXPLANATION:
"""
${text}
"""`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": S.apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 2000,
      system,
      output_config: { format: { type: "json_schema", schema } },
      messages: [{ role: "user", content: userMsg }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  if (data.stop_reason === "refusal") throw new Error("Coach declined this one");
  const block = (data.content || []).find((b) => b.type === "text");
  const parsed = JSON.parse(block.text);

  for (const k of Object.keys(parsed.scores)) parsed.scores[k] = clamp(parsed.scores[k], 0, 100);
  return {
    scores: parsed.scores,
    overall: clamp(parsed.overall, 0, 100),
    strengths: parsed.strengths.slice(0, 3),
    improvements: parsed.improvements.slice(0, 4),
    rewrite: parsed.rewrite,
    source: "Claude coach",
  };
}

/* ---------------- Submit & feedback ---------------- */

let lastResult = null;

async function submitExplanation() {
  const text = $("ex-input").value.trim();
  if (wordCount(text) < 5) { toast("Give it at least a sentence or two!"); return; }

  clearInterval(current.timerId);
  $("loading").classList.add("show");
  $("loading-text").textContent = S.apiKey ? "Claude is coaching your explanation…" : "Your coach is reading…";

  let result;
  if (S.apiKey) {
    try {
      result = await claudeAnalysis(text, current.exercise);
    } catch (e) {
      toast("Claude unavailable (" + e.message + ") — using built-in coach");
      result = heuristicAnalysis(text, current.exercise);
    }
  } else {
    result = heuristicAnalysis(text, current.exercise);
  }
  $("loading").classList.remove("show");

  lastResult = result;
  recordResult(result);
  renderFeedback(result);
}

function recordResult(result) {
  const ex = current.exercise;
  const isTest = current.mode === "test";
  const xpGain = Math.max(10, Math.round(result.overall / 2)) + (isTest ? 20 : 0);

  bumpStreak();
  S.xp += xpGain;
  result.xpGain = xpGain;

  if (isTest) {
    S.baselineDone = true;
    S.lessonsSinceTest = 0;
  } else {
    const prev = S.completed[ex.id];
    if (prev === undefined || result.overall > prev) S.completed[ex.id] = result.overall;
    S.lessonsSinceTest += 1;
  }

  S.history.push({
    ts: Date.now(),
    lessonId: ex.id,
    type: isTest ? "test" : "lesson",
    overall: result.overall,
    scores: result.scores,
  });
  save();
  renderStats();
}

function renderFeedback(result) {
  const o = result.overall;
  $("fb-score").textContent = o;
  $("fb-headline").textContent =
    o >= 85 ? "Dangerously good. 🔥" :
    o >= 70 ? "Strong explanation!" :
    o >= 50 ? "Solid — let's sharpen it." :
    "Good rep. Every pro started here.";
  $("fb-xp").textContent = `+${result.xpGain} XP`;
  $("fb-source").textContent = `Feedback by ${result.source}`;

  // ring
  const circ = 2 * Math.PI * 52;
  const ring = $("ring-fg");
  ring.style.stroke = o >= 70 ? "var(--green)" : o >= 50 ? "var(--orange)" : "var(--red)";
  ring.style.strokeDashoffset = circ;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => { ring.style.strokeDashoffset = circ * (1 - o / 100); }));

  renderSkillBars($("fb-bars"), result.scores);

  fillList($("fb-strengths"), result.strengths, $("fb-strengths-wrap"));
  fillList($("fb-improvements"), result.improvements, $("fb-improve-wrap"));

  const rw = $("fb-rewrite-wrap");
  if (result.rewrite) {
    rw.style.display = "";
    $("fb-rewrite").textContent = result.rewrite;
  } else {
    rw.style.display = "none";
  }

  showScreen("feedback");
}

function fillList(ul, items, wrap) {
  if (!items || !items.length) { wrap.style.display = "none"; return; }
  wrap.style.display = "";
  ul.innerHTML = items.map((s) => `<li>${escapeHtml(s)}</li>`).join("");
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderSkillBars(container, scores) {
  container.innerHTML = SKILLS.map((sk) => {
    const v = scores[sk.key] ?? 0;
    return `
      <div class="skill-bar-row">
        <div class="skill-bar-name">${sk.name}</div>
        <div class="skill-bar-track"><div class="skill-bar-fill" data-w="${v}" style="background:${sk.color}"></div></div>
        <div class="skill-bar-val">${v}</div>
      </div>`;
  }).join("");
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      container.querySelectorAll(".skill-bar-fill").forEach((el) => { el.style.width = el.dataset.w + "%"; });
    }));
}

/* ---------------- Progress screen ---------------- */

function renderProgress() {
  const tests = S.history.filter((h) => h.type === "test");
  const lessons = S.history.filter((h) => h.type === "lesson");

  const baseline = tests.length ? tests[0].overall : null;
  const recent = S.history.slice(-3);
  const recentAvg = recent.length ? Math.round(recent.reduce((a, h) => a + h.overall, 0) / recent.length) : null;

  $("pg-baseline").textContent = baseline ?? "—";
  $("pg-current").textContent = recentAvg ?? "—";
  if (baseline !== null && recentAvg !== null) {
    const d = recentAvg - baseline;
    $("pg-delta").textContent = (d >= 0 ? "+" : "") + d;
  } else {
    $("pg-delta").textContent = "—";
  }

  drawChart(S.history);

  // technique breakdown from last 5
  const last5 = S.history.slice(-5);
  const pgBars = $("pg-bars");
  const empty = $("pg-empty");
  if (!last5.length) {
    pgBars.innerHTML = "";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    const avg = {};
    SKILLS.forEach((sk) => {
      avg[sk.key] = Math.round(last5.reduce((a, h) => a + (h.scores[sk.key] || 0), 0) / last5.length);
    });
    renderSkillBars(pgBars, avg);
  }
}

function drawChart(history) {
  const canvas = $("chart");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const padL = 36, padR = 14, padT = 14, padB = 26;

  // gridlines
  ctx.strokeStyle = "#3a3450";
  ctx.fillStyle = "#a79fc4";
  ctx.font = "12px sans-serif";
  ctx.lineWidth = 1;
  [0, 25, 50, 75, 100].forEach((v) => {
    const y = padT + (H - padT - padB) * (1 - v / 100);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    ctx.fillText(String(v), 6, y + 4);
  });

  if (!history.length) {
    ctx.fillStyle = "#5e5878";
    ctx.font = "14px sans-serif";
    ctx.fillText("No data yet — go do an exercise! 🍊", W / 2 - 110, H / 2);
    return;
  }

  const n = history.length;
  const x = (i) => n === 1 ? (padL + W - padR) / 2 : padL + (W - padL - padR) * (i / (n - 1));
  const y = (v) => padT + (H - padT - padB) * (1 - v / 100);

  // line
  ctx.strokeStyle = "#ff8c1a";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  history.forEach((h, i) => { i ? ctx.lineTo(x(i), y(h.overall)) : ctx.moveTo(x(i), y(h.overall)); });
  ctx.stroke();

  // points
  history.forEach((h, i) => {
    ctx.beginPath();
    ctx.arc(x(i), y(h.overall), h.type === "test" ? 6 : 4, 0, Math.PI * 2);
    ctx.fillStyle = h.type === "test" ? "#ffd23f" : "#ff8c1a";
    ctx.fill();
    if (h.type === "test") { ctx.strokeStyle = "#16141f"; ctx.lineWidth = 2; ctx.stroke(); }
  });

  ctx.fillStyle = "#a79fc4";
  ctx.fillText("exercises →", W - 92, H - 8);
}

/* ---------------- Settings ---------------- */

function renderSettings() {
  $("api-key").value = S.apiKey || "";
  const st = $("coach-status");
  if (S.apiKey) {
    st.textContent = "✅ Claude coaching is ON (" + CLAUDE_MODEL + ")";
    st.className = "coach-status on";
  } else {
    st.textContent = "Built-in coach active. Add a key to enable Claude.";
    st.className = "coach-status off";
  }
}

/* ---------------- Wiring ---------------- */

document.querySelectorAll(".tab").forEach((t) =>
  t.addEventListener("click", () => {
    const s = t.dataset.screen;
    if (s === "home") renderHome();
    if (s === "progress") renderProgress();
    if (s === "settings") renderSettings();
    showScreen(s);
  }));

$("brand-home").addEventListener("click", () => { renderHome(); showScreen("home"); });

$("btn-baseline").addEventListener("click", () => startExercise(BASELINE_EXERCISE, "test"));

$("ex-input").addEventListener("input", () => {
  const n = wordCount($("ex-input").value);
  $("ex-wordcount").textContent = n + (n === 1 ? " word" : " words");
  $("btn-submit").disabled = n < 5;
});

$("btn-submit").addEventListener("click", submitExplanation);
$("btn-quit-exercise").addEventListener("click", () => {
  clearInterval(current?.timerId);
  renderHome();
  showScreen("home");
});

$("btn-retry").addEventListener("click", () => startExercise(current.exercise, current.mode));
$("btn-continue").addEventListener("click", () => { renderHome(); showScreen("home"); });

$("btn-save-key").addEventListener("click", () => {
  S.apiKey = $("api-key").value.trim();
  save();
  renderSettings();
  toast(S.apiKey ? "Claude coaching enabled 🤖" : "Key removed");
});
$("btn-clear-key").addEventListener("click", () => {
  S.apiKey = "";
  $("api-key").value = "";
  save();
  renderSettings();
  toast("Key removed — built-in coach active");
});

$("btn-reset").addEventListener("click", () => {
  if (!confirm("Wipe all Orenj progress on this device?")) return;
  const key = S.apiKey;
  S = defaultState();
  S.apiKey = key;
  save();
  renderStats();
  renderHome();
  showScreen("home");
  toast("Fresh start! 🍊");
});

/* ---------------- Boot ---------------- */

renderStats();
renderHome();
