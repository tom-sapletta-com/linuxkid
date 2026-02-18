const { useState, useEffect, useCallback, useRef } = React;

const LESSONS = [
  {
    id: "docker-basics",
    title: "Docker – kontenery",
    icon: "🐳",
    color: "#e0af68",
    layers: [
      {
        id: "what-is-docker",
        title: "Czym jest kontener?",
        category: "containers",
        categoryLabel: "🐳 Kontenery",
        description: "Kontener to plecak podróżny – pakujesz do niego wszystko, czego potrzebuje Twoja aplikacja, i możesz go zabrać gdziekolwiek. Działa tak samo na każdym komputerze.",
        analogy: "🎒 Kontener = plecak podróżny.\nPakujesz: ubrania (kod), jedzenie (biblioteki), mapę (konfigurację).\nGdziekolwiek pojedziesz, masz wszystko ze sobą – nie zależy od tego, co jest w hotelu.",
        steps: [
          {
            instruction: "Sprawdź, czy Docker jest zainstalowany:",
            command: "docker --version",
            expectedOutput: () => `Docker version 24.0.7, build afdd53b`,
            tip: "🐳 Docker to narzędzie do tworzenia i zarządzania plecakami (kontenerami). Wersja potwierdza, że jest gotowy!",
          },
          {
            instruction: "Pobierz gotowy plecak (obraz) z Dockera:",
            command: "docker pull hello-world",
            expectedOutput: () => `Using default tag: latest\nlatest: Pulling from library/hello-world\n2db29710123e: Pull complete\nDigest: sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f\nStatus: Downloaded newer image for hello-world:latest`,
            tip: "📦 docker pull = pobierasz gotowy plecak z internetu (Docker Hub). Ktoś go już spakował za Ciebie!",
          },
          {
            instruction: "Uruchom kontener z pobranego obrazu:",
            command: "docker run hello-world",
            expectedOutput: () => `Hello from Docker!\nThis message shows that your installation appears to be working correctly.\n\nTo generate this message, Docker took the following steps:\n 1. The Docker client contacted the Docker daemon.\n 2. The Docker daemon pulled the "hello-world" image.\n 3. The Docker daemon created a new container.\n 4. The Docker daemon streamed that output to the Docker client.`,
            tip: "🚀 docker run = otwierasz plecak i uruchamiasz to, co jest w środku. Kontener żyje tylko tak długo, jak potrzeba!",
          },
        ],
      },
      {
        id: "containers-manage",
        title: "Zarządzanie kontenerami",
        category: "containers",
        categoryLabel: "🐳 Kontenery",
        description: "Kontenery można uruchamiać, zatrzymywać i usuwać – jak włączanie i wyłączanie aplikacji na telefonie.",
        analogy: "📱 Kontener = aplikacja na telefonie.\ndocker ps = lista otwartych aplikacji.\ndocker stop = zamknij aplikację.\ndocker rm = odinstaluj aplikację.",
        steps: [
          {
            instruction: "Uruchom serwer Nginx w tle (jak aplikacja w tle na telefonie):",
            command: "docker run -d --name moj-serwer -p 8080:80 nginx",
            expectedOutput: () => `a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678`,
            tip: "📱 -d = uruchom w tle. --name = nadaj nazwę. -p 8080:80 = przekieruj okienko 8080 na 80 wewnątrz kontenera.",
          },
          {
            instruction: "Zobacz, jakie kontenery działają (otwarte aplikacje):",
            command: "docker ps",
            expectedOutput: () => `CONTAINER ID   IMAGE   COMMAND                  STATUS          PORTS                  NAMES\na1b2c3d4e5f6   nginx   "/docker-entrypoint.…"   Up 2 minutes    0.0.0.0:8080->80/tcp   moj-serwer`,
            tip: "📋 docker ps = 'pokaż otwarte aplikacje'. Twój serwer Nginx działa i jest dostępny na porcie 8080!",
          },
          {
            instruction: "Zatrzymaj i usuń kontener:",
            command: "docker stop moj-serwer && docker rm moj-serwer",
            expectedOutput: () => `moj-serwer\nmoj-serwer`,
            tip: "🛑 stop = zamknij. rm = odinstaluj. Kontener zniknął, ale obraz (plecak) nadal jest na dysku – możesz go uruchomić ponownie.",
          },
        ],
      },
    ],
  },
  {
    id: "dockerfile",
    title: "Budowanie obrazów",
    icon: "📝",
    color: "#7aa2f7",
    layers: [
      {
        id: "build-image",
        title: "Dockerfile – przepis na plecak",
        category: "build",
        categoryLabel: "📝 Budowanie",
        description: "Dockerfile to przepis na spakowanie plecaka. Opisujesz krok po kroku, co ma się znaleźć w środku – system, biblioteki, Twój kod.",
        analogy: "📝 Dockerfile = lista rzeczy do spakowania.\nFROM = 'weź ten plecak jako bazę'\nCOPY = 'włóż te pliki'\nRUN = 'zrób coś w środku (np. zainstaluj)'\nCMD = 'co uruchomić, gdy otworzysz plecak'",
        steps: [
          {
            instruction: "Stwórz prostą stronę WWW:",
            command: 'echo "<h1>🪐 Planeta X w kontenerze!</h1>" > index.html',
            expectedOutput: () => ``,
            tip: "📄 To będzie treść naszej strony – plakat, który umieścimy w plecaku.",
          },
          {
            instruction: "Napisz przepis na plecak (Dockerfile):",
            command: `echo 'FROM nginx:alpine\nCOPY index.html /usr/share/nginx/html/\nEXPOSE 80' > Dockerfile`,
            expectedOutput: () => ``,
            tip: "📝 FROM = bazowy plecak (nginx). COPY = włóż stronę do środka. EXPOSE = otwórz okienko 80.",
          },
          {
            instruction: "Zbuduj obraz z przepisu:",
            command: "docker build -t planeta-x-web .",
            expectedOutput: () => `[+] Building 2.1s (7/7) FINISHED\n => [1/2] FROM nginx:alpine\n => [2/2] COPY index.html /usr/share/nginx/html/\n => exporting to image\n => => naming to docker.io/library/planeta-x-web`,
            tip: "🏗️ docker build = pakujesz plecak według przepisu. -t = nadajesz mu nazwę. Kropka = 'szukaj Dockerfile tutaj'.",
          },
          {
            instruction: "Uruchom swój obraz!",
            command: "docker run -d --name planetax -p 3000:80 planeta-x-web",
            expectedOutput: () => `b2c3d4e5f6a789012345678901234567890abcdef`,
            tip: "🚀 Twoja strona Planety X działa w kontenerze na porcie 3000! Otwórz http://localhost:3000 w przeglądarce.",
          },
        ],
      },
    ],
  },
  {
    id: "compose",
    title: "Docker Compose",
    icon: "🎼",
    color: "#73daca",
    layers: [
      {
        id: "multi-container",
        title: "Orkiestra kontenerów",
        category: "compose",
        categoryLabel: "🎼 Compose",
        description: "Docker Compose to dyrygent orkiestry – zarządza wieloma kontenerami naraz. Zamiast uruchamiać każdy osobno, opisujesz całą orkiestrę w jednym pliku.",
        analogy: "🎼 Docker Compose = dyrygent orkiestry.\nKażdy muzyk (kontener) gra na swoim instrumencie.\ndocker-compose.yml = partytura – kto gra co i kiedy.\ndocker compose up = 'zaczynamy koncert!'",
        steps: [
          {
            instruction: "Stwórz partyturę (docker-compose.yml) z dwoma muzykami:",
            command: `echo 'services:\n  web:\n    image: nginx:alpine\n    ports:\n      - "8080:80"\n  redis:\n    image: redis:alpine' > docker-compose.yml`,
            expectedOutput: () => ``,
            tip: "🎼 web = pierwszy muzyk (serwer Nginx). redis = drugi muzyk (baza danych). Razem tworzą orkiestrę!",
          },
          {
            instruction: "Uruchom całą orkiestrę jednym poleceniem:",
            command: "docker compose up -d",
            expectedOutput: () => `[+] Running 2/2\n ✔ Container web-1    Started\n ✔ Container redis-1  Started`,
            tip: "🎵 up -d = 'dyrygent macha batutą, orkiestra zaczyna grać w tle'. Oba kontenery działają!",
          },
          {
            instruction: "Sprawdź status orkiestry:",
            command: "docker compose ps",
            expectedOutput: () => `NAME        IMAGE          STATUS          PORTS\nweb-1       nginx:alpine   Up 30 seconds   0.0.0.0:8080->80/tcp\nredis-1     redis:alpine   Up 30 seconds   6379/tcp`,
            tip: "📋 Obaj muzycy grają! web na porcie 8080, redis na 6379. Orkiestra działa.",
          },
          {
            instruction: "Zakończ koncert – zatrzymaj wszystko:",
            command: "docker compose down",
            expectedOutput: () => `[+] Running 2/2\n ✔ Container redis-1  Removed\n ✔ Container web-1    Removed`,
            tip: "🛑 down = 'koniec koncertu'. Wszystkie kontenery zatrzymane i usunięte. Partytura zostaje – możesz zagrać jeszcze raz!",
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
      <div className="bar"><div className="dot" style={{background:"#ff5f57"}}/><div className="dot" style={{background:"#febc2e"}}/><div className="dot" style={{background:"#28c840"}}/><span className="bar-label">🐳</span></div>
      <div className="body" ref={bodyRef} onClick={()=>inputRef.current?.focus()}>
        <div className="placeholder">Wpisz komendę i naciśnij Enter ⏎</div>
        {history.map((e,i)=>(<div key={i} style={{marginBottom:4}}>{e.t==="in"?(<div><span className="prompt">~$ </span><span className="cmd">{e.v}</span></div>):(<div className={`output ${e.ok?"ok":"err"}`}>{e.v}</div>)}</div>))}
        <div className="input-row"><span className="prompt">~$&nbsp;</span><input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()} autoFocus spellCheck={false} data-testid="terminal-input" autoComplete="off" autoCapitalize="off"/></div>
      </div>
      {(step||showNextConfirm||layerDone)&&(
        <div className="footer" style={{justifyContent:"space-between"}}>
          <div>{step&&!showNextConfirm&&<button className="hint-btn hint-ask" onClick={copyCmd} data-testid="hint-btn">💡 Podpowiedź</button>}</div>
          <div>{showNextConfirm&&<button className="hint-btn" onClick={proceedToNext} data-testid="next-step-btn" disabled={!confirmReady} style={{background:layerDone?"linear-gradient(135deg,#73daca,#7aa2f7)":"linear-gradient(135deg,#e0af68,#ff9e64)",color:"#0a0b10",border:"none",fontWeight:800,opacity:confirmReady?1:0.5}}>{layerDone?"🎉 Następny etap →":"✅ Następny krok →"}</button>}</div>
        </div>
      )}
    </div>
  );
}

function GlossaryCard() {
  const items = [["🎒","Kontener","Plecak podróżny z aplikacją"],["📝","Dockerfile","Przepis na spakowanie plecaka"],["📦","Obraz","Gotowy plecak (szablon)"],["🚀","docker run","Otwórz plecak i uruchom"],["📋","docker ps","Lista otwartych aplikacji"],["🏗️","docker build","Spakuj plecak wg przepisu"],["🎼","Compose","Dyrygent orkiestry kontenerów"],["📱","docker stop","Zamknij aplikację"],["🌐","Docker Hub","Sklep z gotowymi plecakami"],["🔌","-p 8080:80","Przekieruj okienko"]];
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
  const [done, setDone] = useState(() => pm ? new Set(pm.backend.getSteps('konteneryzacja')) : new Set());
  const [showNextConfirm, setShowNextConfirm] = useState(false), [confirmReady, setConfirmReady] = useState(false), [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { if (pm) pm.backend.setTotal('konteneryzacja', TOTAL_STEPS); }, []);
  const updateURL = useCallback((l, la, s) => { const les = LESSONS[l]; window.history.pushState(null, '', `#/${les?.id}/${les?.layers[la]?.id}/${s}`); }, []);
  const parseURL = useCallback(() => { const p = window.location.hash.replace('#/', '').split('/'); if (p.length >= 3) { const i = LESSONS.findIndex(l => l.id === p[0]); if (i >= 0) { const j = LESSONS[i].layers.findIndex(la => la.id === p[1]); if (j >= 0) return { li: i, lai: j, si: parseInt(p[2]) || 0 }; } } return { li: 0, lai: 0, si: 0 }; }, []);
  useEffect(() => { const h = () => { const p = parseURL(); setLI(p.li); setLAI(p.lai); setSI(p.si); setShowNextConfirm(false); }; window.addEventListener('popstate', h); return () => window.removeEventListener('popstate', h); }, [parseURL]);
  useEffect(() => { const p = parseURL(); setLI(p.li); setLAI(p.lai); setSI(p.si); }, [parseURL]);
  const lesson = LESSONS[li], layer = lesson?.layers[lai], step = layer?.steps[si];
  const layerDone = si >= layer.steps.length - 1 && done.has(`${li}-${lai}-${layer.steps.length - 1}`);
  const nextLayer = () => { if (lai < lesson.layers.length - 1) { setLAI(lai + 1); setSI(0); updateURL(li, lai + 1, 0); } else if (li < LESSONS.length - 1) { setLI(li + 1); setLAI(0); setSI(0); updateURL(li + 1, 0, 0); } else { window.location.href = '../index.html'; } };
  const onSuccess = () => { const key = `${li}-${lai}-${si}`; setDone(p => { const n = new Set([...p, key]); if (pm) { pm.backend.saveStepDone('konteneryzacja', key); if (n.size >= TOTAL_STEPS) pm.backend.completeMission('konteneryzacja'); } return n; }); setConfirmReady(false); setTimeout(() => setConfirmReady(true), 700); setShowNextConfirm(true); };
  const goTo = (l, la) => { setLI(l); setLAI(la); setSI(0); setMenuOpen(false); updateURL(l, la, 0); };
  const proceedToNext = () => { if (!confirmReady) return; setShowNextConfirm(false); setConfirmReady(false); if (si < layer.steps.length - 1) { setSI(si + 1); updateURL(li, lai, si + 1); } else { nextLayer(); } };
  const pct = Math.round(([...done].length / TOTAL_STEPS) * 100);
  return (
    <div style={{minHeight:"100vh",background:"#0a0b10",fontFamily:"'Nunito',system-ui,sans-serif",color:"#c0caf5"}} data-testid="app-main">
      <div className="app-nav">
        <div className="logo"><button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} data-testid="menu-toggle">☰</button><span className="logo-icon">🐳</span><a href="../index.html" style={{textDecoration:"none",color:"inherit"}}><span className="logo-text">Planeta X</span></a><span className="logo-sub">Konteneryzacja</span></div>
        <div className="nav-center"><div className="step-dots"><span className="label">Krok:</span>{layer.steps.map((_,s)=>{const d=done.has(`${li}-${lai}-${s}`),a=s===si;return<button key={s} onClick={()=>setSI(s)} className={`step-dot${a?" active":""}`} style={{background:d?"#73daca":a?"#e0af68":"#1e2030"}} data-testid={`step-${s}`}/>;})}<span className="label">{si+1}/{layer.steps.length}</span></div></div>
        <div style={{display:"flex",alignItems:"center",gap:14}}><span style={{fontSize:"14px",color:"#7982a9",fontWeight:700}}>{pct}%</span></div>
      </div>
      <div className="main-layout">
        <div className={`sidebar${menuOpen?" open":""}`}>{LESSONS.map((les,l)=>(<div key={les.id} style={{marginBottom:16}}><div className="lesson-title" style={{color:les.color}}>{les.icon} {les.title}</div>{les.layers.map((lay,la)=>{const active=l===li&&la===lai,allDone=lay.steps.every((_,s)=>done.has(`${l}-${la}-${s}`));return(<button key={lay.id} className="layer-btn" onClick={()=>goTo(l,la)} style={{background:active?`${les.color}18`:"transparent",border:active?`2px solid ${les.color}44`:"2px solid transparent",color:"#c0caf5"}}><div className="name">{allDone?"✅":active?"▶":"○"} {lay.title}</div><div className="count">{lay.steps.filter((_,s)=>done.has(`${l}-${la}-${s}`)).length}/{lay.steps.length}</div></button>);})}</div>))}</div>
        <div className="content">
          <div className="lesson-header" style={{background:`${lesson.color}08`,border:`2px solid ${lesson.color}22`}}><div className="cat" style={{color:lesson.color}}>{layer.categoryLabel}</div><h2>{layer.title}</h2><p className="desc">{layer.description}</p>{layer.analogy&&(<div className="analogy" style={{borderLeft:`4px solid ${lesson.color}`}}>{layer.analogy}</div>)}</div>
          {step&&(!layerDone||showNextConfirm)&&(<div className="instruction-box" style={{background:`${lesson.color}08`,border:`2px solid ${lesson.color}22`}} data-testid="instruction"><div className="text">🐳 {step.instruction}</div><div className="code-row"><code>{step.command}</code><CopyCode text={step.command}/></div></div>)}
          <Terminal step={(layerDone&&!showNextConfirm)?null:step} onSuccess={onSuccess} showNextConfirm={showNextConfirm} confirmReady={confirmReady} proceedToNext={proceedToNext} layerDone={layerDone}/>
          {step?.tip&&(<div style={{background:`${lesson.color}08`,border:`2px solid ${lesson.color}22`,borderRadius:"14px",padding:"14px",marginTop:"16px"}}><div style={{fontSize:"14px",color:"#a9b1d6",lineHeight:"1.7"}}>{step.tip}</div></div>)}
        </div>
        <div className="right-panel"><GlossaryCard/></div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
