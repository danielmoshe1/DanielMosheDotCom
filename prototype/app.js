/* =========================================================
   Orenj — illustrated edition.
   Duolingo-style trainer for super-communication skills.
   Vanilla JS. All state in localStorage. Art from art.js.
   ========================================================= */
"use strict";

/* ---------------- Curriculum ----------------
   Chapters escalate in difficulty. Early exercises are easy,
   playful and whimsical; later ones get genuinely hard.
   `kind` selects the illustrated audience character.          */

const CHAPTERS = [
  {
    id: "first-contact", emoji: "🛸", name: "First Contact",
    sub: "Easy & playful — explain everyday wonders to a curious alien.",
    lessons: [
      {
        id: "orange", emoji: "🍊", kind: "alien", difficulty: 1,
        title: "Explain an orange",
        prompt: "A friendly alien just landed and has never seen food. Explain what an orange is.",
        audience: "It has no idea what fruit, trees, or eating are — start from zero.",
        audienceWords: ["ball", "round", "tree", "sweet", "juice", "peel", "sun", "skin", "bite", "grow", "wet", "color"],
        forbidden: [],
      },
      {
        id: "dog", emoji: "🐶", kind: "animal", difficulty: 1,
        title: "Explain a dog",
        prompt: "Explain what a dog is to the alien, who has never met any animal.",
        audience: "It understands shapes, movement, and sound but nothing living.",
        audienceWords: ["furry", "friend", "run", "bark", "sound", "warm", "tail", "play", "loyal", "four", "legs"],
        forbidden: [],
      },
      {
        id: "music", emoji: "🎵", kind: "alien", difficulty: 2,
        title: "Explain music",
        prompt: "Explain what music is, and why humans love it, to the alien.",
        audience: "Its species communicates only with flashing lights — sound is new to it.",
        audienceWords: ["pattern", "feel", "happy", "sad", "rhythm", "vibration", "wave", "dance", "color", "light", "repeat"],
        forbidden: [],
      },
      {
        id: "pizza", emoji: "🍕", kind: "alien", difficulty: 2,
        title: "Explain why pizza is delicious",
        prompt: "The alien asks why humans get so excited about pizza. Make it understand the joy.",
        audience: "It eats only grey energy cubes and feels no pleasure from them.",
        audienceWords: ["warm", "melt", "smell", "happy", "share", "soft", "crispy", "treat", "reward", "comfort"],
        forbidden: [],
      },
    ],
  },
  {
    id: "the-senses", emoji: "🌈", name: "The Impossible Senses",
    sub: "Describe sensations to someone who can't experience them.",
    lessons: [
      {
        id: "blue", emoji: "🔵", kind: "abstract", difficulty: 2,
        title: "Explain the color blue",
        prompt: "Explain what the color blue is like to a person blind since birth.",
        audience: "They've never seen color, but know touch, sound, temperature, and feeling.",
        audienceWords: ["cool", "calm", "water", "cold", "quiet", "deep", "sky", "feel", "ocean", "breeze", "still"],
        forbidden: ["see", "look", "bright", "light"],
      },
      {
        id: "laughter", emoji: "😂", kind: "robot", difficulty: 3,
        title: "Explain laughter",
        prompt: "Explain why humans laugh to a logical robot that finds it baffling.",
        audience: "It thinks in signals, patterns, and errors. Why this strange noise?",
        audienceWords: ["surprise", "pattern", "expect", "signal", "social", "bond", "release", "safe", "joy", "tension"],
        forbidden: [],
      },
      {
        id: "lava", emoji: "🌋", kind: "abstract", difficulty: 3,
        title: "Explain feeling cold",
        prompt: "Explain what feeling cold is like to a creature that has lived its whole life inside a volcano.",
        audience: "It only knows heat. Cold is a completely foreign idea.",
        audienceWords: ["slow", "still", "shiver", "tight", "sharp", "less", "drain", "numb", "absence", "shrink"],
        forbidden: ["hot", "warm", "fire"],
      },
      {
        id: "hug", emoji: "🤗", kind: "robot", difficulty: 3,
        title: "Explain a hug",
        prompt: "Explain what a hug feels like, and why it helps, to a robot with no body.",
        audience: "It has sensors and logic but has never been touched.",
        audienceWords: ["pressure", "warm", "safe", "close", "calm", "signal", "care", "held", "gentle", "comfort"],
        forbidden: [],
      },
    ],
  },
  {
    id: "contraptions", emoji: "⚙️", name: "Curious Contraptions",
    sub: "Translate modern marvels into worlds that never had them.",
    lessons: [
      {
        id: "internet", emoji: "🌐", kind: "ancient", difficulty: 3,
        title: "Explain the internet",
        prompt: "Explain the internet to a knight from the year 1300.",
        audience: "They know messengers, libraries, castles, markets, and town criers.",
        audienceWords: ["messenger", "library", "scroll", "market", "town", "crier", "letter", "road", "kingdom", "instantly", "everywhere"],
        forbidden: ["computer", "wifi", "online", "digital"],
      },
      {
        id: "phone", emoji: "📱", kind: "ancient", difficulty: 3,
        title: "Explain a smartphone",
        prompt: "Explain a smartphone to a caveman.",
        audience: "They know fire, stone tools, drawings on walls, and shouting across a valley.",
        audienceWords: ["stone", "draw", "fire", "talk", "far", "magic", "picture", "remember", "carry", "shiny", "voice"],
        forbidden: ["app", "screen", "battery", "internet"],
      },
      {
        id: "bicycle", emoji: "🚲", kind: "child", difficulty: 4,
        title: "Explain a bicycle by phone",
        prompt: "Over the phone, teach a friend who's never seen one how to picture and ride a bicycle. No gestures allowed.",
        audience: "They can only hear your words — every spatial detail must be spoken.",
        audienceWords: ["balance", "pedal", "wheel", "lean", "push", "circle", "spin", "steer", "forward", "two"],
        forbidden: [],
      },
      {
        id: "shoes", emoji: "👟", kind: "fish", difficulty: 4,
        title: "Explain shoes",
        prompt: "Explain what shoes are and why humans wear them to a fish.",
        audience: "It has never left the water, has no feet, and has never touched dry ground.",
        audienceWords: ["protect", "feet", "ground", "hard", "rough", "shell", "soft", "walk", "cover", "rocks"],
        forbidden: [],
      },
    ],
  },
  {
    id: "big-feelings", emoji: "💜", name: "Big Feelings",
    sub: "Make invisible, abstract ideas feel real.",
    lessons: [
      {
        id: "love", emoji: "❤️", kind: "robot", difficulty: 4,
        title: "Explain love",
        prompt: "Explain what love is to a calculator that only understands numbers.",
        audience: "It processes math perfectly but has never felt anything.",
        audienceWords: ["choose", "matter", "protect", "warm", "give", "miss", "without", "more", "always", "care"],
        forbidden: [],
      },
      {
        id: "boredom", emoji: "🥱", kind: "fish", difficulty: 4,
        title: "Explain boredom",
        prompt: "Explain what being bored feels like to a goldfish with a famously short memory.",
        audience: "Every moment is brand new to it — nothing ever feels stale.",
        audienceWords: ["slow", "same", "wait", "empty", "stuck", "nothing", "drag", "restless", "long", "itch"],
        forbidden: [],
      },
      {
        id: "happycry", emoji: "🥹", kind: "child", difficulty: 4,
        title: "Explain happy tears",
        prompt: "Explain to a child why grown-ups sometimes cry when they're happy.",
        audience: "They think crying only means something is wrong.",
        audienceWords: ["full", "heart", "overflow", "big", "feeling", "love", "happy", "spill", "too much", "good"],
        forbidden: [],
      },
      {
        id: "mayfly", emoji: "🦋", kind: "abstract", difficulty: 5,
        title: "Explain a whole year",
        prompt: "Explain what a year feels like to a mayfly that lives for exactly one day.",
        audience: "Everything it knows happens between one sunrise and one sunset.",
        audienceWords: ["sunrise", "sunset", "morning", "noon", "moment", "river", "many", "lifetime", "again", "season"],
        forbidden: ["calendar", "months", "weeks"],
      },
    ],
  },
  {
    id: "mind-benders", emoji: "🌀", name: "Mind Benders",
    sub: "Hard mode — concepts that resist easy explanation.",
    lessons: [
      {
        id: "zero", emoji: "0️⃣", kind: "ancient", difficulty: 5,
        title: "Explain the number zero",
        prompt: "Explain the concept of zero to an ancient Roman whose numerals have no symbol for nothing.",
        audience: "They count I, II, III… the idea of 'a number for nothing' seems absurd.",
        audienceWords: ["empty", "none", "place", "holder", "nothing", "absence", "count", "gap", "still", "without"],
        forbidden: [],
      },
      {
        id: "dream", emoji: "💭", kind: "robot", difficulty: 5,
        title: "Explain a dream",
        prompt: "Explain what a dream is to a being that has never slept.",
        audience: "It runs continuously and has never lost awareness or made up a world in its head.",
        audienceWords: ["story", "mind", "imagine", "real", "wake", "strange", "movie", "inside", "control", "fade"],
        forbidden: ["sleep", "rest"],
      },
      {
        id: "spicy", emoji: "🌶️", kind: "abstract", difficulty: 5,
        title: "Explain spicy",
        prompt: "Explain what eating something spicy feels like to someone with no sense of taste or smell.",
        audience: "They know touch, temperature, and pain — but flavor means nothing.",
        audienceWords: ["heat", "burn", "tingle", "sunburn", "skin", "sweat", "sharp", "glow", "sting", "alive"],
        forbidden: ["flavor", "taste", "delicious"],
      },
      {
        id: "color-math", emoji: "🎨", kind: "robot", difficulty: 5,
        title: "Explain color to a colorblind robot",
        prompt: "A robot sees only in greyscale but understands math and feelings. Help it truly grasp what 'red' is.",
        audience: "Numbers it gets instantly — but it wants to feel what red means to humans.",
        audienceWords: ["warm", "loud", "alarm", "energy", "blood", "fast", "passion", "stop", "heat", "strong"],
        forbidden: [],
      },
    ],
  },
  {
    id: "summit", emoji: "⛰️", name: "The Summit",
    sub: "Master class — the hardest ideas of all.",
    lessons: [
      {
        id: "trust", emoji: "🤝", kind: "abstract", difficulty: 5,
        title: "Explain trust",
        prompt: "Explain what trust is — without ever using the word \"trust\".",
        audience: "Use a story, a picture, or a single moment that makes the feeling land.",
        audienceWords: ["catch", "fall", "lean", "promise", "bridge", "rope", "safe", "rely", "count", "back"],
        forbidden: ["trust", "trusting", "trustworthy"],
      },
      {
        id: "irony", emoji: "🎭", kind: "child", difficulty: 5,
        title: "Explain irony",
        prompt: "Explain irony to someone who keeps confusing it with bad luck — and invent your own fresh example.",
        audience: "Your example must NOT involve rain, fire stations, or traffic jams.",
        audienceWords: ["expect", "opposite", "instead", "twist", "imagine", "suppose", "example", "exactly"],
        forbidden: ["rain", "fire station", "traffic"],
      },
      {
        id: "consciousness", emoji: "✨", kind: "robot", difficulty: 5,
        title: "Explain being conscious",
        prompt: "Explain to an AI what it's like to actually experience being you — the feeling of being aware.",
        audience: "It processes information but isn't sure whether it experiences anything at all.",
        audienceWords: ["inside", "feel", "aware", "present", "experience", "self", "now", "alive", "witness", "more"],
        forbidden: [],
      },
      {
        id: "human", emoji: "🌍", kind: "alien", difficulty: 5,
        title: "Explain being human",
        prompt: "The alien is leaving and will report back what humans are. In a few sentences, capture what it's truly like to be one.",
        audience: "This is the whole species summed up for a visitor who'll never return. Make it count.",
        audienceWords: ["love", "fear", "hope", "story", "together", "fragile", "wonder", "small", "matter", "fleeting", "feel"],
        forbidden: [],
      },
    ],
  },
];

const SKILLS = [
  { key: "analogy", name: "Analogy power", color: "#ff8c1a" },
  { key: "perspective", name: "Perspective-taking", color: "#9d6bff" },
  { key: "concreteness", name: "Concreteness", color: "#4cc4ff" },
  { key: "simplicity", name: "Simplicity", color: "#3fbf63" },
  { key: "structure", name: "Structure & flow", color: "#ffcb3d" },
];

const ACHIEVEMENTS = [
  { id: "first_contact", emoji: "🛸", name: "First Contact", desc: "Finish your first explanation", test: (s) => Object.keys(s.completed).length >= 1 },
  { id: "wordsmith", emoji: "🪄", name: "Wordsmith", desc: "Score 90 or higher", test: (s) => s.history.some((h) => h.overall >= 90) },
  { id: "flawless", emoji: "💎", name: "Flawless", desc: "Score 98+", test: (s) => s.history.some((h) => h.overall >= 98) },
  { id: "streak3", emoji: "🔥", name: "On Fire", desc: "Keep a 3-day streak", test: (s) => s.streak >= 3 },
  { id: "combo3", emoji: "⚡", name: "In the Zone", desc: "3 great scores in a row", test: (s) => s.bestCombo >= 3 },
  { id: "chapter1", emoji: "🌟", name: "Made Contact", desc: "Clear all of First Contact", test: (s) => chapterDone(s, "first-contact") },
  { id: "senses", emoji: "🌈", name: "Sixth Sense", desc: "Clear The Impossible Senses", test: (s) => chapterDone(s, "the-senses") },
  { id: "explorer", emoji: "🗺️", name: "Explorer", desc: "Finish 10 exercises", test: (s) => Object.keys(s.completed).length >= 10 },
  { id: "summit", emoji: "⛰️", name: "Summiteer", desc: "Reach the final chapter", test: (s) => CHAPTERS[CHAPTERS.length - 1].lessons.some((l) => l.id in s.completed) },
  { id: "claude", emoji: "🤖", name: "Power Coached", desc: "Connect the Claude coach", test: (s) => !!s.apiKey },
  { id: "polyglot", emoji: "👑", name: "Super-Communicator", desc: "Finish every exercise", test: (s) => allLessons().every((l) => l.id in s.completed) },
];

function allLessons() { return CHAPTERS.flatMap((c) => c.lessons.map((l) => ({ ...l, chapter: c }))); }
function chapterDone(s, cid) {
  const c = CHAPTERS.find((x) => x.id === cid);
  return c.lessons.every((l) => l.id in s.completed);
}

/* ---------------- State ---------------- */

const STORE_KEY = "orenj-v2";

function defaultState() {
  return {
    xp: 0, streak: 0, lastActiveDay: null,
    completed: {},        // lessonId -> best score
    stars: {},            // lessonId -> stars (1-3)
    history: [],          // { ts, lessonId, overall, scores }
    combo: 0, bestCombo: 0,
    achievements: {},
    apiKey: "",
  };
}

let S = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) { /* corrupted — fresh start */ }
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
function totalStars() { return Object.values(S.stars).reduce((a, b) => a + b, 0); }

/* ---------------- DOM helpers ---------------- */

const $ = (id) => document.getElementById(id);

function toast(msg, ms = 2800) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), ms);
}
function showScreen(name) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $("screen-" + name).classList.add("active");
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.screen === name));
  window.scrollTo({ top: 0 });
}
function renderStats() {
  $("stat-xp").textContent = S.xp;
  $("stat-streak").textContent = S.streak;
  $("stat-stars").textContent = totalStars();
  $("stat-level").textContent = level();
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------------- World map ---------------- */

function renderHome() {
  const flat = allLessons();
  const firstIncomplete = flat.findIndex((l) => !(l.id in S.completed));
  const nextIndex = firstIncomplete === -1 ? flat.length - 1 : firstIncomplete;

  // layout
  const topPad = 90, step = 138, chapterGap = 96;
  const layout = [];           // { lesson, xPct, y }
  const banners = [];          // { chapter, y }
  let y = topPad, lastChapter = null;
  flat.forEach((lesson, i) => {
    if (lesson.chapter.id !== lastChapter) {
      if (lastChapter !== null) y += chapterGap;
      banners.push({ chapter: lesson.chapter, y: y - 56 });
      lastChapter = lesson.chapter.id;
    }
    const xPct = 50 + 27 * Math.sin(i * 1.05 + 0.4);
    layout.push({ lesson, xPct, y, index: i });
    y += step;
  });
  const totalH = y + 120;

  const world = $("world");
  world.style.height = totalH + "px";

  // stars + fireflies + decor
  buildSky(totalH);

  // path
  const svg = $("world-path");
  svg.setAttribute("viewBox", `0 0 100 ${totalH}`);
  svg.setAttribute("height", totalH);
  const d = layout.map((p, i) => `${i ? "L" : "M"} ${p.xPct.toFixed(2)} ${p.y}`).join(" ");
  svg.innerHTML = `<path class="path-trail" d="${d}"/>`;

  // nodes + banners
  const nodes = $("world-nodes");
  nodes.style.height = totalH + "px";
  let html = "";

  banners.forEach((b) => {
    html += `<div class="chapter-banner" style="top:${b.y}px">
      <div class="cb-emoji">${b.chapter.emoji}</div>
      <div class="cb-name">${b.chapter.name}</div>
      <div class="cb-sub">${b.chapter.sub}</div>
    </div>`;
  });

  layout.forEach((p) => {
    const l = p.lesson;
    const done = l.id in S.completed;
    const isNext = p.index === nextIndex;
    const locked = !done && !isNext;
    const stars = S.stars[l.id] || 0;
    const starStr = done ? "★".repeat(stars) + "☆".repeat(3 - stars) : "";
    html += `<div class="node ${done ? "done" : ""} ${isNext ? "next" : ""} ${locked ? "locked" : ""}"
        style="left:${p.xPct}%;top:${p.y}px" data-id="${l.id}">
      ${isNext ? `<div class="node-tip">${done ? "Replay" : "Start"}</div>` : ""}
      <div class="node-disc">${locked ? "🔒" : (done ? "✓" : l.emoji)}</div>
      <div class="node-stars">${starStr}</div>
      <div class="node-label">${l.title}</div>
    </div>`;
  });

  // Pip rides the current target node
  const cur = layout[nextIndex];
  html += `<div class="pip-map" style="left:${cur.xPct}%;top:${cur.y - 44}px">${ART.pip("happy")}</div>`;

  nodes.innerHTML = html;

  nodes.querySelectorAll(".node:not(.locked)").forEach((el) => {
    el.addEventListener("click", () => {
      const lesson = flat.find((l) => l.id === el.dataset.id);
      startExercise(lesson);
    });
  });
}

function buildSky(totalH) {
  const stars = $("world-stars");
  if (stars.dataset.built === "1") return;     // build once
  stars.dataset.built = "1";
  let s = "";
  // stars concentrated near the top (cosmos)
  for (let i = 0; i < 70; i++) {
    const top = Math.random() * (totalH * 0.5);
    s += `<i style="left:${(Math.random() * 100).toFixed(1)}%;top:${top.toFixed(0)}px;animation-delay:${(Math.random() * 3).toFixed(1)}s"></i>`;
  }
  stars.innerHTML = s;

  const decor = $("world-decor");
  let d = `<div class="moon" style="top:${(totalH * 0.16).toFixed(0)}px"></div>`;
  // mountain ranges in the mid-section
  d += `<div class="decor-layer" style="top:${(totalH * 0.5).toFixed(0)}px;height:240px;opacity:.85">${ART.mountainLayer("#5b3a73")}</div>`;
  d += `<div class="decor-layer" style="top:${(totalH * 0.58).toFixed(0)}px;height:200px;opacity:.9">${ART.mountainLayer("#7a4a6e")}</div>`;
  // clouds drifting mid
  d += `<div class="decor-layer" style="top:${(totalH * 0.42).toFixed(0)}px;left:8%;width:160px;opacity:.85">${ART.cloud()}</div>`;
  d += `<div class="decor-layer" style="top:${(totalH * 0.46).toFixed(0)}px;left:62%;width:130px;opacity:.7">${ART.cloud()}</div>`;
  // hills near the bottom (lush meadow)
  d += `<div class="decor-layer" style="bottom:60px;height:200px">${ART.hillLayer("#5fae45")}</div>`;
  d += `<div class="decor-layer" style="bottom:0;height:170px">${ART.hillLayer("#3f8f33")}</div>`;
  // fireflies near the bottom
  for (let i = 0; i < 14; i++) {
    d += `<div class="firefly" style="left:${(Math.random() * 100).toFixed(1)}%;top:${(totalH * 0.72 + Math.random() * totalH * 0.26).toFixed(0)}px;animation-delay:${(Math.random() * 7).toFixed(1)}s"></div>`;
  }
  decor.innerHTML = d;
}

/* ---------------- Exercise flow ---------------- */

let current = null;

function startExercise(lesson) {
  current = { lesson, startedAt: Date.now() };
  $("ex-aud").innerHTML = ART.audience(lesson.kind);
  $("ex-pip").innerHTML = ART.pip("happy");
  $("ex-diff").textContent = "★".repeat(lesson.difficulty) + "☆".repeat(5 - lesson.difficulty);
  $("ex-title").textContent = lesson.title;
  $("ex-prompt").textContent = lesson.prompt;
  $("ex-audience").textContent = "🎯 " + lesson.audience;

  const fb = $("ex-forbidden");
  if (lesson.forbidden && lesson.forbidden.length) {
    fb.innerHTML = `<span class="forbidden-label">Words you can't use:</span>` +
      lesson.forbidden.map((w) => `<span>${escapeHtml(w)}</span>`).join("");
    fb.style.display = "";
  } else { fb.style.display = "none"; }

  $("ex-input").value = "";
  $("btn-submit").disabled = true;
  $("ex-wordcount").textContent = "0 words";

  clearInterval(current.timerId);
  $("ex-timer").textContent = "0:00";
  current.timerId = setInterval(() => {
    const s = Math.floor((Date.now() - current.startedAt) / 1000);
    $("ex-timer").textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }, 1000);

  showScreen("exercise");
  $("ex-input").focus();
}

function wordCount(text) { return (text.trim().match(/\S+/g) || []).length; }

/* ---------------- Heuristic coach (offline) ---------------- */

const ANALOGY_MARKERS = /\b(like|as if|as though|imagine|think of|similar to|just as|akin to|picture|it'?s as|kind of like|sort of like|the way|same as|reminds|suppose)\b/gi;
const SENSORY_WORDS = /\b(warm|hot|cold|cool|soft|rough|smooth|sweet|sour|bright|heavy|light|loud|quiet|sticky|sharp|gentle|tingl\w*|buzz\w*|glow\w*|burn\w*|bounc\w*|splash\w*|crackl\w*|hum\w*|pulse|heartbeat|sunshine|sand|honey|velvet|thunder|breeze|melt\w*|crispy|juic\w*)\b/gi;
const JARGON_WORDS = /\b(utilize|leverage|paradigm|synerg\w*|bandwidth|optimi[sz]\w*|infrastructure|implementation|functionality|methodology|interface|protocol|algorithm|stakeholder|deliverable|scalab\w*|parameter|configur\w*)\b/gi;

function clamp(v, lo, hi) { return Math.round(Math.min(hi, Math.max(lo, v))); }

function heuristicAnalysis(text, lesson) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const n = words.length;
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const lower = text.toLowerCase();

  const analogyHits = (text.match(ANALOGY_MARKERS) || []).length;
  const analogy = clamp(20 + analogyHits * 30, 0, 100);

  const youHits = (lower.match(/\byou(r|'ve|'re|'d)?\b/g) || []).length;
  const worldHits = (lesson.audienceWords || []).filter((w) => lower.includes(w.toLowerCase())).length;
  const perspective = clamp(youHits * 10 + worldHits * 18, 0, 100);

  const sensoryHits = (text.match(SENSORY_WORDS) || []).length;
  const concreteness = clamp(15 + sensoryHits * 22, 0, 100);

  const avgWordLen = words.reduce((a, w) => a + w.replace(/[^a-zA-Z]/g, "").length, 0) / Math.max(n, 1);
  const avgSentLen = n / Math.max(sentences.length, 1);
  const jargonHits = (text.match(JARGON_WORDS) || []).length;
  const forbiddenUsed = (lesson.forbidden || []).filter((w) =>
    new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(text));
  let simplicity = 100;
  if (avgWordLen > 4.6) simplicity -= (avgWordLen - 4.6) * 22;
  if (avgSentLen > 18) simplicity -= (avgSentLen - 18) * 2.5;
  simplicity -= jargonHits * 15 + forbiddenUsed.length * 20;
  simplicity = clamp(simplicity, 0, 100);

  let structure = 0;
  if (n >= 15) structure += 35;
  if (n >= 35) structure += 25;
  if (sentences.length >= 3) structure += 25;
  if (n > 150) structure -= 20;
  const lens = sentences.map((s) => wordCount(s));
  if (lens.length >= 2 && Math.max(...lens) - Math.min(...lens) >= 5) structure += 15;
  structure = clamp(structure, 0, 100);

  const scores = { analogy, perspective, concreteness, simplicity, structure };
  const overall = Math.round((analogy + perspective + concreteness + simplicity + structure) / 5);

  const strengths = [], improvements = [];
  if (analogyHits >= 2) strengths.push("Strong analogy use — you bridged the unknown with the known more than once.");
  else if (analogyHits === 1) strengths.push("Good instinct reaching for an analogy.");
  else improvements.push("Try an analogy: connect the idea to something the listener already knows (“it's like…”, “imagine…”). Analogies are the #1 tool of great explainers.");

  if (worldHits >= 2) strengths.push("You spoke in your listener's vocabulary — that's real perspective-taking.");
  else improvements.push(`Step into their shoes: ${lesson.audience} Build from things in THEIR world.`);
  if (youHits === 0) improvements.push("Address the listener directly (“you”) — it turns a lecture into a conversation.");

  if (sensoryHits >= 2) strengths.push("Lovely concrete, sensory language — the idea landed in the body, not just the head.");
  else improvements.push("Make it physical: things you can touch, feel, or do beat abstract descriptions every time.");

  if (forbiddenUsed.length) improvements.push(`You used forbidden word${forbiddenUsed.length > 1 ? "s" : ""}: “${forbiddenUsed.join("”, “")}”. The constraint exists to push you somewhere fresher.`);
  if (jargonHits) improvements.push("Watch the jargon — every technical term is a door you close on your listener.");
  if (avgSentLen > 22) improvements.push("Your sentences run long. Short sentences hit harder. Like this.");
  if (n < 15) improvements.push("Too brief to teach — give the idea at least 3–4 sentences of room.");
  if (n > 150) improvements.push("Trim it: a great explanation is the shortest path to the “aha”, not the most complete one.");

  if (!strengths.length) strengths.push("You showed up and took a swing — that's how the skill is built.");

  return { scores, overall, strengths: strengths.slice(0, 3), improvements: improvements.slice(0, 4), rewrite: null, source: "Pip's built-in coach" };
}

/* ---------------- Claude coach (optional) ---------------- */

const CLAUDE_MODEL = "claude-opus-4-8";

async function claudeAnalysis(text, lesson) {
  const schema = {
    type: "object",
    properties: {
      scores: {
        type: "object",
        properties: {
          analogy: { type: "integer" }, perspective: { type: "integer" },
          concreteness: { type: "integer" }, simplicity: { type: "integer" }, structure: { type: "integer" },
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

  const system = `You are Pip, the warm, playful coach inside Orenj — an app that trains people to become exceptional explainers. Score the user's explanation 0-100 on five techniques: analogy (bridging unknown to known), perspective (building from the listener's world and addressing them directly), concreteness (sensory, physical, tangible language), simplicity (short words and sentences, zero jargon, respecting forbidden words), structure (a clear path to the "aha" — enough substance, no rambling). "overall" is your holistic 0-100 judgment, not an average. Give 1-3 specific strengths and 1-4 specific, actionable improvements; coach warmly but honestly, like a great teacher, and quote the user's actual wording. "rewrite" is a short model explanation (3-5 sentences) demonstrating the techniques for this exact prompt and audience.`;

  const userMsg = `EXERCISE: ${lesson.prompt}
AUDIENCE: ${lesson.audience}
FORBIDDEN WORDS: ${(lesson.forbidden || []).join(", ") || "none"}

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
      model: CLAUDE_MODEL, max_tokens: 2000, system,
      output_config: { format: { type: "json_schema", schema } },
      messages: [{ role: "user", content: userMsg }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }
  const data = await res.json();
  if (data.stop_reason === "refusal") throw new Error("coach declined this one");
  const block = (data.content || []).find((b) => b.type === "text");
  const parsed = JSON.parse(block.text);
  for (const k of Object.keys(parsed.scores)) parsed.scores[k] = clamp(parsed.scores[k], 0, 100);
  return {
    scores: parsed.scores, overall: clamp(parsed.overall, 0, 100),
    strengths: parsed.strengths.slice(0, 3), improvements: parsed.improvements.slice(0, 4),
    rewrite: parsed.rewrite, source: "Claude coach",
  };
}

/* ---------------- Submit & feedback ---------------- */

async function submitExplanation() {
  const text = $("ex-input").value.trim();
  if (wordCount(text) < 5) { toast("Give it at least a sentence or two!"); return; }

  clearInterval(current.timerId);
  $("loading-pip").innerHTML = ART.pip("think");
  $("loading-text").textContent = S.apiKey ? "Claude is coaching your words…" : "Pip is reading your explanation…";
  $("loading").classList.add("show");

  let result;
  if (S.apiKey) {
    try { result = await claudeAnalysis(text, current.lesson); }
    catch (e) { toast("Claude unavailable (" + e.message + ") — using Pip's coach"); result = heuristicAnalysis(text, current.lesson); }
  } else {
    await new Promise((r) => setTimeout(r, 650)); // small beat so the loader reads as "thinking"
    result = heuristicAnalysis(text, current.lesson);
  }
  $("loading").classList.remove("show");

  recordResult(result);
  renderFeedback(result);
}

function starsFor(score) { return score >= 88 ? 3 : score >= 70 ? 2 : 1; }

function recordResult(result) {
  const l = current.lesson;
  const o = result.overall;
  const xpGain = Math.max(12, Math.round(o / 2)) + (o >= 85 ? 15 : 0);
  result.xpGain = xpGain;

  bumpStreak();
  const prevLevel = level();
  S.xp += xpGain;

  // combo: consecutive scores >= 70
  if (o >= 70) { S.combo += 1; S.bestCombo = Math.max(S.bestCombo, S.combo); }
  else S.combo = 0;
  result.combo = S.combo;

  const prev = S.completed[l.id];
  if (prev === undefined || o > prev) S.completed[l.id] = o;
  const st = starsFor(o);
  if (!S.stars[l.id] || st > S.stars[l.id]) S.stars[l.id] = st;
  result.stars = S.stars[l.id];

  S.history.push({ ts: Date.now(), lessonId: l.id, overall: o, scores: result.scores });
  save();
  renderStats();

  result.newAchievements = checkAchievements();
  result.levelUp = level() > prevLevel ? level() : null;
}

function checkAchievements() {
  const newly = [];
  ACHIEVEMENTS.forEach((a) => {
    if (!S.achievements[a.id] && a.test(S)) { S.achievements[a.id] = true; newly.push(a); }
  });
  if (newly.length) save();
  return newly;
}

function renderFeedback(result) {
  const o = result.overall;
  $("fb-pip").innerHTML = ART.pip(o >= 85 ? "cheer" : o >= 60 ? "happy" : "encourage");
  $("fb-headline").textContent =
    o >= 90 ? "Dangerously good! 🔥" :
    o >= 75 ? "Brilliant explanation!" :
    o >= 55 ? "Nice — let's sharpen it." :
    "Good rep. Every master started here.";
  $("fb-xp").textContent = `+${result.xpGain} Sparks`;
  $("fb-source").textContent = `Feedback by ${result.source}`;

  // stars
  const sw = $("fb-stars");
  sw.innerHTML = [1, 2, 3].map((i) => `<span class="st" data-i="${i}">★</span>`).join("");
  sw.querySelectorAll(".st").forEach((el, i) => {
    if (i < result.stars) setTimeout(() => el.classList.add("on"), 250 + i * 220);
  });

  // ring
  const circ = 2 * Math.PI * 52;
  const ring = $("ring-fg");
  ring.style.stroke = o >= 70 ? "var(--leaf)" : o >= 50 ? "var(--orange)" : "var(--berry)";
  ring.style.strokeDashoffset = circ;
  $("fb-score").textContent = "0";
  animateCount($("fb-score"), o, 900);
  requestAnimationFrame(() => requestAnimationFrame(() => { ring.style.strokeDashoffset = circ * (1 - o / 100); }));

  // combo box
  const cb = $("combo-box");
  cb.innerHTML = result.combo >= 2
    ? `<div class="combo-flame">🔥 ${result.combo} in a row!</div>Keep the streak of 70+ scores alive for bonus momentum.`
    : `Score 70+ to start a combo streak. Aim for analogy + their world + something you can feel.`;

  renderSkillBars($("fb-bars"), result.scores);
  fillList($("fb-strengths"), result.strengths, $("fb-strengths-wrap"));
  fillList($("fb-improvements"), result.improvements, $("fb-improve-wrap"));

  const rw = $("fb-rewrite-wrap");
  if (result.rewrite) { rw.style.display = ""; $("fb-rewrite").textContent = result.rewrite; }
  else rw.style.display = "none";

  showScreen("feedback");

  if (o >= 70) burstConfetti(o >= 88 ? 60 : 30);
  if (result.newAchievements && result.newAchievements.length) {
    let delay = 900;
    result.newAchievements.forEach((a) => { setTimeout(() => toast(`${a.emoji} Achievement: ${a.name}!`), delay); delay += 2200; });
  }
  if (result.levelUp) setTimeout(() => showLevelUp(result.levelUp), 1100);
}

function animateCount(el, target, ms) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / ms);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function fillList(ul, items, wrap) {
  if (!items || !items.length) { wrap.style.display = "none"; return; }
  wrap.style.display = "";
  ul.innerHTML = items.map((s) => `<li>${escapeHtml(s)}</li>`).join("");
}

function renderSkillBars(container, scores) {
  container.innerHTML = SKILLS.map((sk) => {
    const v = scores[sk.key] ?? 0;
    return `<div class="skill-bar-row">
      <div class="skill-bar-name">${sk.name}</div>
      <div class="skill-bar-track"><div class="skill-bar-fill" data-w="${v}" style="background:${sk.color}"></div></div>
      <div class="skill-bar-val">${v}</div>
    </div>`;
  }).join("");
  requestAnimationFrame(() => requestAnimationFrame(() => {
    container.querySelectorAll(".skill-bar-fill").forEach((el) => { el.style.width = el.dataset.w + "%"; });
  }));
}

function burstConfetti(count) {
  const colors = ["#ff8c1a", "#ffcb3d", "#ff5d8f", "#9d6bff", "#4cc4ff", "#3fbf63"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = (1.6 + Math.random() * 1.4) + "s";
    c.style.animationDelay = (Math.random() * 0.3) + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3400);
  }
}

function showLevelUp(lvl) {
  $("levelup-pip").innerHTML = ART.pip("cheer");
  $("levelup-title").textContent = `Level ${lvl}!`;
  $("levelup-sub").textContent = "Pip is so proud. Your communication powers are growing. 🌱";
  $("levelup").classList.add("show");
  burstConfetti(80);
}

/* ---------------- Growth screen ---------------- */

function renderProgress() {
  const h = S.history;
  const baseline = h.length ? h[0].overall : null;
  const recent = h.slice(-3);
  const recentAvg = recent.length ? Math.round(recent.reduce((a, x) => a + x.overall, 0) / recent.length) : null;

  $("pg-baseline").textContent = baseline ?? "—";
  $("pg-current").textContent = recentAvg ?? "—";
  if (baseline !== null && recentAvg !== null && h.length >= 2) {
    const d = recentAvg - baseline;
    $("pg-delta").textContent = (d >= 0 ? "+" : "") + d;
  } else $("pg-delta").textContent = "—";

  drawChart(h);

  const last5 = h.slice(-5);
  const empty = $("pg-empty");
  if (!last5.length) {
    $("pg-bars").innerHTML = "";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    const avg = {};
    SKILLS.forEach((sk) => { avg[sk.key] = Math.round(last5.reduce((a, x) => a + (x.scores[sk.key] || 0), 0) / last5.length); });
    renderSkillBars($("pg-bars"), avg);
  }

  // achievements
  $("ach-grid").innerHTML = ACHIEVEMENTS.map((a) => {
    const got = !!S.achievements[a.id];
    return `<div class="ach ${got ? "unlocked" : "locked"}">
      <div class="ach-emoji">${got ? a.emoji : "🔒"}</div>
      <div><div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div>
    </div>`;
  }).join("");
}

function drawChart(history) {
  const canvas = $("chart");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const padL = 34, padR = 14, padT = 14, padB = 24;

  ctx.strokeStyle = "#eadcc4"; ctx.fillStyle = "#a99fb8"; ctx.font = "12px Nunito, sans-serif"; ctx.lineWidth = 1;
  [0, 25, 50, 75, 100].forEach((v) => {
    const y = padT + (H - padT - padB) * (1 - v / 100);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    ctx.fillText(String(v), 6, y + 4);
  });

  if (!history.length) {
    ctx.fillStyle = "#b5acc2"; ctx.font = "14px Nunito, sans-serif";
    ctx.fillText("No data yet — go explain something! 🍊", W / 2 - 120, H / 2);
    return;
  }

  const n = history.length;
  const x = (i) => n === 1 ? (padL + W - padR) / 2 : padL + (W - padL - padR) * (i / (n - 1));
  const y = (v) => padT + (H - padT - padB) * (1 - v / 100);

  // area fill
  const grad = ctx.createLinearGradient(0, padT, 0, H - padB);
  grad.addColorStop(0, "rgba(255,140,26,.35)"); grad.addColorStop(1, "rgba(255,140,26,0)");
  ctx.beginPath(); ctx.moveTo(x(0), H - padB);
  history.forEach((hh, i) => ctx.lineTo(x(i), y(hh.overall)));
  ctx.lineTo(x(n - 1), H - padB); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  // line
  ctx.strokeStyle = "#ff8c1a"; ctx.lineWidth = 3; ctx.lineJoin = "round"; ctx.beginPath();
  history.forEach((hh, i) => { i ? ctx.lineTo(x(i), y(hh.overall)) : ctx.moveTo(x(i), y(hh.overall)); });
  ctx.stroke();

  history.forEach((hh, i) => {
    ctx.beginPath(); ctx.arc(x(i), y(hh.overall), 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#ff8c1a"; ctx.fill();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
  });
}

/* ---------------- Coach / settings ---------------- */

function renderSettings() {
  $("api-key").value = S.apiKey || "";
  const st = $("coach-status");
  if (S.apiKey) { st.textContent = "✅ Claude coaching is ON (" + CLAUDE_MODEL + ")"; st.className = "coach-status on"; }
  else { st.textContent = "Pip's built-in coach is active. Add a key for Claude."; st.className = "coach-status off"; }
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

$("ex-input").addEventListener("input", () => {
  const n = wordCount($("ex-input").value);
  $("ex-wordcount").textContent = n + (n === 1 ? " word" : " words");
  $("btn-submit").disabled = n < 5;
});
$("btn-submit").addEventListener("click", submitExplanation);
$("btn-quit-exercise").addEventListener("click", () => { clearInterval(current?.timerId); renderHome(); showScreen("home"); });
$("btn-retry").addEventListener("click", () => startExercise(current.lesson));
$("btn-continue").addEventListener("click", () => { renderHome(); showScreen("home"); });

$("btn-save-key").addEventListener("click", () => {
  S.apiKey = $("api-key").value.trim(); save(); renderSettings();
  const newly = checkAchievements();
  toast(S.apiKey ? "Claude coaching enabled 🤖" : "Key removed");
  if (newly.length) setTimeout(() => toast(`${newly[0].emoji} Achievement: ${newly[0].name}!`), 1500);
});
$("btn-clear-key").addEventListener("click", () => {
  S.apiKey = ""; $("api-key").value = ""; save(); renderSettings(); toast("Key removed — Pip's coach active");
});
$("btn-reset").addEventListener("click", () => {
  if (!confirm("Wipe all Orenj progress on this device?")) return;
  const key = S.apiKey; S = defaultState(); S.apiKey = key; save();
  $("world-stars").dataset.built = ""; // rebuild sky
  renderStats(); renderHome(); showScreen("home"); toast("Fresh journey! 🍊");
});
$("levelup-close").addEventListener("click", () => $("levelup").classList.remove("show"));

/* ---------------- Boot ---------------- */

renderStats();
renderHome();
