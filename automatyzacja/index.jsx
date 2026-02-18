const { useState, useEffect, useCallback, useRef } = React;

/* ───── Lesson Data ───── */
const LESSONS = [
  {
    id: "bash-scripts",
    title: "Skrypty Bash",
    icon: "📋",
    color: "#bb9af7",
    layers: [
      {
        id: "first-script",
        title: "Pierwszy skrypt",
        category: "scripting",
        categoryLabel: "📋 Skrypty",
        description: "Skrypt to lista poleceń, które komputer wykonuje po kolei – jak przepis kulinarny. Zamiast wpisywać komendy ręcznie, piszesz je raz i uruchamiasz jednym kliknięciem.",
        analogy: "📋 Skrypt = przepis kulinarny.\nKażda linijka to jeden krok: 'weź jajko', 'wbij do miski', 'wymieszaj'.\nKomputer czyta od góry do dołu i robi po kolei.",
        steps: [
          {
            instruction: "Stwórz swój pierwszy skrypt – plik z listą poleceń:",
            command: 'echo \'#!/bin/bash\necho "Cześć! Jestem skryptem!"\necho "Dzisiaj jest $(date)"\' > hello.sh',
            expectedOutput: () => ``,
            tip: "📝 #!/bin/bash na początku to jakby tytuł przepisu – mówi komputerowi, że to skrypt bash.",
          },
          {
            instruction: "Daj skryptowi pozwolenie na uruchomienie:",
            command: "chmod +x hello.sh",
            expectedOutput: () => ``,
            tip: "🔑 chmod +x = dajesz przepisowi pieczątkę 'można gotować'. Bez niej komputer nie będzie go wykonywać.",
          },
          {
            instruction: "Uruchom swój skrypt!",
            command: "./hello.sh",
            expectedOutput: () => `Cześć! Jestem skryptem!\nDzisiaj jest wto 18 lut 2025 12:00:00 CET`,
            tip: "🎉 ./ = 'uruchom z bieżącego folderu'. Skrypt wykonał obie komendy po kolei – jak kucharz czytający przepis!",
          },
        ],
      },
      {
        id: "variables",
        title: "Zmienne w skryptach",
        category: "scripting",
        categoryLabel: "📋 Skrypty",
        description: "Zmienne to pudełka z etykietami. Wkładasz coś do pudełka, a potem używasz etykiety, żeby to odczytać.",
        analogy: "📦 Zmienna = pudełko z etykietą.\nIMIE='Ania' → wkładasz kartkę 'Ania' do pudełka z napisem IMIE.\n$IMIE → zaglądasz do pudełka i czytasz, co jest w środku.",
        steps: [
          {
            instruction: "Stwórz skrypt z pudełkami (zmiennymi):",
            command: `echo '#!/bin/bash\nIMIE="Astronauta"\nPLANETA="X"\necho "Jestem $IMIE z Planety $PLANETA!"' > powitanie.sh`,
            expectedOutput: () => ``,
            tip: "📦 IMIE i PLANETA to nazwy pudełek. Cudzysłowy trzymają wartość w środku.",
          },
          {
            instruction: "Uruchom skrypt z pudełkami:",
            command: "chmod +x powitanie.sh && ./powitanie.sh",
            expectedOutput: () => `Jestem Astronauta z Planety X!`,
            tip: "✅ && = 'zrób to, a potem tamto'. Komputer zajrzał do pudełek i wstawił ich zawartość w tekst.",
          },
          {
            instruction: "Stwórz skrypt, który pyta o imię:",
            command: `echo '#!/bin/bash\necho "Jak masz na imię?"\nread IMIE\necho "Witaj na Planecie X, $IMIE!"' > pytanie.sh && chmod +x pytanie.sh`,
            expectedOutput: () => ``,
            tip: "🎤 read = mikrofon. Komputer czeka, aż coś powiesz, i wkłada to do pudełka IMIE.",
          },
        ],
      },
    ],
  },
  {
    id: "logic",
    title: "Logika i pętle",
    icon: "🔄",
    color: "#7aa2f7",
    layers: [
      {
        id: "conditions",
        title: "Warunki (if/else)",
        category: "logic",
        categoryLabel: "🔄 Logika",
        description: "Komputer potrafi podejmować decyzje – jak sygnalizacja świetlna. Jeśli jest zielone – jedź. Jeśli czerwone – stój.",
        analogy: "🚦 if/else = sygnalizacja świetlna.\nif [ zielone ] → jedź\nelse → stój\nKomputer sprawdza warunek i wybiera drogę.",
        steps: [
          {
            instruction: "Stwórz skrypt ze światłami (warunkiem):",
            command: `echo '#!/bin/bash\nGODZINA=$(date +%H)\nif [ $GODZINA -lt 12 ]; then\n  echo "☀️ Dzień dobry! Rano na Planecie X."\nelse\n  echo "🌙 Dobry wieczór! Wieczór na Planecie X."\nfi' > poranek.sh && chmod +x poranek.sh`,
            expectedOutput: () => ``,
            tip: "🚦 if [ warunek ]; then → 'jeśli tak, to...'. -lt = less than (mniej niż). fi = koniec warunku.",
          },
          {
            instruction: "Uruchom – komputer sprawdzi, jaka jest pora dnia:",
            command: "./poranek.sh",
            expectedOutput: () => `☀️ Dzień dobry! Rano na Planecie X.`,
            tip: "✅ Komputer sprawdził godzinę i wybrał odpowiednią wiadomość – jak sygnalizacja!",
          },
          {
            instruction: "Sprawdź, czy plik istnieje:",
            command: `echo '#!/bin/bash\nif [ -f hello.sh ]; then\n  echo "✅ Plik hello.sh istnieje!"\nelse\n  echo "❌ Nie znaleziono hello.sh"\nfi' > sprawdz.sh && chmod +x sprawdz.sh && ./sprawdz.sh`,
            expectedOutput: () => `✅ Plik hello.sh istnieje!`,
            tip: "📁 -f = 'czy ten plik istnieje?'. Komputer zajrzał i odpowiedział.",
          },
        ],
      },
      {
        id: "loops",
        title: "Pętle (for/while)",
        category: "logic",
        categoryLabel: "🔄 Logika",
        description: "Pętla to karuzela – komputer kręci się w kółko i powtarza tę samą czynność dla każdego elementu z listy.",
        analogy: "🎠 Pętla for = karuzela.\nfor planeta in Merkury Wenus Ziemia → karuzela zatrzymuje się przy każdej planecie.\nKomputer robi to samo dla każdej – np. mówi 'Cześć, Merkury!', 'Cześć, Wenus!'.",
        steps: [
          {
            instruction: "Powitaj wszystkie planety z listy:",
            command: `echo '#!/bin/bash\nfor PLANETA in Merkury Wenus Ziemia Mars; do\n  echo "🪐 Cześć, $PLANETA!"\ndone' > planety.sh && chmod +x planety.sh && ./planety.sh`,
            expectedOutput: () => `🪐 Cześć, Merkury!\n🪐 Cześć, Wenus!\n🪐 Cześć, Ziemia!\n🪐 Cześć, Mars!`,
            tip: "🎠 Karuzela zatrzymała się 4 razy – raz przy każdej planecie. done = karuzela się skończyła.",
          },
          {
            instruction: "Policz od 1 do 5 z pętlą while:",
            command: `echo '#!/bin/bash\nLICZNIK=1\nwhile [ $LICZNIK -le 5 ]; do\n  echo "Odliczanie: $LICZNIK"\n  LICZNIK=$((LICZNIK + 1))\ndone\necho "🚀 Start!"' > odliczanie.sh && chmod +x odliczanie.sh && ./odliczanie.sh`,
            expectedOutput: () => `Odliczanie: 1\nOdliczanie: 2\nOdliczanie: 3\nOdliczanie: 4\nOdliczanie: 5\n🚀 Start!`,
            tip: "🔁 while = 'kręć się, dopóki warunek jest prawdziwy'. -le = less or equal (mniejsze lub równe 5).",
          },
        ],
      },
    ],
  },
  {
    id: "cron",
    title: "Budzik systemu (Cron)",
    icon: "⏰",
    color: "#73daca",
    layers: [
      {
        id: "cron-basics",
        title: "Harmonogram zadań",
        category: "system",
        categoryLabel: "⏰ Harmonogram",
        description: "Cron to budzik systemu. Ustawiasz godzinę i zadanie – komputer sam je wykona o wyznaczonym czasie, nawet gdy śpisz.",
        analogy: "⏰ Cron = budzik.\nNastawiasz: 'o 8:00 rano, każdego dnia, uruchom backup.sh'.\nKomputer pamięta i zrobi to automatycznie – jak budzik, który zawsze dzwoni o tej samej porze.",
        steps: [
          {
            instruction: "Zobacz aktualny harmonogram budzików:",
            command: "crontab -l",
            expectedOutput: () => `no crontab for user`,
            tip: "📋 crontab -l = 'pokaż moje budziki'. Na razie nie masz żadnych – pora to zmienić!",
          },
          {
            instruction: "Dodaj budzik – co minutę zapisuj datę do pliku:",
            command: `echo '* * * * * echo "Ping: $(date)" >> /tmp/planeta-log.txt' | crontab -`,
            expectedOutput: () => ``,
            tip: "⏰ Pięć gwiazdek = 'co minutę, co godzinę, co dzień'. >> = dopisz na koniec pliku (nie kasuj starego).",
          },
          {
            instruction: "Sprawdź, czy budzik został ustawiony:",
            command: "crontab -l",
            expectedOutput: () => `* * * * * echo "Ping: $(date)" >> /tmp/planeta-log.txt`,
            tip: "✅ Budzik działa! Co minutę komputer dopisze linijkę z datą do pliku. To Twój pierwszy automatyczny robot!",
          },
        ],
      },
    ],
  },
];

const ALL_LAYERS = LESSONS.flatMap(l => l.layers);
const TOTAL_STEPS = ALL_LAYERS.reduce((s, l) => s + l.steps.length, 0);

/* ───── Terminal Component ───── */
function Terminal({ step, onSuccess, showNextConfirm, confirmReady, proceedToNext, layerDone }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [hint, setHint] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const successTimerRef = useRef(null);
  const successFiredRef = useRef(false);
  useEffect(() => {
    if (successTimerRef.current) { clearTimeout(successTimerRef.current); successTimerRef.current = null; }
    successFiredRef.current = false;
    setHistory([]); setInput(""); setHint(false);
  }, [step?.command]);
  useEffect(() => { bodyRef.current && (bodyRef.current.scrollTop = bodyRef.current.scrollHeight); }, [history]);
  const fireSuccess = (fn) => { if (successFiredRef.current) return; successFiredRef.current = true; successTimerRef.current = setTimeout(fn, 500); };
  const run = useCallback(() => {
    const cmd = input.trim(); if (!cmd) return;
    let out = "", ok = false;
    if (step) {
      const norm = s => s.replace(/\s+/g, " ").trim();
      if (norm(cmd) === norm(step.command) || cmd.startsWith(step.command.split(" ")[0])) { out = step.expectedOutput(); ok = true; }
      else out = `❓ Wpisz: ${step.command}`;
    }
    setHistory(h => [...h, { t: "in", v: cmd }, ...(out ? [{ t: "out", v: out, ok }] : [])]);
    if (ok && onSuccess) fireSuccess(onSuccess);
    setInput(""); setHint(false);
  }, [input, step, onSuccess]);
  const prompt = "~$";
  const copyCmd = () => {
    const cmd = step.command;
    const out = step.expectedOutput(); const ok = true;
    setHistory(h => [...h, { t: "in", v: cmd }, ...(out ? [{ t: "out", v: out, ok }] : [])]);
    if (onSuccess) fireSuccess(onSuccess);
    setInput(""); setHint(false);
  };
  return (
    <div className="terminal" data-testid="terminal">
      <div className="bar">
        <div className="dot" style={{background:"#ff5f57"}}/>
        <div className="dot" style={{background:"#febc2e"}}/>
        <div className="dot" style={{background:"#28c840"}}/>
        <span className="bar-label">🤖</span>
      </div>
      <div className="body" ref={bodyRef} onClick={()=>inputRef.current?.focus()}>
        <div className="placeholder">Wpisz komendę i naciśnij Enter ⏎</div>
        {history.map((e,i)=>(
          <div key={i} style={{marginBottom:4}}>
            {e.t==="in"?(<div><span className="prompt">{prompt} </span><span className="cmd">{e.v}</span></div>)
            :(<div className={`output ${e.ok?"ok":"err"}`}>{e.v}</div>)}
          </div>
        ))}
        <div className="input-row">
          <span className="prompt">{prompt}&nbsp;</span>
          <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&run()} autoFocus spellCheck={false}
            data-testid="terminal-input" autoComplete="off" autoCapitalize="off"/>
        </div>
      </div>
      {(step||showNextConfirm||layerDone)&&(
        <div className="footer" style={{justifyContent:"space-between"}}>
          <div>{step&&!showNextConfirm&&<button className="hint-btn hint-ask" onClick={copyCmd} data-testid="hint-btn">💡 Podpowiedź</button>}</div>
          <div>
            {showNextConfirm&&<button className="hint-btn" onClick={proceedToNext} data-testid="next-step-btn" disabled={!confirmReady} style={{background:layerDone?"linear-gradient(135deg,#73daca,#7aa2f7)":"linear-gradient(135deg,#bb9af7,#7aa2f7)",color:"#0a0b10",border:"none",fontWeight:800,opacity:confirmReady?1:0.5,cursor:confirmReady?"pointer":"default"}}>{layerDone?"🎉 Następny etap →":"✅ Następny krok →"}</button>}
          </div>
        </div>
      )}
    </div>
  );
}

/* ───── Glossary ───── */
function GlossaryCard() {
  const items = [
    ["📋","Skrypt","Przepis kulinarny (lista kroków)"],
    ["📦","Zmienna","Pudełko z etykietą"],
    ["🚦","if/else","Sygnalizacja – decyzja: tak/nie"],
    ["🎠","Pętla for","Karuzela – powtarzaj dla każdego"],
    ["🔁","Pętla while","Kręć się, dopóki warunek jest prawdziwy"],
    ["⏰","Cron","Budzik systemu – uruchom o czasie"],
    ["🔑","chmod +x","Pieczątka 'można uruchomić'"],
    ["🎤","read","Mikrofon – czekaj na odpowiedź"],
    ["📝","#!/bin/bash","Tytuł przepisu (shebang)"],
    ["➕","&&","Zrób to, potem tamto"],
  ];
  return (
    <div className="glossary" data-testid="glossary">
      <div className="title">🗺️ Słowniczek</div>
      {items.map(([icon, term, meaning], i) => (
        <div key={i} className="row">
          <span className="icon">{icon}</span>
          <span className="term">{term}</span>
          <span>= {meaning}</span>
        </div>
      ))}
    </div>
  );
}

function CopyCode({ text }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => { navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };
  return <button className={`copy-code-btn${copied?' copied':''}`} onClick={copy} title="Kopiuj do schowka">{copied ? '✅' : '📋'}</button>;
}

/* ───── Main App ───── */
const pm = typeof ProgressManager !== 'undefined' ? new ProgressManager() : null;

function App() {
  const [li, setLI] = useState(0);
  const [lai, setLAI] = useState(0);
  const [si, setSI] = useState(0);
  const [done, setDone] = useState(() => {
    if (!pm) return new Set();
    return new Set(pm.backend.getSteps('automatyzacja'));
  });
  const [showNextConfirm, setShowNextConfirm] = useState(false);
  const [confirmReady, setConfirmReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { if (pm) pm.backend.setTotal('automatyzacja', TOTAL_STEPS); }, []);

  const updateURL = useCallback((l, la, s) => {
    const lesson = LESSONS[l], layer = lesson?.layers[la];
    window.history.pushState(null, '', `#/${lesson?.id}/${layer?.id}/${s}`);
  }, []);

  const parseURL = useCallback(() => {
    const parts = window.location.hash.replace('#/', '').split('/');
    if (parts.length >= 3) {
      const li = LESSONS.findIndex(l => l.id === parts[0]);
      if (li >= 0) { const lai = LESSONS[li].layers.findIndex(la => la.id === parts[1]); if (lai >= 0) return { li, lai, si: parseInt(parts[2]) || 0 }; }
    }
    return { li: 0, lai: 0, si: 0 };
  }, []);

  useEffect(() => { const h = () => { const p = parseURL(); setLI(p.li); setLAI(p.lai); setSI(p.si); setShowNextConfirm(false); }; window.addEventListener('popstate', h); return () => window.removeEventListener('popstate', h); }, [parseURL]);
  useEffect(() => { const p = parseURL(); setLI(p.li); setLAI(p.lai); setSI(p.si); }, [parseURL]);

  const lesson = LESSONS[li], layer = lesson?.layers[lai], step = layer?.steps[si];
  const layerDone = si >= layer.steps.length - 1 && done.has(`${li}-${lai}-${layer.steps.length - 1}`);

  const nextLayer = () => {
    if (lai < lesson.layers.length - 1) { setLAI(lai + 1); setSI(0); updateURL(li, lai + 1, 0); }
    else if (li < LESSONS.length - 1) { setLI(li + 1); setLAI(0); setSI(0); updateURL(li + 1, 0, 0); }
    else { window.location.href = '../index.html'; }
  };

  const onSuccess = () => {
    const key = `${li}-${lai}-${si}`;
    setDone(p => { const n = new Set([...p, key]); if (pm) { pm.backend.saveStepDone('automatyzacja', key); if (n.size >= TOTAL_STEPS) pm.backend.completeMission('automatyzacja'); } return n; });
    setConfirmReady(false); setTimeout(() => setConfirmReady(true), 700);
    setShowNextConfirm(true);
  };

  const goTo = (l, la) => { setLI(l); setLAI(la); setSI(0); setMenuOpen(false); updateURL(l, la, 0); };
  const proceedToNext = () => { if (!confirmReady) return; setShowNextConfirm(false); setConfirmReady(false); if (si < layer.steps.length - 1) { setSI(si + 1); updateURL(li, lai, si + 1); } else { nextLayer(); } };

  useEffect(() => {
    if (typeof window.__pxSetChatCtx === 'function') {
      window.__pxSetChatCtx({
        missionId: 'automatyzacja',
        missionTitle: 'Automatyzacja',
        layerTitle: layer?.title || '',
        layerDescription: layer?.description || '',
        layerAnalogy: layer?.analogy || '',
        categoryLabel: layer?.categoryLabel || '',
        stepInstruction: step?.instruction || '',
        stepCommand: step?.command || '',
        stepTip: step?.tip || '',
      });
    }
  }, [li, lai, si, layer, step]);

  const completedSteps = [...done].length;
  const pct = Math.round((completedSteps / TOTAL_STEPS) * 100);

  return (
    <div style={{minHeight:"100vh",background:"#0a0b10",fontFamily:"'Nunito',system-ui,sans-serif",color:"#c0caf5"}} data-testid="app-main">
      <div className="app-nav">
        <div className="logo">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} data-testid="menu-toggle">☰</button>
          <span className="logo-icon">🤖</span>
          <a href="../index.html" style={{textDecoration:"none",color:"inherit"}}><span className="logo-text">Planeta X</span></a>
          <span className="logo-sub">Automatyzacja</span>
        </div>
        <div className="nav-center">
          <div className="step-dots">
            <span className="label">Krok:</span>
            {layer.steps.map((_, s) => {
              const d = done.has(`${li}-${lai}-${s}`), a = s === si;
              return <button key={s} onClick={() => setSI(s)} className={`step-dot${a ? " active" : ""}`}
                style={{background: d ? "#73daca" : a ? "#bb9af7" : "#1e2030"}} data-testid={`step-${s}`}/>;
            })}
            <span className="label">{si + 1}/{layer.steps.length}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontSize:"14px",color:"#7982a9",fontWeight:700}}>{pct}%</span>
        </div>
      </div>
      <div className="main-layout">
        <div className={`sidebar${menuOpen ? " open" : ""}`}>
          {LESSONS.map((les, l) => (
            <div key={les.id} style={{marginBottom:16}}>
              <div className="lesson-title" style={{color: les.color}}>{les.icon} {les.title}</div>
              {les.layers.map((lay, la) => {
                const active = l === li && la === lai;
                const allDone = lay.steps.every((_, s) => done.has(`${l}-${la}-${s}`));
                return (
                  <button key={lay.id} className="layer-btn" onClick={() => goTo(l, la)}
                    style={{background: active ? `${les.color}18` : "transparent", border: active ? `2px solid ${les.color}44` : "2px solid transparent", color: "#c0caf5"}}>
                    <div className="name">{allDone ? "✅" : active ? "▶" : "○"} {lay.title}</div>
                    <div className="count">{lay.steps.filter((_, s) => done.has(`${l}-${la}-${s}`)).length}/{lay.steps.length}</div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="content">
          <div className="lesson-header" style={{background:`${lesson.color}08`,border:`2px solid ${lesson.color}22`}}>
            <div className="cat" style={{color: lesson.color}}>{layer.categoryLabel}</div>
            <h2>{layer.title}</h2>
            <p className="desc">{layer.description}</p>
            {layer.analogy && (<div className="analogy" style={{borderLeft:`4px solid ${lesson.color}`}}>{layer.analogy}</div>)}
          </div>
          {step && (!layerDone || showNextConfirm) && (
            <div className="instruction-box" style={{background:`${lesson.color}08`,border:`2px solid ${lesson.color}22`}} data-testid="instruction">
              <div className="text">🤖 {step.instruction}</div>
              <div className="code-row"><code>{step.command}</code><CopyCode text={step.command}/></div>
            </div>
          )}
          <Terminal step={step} onSuccess={onSuccess} showNextConfirm={showNextConfirm} confirmReady={confirmReady} proceedToNext={proceedToNext} layerDone={layerDone}/>
          {step?.tip && (
            <div style={{background:`${lesson.color}08`,border:`2px solid ${lesson.color}22`,borderRadius:"14px",padding:"14px",marginTop:"16px"}}>
              <div style={{fontSize:"14px",color:"#a9b1d6",lineHeight:"1.7"}}>{step.tip}</div>
            </div>
          )}
        </div>
        <div className="right-panel">
          <GlossaryCard/>
        </div>
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
