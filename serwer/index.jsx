const { useState, useEffect, useCallback, useRef } = React;

/* ───── Lesson Data ───── */
const LESSONS = [
  {
    id: "nginx",
    title: "Pierwszy serwer",
    icon: "🏛️",
    color: "#9ece6a",
    layers: [
      {
        id: "install",
        title: "Instalacja Nginx",
        category: "server",
        categoryLabel: "🏛️ Serwer WWW",
        description: "Każde miasto potrzebuje sklepu – miejsca, gdzie ludzie mogą przyjść i coś zobaczyć. Serwer WWW to taki sklep w internecie.",
        analogy: "🏪 Serwer WWW = sklep w internecie.\nNginx = sprzedawca za ladą, który obsługuje klientów.\nKażdy sklep ma adres (IP) i okienka kas (porty).",
        steps: [
          {
            instruction: "Zaktualizuj listę dostępnych paczek:",
            command: "sudo apt update",
            expectedOutput: () => `Pobieranie:1 http://archive.ubuntu.com/ubuntu jammy InRelease\nPobieranie:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease\nGotowe. Wszystkie pakiety są aktualne.`,
            tip: "📦 apt update = sprawdzasz katalog sklepu z narzędziami. Nie instalujesz nic – tylko aktualizujesz listę tego, co jest dostępne.",
          },
          {
            instruction: "Zainstaluj serwer Nginx:",
            command: "sudo apt install nginx -y",
            expectedOutput: () => `Czytanie listy pakietów... Gotowe\nBudowanie drzewa zależności... Gotowe\nNastępujące NOWE pakiety zostaną zainstalowane:\n  nginx nginx-common\n0 aktualizowanych, 2 nowo instalowanych\nRozpakowywanie nginx...\n✅ nginx zainstalowany pomyślnie!`,
            tip: "🏗️ apt install = kupujesz narzędzie ze sklepu i montujesz je. -y = 'tak, na pewno chcę'.",
          },
          {
            instruction: "Sprawdź czy Nginx działa:",
            command: "systemctl status nginx",
            expectedOutput: () => `● nginx.service - A high performance web server\n   Loaded: loaded (/lib/systemd/system/nginx.service)\n   Active: active (running) since Mon 2025-01-01 12:00:00 UTC\n   Main PID: 1234 (nginx)\n   Tasks: 2\n   Memory: 4.5M\n   CGroup: /system.slice/nginx.service`,
            tip: "🔍 systemctl status = pytasz: 'Czy budynek jest otwarty?'. active (running) = tak, recepcjonista pracuje!",
          },
        ],
      },
      {
        id: "first-page",
        title: "Pierwsza strona WWW",
        category: "server",
        categoryLabel: "🏛️ Serwer WWW",
        description: "Serwer działa, ale budynek jest pusty! Czas stworzyć pierwszą stronę – wizytówkę Planety X.",
        analogy: "📄 Strona WWW = plakat w oknie budynku.\nKażdy, kto przejdzie obok (odwiedzi adres), zobaczy ten plakat.\nPlik HTML = treść plakatu.",
        steps: [
          {
            instruction: "Sprawdź co jest w domyślnym katalogu serwera:",
            command: "ls /var/www/html/",
            expectedOutput: () => `index.nginx-debian.html`,
            tip: "📁 /var/www/html/ = witryna budynku. Tu wkładasz plakaty (strony), które goście zobaczą.",
          },
          {
            instruction: "Stwórz swoją pierwszą stronę Planety X:",
            command: 'echo "<h1>Witaj na Planecie X!</h1>" > /var/www/html/index.html',
            expectedOutput: () => ``,
            tip: "📝 echo > plik = piszesz nowy plakat i wkładasz go do witryny. > nadpisuje stary plik.",
          },
          {
            instruction: "Sprawdź czy strona działa – odwiedź serwer:",
            command: "curl localhost",
            expectedOutput: () => `<h1>Witaj na Planecie X!</h1>`,
            tip: "🌐 curl = wysyłasz gościa do budynku. localhost = 'ten budynek, w którym stoję'. Gość wraca z treścią plakatu!",
          },
        ],
      },
    ],
  },
  {
    id: "dns",
    title: "Domena i DNS",
    icon: "🌐",
    color: "#73daca",
    layers: [
      {
        id: "dns-basics",
        title: "Jak działa DNS",
        category: "network",
        categoryLabel: "🌐 Sieć",
        description: "Ludzie nie pamiętają numerów IP – tak jak nie pamiętają numerów telefonów. DNS to lista kontaktów w telefonie.",
        analogy: "📱 DNS = lista kontaktów w telefonie.\nZamiast wpisywać numer 192.168.1.100, szukasz 'Planeta X' w kontaktach – telefon sam wybiera numer.",
        steps: [
          {
            instruction: "Sprawdź jaki adres IP ma domena google.com:",
            command: "nslookup google.com",
            expectedOutput: () => `Server:    8.8.8.8\nAddress:   8.8.8.8#53\n\nNon-authoritative answer:\nName:    google.com\nAddress: 142.250.74.206`,
            tip: "🔍 nslookup = otwierasz książkę adresową i szukasz numeru telefonu (IP) dla danej nazwy.",
          },
          {
            instruction: "Sprawdź rekordy DNS dla planetax.galaktyka:",
            command: "dig planetax.galaktyka",
            expectedOutput: () => `;; ANSWER SECTION:\nplanetax.galaktyka.    300    IN    A    192.168.1.100\n\n;; Query time: 12 msec\n;; SERVER: 8.8.8.8#53`,
            tip: "📖 dig = bardziej szczegółowe szukanie w książce adresowej. Rekord A = 'ten adres prowadzi do tego numeru IP'.",
          },
          {
            instruction: "Dodaj wpis do lokalnej książki adresowej:",
            command: 'echo "192.168.1.100 planetax.galaktyka" >> /etc/hosts',
            expectedOutput: () => ``,
            tip: "📝 /etc/hosts = prywatna książeczka adresowa Twojego komputera. Ma pierwszeństwo przed globalnym DNS!",
          },
          {
            instruction: "Sprawdź czy działa – odwiedź stronę po nazwie:",
            command: "curl planetax.galaktyka",
            expectedOutput: () => `<h1>Witaj na Planecie X!</h1>`,
            tip: "🎉 Działa! Zamiast numeru IP użyłeś nazwy – DNS (w tym przypadku /etc/hosts) przetłumaczył ją na adres.",
          },
        ],
      },
    ],
  },
  {
    id: "ssl",
    title: "Certyfikat SSL",
    icon: "🔒",
    color: "#7aa2f7",
    layers: [
      {
        id: "https-basics",
        title: "Dlaczego HTTPS?",
        category: "security",
        categoryLabel: "🔒 Bezpieczeństwo",
        description: "HTTP to rozmowa przez megafon – każdy słyszy. HTTPS to rozmowa w zamkniętym pokoju – nikt nie podsłucha.",
        analogy: "🔒 HTTPS = rozmowa w zamkniętym pokoju.\nCertyfikat SSL = dowód tożsamości budynku – potwierdza, że to naprawdę Planeta X, a nie oszust.\nLet's Encrypt = urząd wydający darmowe dowody.",
        steps: [
          {
            instruction: "Zainstaluj Certbot – narzędzie do certyfikatów:",
            command: "sudo apt install certbot python3-certbot-nginx -y",
            expectedOutput: () => `Czytanie listy pakietów... Gotowe\nNastępujące NOWE pakiety zostaną zainstalowane:\n  certbot python3-certbot-nginx\n✅ Certbot zainstalowany!`,
            tip: "🛠️ Certbot = urzędnik, który za Ciebie idzie do Let's Encrypt i załatwia dowód tożsamości (certyfikat SSL).",
          },
          {
            instruction: "Wygeneruj certyfikat SSL dla Planety X:",
            command: "sudo certbot --nginx -d planetax.galaktyka",
            expectedOutput: () => `Requesting a certificate for planetax.galaktyka\n\nSuccessfully received certificate.\nCertificate is saved at: /etc/letsencrypt/live/planetax.galaktyka/fullchain.pem\nKey is saved at: /etc/letsencrypt/live/planetax.galaktyka/privkey.pem\n\n✅ Certyfikat SSL zainstalowany!\n🔒 https://planetax.galaktyka`,
            tip: "🪪 Certbot poprosił Let's Encrypt o dowód tożsamości i automatycznie skonfigurował Nginx do szyfrowania.",
          },
          {
            instruction: "Sprawdź czy HTTPS działa:",
            command: "curl -I https://planetax.galaktyka",
            expectedOutput: () => `HTTP/2 200\nserver: nginx/1.24.0\nstrict-transport-security: max-age=31536000\nx-content-type-options: nosniff\ncontent-type: text/html`,
            tip: "🔒 HTTP/2 200 + strict-transport-security = budynek ma zamknięte drzwi i dowód tożsamości. Bezpiecznie!",
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
  const fireSuccess = (onSuccessFn) => {
    if (successFiredRef.current) return;
    successFiredRef.current = true;
    successTimerRef.current = setTimeout(onSuccessFn, 500);
  };
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
    let out = "", ok = false;
    if (step) {
      const norm = s => s.replace(/\s+/g, " ").trim();
      if (norm(cmd) === norm(step.command)) { out = step.expectedOutput(); ok = true; }
      else out = `❓ Wpisz: ${step.command}`;
    }
    setHistory(h => [...h, { t: "in", v: cmd }, ...(out ? [{ t: "out", v: out, ok }] : [])]);
    if (ok && onSuccess) fireSuccess(onSuccess);
    setInput(""); setHint(false);
  };
  return (
    <div className="terminal" data-testid="terminal">
      <div className="bar">
        <div className="dot" style={{background:"#ff5f57"}}/>
        <div className="dot" style={{background:"#febc2e"}}/>
        <div className="dot" style={{background:"#28c840"}}/>
        <span className="bar-label">🌐</span>
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
            {showNextConfirm&&<button className="hint-btn" onClick={proceedToNext} data-testid="next-step-btn" disabled={!confirmReady} style={{background:layerDone?"linear-gradient(135deg,#73daca,#7aa2f7)":"linear-gradient(135deg,#9ece6a,#73daca)",color:"#0a0b10",border:"none",fontWeight:800,opacity:confirmReady?1:0.5,cursor:confirmReady?"pointer":"default"}}>{layerDone?"🎉 Następny etap →":"✅ Następny krok →"}</button>}
          </div>
        </div>
      )}
    </div>
  );
}

/* ───── Server Map ───── */
function ServerMap() {
  return (
    <div className="server-map" data-testid="server-map">
      <div className="title">🖥️ Infrastruktura Planety X</div>
      <div className="client" style={{background:"#9ece6a18",border:"2px solid #9ece6a44"}}>
        <div className="emoji">🏛️</div>
        <div className="name" style={{color:"#9ece6a"}}>Serwer WWW (Nginx)</div>
        <div style={{fontSize:"12px",color:"#5a6082",fontFamily:"monospace"}}>192.168.1.100:80</div>
      </div>
      <div style={{textAlign:"center",color:"#5a6082",fontSize:"20px"}}>↕️</div>
      <div className="client" style={{background:"#7aa2f718",border:"2px solid #7aa2f744"}}>
        <div className="emoji">🌐</div>
        <div className="name" style={{color:"#7aa2f7"}}>Internet (goście)</div>
        <div style={{fontSize:"12px",color:"#5a6082"}}>planetax.galaktyka</div>
      </div>
    </div>
  );
}

/* ───── Glossary ───── */
function GlossaryCard() {
  const items = [
    ["🏪","Serwer WWW","Sklep w internecie"],
    ["🧑‍💼","Nginx","Sprzedawca za ladą"],
    ["🔓","Port 80","Kasa główna (HTTP)"],
    ["🔒","Port 443","Kasa z sejfem (HTTPS)"],
    ["🪪","Certyfikat SSL","Dowód tożsamości sklepu"],
    ["📱","DNS","Lista kontaktów w telefonie"],
    ["📄","HTML","Plakat w witrynie sklepu"],
    ["📁","/var/www/html","Witryna sklepu"],
    ["🔧","systemctl","Włącznik usług"],
    ["📦","apt","Sklep z narzędziami"],
    ["🌐","curl","Wysyłasz klienta do sklepu"],
    ["🛠️","Certbot","Urzędnik od certyfikatów"],
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
    return new Set(pm.backend.getSteps('serwer'));
  });
  const [showNextConfirm, setShowNextConfirm] = useState(false);

  useEffect(() => {
    if (pm) pm.backend.setTotal('serwer', TOTAL_STEPS);
  }, []);
  const [confirmReady, setConfirmReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const updateURL = useCallback((lessonIdx, layerIdx, stepIdx) => {
    const lesson = LESSONS[lessonIdx];
    const layer = lesson?.layers[layerIdx];
    window.history.pushState(null, '', `#/${lesson?.id}/${layer?.id}/${stepIdx}`);
  }, []);

  const parseURL = useCallback(() => {
    const hash = window.location.hash.replace('#/', '');
    const parts = hash.split('/');
    if (parts.length >= 3) {
      const lessonIdx = LESSONS.findIndex(l => l.id === parts[0]);
      if (lessonIdx >= 0) {
        const layerIdx = LESSONS[lessonIdx].layers.findIndex(la => la.id === parts[1]);
        if (layerIdx >= 0) return { li: lessonIdx, lai: layerIdx, si: parseInt(parts[2]) || 0 };
      }
    }
    return { li: 0, lai: 0, si: 0 };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const { li: l, lai: la, si: s } = parseURL();
      setLI(l); setLAI(la); setSI(s); setShowNextConfirm(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseURL]);

  useEffect(() => {
    const { li: l, lai: la, si: s } = parseURL();
    setLI(l); setLAI(la); setSI(s);
  }, [parseURL]);

  const lesson = LESSONS[li], layer = lesson?.layers[lai], step = layer?.steps[si];
  const layerDone = si >= layer.steps.length - 1 && done.has(`${li}-${lai}-${layer.steps.length - 1}`);

  const nextLayer = () => {
    if (lai < lesson.layers.length - 1) { setLAI(lai + 1); setSI(0); updateURL(li, lai + 1, 0); }
    else if (li < LESSONS.length - 1) { setLI(li + 1); setLAI(0); setSI(0); updateURL(li + 1, 0, 0); }
    else { window.location.href = '../index.html'; }
  };

  const onSuccess = () => {
    const key = `${li}-${lai}-${si}`;
    setDone(p => {
      const next = new Set([...p, key]);
      if (pm) {
        pm.backend.saveStepDone('serwer', key);
        if (next.size >= TOTAL_STEPS) pm.backend.completeMission('serwer');
      }
      return next;
    });
    setConfirmReady(false);
    setTimeout(() => setConfirmReady(true), 700);
    setShowNextConfirm(true);
  };

  const goTo = (l, la) => {
    setLI(l); setLAI(la); setSI(0); setMenuOpen(false);
    updateURL(l, la, 0);
  };

  const proceedToNext = () => {
    if (!confirmReady) return;
    setShowNextConfirm(false); setConfirmReady(false);
    if (si < layer.steps.length - 1) { setSI(si + 1); updateURL(li, lai, si + 1); }
    else { nextLayer(); }
  };

  useEffect(() => {
    if (typeof window.__pxSetChatCtx === 'function') {
      window.__pxSetChatCtx({
        missionId: 'serwer',
        missionTitle: 'Serwer Planety X',
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

  /* ── Computed ── */
  const completedSteps = [...done].length;
  const pct = Math.round((completedSteps / TOTAL_STEPS) * 100);

  return (
    <div style={{minHeight:"100vh",background:"#0a0b10",fontFamily:"'Nunito',system-ui,sans-serif",color:"#c0caf5"}} data-testid="app-main">
      <div className="app-nav">
        <div className="logo">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} data-testid="menu-toggle">☰</button>
          <span className="logo-icon">🌐</span>
          <a href="../index.html" style={{textDecoration:"none",color:"inherit"}}><span className="logo-text">Planeta X</span></a>
          <span className="logo-sub">Serwer</span>
        </div>
        <div className="nav-center">
          <div className="step-dots">
            <span className="label">Krok:</span>
            {layer.steps.map((_, s) => {
              const d = done.has(`${li}-${lai}-${s}`), a = s === si;
              return <button key={s} onClick={() => setSI(s)} className={`step-dot${a ? " active" : ""}`}
                style={{background: d ? "#73daca" : a ? "#9ece6a" : "#1e2030"}} data-testid={`step-${s}`}/>;
            })}
            <span className="label">{si + 1}/{layer.steps.length}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontSize:"14px",color:"#7982a9",fontWeight:700}}>{pct}%</span>
        </div>
      </div>

      <div className={`main-layout`}>
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
            <div className="instruction-box" style={{background:"#9ece6a08",border:"2px solid #9ece6a22"}} data-testid="instruction">
              <div className="text">🖥️ {step.instruction}</div>
              <div className="code-row"><code>{step.command}</code><CopyCode text={step.command}/></div>
            </div>
          )}
          <Terminal step={step} onSuccess={onSuccess} showNextConfirm={showNextConfirm} confirmReady={confirmReady} proceedToNext={proceedToNext} layerDone={layerDone}/>
          {step?.tip && (
            <div style={{background:"#9ece6a08",border:"2px solid #9ece6a22",borderRadius:"14px",padding:"14px",marginTop:"16px"}}>
              <div style={{fontSize:"14px",color:"#a9b1d6",lineHeight:"1.7"}}>{step.tip}</div>
            </div>
          )}
        </div>
        <div className="right-panel">
          <ServerMap/>
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
