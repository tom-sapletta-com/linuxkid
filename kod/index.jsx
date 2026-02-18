const { useState, useEffect, useCallback, useRef } = React;

const LESSONS = [
  {
    id: "python-basics",
    title: "Python – pierwsze kroki",
    icon: "🐍",
    color: "#f7768e",
    layers: [
      {
        id: "hello-python",
        title: "Pierwszy program",
        category: "programming",
        categoryLabel: "🐍 Python",
        description: "Python to język, którym rozmawiasz z komputerem. Piszesz zdania (komendy), a komputer je rozumie i wykonuje – jak tłumacz.",
        analogy: "🗣️ Python = język obcy, który komputer rozumie.\nprint() = 'powiedz to głośno'\nZmienna = karteczka samoprzylepna z napisem\nKażda linijka to jedno zdanie – komputer czyta od góry do dołu.",
        steps: [
          {
            instruction: "Powiedz komputerowi 'Cześć!' w Pythonie:",
            command: 'python3 -c "print(\'Cześć z Planety X!\')"',
            expectedOutput: () => `Cześć z Planety X!`,
            tip: "🗣️ print() = 'powiedz to głośno'. Komputer wypisał tekst na ekranie – Twój pierwszy program!",
          },
          {
            instruction: "Stwórz plik z programem Python:",
            command: `echo 'imie = "Odkrywca"\nplaneta = "X"\nprint(f"Jestem {imie} z Planety {planeta}!")\nprint(f"2 + 2 = {2 + 2}")' > hello.py`,
            expectedOutput: () => ``,
            tip: "📝 Plik .py = notatnik z programem. f\"...\" = tekst z wstawkami (jak szablony z dziurkami na dane).",
          },
          {
            instruction: "Uruchom swój program:",
            command: "python3 hello.py",
            expectedOutput: () => `Jestem Odkrywca z Planety X!\n2 + 2 = 4`,
            tip: "🎉 Python przeczytał notatnik i wykonał oba zdania po kolei. Zmienne to karteczki – {imie} zamienił na 'Odkrywca'.",
          },
        ],
      },
      {
        id: "lists-dicts",
        title: "Listy i słowniki",
        category: "programming",
        categoryLabel: "🐍 Python",
        description: "Lista to półka z książkami – elementy ułożone po kolei, każdy ma swój numer. Słownik to książka telefoniczna – szukasz po nazwie, dostajesz wartość.",
        analogy: "📚 Lista = półka z książkami (ponumerowane od 0).\nplanety = ['Merkury', 'Wenus', 'Ziemia'] → planety[0] = 'Merkury'\n\n📖 Słownik = książka telefoniczna.\nosoby = {'Ania': 15, 'Kuba': 12} → osoby['Ania'] = 15",
        steps: [
          {
            instruction: "Stwórz listę planet i wypisz je:",
            command: `echo 'planety = ["Merkury", "Wenus", "Ziemia", "Mars"]\nfor p in planety:\n    print(f"🪐 {p}")\nprint(f"Razem: {len(planety)} planet")' > listy.py && python3 listy.py`,
            expectedOutput: () => `🪐 Merkury\n🪐 Wenus\n🪐 Ziemia\n🪐 Mars\nRazem: 4 planet`,
            tip: "📚 for p in planety = 'dla każdej książki na półce'. len() = 'ile jest na półce?'.",
          },
          {
            instruction: "Stwórz słownik załogi Planety X:",
            command: `echo 'zaloga = {"Ania": "pilot", "Kuba": "inżynier", "Ola": "naukowiec"}\nfor imie, rola in zaloga.items():\n    print(f"👤 {imie} → {rola}")' > slownik.py && python3 slownik.py`,
            expectedOutput: () => `👤 Ania → pilot\n👤 Kuba → inżynier\n👤 Ola → naukowiec`,
            tip: "📖 Słownik = pary klucz:wartość. .items() = 'pokaż wszystkie wpisy z książki telefonicznej'.",
          },
        ],
      },
    ],
  },
  {
    id: "functions",
    title: "Funkcje",
    icon: "🔧",
    color: "#7aa2f7",
    layers: [
      {
        id: "def-functions",
        title: "Własne narzędzia (def)",
        category: "programming",
        categoryLabel: "🔧 Funkcje",
        description: "Funkcja to narzędzie wielokrotnego użytku – jak kalkulator. Budujesz go raz, a potem używasz ile chcesz razy.",
        analogy: "🔧 Funkcja = narzędzie wielokrotnego użytku.\ndef powitaj(imie) → budujesz narzędzie o nazwie 'powitaj'\npowitaj('Ania') → używasz narzędzia, podając materiał ('Ania')\nreturn = to, co narzędzie zwraca (wynik).",
        steps: [
          {
            instruction: "Zbuduj narzędzie do powitań:",
            command: `echo 'def powitaj(imie):\n    return f"🚀 Witaj na Planecie X, {imie}!"\n\nprint(powitaj("Ania"))\nprint(powitaj("Kuba"))\nprint(powitaj("Ola"))' > funkcje.py && python3 funkcje.py`,
            expectedOutput: () => `🚀 Witaj na Planecie X, Ania!\n🚀 Witaj na Planecie X, Kuba!\n🚀 Witaj na Planecie X, Ola!`,
            tip: "🔧 def = 'zbuduj narzędzie'. return = 'oddaj wynik'. Użyłeś go 3 razy – nie musiałeś pisać tego samego!",
          },
          {
            instruction: "Zbuduj kalkulator paliwa kosmicznego:",
            command: `echo 'def paliwo(dystans_km):\n    litry = dystans_km * 0.5\n    return litry\n\nplanety = {"Mars": 225, "Jowisz": 628, "Saturn": 1275}\nfor nazwa, km in planety.items():\n    p = paliwo(km)\n    print(f"🪐 {nazwa}: {km} mln km → {p} mln litrów paliwa")' > paliwo.py && python3 paliwo.py`,
            expectedOutput: () => `🪐 Mars: 225 mln km → 112.5 mln litrów paliwa\n🪐 Jowisz: 628 mln km → 314.0 mln litrów paliwa\n🪐 Saturn: 1275 mln km → 637.5 mln litrów paliwa`,
            tip: "🧮 Funkcja paliwo() to kalkulator – podajesz dystans, dostajesz litry. Użyłeś go dla każdej planety ze słownika.",
          },
        ],
      },
    ],
  },
  {
    id: "git-basics",
    title: "Git – album ze zdjęciami kodu",
    icon: "📸",
    color: "#73daca",
    layers: [
      {
        id: "first-repo",
        title: "Pierwsze repozytorium",
        category: "vcs",
        categoryLabel: "📸 Git",
        description: "Git to album ze zdjęciami Twojego kodu. Każda zmiana to nowe zdjęcie (commit). Możesz wrócić do dowolnego momentu w czasie.",
        analogy: "📸 Git = album ze zdjęciami kodu.\ngit init = kupujesz nowy album\ngit add = wybierasz zdjęcia do wklejenia\ngit commit = wklejasz zdjęcia i podpisujesz datę\ngit log = przeglądasz album od końca",
        steps: [
          {
            instruction: "Kup nowy album (stwórz repozytorium):",
            command: "git init planeta-x-projekt",
            expectedOutput: () => `Initialized empty Git repository in /home/user/planeta-x-projekt/.git/`,
            tip: "📸 git init = kupujesz pusty album. .git/ to ukryty folder, w którym Git przechowuje wszystkie zdjęcia.",
          },
          {
            instruction: "Wejdź do folderu i stwórz plik:",
            command: 'cd planeta-x-projekt && echo "# Planeta X" > README.md',
            expectedOutput: () => ``,
            tip: "📝 README.md = okładka projektu. Każdy dobry projekt zaczyna się od opisu.",
          },
          {
            instruction: "Wybierz plik do zdjęcia i zrób zdjęcie:",
            command: 'git add README.md && git commit -m "Pierwszy commit – okładka projektu"',
            expectedOutput: () => `[main (root-commit) a1b2c3d] Pierwszy commit – okładka projektu\n 1 file changed, 1 insertion(+)\n create mode 100644 README.md`,
            tip: "📸 add = wybieram to zdjęcie. commit -m = wklejam i podpisuję. Twoje pierwsze zdjęcie kodu jest w albumie!",
          },
          {
            instruction: "Przejrzyj album – historia zmian:",
            command: "git log --oneline",
            expectedOutput: () => `a1b2c3d Pierwszy commit – okładka projektu`,
            tip: "📖 git log = przeglądasz album od najnowszego zdjęcia. --oneline = pokaż skrót (jedno zdjęcie = jedna linia).",
          },
        ],
      },
    ],
  },
];

const ALL_LAYERS = LESSONS.flatMap(l => l.layers);
const TOTAL_STEPS = ALL_LAYERS.reduce((s, l) => s + l.steps.length, 0);

/* ───── Terminal ───── */
function Terminal({ step, onSuccess, showNextConfirm, confirmReady, proceedToNext, layerDone }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const successTimerRef = useRef(null);
  const successFiredRef = useRef(false);
  useEffect(() => { if (successTimerRef.current) { clearTimeout(successTimerRef.current); successTimerRef.current = null; } successFiredRef.current = false; setHistory([]); setInput(""); }, [step?.command]);
  useEffect(() => { bodyRef.current && (bodyRef.current.scrollTop = bodyRef.current.scrollHeight); }, [history]);
  const fireSuccess = (fn) => { if (successFiredRef.current) return; successFiredRef.current = true; successTimerRef.current = setTimeout(fn, 500); };
  const run = useCallback(() => {
    const cmd = input.trim(); if (!cmd) return;
    let out = "", ok = false;
    if (step) { const norm = s => s.replace(/\s+/g, " ").trim(); if (norm(cmd) === norm(step.command) || cmd.startsWith(step.command.split(" ")[0])) { out = step.expectedOutput(); ok = true; } else out = `❓ Wpisz: ${step.command}`; }
    setHistory(h => [...h, { t: "in", v: cmd }, ...(out ? [{ t: "out", v: out, ok }] : [])]);
    if (ok && onSuccess) fireSuccess(onSuccess);
    setInput("");
  }, [input, step, onSuccess]);
  const copyCmd = () => { const out = step.expectedOutput(); setHistory(h => [...h, { t: "in", v: step.command }, ...(out ? [{ t: "out", v: out, ok: true }] : [])]); if (onSuccess) fireSuccess(onSuccess); setInput(""); };
  return (
    <div className="terminal" data-testid="terminal">
      <div className="bar"><div className="dot" style={{background:"#ff5f57"}}/><div className="dot" style={{background:"#febc2e"}}/><div className="dot" style={{background:"#28c840"}}/><span className="bar-label">🧬</span></div>
      <div className="body" ref={bodyRef} onClick={()=>inputRef.current?.focus()}>
        <div className="placeholder">Wpisz komendę i naciśnij Enter ⏎</div>
        {history.map((e,i)=>(<div key={i} style={{marginBottom:4}}>{e.t==="in"?(<div><span className="prompt">~$ </span><span className="cmd">{e.v}</span></div>):(<div className={`output ${e.ok?"ok":"err"}`}>{e.v}</div>)}</div>))}
        <div className="input-row"><span className="prompt">~$&nbsp;</span><input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()} autoFocus spellCheck={false} data-testid="terminal-input" autoComplete="off" autoCapitalize="off"/></div>
      </div>
      {(step||showNextConfirm||layerDone)&&(
        <div className="footer" style={{justifyContent:"space-between"}}>
          <div>{step&&!showNextConfirm&&<button className="hint-btn hint-ask" onClick={copyCmd} data-testid="hint-btn">💡 Podpowiedź</button>}</div>
          <div>{showNextConfirm&&<button className="hint-btn" onClick={proceedToNext} data-testid="next-step-btn" disabled={!confirmReady} style={{background:layerDone?"linear-gradient(135deg,#73daca,#7aa2f7)":"linear-gradient(135deg,#f7768e,#ff9e64)",color:"#0a0b10",border:"none",fontWeight:800,opacity:confirmReady?1:0.5}}>{layerDone?"🎉 Następny etap →":"✅ Następny krok →"}</button>}</div>
        </div>
      )}
    </div>
  );
}

function GlossaryCard() {
  const items = [["🗣️","print()","Powiedz głośno (wypisz na ekran)"],["📝","zmienna","Karteczka samoprzylepna z danymi"],["📚","lista","Półka z książkami (ponumerowane)"],["📖","słownik","Książka telefoniczna (klucz→wartość)"],["🔧","def","Zbuduj narzędzie (funkcję)"],["🔄","for","Karuzela – powtarzaj dla każdego"],["📸","git init","Kup nowy album na zdjęcia kodu"],["📎","git add","Wybierz zdjęcia do wklejenia"],["💾","git commit","Wklej zdjęcia i podpisz datę"],["📖","git log","Przejrzyj album"]];
  return (<div className="glossary" data-testid="glossary"><div className="title">🗺️ Słowniczek</div>{items.map(([icon,term,meaning],i)=>(<div key={i} className="row"><span className="icon">{icon}</span><span className="term">{term}</span><span>= {meaning}</span></div>))}</div>);
}

function CopyCode({ text }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => { navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };
  return <button className={`copy-code-btn${copied?' copied':''}`} onClick={copy} title="Kopiuj do schowka">{copied ? '✅' : '📋'}</button>;
}

/* ───── App ───── */
const pm = typeof ProgressManager !== 'undefined' ? new ProgressManager() : null;

function App() {
  const [li, setLI] = useState(0), [lai, setLAI] = useState(0), [si, setSI] = useState(0);
  const [done, setDone] = useState(() => pm ? new Set(pm.backend.getSteps('kod')) : new Set());
  const [showNextConfirm, setShowNextConfirm] = useState(false), [confirmReady, setConfirmReady] = useState(false), [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { if (pm) pm.backend.setTotal('kod', TOTAL_STEPS); }, []);
  const updateURL = useCallback((l, la, s) => { const les = LESSONS[l]; window.history.pushState(null, '', `#/${les?.id}/${les?.layers[la]?.id}/${s}`); }, []);
  const parseURL = useCallback(() => { const p = window.location.hash.replace('#/', '').split('/'); if (p.length >= 3) { const i = LESSONS.findIndex(l => l.id === p[0]); if (i >= 0) { const j = LESSONS[i].layers.findIndex(la => la.id === p[1]); if (j >= 0) return { li: i, lai: j, si: parseInt(p[2]) || 0 }; } } return { li: 0, lai: 0, si: 0 }; }, []);
  useEffect(() => { const h = () => { const p = parseURL(); setLI(p.li); setLAI(p.lai); setSI(p.si); setShowNextConfirm(false); }; window.addEventListener('popstate', h); return () => window.removeEventListener('popstate', h); }, [parseURL]);
  useEffect(() => { const p = parseURL(); setLI(p.li); setLAI(p.lai); setSI(p.si); }, [parseURL]);
  const lesson = LESSONS[li], layer = lesson?.layers[lai], step = layer?.steps[si];
  const layerDone = si >= layer.steps.length - 1 && done.has(`${li}-${lai}-${layer.steps.length - 1}`);
  const nextLayer = () => { if (lai < lesson.layers.length - 1) { setLAI(lai + 1); setSI(0); updateURL(li, lai + 1, 0); } else if (li < LESSONS.length - 1) { setLI(li + 1); setLAI(0); setSI(0); updateURL(li + 1, 0, 0); } else { window.location.href = '../index.html'; } };
  const onSuccess = () => { const key = `${li}-${lai}-${si}`; setDone(p => { const n = new Set([...p, key]); if (pm) { pm.backend.saveStepDone('kod', key); if (n.size >= TOTAL_STEPS) pm.backend.completeMission('kod'); } return n; }); setConfirmReady(false); setTimeout(() => setConfirmReady(true), 700); setShowNextConfirm(true); };
  const goTo = (l, la) => { setLI(l); setLAI(la); setSI(0); setMenuOpen(false); updateURL(l, la, 0); };
  const proceedToNext = () => { if (!confirmReady) return; setShowNextConfirm(false); setConfirmReady(false); if (si < layer.steps.length - 1) { setSI(si + 1); updateURL(li, lai, si + 1); } else { nextLayer(); } };
  useEffect(() => {
    if (typeof window.__pxSetChatCtx === 'function') {
      window.__pxSetChatCtx({ missionId:'kod', missionTitle:'Kod Planety X', layerTitle:layer?.title||'', layerDescription:layer?.description||'', layerAnalogy:layer?.analogy||'', categoryLabel:layer?.categoryLabel||'', stepInstruction:step?.instruction||'', stepCommand:step?.command||'', stepTip:step?.tip||'' });
    }
  }, [li, lai, si, layer, step]);
  const pct = Math.round(([...done].length / TOTAL_STEPS) * 100);
  return (
    <div style={{minHeight:"100vh",background:"#0a0b10",fontFamily:"'Nunito',system-ui,sans-serif",color:"#c0caf5"}} data-testid="app-main">
      <div className="app-nav">
        <div className="logo"><button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} data-testid="menu-toggle">☰</button><span className="logo-icon">🧬</span><a href="../index.html" style={{textDecoration:"none",color:"inherit"}}><span className="logo-text">Planeta X</span></a><span className="logo-sub">Kod</span></div>
        <div className="nav-center"><div className="step-dots"><span className="label">Krok:</span>{layer.steps.map((_,s)=>{const d=done.has(`${li}-${lai}-${s}`),a=s===si;return<button key={s} onClick={()=>setSI(s)} className={`step-dot${a?" active":""}`} style={{background:d?"#73daca":a?"#f7768e":"#1e2030"}} data-testid={`step-${s}`}/>;})}<span className="label">{si+1}/{layer.steps.length}</span></div></div>
        <div style={{display:"flex",alignItems:"center",gap:14}}><span style={{fontSize:"14px",color:"#7982a9",fontWeight:700}}>{pct}%</span></div>
      </div>
      <div className="main-layout">
        <div className={`sidebar${menuOpen?" open":""}`}>{LESSONS.map((les,l)=>(<div key={les.id} style={{marginBottom:16}}><div className="lesson-title" style={{color:les.color}}>{les.icon} {les.title}</div>{les.layers.map((lay,la)=>{const active=l===li&&la===lai,allDone=lay.steps.every((_,s)=>done.has(`${l}-${la}-${s}`));return(<button key={lay.id} className="layer-btn" onClick={()=>goTo(l,la)} style={{background:active?`${les.color}18`:"transparent",border:active?`2px solid ${les.color}44`:"2px solid transparent",color:"#c0caf5"}}><div className="name">{allDone?"✅":active?"▶":"○"} {lay.title}</div><div className="count">{lay.steps.filter((_,s)=>done.has(`${l}-${la}-${s}`)).length}/{lay.steps.length}</div></button>);})}</div>))}</div>
        <div className="content">
          <div className="lesson-header" style={{background:`${lesson.color}08`,border:`2px solid ${lesson.color}22`}}><div className="cat" style={{color:lesson.color}}>{layer.categoryLabel}</div><h2>{layer.title}</h2><p className="desc">{layer.description}</p>{layer.analogy&&(<div className="analogy" style={{borderLeft:`4px solid ${lesson.color}`}}>{layer.analogy}</div>)}</div>
          {step&&(!layerDone||showNextConfirm)&&(<div className="instruction-box" style={{background:`${lesson.color}08`,border:`2px solid ${lesson.color}22`}} data-testid="instruction"><div className="text">🧬 {step.instruction}</div><div className="code-row"><code>{step.command}</code><CopyCode text={step.command}/></div></div>)}
          <Terminal step={step} onSuccess={onSuccess} showNextConfirm={showNextConfirm} confirmReady={confirmReady} proceedToNext={proceedToNext} layerDone={layerDone}/>
          {step?.tip&&(<div style={{background:`${lesson.color}08`,border:`2px solid ${lesson.color}22`,borderRadius:"14px",padding:"14px",marginTop:"16px"}}><div style={{fontSize:"14px",color:"#a9b1d6",lineHeight:"1.7"}}>{step.tip}</div></div>)}
        </div>
        <div className="right-panel"><GlossaryCard/></div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);

if (typeof PlanetaChat !== 'undefined') {
  let _ctx = {};
  window.__pxSetChatCtx = (ctx) => { _ctx = ctx; };
  PlanetaChat.init(() => _ctx);
}
