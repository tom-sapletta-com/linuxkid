import { useState, useEffect, useRef, useCallback } from "react";

const COMPUTERS = [
  { name: "auto-ani", ip: "192.168.1.10", emoji: "🚗", user: "ania", color: "#ef4444" },
  { name: "auto-kuby", ip: "192.168.1.11", emoji: "🚙", user: "kuba", color: "#3b82f6" },
  { name: "auto-oli", ip: "192.168.1.12", emoji: "🚕", user: "ola", color: "#f59e0b" },
  { name: "auto-maxa", ip: "192.168.1.13", emoji: "🛻", user: "max", color: "#22c55e" },
];

const LESSONS = [
  {
    id: "intro",
    title: "Twój samochód",
    icon: "🚗",
    color: "#4ECDC4",
    layers: [
      {
        id: "what-is-terminal",
        title: "Radio w samochodzie",
        category: "basics",
        categoryLabel: "🚗 Podstawy",
        description: "Terminal to radio w Twoim samochodzie. Mówisz do niego komendy, a samochód je wykonuje.",
        analogy: "🎙️ Terminal = radio w samochodzie. Mówisz do niego, a samochód wykonuje polecenia.",
        steps: [
          {
            instruction: "Sprawdź markę swojego samochodu (nazwę komputera):",
            command: "hostname",
            expectedOutput: (pc) => pc.name,
            tip: "🚗 Marka auta = hostname komputera. Każde auto ma swoją nazwę!",
          },
          {
            instruction: "Sprawdź tablicę rejestracyjną (adres IP):",
            command: "hostname -I",
            expectedOutput: (pc) => pc.ip,
            tip: "🏷️ Tablica rejestracyjna = adres IP. Dzięki niej inne auta Cię znajdują na drodze.",
          },
          {
            instruction: "Kto siedzi za kierownicą?",
            command: "whoami",
            expectedOutput: (pc) => pc.user,
            tip: "🧑 Kierowca = użytkownik. Komputer wie, kto nim steruje!",
          },
        ],
      },
    ],
  },
  {
    id: "network",
    title: "Drogi i ruch",
    icon: "🛣️",
    color: "#FF6B6B",
    layers: [
      {
        id: "who-is-here",
        title: "Kto jeździ po naszych drogach?",
        category: "network",
        categoryLabel: "🛣️ Sieć",
        description: "Sieć to drogi w mieście. Każdy samochód (komputer) ma tablicę rejestracyjną (IP). Skrzyżowania (routery) kierują ruch.",
        analogy: "🛣️ Sieć = drogi w mieście. Drogi mają numery (adresy IP). Skrzyżowania to routery – kierują ruch.",
        steps: [
          {
            instruction: "Zobaczmy, jakie samochody jeżdżą po naszych drogach:",
            command: "arp -a",
            expectedOutput: () => COMPUTERS.map(c => `${c.emoji} ${c.name} (${c.ip})`).join("\n"),
            tip: "📋 To lista aut, które Twój samochód widział na drodze. Jak spis tablic rejestracyjnych!",
          },
          {
            instruction: "Zatrąb do samochodu Kuby – sprawdź, czy jest na drodze:",
            command: "ping -c 3 auto-kuby",
            expectedOutput: () => `PING auto-kuby (192.168.1.11): 56 bytes\n64 bytes from 192.168.1.11: time=1.2ms\n64 bytes from 192.168.1.11: time=0.8ms\n64 bytes from 192.168.1.11: time=1.0ms\n--- ping: 3 wysłane, 3 odebrane, 0% strat`,
            tip: "📯 Ping = trąbienie. Trąbisz 3 razy (-c 3), Kuba trąbi z powrotem. Czas (ms) = jak daleko jest.",
          },
        ],
      },
      {
        id: "talking",
        title: "Samochody rozmawiają",
        category: "network",
        categoryLabel: "🛣️ Sieć",
        description: "Samochody mogą się porozumiewać – wysyłać paczki (dane) pod konkretny adres i numer bramy (port).",
        analogy: "🚪 Port = numer bramy w garażu. Paczka trafia pod właściwy adres ORAZ do właściwej bramy.",
        steps: [
          {
            instruction: "Włącz megafon – niech Twoje auto coś powie:",
            command: 'echo "Cześć z mojego auta!"',
            expectedOutput: () => "Cześć z mojego auta!",
            tip: "📢 echo = megafon. Powtarza to, co powiesz.",
          },
          {
            instruction: "Wyślij paczkę do auta Kuby (brama 1234):",
            command: 'echo "Hej Kuba!" | nc auto-kuby 1234',
            expectedOutput: () => "✅ Paczka dostarczona do auto-kuby, brama 1234",
            tip: "📦 Paczka jedzie pod adres (auto-kuby) do bramy (1234). Znak | to taśma – przekazuje paczkę dalej.",
          },
          {
            instruction: "Nadaj komunikat przez radio do WSZYSTKICH aut:",
            command: 'echo "Uwaga, objazd!" | nc --broadcast 1234',
            expectedOutput: () => `📻 Nadano do wszystkich:\n  ${COMPUTERS.slice(1).map(c => `${c.emoji} ${c.name}`).join("\n  ")}`,
            tip: "📻 Broadcast = radio FM. Jedna stacja nadaje, wszystkie auta słyszą ten sam komunikat!",
          },
        ],
      },
    ],
  },
  {
    id: "env",
    title: "Schowek auta",
    icon: "📋",
    color: "#A78BFA",
    layers: [
      {
        id: "env-basics",
        title: "Dokumenty w schowku",
        category: "system",
        categoryLabel: "📋 System",
        description: "Każde auto ma schowek z dokumentami: dowód rejestracyjny, ubezpieczenie, mapa. Komputer też – to zmienne ENV.",
        analogy: "📋 ENV = dokumenty w schowku auta. Dowód rejestracyjny, ubezpieczenie, mapa – wszystko o Twoim samochodzie.",
        steps: [
          {
            instruction: "Otwórz schowek – zobacz wszystkie dokumenty:",
            command: "env",
            expectedOutput: (pc) => `USER=${pc.user}\nHOME=/home/${pc.user}\nHOSTNAME=${pc.name}\nPATH=/usr/local/bin:/usr/bin:/bin\nSHELL=/bin/bash\nLANG=pl_PL.UTF-8`,
            tip: "📋 Każdy dokument ma nazwę (np. USER) i treść (np. ania). To pamięć Twojego auta.",
          },
          {
            instruction: "Przeczytaj dowód – kto jest kierowcą:",
            command: "echo $USER",
            expectedOutput: (pc) => pc.user,
            tip: "🧑 $USER = dowód kierowcy. Znak $ mówi: 'pokaż ten dokument'.",
          },
          {
            instruction: "Gdzie jest Twój garaż (katalog domowy):",
            command: "echo $HOME",
            expectedOutput: (pc) => `/home/${pc.user}`,
            tip: "🏠 $HOME = adres Twojego garażu. Tu trzymasz swoje pliki.",
          },
          {
            instruction: "Wrzuć nowy dokument do schowka – ulubiony kolor auta:",
            command: 'export KOLOR="czerwony"',
            expectedOutput: () => "",
            tip: "📝 export = wkładasz nową karteczkę do schowka.",
          },
          {
            instruction: "Przeczytaj nowy dokument:",
            command: "echo $KOLOR",
            expectedOutput: () => "czerwony",
            tip: "✅ Zapamiętane! Ale uwaga – jak wyłączysz silnik (zamkniesz terminal), ta karteczka zniknie.",
          },
        ],
      },
      {
        id: "bashrc",
        title: "Instrukcja obsługi (.bashrc)",
        category: "system",
        categoryLabel: "📋 System",
        description: "Żeby auto pamiętało ustawienia po ponownym uruchomieniu, zapisujemy je w instrukcji obsługi.",
        analogy: "📓 .bashrc = instrukcja obsługi auta. Co ma się włączyć, gdy przekręcisz kluczyk.",
        steps: [
          {
            instruction: "Zajrzyj do garażu – zobacz ukryte pliki:",
            command: "ls -a ~",
            expectedOutput: () => `.  ..  .bashrc  .profile  .bash_history  Dokumenty  Obrazy`,
            tip: "🔍 Pliki z kropką (.) to ukryte schowki. .bashrc to najważniejszy – instrukcja obsługi terminala!",
          },
          {
            instruction: "Otwórz instrukcję obsługi:",
            command: "cat ~/.bashrc",
            expectedOutput: (pc) => `# Instrukcja obsługi terminala: ${pc.user}\n# Co ma się włączyć po przekręceniu kluczyka\n\nexport PS1="${pc.user}@${pc.name}:$ "\n\n# Tu dodaj swoje skróty:`,
            tip: "📓 To się odpala za każdym razem, gdy włączasz terminal. Jak lista 'co zrobić po przekręceniu kluczyka'.",
          },
        ],
      },
    ],
  },
  {
    id: "aliases",
    title: "Naklejki na przyciski",
    icon: "🏷️",
    color: "#F59E0B",
    layers: [
      {
        id: "create-aliases",
        title: "Robimy naklejki (aliasy)",
        category: "shortcuts",
        categoryLabel: "🏷️ Skróty",
        description: "Alias to naklejka na przycisku. Zamiast pamiętać długą komendę, naklejasz krótką nazwę.",
        analogy: "🏷️ Alias = naklejka na przycisku. Zamiast 'włącz klimatyzację model XR-500 na 22°' – po prostu 'CHŁÓD'.",
        steps: [
          {
            instruction: "Naklejka 'czesc' – auto się przedstawia:",
            command: `alias czesc='echo "Cześć, jestem $HOSTNAME"'`,
            expectedOutput: () => "",
            tip: "🏷️ Nakleiliśmy 'czesc' na przycisk, który odpala echo z nazwą auta.",
          },
          {
            instruction: "Naciśnij przycisk!",
            command: "czesc",
            expectedOutput: (pc) => `Cześć, jestem ${pc.name}`,
            tip: "🎉 Jedno słowo zamiast długiej komendy!",
          },
          {
            instruction: "Naklejka 'droga' – kto jest na drodze:",
            command: "alias droga='arp -a'",
            expectedOutput: () => "",
            tip: "🏷️ 'droga' jest łatwiejsze niż 'arp -a'!",
          },
          {
            instruction: "Sprawdź drogę:",
            command: "droga",
            expectedOutput: () => COMPUTERS.map(c => `${c.emoji} ${c.name} (${c.ip})`).join("\n"),
            tip: "🛣️ Lista aut na drodze – jednym słowem!",
          },
          {
            instruction: "Naklejka 'trabi' – trąbienie (ping):",
            command: "alias trabi='ping -c 3'",
            expectedOutput: () => "",
            tip: "📯 Teraz 'trabi auto-kuby' = 'ping -c 3 auto-kuby'.",
          },
          {
            instruction: "Zatrąb do Oli!",
            command: "trabi auto-oli",
            expectedOutput: () => `PING auto-oli (192.168.1.12): 56 bytes\n64 bytes from 192.168.1.12: time=0.9ms\n64 bytes from 192.168.1.12: time=1.1ms\n64 bytes from 192.168.1.12: time=0.7ms\n--- 3 wysłane, 3 odebrane, 0% strat`,
            tip: "📯 Zatrąbiłeś 3 razy, Ola odtrąbiła 3 razy!",
          },
        ],
      },
      {
        id: "save-aliases",
        title: "Zapisz naklejki na stałe",
        category: "shortcuts",
        categoryLabel: "🏷️ Skróty",
        description: "Naklejki znikają, gdy wyłączysz silnik. Zapiszmy je w instrukcji obsługi!",
        analogy: "📓 Wpisz naklejki do instrukcji obsługi, żeby po ponownym uruchomieniu dalej działały.",
        steps: [
          {
            instruction: "Dopisz naklejki do instrukcji obsługi:",
            command: `echo 'alias czesc=\\'echo "Cześć, jestem $HOSTNAME"\\'' >> ~/.bashrc`,
            expectedOutput: () => "",
            tip: ">> = dopisz na koniec pliku (nie kasuj tego, co było!).",
          },
          {
            instruction: "Dopisz resztę naklejek:",
            command: `echo 'alias droga=\\'arp -a\\'' >> ~/.bashrc && echo 'alias trabi=\\'ping -c 3\\'' >> ~/.bashrc`,
            expectedOutput: () => "",
            tip: "&& = zrób jedno, potem drugie. Dwie naklejki jednym ruchem!",
          },
          {
            instruction: "Przekręć kluczyk – wczytaj nowe ustawienia:",
            command: "source ~/.bashrc",
            expectedOutput: () => "✅ Instrukcja wczytana! Naklejki działają.",
            tip: "🔑 source = przekręcenie kluczyka. Terminal czyta instrukcję od nowa.",
          },
        ],
      },
    ],
  },
  {
    id: "permissions",
    title: "Kluczyki i zamki",
    icon: "🔑",
    color: "#EC4899",
    layers: [
      {
        id: "users",
        title: "Kierowcy i kluczyki",
        category: "security",
        categoryLabel: "🔑 Bezpieczeństwo",
        description: "Każdy kierowca ma kluczyki tylko do swojego auta. Mechanik (root) ma klucze do wszystkich aut.",
        analogy: "🔑 Uprawnienia = kluczyki. Twoje kluczyki pasują do Twojego auta, ale nie do cudzego.",
        steps: [
          {
            instruction: "Kim jesteś (który kierowca)?",
            command: "whoami",
            expectedOutput: (pc) => pc.user,
            tip: "🧑 Twoje imię kierowcy. Masz kluczyki do swojego auta, ale nie do cudzego.",
          },
          {
            instruction: "Do jakich parkingów (grup) masz kartę?",
            command: "groups",
            expectedOutput: (pc) => `${pc.user} uczniowie siec`,
            tip: "🅿️ Grupy = parkingi. Masz kartę do kilku parkingów, każdy daje inne uprawnienia.",
          },
          {
            instruction: "Sprawdź zamki na pliku:",
            command: "ls -l ~/Dokumenty/notatki.txt",
            expectedOutput: (pc) => `-rw-r--r-- 1 ${pc.user} uczniowie 42 sty 15 notatki.txt`,
            tip: "🔑 r=czytanie 📖  w=pisanie ✏️  x=uruchamianie 🏃\nPierwsze rw- = Ty, drugie r-- = Twoja grupa, trzecie r-- = wszyscy.",
          },
        ],
      },
      {
        id: "auth",
        title: "Prawo jazdy i szlaban",
        category: "security",
        categoryLabel: "🔑 Bezpieczeństwo",
        description: "Autentykacja = pokazujesz prawo jazdy (kim jesteś). Autoryzacja = czy szlaban Cię wpuści (co możesz robić).",
        analogy: "🪪 Autentykacja = pokazanie prawa jazdy.\n✅ Autoryzacja = sprawdzenie, czy masz pozwolenie na wjazd.",
        steps: [
          {
            instruction: "Spróbuj wjechać do strefy zamkniętej:",
            command: "cat /etc/shadow",
            expectedOutput: () => "❌ Brak pozwolenia! Tylko mechanik (root) tu wjedzie.",
            tip: "🚧 Strefa zamknięta – tylko administrator (root) ma klucz. Szlaban nie podniesie się!",
          },
          {
            instruction: "Kto jest głównym mechanikiem?",
            command: "cat /etc/passwd | grep root",
            expectedOutput: () => "root:x:0:0:root:/root:/bin/bash",
            tip: "🔧 root = główny mechanik. Ma klucze do WSZYSTKIEGO. Numer 0 = szef.",
          },
          {
            instruction: "Zamknij swoje notatki na klucz (tylko Ty masz dostęp):",
            command: "chmod 700 ~/tajne-notatki.txt",
            expectedOutput: () => "",
            tip: "🔐 chmod 700 = zamykasz auto na klucz. 7=Ty wszystko, 0=grupa nic, 0=inni nic.",
          },
          {
            instruction: "Sprawdź, czy zamek działa:",
            command: "ls -l ~/tajne-notatki.txt",
            expectedOutput: (pc) => `-rwx------ 1 ${pc.user} uczniowie 0 sty 15 tajne-notatki.txt`,
            tip: "✅ rwx dla Ciebie, --- dla reszty. Auto zamknięte na klucz – nikt nie wsiądzie!",
          },
        ],
      },
    ],
  },
  {
    id: "os-compare",
    title: "Typy aut",
    icon: "🏎️",
    color: "#06B6D4",
    layers: [
      {
        id: "os-overview",
        title: "Linux, Windows, macOS",
        category: "os",
        categoryLabel: "🏎️ Systemy",
        description: "Systemy operacyjne to marki aut. Każda wygląda inaczej, ale wszystkie jeżdżą po tych samych drogach.",
        analogy: "🐧 Linux = auto do składania samemu (darmowe)\n🪟 Windows = najpopularniejsze auto (wszyscy znają)\n🍎 macOS = auto premium (eleganckie, drogie)",
        steps: [
          {
            instruction: "Sprawdź markę swojego systemu:",
            command: "uname -a",
            expectedOutput: () => "Linux auto-ani 6.1.0 #1 SMP x86_64 GNU/Linux",
            tip: "🐧 Masz Linuxa! Darmowy system. Większość serwerów na świecie to Linuxy.",
          },
          {
            instruction: "Porównaj komendy w różnych systemach:",
            command: "echo 'Linux: ls | Windows: dir | macOS: ls'",
            expectedOutput: () => "🐧 Linux:   ls -la     | terminal: bash\n🪟 Windows: dir /a     | terminal: PowerShell\n🍎 macOS:   ls -la     | terminal: zsh\n\n→ Linux i macOS to kuzyni – komendy prawie takie same!",
            tip: "🚗 Różne marki aut mają pedały w tym samym miejscu. Różne systemy – inne komendy, ten sam cel!",
          },
        ],
      },
    ],
  },
];

const ALL_LAYERS = LESSONS.flatMap(l => l.layers);
const TOTAL_STEPS = ALL_LAYERS.reduce((s, l) => s + l.steps.length, 0);

function Terminal({ pc, step, onSuccess, aliases }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [hint, setHint] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  useEffect(() => { setHistory([]); setInput(""); setHint(false); }, [step?.command]);
  useEffect(() => { bodyRef.current && (bodyRef.current.scrollTop = bodyRef.current.scrollHeight); }, [history]);
  const run = useCallback(() => {
    const cmd = input.trim(); if (!cmd) return;
    let out = "", ok = false;
    if (step) {
      const norm = s => s.replace(/\s+/g, " ").trim();
      if (norm(cmd) === norm(step.command) || cmd.startsWith(step.command.split(" ")[0])) { out = step.expectedOutput(pc); ok = true; }
      else { const a = aliases.find(x => x.name === cmd.split(" ")[0]); if (a) { out = `→ ${a.exp} ${cmd.split(" ").slice(1).join(" ")}\n${step.expectedOutput(pc)||"✅"}`; ok = true; } else out = `❓ Wpisz: ${step.command}`; }
    }
    setHistory(h => [...h, { t:"in", v:cmd }, ...(out?[{t:"out",v:out,ok}]:[])]);
    if (ok && onSuccess) setTimeout(onSuccess, 500);
    setInput(""); setHint(false);
  }, [input, step, pc, aliases, onSuccess]);
  const prompt = `${pc.user}@${pc.name}:~$`;
  return (
    <div style={{background:"#0c0e14",borderRadius:14,overflow:"hidden",fontFamily:"'JetBrains Mono','Fira Code',monospace",fontSize:13,border:"1px solid #1e2030"}}>
      <div style={{background:"#161822",padding:"7px 14px",display:"flex",alignItems:"center",gap:7,borderBottom:"1px solid #1e2030"}}>
        <div style={{width:11,height:11,borderRadius:"50%",background:"#ff5f57"}}/>
        <div style={{width:11,height:11,borderRadius:"50%",background:"#febc2e"}}/>
        <div style={{width:11,height:11,borderRadius:"50%",background:"#28c840"}}/>
        <span style={{color:"#5a6082",marginLeft:8,fontSize:11}}>{pc.emoji} {pc.name}</span>
      </div>
      <div ref={bodyRef} onClick={()=>inputRef.current?.focus()} style={{padding:14,minHeight:180,maxHeight:280,overflowY:"auto",cursor:"text"}}>
        <div style={{color:"#3b3f56",fontSize:11,marginBottom:6}}>Wpisz komendę i naciśnij Enter ⏎</div>
        {history.map((e,i)=>(
          <div key={i} style={{marginBottom:3}}>
            {e.t==="in"?(<div><span style={{color:"#73daca"}}>{prompt} </span><span style={{color:"#c0caf5"}}>{e.v}</span></div>)
            :(<div style={{color:e.ok?"#a9b1d6":"#f7768e",whiteSpace:"pre-wrap",paddingLeft:8,borderLeft:`2px solid ${e.ok?"#73daca":"#f7768e"}`,marginLeft:4}}>{e.v}</div>)}
          </div>
        ))}
        <div style={{display:"flex"}}>
          <span style={{color:"#73daca"}}>{prompt} </span>
          <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}
            style={{background:"transparent",border:"none",color:"#c0caf5",fontFamily:"inherit",fontSize:"inherit",outline:"none",flex:1,caretColor:"#7aa2f7"}} autoFocus spellCheck={false}/>
        </div>
      </div>
      {step&&(
        <div style={{background:"#161822",padding:"7px 14px",borderTop:"1px solid #1e2030",display:"flex",justifyContent:"space-between"}}>
          {hint?(<button onClick={()=>{setInput(step.command);inputRef.current?.focus()}} style={{background:"#2a2e44",color:"#c0caf5",border:"none",borderRadius:7,padding:"4px 12px",cursor:"pointer",fontFamily:"inherit",fontSize:11}}>📋 {step.command}</button>)
          :(<button onClick={()=>setHint(true)} style={{background:"transparent",color:"#3b3f56",border:"1px solid #2a2e44",borderRadius:7,padding:"4px 12px",cursor:"pointer",fontFamily:"inherit",fontSize:11}}>💡 Podpowiedź</button>)}
        </div>
      )}
    </div>
  );
}

function CityMap({computers,active}){
  return(
    <div style={{background:"#12141e",borderRadius:14,padding:16,border:"1px solid #1e2030"}}>
      <div style={{fontSize:12,color:"#7aa2f7",marginBottom:10,fontWeight:700}}>🛣️ Nasza sieć (miasto)</div>
      <div style={{height:3,background:"#2a2e44",borderRadius:2,margin:"6px 0 10px",position:"relative"}}>
        <div style={{position:"absolute",top:-3,left:"50%",transform:"translateX(-50%)",width:9,height:9,background:"#f59e0b",borderRadius:"50%",boxShadow:"0 0 8px #f59e0b55"}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {computers.map(pc=>(
          <div key={pc.name} style={{background:pc.name===active.name?`${pc.color}18`:"#161822",borderRadius:10,padding:10,textAlign:"center",border:pc.name===active.name?`2px solid ${pc.color}`:"1px solid #1e2030",transition:"all 0.3s"}}>
            <div style={{fontSize:24}}>{pc.emoji}</div>
            <div style={{fontSize:10,fontWeight:700,color:pc.name===active.name?pc.color:"#5a6082",marginTop:2}}>{pc.name}</div>
            <div style={{fontSize:9,color:"#3b3f56",fontFamily:"monospace"}}>{pc.ip}</div>
            {pc.name===active.name&&<div style={{fontSize:8,color:"#73daca",marginTop:2,fontWeight:700}}>● TY</div>}
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",marginTop:8}}>
        <span style={{background:"#f59e0b22",color:"#f59e0b",fontSize:10,padding:"2px 10px",borderRadius:20,border:"1px solid #f59e0b44"}}>🔀 Router (skrzyżowanie)</span>
      </div>
    </div>
  );
}

function AnalogyCard(){
  const items=[
    ["🛣️","Sieć","Drogi w mieście"],["🔀","Router","Skrzyżowanie"],["🚗","Komputer","Samochód"],
    ["🏷️","Adres IP","Tablica rejestracyjna"],["🧑","Użytkownik","Kierowca"],["🔑","Hasło","Kluczyki do auta"],
    ["📯","Ping","Trąbienie"],["📢","Echo","Megafon"],["📋","ENV","Schowek z dokumentami"],
    ["📓",".bashrc","Instrukcja obsługi"],["🏷️","Alias","Naklejka na przycisku"],["🚪","Port","Numer bramy w garażu"],
    ["🅿️","Grupa","Parking z kartą"],["🚧","Brak uprawnień","Zamknięty szlaban"],["🔧","root","Główny mechanik"],
  ];
  return(
    <div style={{background:"#12141e",borderRadius:14,padding:14,border:"1px solid #1e2030",marginTop:14}}>
      <div style={{fontSize:12,fontWeight:700,color:"#f59e0b",marginBottom:8}}>🗺️ Słowniczek</div>
      {items.map(([icon,term,meaning],i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:"#5a6082",marginBottom:3}}>
          <span style={{width:16,textAlign:"center"}}>{icon}</span>
          <span style={{color:"#7982a9",fontWeight:600,minWidth:62}}>{term}</span>
          <span>=</span>
          <span>{meaning}</span>
        </div>
      ))}
    </div>
  );
}

export default function App(){
  const[pc,setPC]=useState(COMPUTERS[0]);
  const[li,setLI]=useState(0);
  const[lai,setLAI]=useState(0);
  const[si,setSI]=useState(0);
  const[done,setDone]=useState(new Set());
  const[aliases,setAliases]=useState([]);
  const[picking,setPicking]=useState(true);
  const[celebrate,setCelebrate]=useState(false);
  const lesson=LESSONS[li],layer=lesson?.layers[lai],step=layer?.steps[si];
  const layerDone=si>=layer.steps.length-1&&done.has(`${li}-${lai}-${layer.steps.length-1}`);
  const onSuccess=()=>{
    const key=`${li}-${lai}-${si}`;
    setDone(p=>new Set([...p,key]));
    if(step?.command?.startsWith("alias ")){const m=step.command.match(/alias\s+(\w+)='(.+)'/);if(m)setAliases(p=>[...p.filter(a=>a.name!==m[1]),{name:m[1],exp:m[2]}]);}
    if(si<layer.steps.length-1)setSI(si+1);else{setCelebrate(true);setTimeout(()=>setCelebrate(false),3000);}
  };
  const nextLayer=()=>{setCelebrate(false);if(lai<lesson.layers.length-1){setLAI(lai+1);setSI(0);}else if(li<LESSONS.length-1){setLI(li+1);setLAI(0);setSI(0);}};
  const goTo=(l,la)=>{setLI(l);setLAI(la);setSI(0);setCelebrate(false);};

  if(picking){
    return(
      <div style={{minHeight:"100vh",background:"#0a0b10",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Nunito',system-ui,sans-serif",padding:20}}>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"/>
        <div style={{maxWidth:560,textAlign:"center"}}>
          <div style={{fontSize:56}}>🚗</div>
          <h1 style={{color:"#c0caf5",fontSize:30,fontWeight:900,margin:"8px 0"}}>Szkoła Terminala</h1>
          <p style={{color:"#73daca",fontSize:14,fontWeight:700,marginBottom:4}}>Naucz się rozmawiać z komputerem!</p>
          <p style={{color:"#5a6082",fontSize:12,marginBottom:24}}>Sieć = drogi 🛣️ • Komputery = samochody 🚗 • Ty = kierowca 🧑</p>
          <p style={{color:"#7982a9",fontSize:13,marginBottom:16}}>Wybierz swój samochód:</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {COMPUTERS.map(c=>(
              <button key={c.name} onClick={()=>{setPC(c);setPicking(false)}}
                style={{background:"#12141e",border:`2px solid ${c.color}33`,borderRadius:14,padding:20,cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color;e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=c.color+"33";e.currentTarget.style.transform="";}}>
                <div style={{fontSize:44}}>{c.emoji}</div>
                <div style={{color:c.color,fontWeight:800,fontSize:15,marginTop:6}}>{c.name}</div>
                <div style={{color:"#3b3f56",fontSize:11,fontFamily:"monospace",marginTop:2}}>🏷️ {c.ip}</div>
                <div style={{color:"#5a6082",fontSize:11,marginTop:2}}>🧑 {c.user}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{minHeight:"100vh",background:"#0a0b10",fontFamily:"'Nunito',system-ui,sans-serif",color:"#c0caf5"}}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"/>
      <div style={{background:"#0f1019",borderBottom:"1px solid #1e2030",padding:"8px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:20}}>🚗</span><span style={{fontWeight:900,fontSize:15}}>Szkoła Terminala</span></div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontSize:11,color:"#3b3f56"}}>{done.size}/{TOTAL_STEPS}</span>
          <div style={{width:100,height:5,background:"#1e2030",borderRadius:100,overflow:"hidden"}}><div style={{height:"100%",width:`${(done.size/TOTAL_STEPS)*100}%`,background:"linear-gradient(90deg,#7aa2f7,#73daca)",borderRadius:100,transition:"width 0.5s"}}/></div>
          <button onClick={()=>setPicking(true)} style={{background:"#161822",border:"1px solid #1e2030",borderRadius:7,padding:"3px 10px",color:"#7982a9",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{pc.emoji} {pc.name}</button>
        </div>
      </div>
      <div style={{display:"flex",maxWidth:1100,margin:"0 auto",padding:18,gap:18}}>
        <div style={{width:240,flexShrink:0}}>
          {LESSONS.map((les,l)=>(
            <div key={les.id} style={{marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:800,color:les.color,marginBottom:4,display:"flex",alignItems:"center",gap:5}}>{les.icon} {les.title}</div>
              {les.layers.map((lay,la)=>{
                const active=l===li&&la===lai,ct=lay.steps.filter((_,s)=>done.has(`${l}-${la}-${s}`)).length,full=ct===lay.steps.length;
                return(<button key={lay.id} onClick={()=>goTo(l,la)} style={{display:"block",width:"100%",textAlign:"left",background:active?"#161822":"transparent",border:active?`1px solid ${les.color}44`:"1px solid transparent",borderRadius:9,padding:"7px 10px",cursor:"pointer",marginBottom:3,fontFamily:"inherit"}}>
                  <div style={{fontSize:12,fontWeight:active?700:600,color:active?"#c0caf5":"#5a6082",display:"flex",alignItems:"center",gap:5}}>{full?"✅":active?"▶":"○"} {lay.title}</div>
                  <div style={{fontSize:9,color:"#3b3f56",marginTop:1,marginLeft:18}}>{ct}/{lay.steps.length}</div>
                </button>);
              })}
            </div>
          ))}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{background:`${lesson.color}08`,borderRadius:14,padding:20,marginBottom:16,border:`1px solid ${lesson.color}22`}}>
            <div style={{fontSize:10,fontWeight:800,color:lesson.color,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{layer.categoryLabel}</div>
            <h2 style={{fontSize:22,fontWeight:900,margin:"0 0 6px",color:"#c0caf5"}}>{layer.title}</h2>
            <p style={{fontSize:13,color:"#7982a9",lineHeight:1.6,margin:0}}>{layer.description}</p>
            {layer.analogy&&(<div style={{background:"#0a0b1088",borderRadius:10,padding:12,marginTop:10,fontSize:12,color:"#a9b1d6",lineHeight:1.6,borderLeft:`3px solid ${lesson.color}`,whiteSpace:"pre-wrap"}}>{layer.analogy}</div>)}
          </div>
          <div style={{display:"flex",gap:5,marginBottom:14,alignItems:"center"}}>
            <span style={{fontSize:11,color:"#3b3f56",marginRight:4}}>Krok:</span>
            {layer.steps.map((_,s)=>{const d=done.has(`${li}-${lai}-${s}`),a=s===si;return<button key={s} onClick={()=>setSI(s)} style={{width:a?28:20,height:6,borderRadius:100,background:d?"#73daca":a?"#7aa2f7":"#1e2030",border:"none",cursor:"pointer",transition:"all 0.3s"}}/>;
            })}
            <span style={{fontSize:11,color:"#3b3f56",marginLeft:4}}>{si+1}/{layer.steps.length}</span>
          </div>
          {step&&!layerDone&&(
            <div style={{background:"#7aa2f708",borderRadius:11,padding:14,marginBottom:14,border:"1px solid #7aa2f722"}}>
              <div style={{fontSize:14,fontWeight:700,color:"#c0caf5",marginBottom:6}}>👉 {step.instruction}</div>
              <code style={{display:"inline-block",background:"#0c0e14",color:"#73daca",padding:"5px 12px",borderRadius:7,fontFamily:"'JetBrains Mono',monospace",fontSize:13,border:"1px solid #1e2030"}}>{step.command}</code>
            </div>
          )}
          {(celebrate||layerDone)&&(
            <div style={{background:"#73daca10",borderRadius:14,padding:20,marginBottom:14,border:"1px solid #73daca33",textAlign:"center"}}>
              <div style={{fontSize:44}}>🎉</div>
              <div style={{fontSize:18,fontWeight:800,color:"#73daca",marginBottom:6}}>Brawo!</div>
              <div style={{fontSize:12,color:"#7982a9",marginBottom:14}}>Ukończono: {layer.title}</div>
              <button onClick={nextLayer} style={{background:"linear-gradient(135deg,#7aa2f7,#73daca)",color:"#0a0b10",border:"none",borderRadius:10,padding:"10px 28px",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>Następny etap →</button>
            </div>
          )}
          <Terminal pc={pc} step={layerDone?null:step} onSuccess={onSuccess} aliases={aliases}/>
          {step&&done.has(`${li}-${lai}-${si}`)&&(
            <div style={{background:"#73daca08",borderRadius:11,padding:14,marginTop:14,border:"1px solid #73daca22"}}>
              <div style={{fontSize:13,color:"#73daca",fontWeight:700,marginBottom:4}}>✅ Co to znaczy:</div>
              <div style={{fontSize:13,color:"#a9b1d6",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{step.tip}</div>
            </div>
          )}
          {aliases.length>0&&(
            <div style={{background:"#f59e0b0a",borderRadius:11,padding:12,marginTop:14,border:"1px solid #f59e0b22"}}>
              <div style={{fontSize:12,fontWeight:700,color:"#f59e0b",marginBottom:6}}>🏷️ Twoje naklejki</div>
              {aliases.map((a,i)=>(<div key={i} style={{fontFamily:"monospace",fontSize:11,color:"#5a6082",marginBottom:3}}><span style={{color:"#73daca"}}>{a.name}</span> <span style={{color:"#3b3f56"}}>→</span> {a.exp}</div>))}
            </div>
          )}
        </div>
        <div style={{width:200,flexShrink:0}}>
          <CityMap computers={COMPUTERS} active={pc}/>
          <AnalogyCard/>
          <div style={{background:"#12141e",borderRadius:14,padding:14,border:"1px solid #1e2030",marginTop:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"#06b6d4",marginBottom:6}}>🏎️ Systemy = marki aut</div>
            <table style={{width:"100%",fontSize:9,color:"#5a6082"}}>
              <thead><tr><td></td><td>🐧</td><td>🪟</td><td>🍎</td></tr></thead>
              <tbody>
                {[["Pliki","ls","dir","ls"],["Ping","ping","ping","ping"],["Kim?","whoami","whoami","whoami"],["Terminal","bash","cmd","zsh"]].map(([l,...v],i)=>(
                  <tr key={i}><td style={{color:"#7982a9",fontWeight:600,padding:2}}>{l}</td>{v.map((x,j)=><td key={j} style={{fontFamily:"monospace",padding:2}}>{x}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
