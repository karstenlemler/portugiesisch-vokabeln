/* ============================================================
   Português Vokabeltrainer — Programmlogik
   ============================================================ */

/* ================= Sprachausgabe ================= */
let ptVoice = null;
function pickVoice() {
  const voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  if (!voices.length) return;
  ptVoice = voices.find(v => /pt[-_]PT/i.test(v.lang)) ||
            voices.find(v => /^pt/i.test(v.lang)) || null;
  const warn = document.getElementById("voiceWarn");
  if (!ptVoice) warn.classList.add("show"); else warn.classList.remove("show");
}
if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

function speak(text, btn) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const spoken = text.split(" / ")[0];
  const u = new SpeechSynthesisUtterance(spoken);
  u.lang = "pt-PT";
  if (ptVoice) u.voice = ptVoice;
  u.rate = 0.9;
  if (btn) { btn.classList.add("playing"); u.onend = u.onerror = () => btn.classList.remove("playing"); }
  speechSynthesis.speak(u);
}

/* ================= Fortschritt ================= */
const STORE_KEY = "pt-vokabel-progress-v1";
const SCOPE_KEY = "pt-vokabel-scope-v1";
const MASTER_COUNT = 10;   // 10× richtig = gemeistert
const MASTER_BOX = 5;
const BOX_INTERVAL = {
  1: 0,
  2: 1000 * 60 * 10,
  3: 1000 * 60 * 60 * 24,
  4: 1000 * 60 * 60 * 24 * 3,
  5: 1000 * 60 * 60 * 24 * 7
};

// Eindeutiger Schlüssel: gleiches PT-Wort kann in mehreren Lektionen
// unterschiedliche Bedeutungen haben (z. B. "o rato" = Maus/Computer-Maus)
function keyOf(v) { return v.pt + "|" + v.de; }

let progress = loadProgress();

function loadProgress() {
  let p;
  try { p = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch (e) { p = {}; }

  // Felder ergänzen (ältere Stände kannten c/lw noch nicht)
  Object.keys(p).forEach(k => {
    const r = p[k];
    if (typeof r.c !== "number") r.c = (r.box >= MASTER_BOX) ? MASTER_COUNT : Math.max(0, r.box || 0);
    if (typeof r.lw !== "boolean") r.lw = false;
  });

  // Migration: früher war der Schlüssel nur das portugiesische Wort
  let migrated = false;
  vocab.forEach(v => {
    const k = keyOf(v);
    if (p[k] === undefined && p[v.pt] !== undefined) {
      p[k] = Object.assign({}, p[v.pt]);
      migrated = true;
    }
  });
  if (migrated) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch (e) {}
  }
  return p;
}

function saveProgress() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) {}
}
function rec(v) { return progress[keyOf(v)] || { box: 0, last: 0, c: 0, lw: false }; }
function isMastered(v) { return rec(v).c >= MASTER_COUNT; }
function isDue(v, now) {
  const r = rec(v);
  if (r.box === 0) return true;
  return (now - r.last) >= BOX_INTERVAL[r.box];
}
function statusOf(v) {
  const r = rec(v);
  if (r.c >= MASTER_COUNT) return "known";
  if (r.lw) return "wrong";
  if (r.box > 0 || r.c > 0) return "progress";
  return "new";
}
function barState(v) {
  const r = rec(v);
  const s = statusOf(v);
  const pct = Math.max(10, Math.round(r.c / MASTER_COUNT * 100));
  if (s === "known")    return { w: "100%",    color: "var(--good)", text: MASTER_COUNT + "/" + MASTER_COUNT, name: "gemeistert" };
  if (s === "wrong")    return { w: pct + "%", color: "#F0A03C",     text: r.c + "/" + MASTER_COUNT, name: "zuletzt falsch" };
  if (s === "progress") return { w: pct + "%", color: "#4CAF7D",     text: r.c + "/" + MASTER_COUNT, name: r.c + "× richtig" };
  return { w: "10%", color: "#E28B84", text: "0/" + MASTER_COUNT, name: "neu" };
}
function gradeWord(v, correct) {
  const r = rec(v);
  progress[keyOf(v)] = {
    box: correct ? Math.min((r.box || 0) + 1, MASTER_BOX) : 1,
    last: Date.now(),
    c: correct ? Math.min((r.c || 0) + 1, MASTER_COUNT) : (r.c || 0),
    lw: !correct
  };
  saveProgress();
  renderStats();
}

/* ================= Auswahl (Lektion / Stufe / alles) ================= */
let scope = loadScope();
let direction = "ptde";

function loadScope() {
  try {
    const s = JSON.parse(localStorage.getItem(SCOPE_KEY));
    if (s && s.type === "lesson" && LESSON_BY_ID[s.id]) return s;
    if (s && s.type === "level" && (s.level === "A1" || s.level === "A2")) return s;
    if (s && s.type === "all") return s;
  } catch (e) {}
  return { type: "lesson", id: LESSONS[0].id };
}
function saveScope() {
  try { localStorage.setItem(SCOPE_KEY, JSON.stringify(scope)); } catch (e) {}
}
function filtered() {
  if (scope.type === "all") return vocab;
  if (scope.type === "level") return vocab.filter(v => v.level === scope.level);
  return vocab.filter(v => v.lesson === scope.id);
}
function scopeTitle() {
  if (scope.type === "all") return "Alle Vokabeln";
  if (scope.type === "level") return "Ganze Stufe " + scope.level;
  const l = LESSON_BY_ID[scope.id];
  return l.emoji + "  " + l.level + " · Lektion " + l.nr + ": " + l.title;
}

/* ================= Hilfsfunktionen ================= */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function fmtDuration(ms) {
  const min = Math.round(ms / 60000);
  if (min < 60) return "in ~" + Math.max(1, min) + " Min.";
  const h = Math.round(min / 60);
  if (h < 24) return "in ~" + h + " Std.";
  return "in ~" + Math.round(h / 24) + " Tag(en)";
}
// Übungsvorrat: gemeisterte Wörter fallen raus (außer es bliebe nichts übrig)
function practicePool() {
  const p = filtered().filter(v => !isMastered(v));
  return p.length ? p : filtered();
}

function rebuildAll() {
  document.getElementById("scopeTitle").textContent = scopeTitle();
  rebuildDeck();
  buildQuiz();
  buildType();
  renderList(document.getElementById("listSearch").value);
  renderStats();
  renderLearn();
  renderLessonGrid();
}

/* ================= LEKTIONS-ÜBERSICHT ================= */
let overviewLevel = "A1";

function lessonStats(id) {
  const items = vocab.filter(v => v.lesson === id);
  let known = 0, prog = 0, wrong = 0;
  items.forEach(v => {
    const s = statusOf(v);
    if (s === "known") known++; else if (s === "progress") prog++; else if (s === "wrong") wrong++;
  });
  return { total: items.length, known, prog, wrong };
}

function renderLessonGrid() {
  const grid = document.getElementById("lessonGrid");
  grid.innerHTML = "";
  LESSONS.filter(l => l.level === overviewLevel).forEach(l => {
    const st = lessonStats(l.id);
    const pct = st.total ? Math.round(st.known / st.total * 100) : 0;
    const active = scope.type === "lesson" && scope.id === l.id;

    const card = document.createElement("button");
    card.type = "button";
    card.className = "lesson-card" + (active ? " active" : "") + (pct === 100 ? " done" : "");
    card.innerHTML =
      '<div class="lc-head"><span class="lc-emoji"></span>' +
      '<span class="lc-nr">Lektion ' + l.nr + '</span>' +
      (pct === 100 ? '<span class="lc-check">✓</span>' : '') + '</div>' +
      '<div class="lc-title"></div>' +
      '<div class="lc-bar"><span style="width:' + pct + '%"></span></div>' +
      '<div class="lc-meta"><span></span><span class="lc-pct">' + pct + ' %</span></div>';
    card.querySelector(".lc-emoji").textContent = l.emoji;
    card.querySelector(".lc-title").textContent = l.title;
    card.querySelector(".lc-meta span").textContent = st.known + " / " + st.total + " gemeistert";
    card.addEventListener("click", () => {
      scope = { type: "lesson", id: l.id };
      saveScope();
      rebuildAll();
      switchMode("learn");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    grid.appendChild(card);
  });

  // Gesamtfortschritt der Stufe
  const levelItems = vocab.filter(v => v.level === overviewLevel);
  const levelKnown = levelItems.filter(v => statusOf(v) === "known").length;
  document.getElementById("levelSummary").textContent =
    levelItems.length + " Wörter · " + levelKnown + " gemeistert (" +
    Math.round(levelKnown / levelItems.length * 100) + " %)";
}

document.getElementById("ovLevelSeg").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  document.querySelectorAll("#ovLevelSeg button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  overviewLevel = btn.dataset.level;
  renderLessonGrid();
});
document.getElementById("scopeLevel").addEventListener("click", () => {
  scope = { type: "level", level: overviewLevel };
  saveScope(); rebuildAll(); switchMode("learn");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
document.getElementById("scopeAll").addEventListener("click", () => {
  scope = { type: "all" };
  saveScope(); rebuildAll(); switchMode("learn");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
document.getElementById("changeScope").addEventListener("click", () => switchMode("lessons"));

/* ================= Statistik ================= */
function renderStats() {
  const items = filtered();
  let known = 0, prog = 0, wrong = 0, neu = 0;
  items.forEach(v => {
    const s = statusOf(v);
    if (s === "known") known++;
    else if (s === "progress") prog++;
    else if (s === "wrong") wrong++;
    else neu++;
  });
  const total = items.length || 1;
  document.getElementById("statsPct").textContent = Math.round(known / total * 100) + " %";
  document.getElementById("segKnown").style.width = (known / total * 100) + "%";
  document.getElementById("segProgress").style.width = (prog / total * 100) + "%";
  document.getElementById("segWrong").style.width = (wrong / total * 100) + "%";
  document.getElementById("segNew").style.width = (neu / total * 100) + "%";
  document.getElementById("cntKnown").textContent = known;
  document.getElementById("cntProgress").textContent = prog;
  document.getElementById("cntWrong").textContent = wrong;
  document.getElementById("cntNew").textContent = neu;
  document.getElementById("statsTotal").textContent = items.length + " Wörter";
}

/* ================= LERNEN ================= */
let learnQueue = [], learnCurrent = null;

function buildLearnQueue() {
  const now = Date.now();
  const due = filtered().filter(v => !isMastered(v) && isDue(v, now));
  // Neue Wörter portionsweise: höchstens 12 unbekannte pro Runde
  const fresh = due.filter(v => rec(v).box === 0).slice(0, 12);
  const repeat = due.filter(v => rec(v).box > 0);
  learnQueue = shuffle(repeat.concat(fresh)).sort((a, b) => rec(b).box - rec(a).box);
}

function renderLearn() {
  buildLearnQueue();
  const area = document.getElementById("learnArea");
  const empty = document.getElementById("learnEmpty");

  if (!learnQueue.length) {
    area.style.display = "none";
    empty.style.display = "block";
    const items = filtered();
    const allKnown = items.length && items.every(v => isMastered(v));
    document.getElementById("emptyTitle").textContent = allKnown ? "Lektion gemeistert! 🏆" : "Alles wiederholt!";
    document.getElementById("emptyMsg").textContent = allKnown
      ? "Du kannst alle Wörter dieser Auswahl sicher."
      : "Für diese Auswahl ist gerade nichts fällig.";
    const now = Date.now();
    let next = Infinity;
    items.forEach(v => {
      if (isMastered(v)) return;
      const r = rec(v);
      if (r.box > 0) {
        const t = r.last + BOX_INTERVAL[Math.min(r.box, MASTER_BOX)] - now;
        if (t > 0 && t < next) next = t;
      }
    });
    document.getElementById("emptyNext").textContent =
      next !== Infinity ? "Nächste Wiederholung " + fmtDuration(next) + "." : "";
    return;
  }

  area.style.display = "block";
  empty.style.display = "none";
  learnCurrent = learnQueue[0];

  document.getElementById("lnCat").textContent =
    LESSON_BY_ID[learnCurrent.lesson].level + " · " + LESSON_BY_ID[learnCurrent.lesson].title;
  const st = barState(learnCurrent);
  const fill = document.getElementById("lnBarFill");
  fill.style.width = st.w;
  fill.style.background = st.color;
  document.getElementById("lnBarText").textContent = st.text + " richtig";
  document.getElementById("lnQueueLeft").textContent = learnQueue.length + " fällig";

  if (direction === "ptde") {
    document.getElementById("lnFront").textContent = learnCurrent.pt;
    document.getElementById("lnSpeak").style.display = "";
  } else {
    document.getElementById("lnFront").textContent = learnCurrent.de;
    document.getElementById("lnSpeak").style.display = "none";
  }
  document.getElementById("lnAnswer").style.display = "none";
  document.getElementById("lnReveal").style.display = "block";
  const back = document.getElementById("lnBack");
  if (back) back.remove();
}

function revealLearn() {
  document.getElementById("lnReveal").style.display = "none";
  const ans = document.getElementById("lnAnswer");
  const old = document.getElementById("lnBack");
  if (old) old.remove();

  const div = document.createElement("div");
  div.id = "lnBack";
  div.style.textAlign = "center";
  div.style.margin = "18px 0 4px";
  div.innerHTML = '<div class="word-de"></div><div class="word-sub"></div>' +
                  '<button class="speak-btn" id="lnSpeakBack" type="button">🔊 Anhören</button>';
  if (direction === "ptde") {
    div.querySelector(".word-de").textContent = learnCurrent.de;
    div.querySelector(".word-sub").textContent = learnCurrent.pt;
  } else {
    div.querySelector(".word-de").textContent = learnCurrent.pt;
    div.querySelector(".word-sub").textContent = learnCurrent.de;
    speak(learnCurrent.pt);
  }
  div.querySelector("#lnSpeakBack").addEventListener("click", (e) => speak(learnCurrent.pt, e.currentTarget));
  ans.parentNode.insertBefore(div, ans);
  ans.style.display = "block";
}

document.getElementById("lnReveal").addEventListener("click", revealLearn);
document.getElementById("learnCard").addEventListener("click", (e) => {
  if (e.target.closest("#lnSpeak")) return;
  if (document.getElementById("lnAnswer").style.display === "none") revealLearn();
});
document.getElementById("lnSpeak").addEventListener("click", (e) => {
  e.stopPropagation(); speak(learnCurrent.pt, e.currentTarget);
});
document.getElementById("lnAgain").addEventListener("click", () => { gradeWord(learnCurrent, false); renderLearn(); });
document.getElementById("lnGood").addEventListener("click", () => { gradeWord(learnCurrent, true); renderLearn(); });
document.getElementById("resetProgress").addEventListener("click", () => {
  if (!confirm("Fortschritt für „" + scopeTitle() + "\" wirklich zurücksetzen?")) return;
  filtered().forEach(v => { delete progress[keyOf(v)]; });
  saveProgress();
  rebuildAll();
});

/* ================= KARTEIKARTEN ================= */
let deck = [], fcIndex = 0;
const flashcard = document.getElementById("flashcard");

function rebuildDeck() { deck = filtered().slice(); fcIndex = 0; drawFlashcard(); }

function drawFlashcard() {
  if (!deck.length) return;
  if (fcIndex >= deck.length) fcIndex = 0;
  const v = deck[fcIndex];
  flashcard.classList.remove("flipped");
  if (direction === "ptde") {
    document.getElementById("fcCatFront").textContent = LESSON_BY_ID[v.lesson].title;
    document.getElementById("fcFront").textContent = v.pt;
    document.getElementById("fcSpeakFront").style.display = "";
    document.getElementById("fcCatBack").textContent = "Deutsch";
    document.getElementById("fcBack").textContent = v.de;
    document.getElementById("fcBackSub").textContent = v.pt;
  } else {
    document.getElementById("fcCatFront").textContent = "Deutsch · " + LESSON_BY_ID[v.lesson].title;
    document.getElementById("fcFront").textContent = v.de;
    document.getElementById("fcSpeakFront").style.display = "none";
    document.getElementById("fcCatBack").textContent = "Português";
    document.getElementById("fcBack").textContent = v.pt;
    document.getElementById("fcBackSub").textContent = v.de;
  }
  document.getElementById("fcCounter").textContent = (fcIndex + 1) + " / " + deck.length;
  document.getElementById("fcProgress").style.width = ((fcIndex + 1) / deck.length * 100) + "%";
}
flashcard.addEventListener("click", (e) => {
  if (e.target.closest(".speak-btn")) return;
  flashcard.classList.toggle("flipped");
});
document.getElementById("fcSpeakFront").addEventListener("click", (e) => { e.stopPropagation(); speak(deck[fcIndex].pt, e.currentTarget); });
document.getElementById("fcSpeakBack").addEventListener("click", (e) => { e.stopPropagation(); speak(deck[fcIndex].pt, e.currentTarget); });
document.getElementById("fcNext").addEventListener("click", () => { fcIndex = (fcIndex + 1) % deck.length; drawFlashcard(); });
document.getElementById("fcPrev").addEventListener("click", () => { fcIndex = (fcIndex - 1 + deck.length) % deck.length; drawFlashcard(); });
document.getElementById("fcShuffle").addEventListener("click", () => { deck = shuffle(deck); fcIndex = 0; drawFlashcard(); });

/* ================= QUIZ ================= */
let quizPool = [], quizPos = 0, quizScore = 0, quizCount = 0, quizAnswered = false, quizBtns = [];

function buildQuiz() {
  quizPool = shuffle(practicePool());
  quizPos = 0; quizScore = 0; quizCount = 0; quizAnswered = false;
  document.getElementById("quizScore").textContent = "0";
  document.getElementById("quizTotal").textContent = "0";
  renderQuiz();
}
function renderQuiz() {
  if (!quizPool.length) return;
  if (quizPos >= quizPool.length) quizPos = 0;
  quizAnswered = false;
  const correct = quizPool[quizPos];
  const askPt = direction === "ptde";
  document.getElementById("quizLabel").textContent = askPt ? "Was bedeutet dieses Wort?" : "Wie heißt das auf Portugiesisch?";
  document.getElementById("quizWord").textContent = askPt ? correct.pt : correct.de;
  document.getElementById("quizSpeak").style.display = askPt ? "" : "none";

  const key = askPt ? "de" : "pt";
  // Falsche Antworten möglichst aus derselben Lektion (schwerer & sinnvoller)
  const sameLesson = filtered().filter(v => v[key] !== correct[key] && v.lesson === correct.lesson);
  const anyOther  = filtered().filter(v => v[key] !== correct[key] && v.lesson !== correct.lesson);
  const others = shuffle(sameLesson).slice(0, 3);
  while (others.length < 3 && anyOther.length) {
    const pick = anyOther.splice(Math.floor(Math.random() * anyOther.length), 1)[0];
    if (!others.some(o => o[key] === pick[key])) others.push(pick);
  }
  const opts = shuffle([correct].concat(others));

  const box = document.getElementById("quizOptions");
  box.innerHTML = "";
  quizBtns = [];
  opts.forEach(o => {
    const b = document.createElement("button");
    b.className = "option";
    b.textContent = o[key];
    b.addEventListener("click", () => answerQuiz(b, o, correct));
    quizBtns.push({ b: b, o: o });
    box.appendChild(b);
  });
}
function answerQuiz(btn, chosen, correct) {
  if (quizAnswered) return;
  quizAnswered = true;
  quizBtns.forEach(item => {
    item.b.disabled = true;
    if (item.o === correct) item.b.classList.add("correct");
  });
  if (chosen === correct) quizScore++; else btn.classList.add("wrong");
  quizCount++;
  gradeWord(correct, chosen === correct);
  if (direction === "dept") speak(correct.pt);
  document.getElementById("quizScore").textContent = quizScore;
  document.getElementById("quizTotal").textContent = quizCount;
  setTimeout(() => {
    quizPos++;
    if (quizPos >= quizPool.length) { quizPool = shuffle(practicePool()); quizPos = 0; }
    renderQuiz();
  }, 1200);
}
document.getElementById("quizSpeak").addEventListener("click", (e) => speak(quizPool[quizPos].pt, e.currentTarget));
document.getElementById("quizRestart").addEventListener("click", buildQuiz);

/* ================= SCHREIBEN ================= */
let typePool = [], typePos = 0, typeScore = 0, typeTotal = 0, typeState = "ask";

const ACCENTS = ["á", "à", "â", "ã", "é", "ê", "í", "ó", "ô", "õ", "ú", "ç"];
const accRow = document.getElementById("accRow");
ACCENTS.forEach(ch => {
  const b = document.createElement("button");
  b.className = "acc-btn"; b.type = "button"; b.textContent = ch;
  b.addEventListener("click", () => {
    const inp = document.getElementById("typeInput");
    const s = inp.selectionStart != null ? inp.selectionStart : inp.value.length;
    const e = inp.selectionEnd != null ? inp.selectionEnd : s;
    inp.value = inp.value.slice(0, s) + ch + inp.value.slice(e);
    inp.focus();
    inp.setSelectionRange(s + 1, s + 1);
  });
  accRow.appendChild(b);
});

function normAns(s) {
  return s.toLowerCase().trim().replace(/[?!.]+$/, "").replace(/\s+/g, " ");
}
const COMBINING = new RegExp("[" + String.fromCharCode(0x0300) + "-" + String.fromCharCode(0x036F) + "]", "g");
function looseAns(s) {
  return normAns(s).normalize("NFD").replace(COMBINING, "").replace(/-/g, " ");
}
// Artikel sind hilfreich zum Lernen, sollen beim Tippen aber nicht Pflicht sein
function stripArticle(s) {
  return s.replace(/^(os|as|um|uma|o|a)\s+/, "");
}
function answerVariants(pt) {
  const out = [];
  pt.split(" / ").forEach(a => {
    out.push(a);
    const noArt = stripArticle(normAns(a));
    if (noArt !== normAns(a)) out.push(noArt);
  });
  return out;
}

function buildType() {
  typePool = shuffle(practicePool());
  typePos = 0; typeScore = 0; typeTotal = 0;
  document.getElementById("typeScore").textContent = "0";
  document.getElementById("typeTotal").textContent = "0";
  renderType();
}
function renderType() {
  if (!typePool.length) return;
  if (typePos >= typePool.length) typePos = 0;
  typeState = "ask";
  const v = typePool[typePos];
  document.getElementById("typeWord").textContent = v.de;
  document.getElementById("typeLesson").textContent = LESSON_BY_ID[v.lesson].title;
  const inp = document.getElementById("typeInput");
  inp.value = ""; inp.disabled = false;
  const fb = document.getElementById("typeFb");
  fb.className = "fb"; fb.innerHTML = "";
  document.getElementById("typeCheck").style.display = "";
  document.getElementById("typeNext").style.display = "none";
}
function checkType() {
  if (typeState !== "ask") return;
  const v = typePool[typePos];
  const inp = document.getElementById("typeInput");
  if (!normAns(inp.value)) { inp.focus(); return; }
  typeState = "done";
  inp.disabled = true;
  typeTotal++;

  const variants = answerVariants(v.pt);
  let result = "wrong";
  if (variants.some(a => normAns(a) === normAns(inp.value))) result = "right";
  else if (variants.some(a => looseAns(a) === looseAns(inp.value))) result = "almost";

  const fb = document.getElementById("typeFb");
  if (result === "right") {
    typeScore++;
    fb.className = "fb show right";
    fb.innerHTML = "✓ Richtig! <span class='fb-word'></span>";
    gradeWord(v, true);
  } else if (result === "almost") {
    typeScore++;
    fb.className = "fb show almost";
    fb.innerHTML = "Fast! Achte auf Akzente/Schreibweise: <span class='fb-word'></span>";
    gradeWord(v, true);
  } else {
    fb.className = "fb show wrong";
    fb.innerHTML = "✗ Leider nicht. Richtig ist: <span class='fb-word'></span>";
    gradeWord(v, false);
  }
  fb.querySelector(".fb-word").textContent = v.pt;
  speak(v.pt);

  document.getElementById("typeScore").textContent = typeScore;
  document.getElementById("typeTotal").textContent = typeTotal;
  document.getElementById("typeCheck").style.display = "none";
  document.getElementById("typeNext").style.display = "";
  document.getElementById("typeNext").focus();
}
function nextType() {
  typePos++;
  if (typePos >= typePool.length) { typePool = shuffle(practicePool()); typePos = 0; }
  renderType();
  document.getElementById("typeInput").focus();
}
document.getElementById("typeCheck").addEventListener("click", checkType);
document.getElementById("typeNext").addEventListener("click", nextType);
document.getElementById("typeRestart").addEventListener("click", () => { buildType(); document.getElementById("typeInput").focus(); });
document.getElementById("typeInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); if (typeState === "ask") checkType(); else nextType(); }
});
document.getElementById("typeNext").addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); nextType(); }
});

/* ================= LISTE ================= */
function renderList(term) {
  term = term || "";
  const box = document.getElementById("listContainer");
  box.innerHTML = "";
  const t = term.trim().toLowerCase();
  const items = filtered().filter(v => !t || v.pt.toLowerCase().includes(t) || v.de.toLowerCase().includes(t));

  const frag = document.createDocumentFragment();
  items.forEach(v => {
    const row = document.createElement("div");
    row.className = "list-item";
    row.innerHTML =
      '<div class="li-num"></div>' +
      '<div class="li-text"><div class="li-pt"></div><div class="li-de"></div></div>' +
      '<div class="li-bar"><span class="mini-track"><span class="mini-fill"></span></span><span class="bar-text"></span></div>' +
      '<button class="li-speak" type="button" title="Anhören">🔊</button>';
    row.querySelector(".li-num").textContent = LESSON_BY_ID[v.lesson].emoji;
    row.querySelector(".li-pt").textContent = v.pt;
    row.querySelector(".li-de").textContent = v.de;
    const st = barState(v);
    const fill = row.querySelector(".mini-fill");
    fill.style.width = st.w;
    fill.style.background = st.color;
    row.querySelector(".bar-text").textContent = st.text;
    row.querySelector(".li-bar").title = st.name;
    row.querySelector(".li-speak").addEventListener("click", (e) => speak(v.pt, e.currentTarget));
    frag.appendChild(row);
  });
  box.appendChild(frag);
  document.getElementById("listCount").textContent = items.length + " Wörter";
  if (!items.length) box.innerHTML = '<p class="note">Keine Treffer.</p>';
}
document.getElementById("listSearch").addEventListener("input", (e) => renderList(e.target.value));

/* ================= Modus-Umschaltung ================= */
function switchMode(mode) {
  document.querySelectorAll("#modeSeg button").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  document.getElementById("panel-" + mode).classList.add("active");
  if (window.speechSynthesis) speechSynthesis.cancel();

  const dirRelevant = ["learn", "flash", "quiz"].indexOf(mode) !== -1;
  document.getElementById("dirRow").style.display = dirRelevant ? "" : "none";
  document.getElementById("scopeBar").style.display = mode === "lessons" ? "none" : "";

  if (mode === "learn")   { renderStats(); renderLearn(); }
  if (mode === "lessons") renderLessonGrid();
  if (mode === "list")    renderList(document.getElementById("listSearch").value);
  if (mode === "type")    document.getElementById("typeInput").focus();
}
document.getElementById("modeSeg").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (btn) switchMode(btn.dataset.mode);
});
document.getElementById("dirToggle").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  document.querySelectorAll("#dirToggle button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  direction = btn.dataset.dir;
  if (window.speechSynthesis) speechSynthesis.cancel();
  drawFlashcard(); renderQuiz(); renderLearn();
});

/* ================= Start ================= */
if (scope.type === "lesson") overviewLevel = LESSON_BY_ID[scope.id].level;
else if (scope.type === "level") overviewLevel = scope.level;
document.querySelectorAll("#ovLevelSeg button").forEach(b => b.classList.toggle("active", b.dataset.level === overviewLevel));
rebuildAll();
switchMode("lessons");
