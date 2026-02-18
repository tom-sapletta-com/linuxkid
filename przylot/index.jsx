const { useState, useEffect, useRef, useCallback } = React;

const COMPUTERS = [
  { name: "auto-ani", ip: "192.168.1.10", emoji: "🚗", user: "ania", color: "#ef4444" },
  { name: "auto-kuby", ip: "192.168.1.11", emoji: "🚙", user: "kuba", color: "#3b82f6" },
  { name: "auto-oli", ip: "192.168.1.12", emoji: "🚕", user: "ola", color: "#f59e0b" },
  { name: "auto-maxa", ip: "192.168.1.13", emoji: "🛻", user: "max", color: "#22c55e" },
];

const INTRO_STORY = {
  title: "🚀 Witamy na pokładzie statku kosmicznego!",
  story: `Jesteś podróżnikiem z dalekiej galaktyki. Twój statek właśnie wylądował na Planecie X - świecie, gdzie mieszkańcy porozumiewają się tajemniczym językiem poleceń.

Aby poruszać się po tym świecie i komunikować się z miejscowymi systemami, musisz nauczyć się ich języka - języka terminala.

Na tej planecie wszystko działa jak w sieci drogowej:
• Komputery to samochody jeżdżące po drogach
• Adresy IP to tablice rejestracyjne
• Routery to skrzyżowania kierujące ruchem
• Komendy to polecenia, które mówią samochodom, co mają robić

Wybierz swój samochód (komputer), którym będziesz podróżować po Planecie X i naucz się języka terminala!`,
  tips: [
    "🎯 Cel misji: poznać podstawowe komendy",
    "🧩 Najpierw teoria, potem zabawa w terminalu",
    "💡 Skorzystaj z podpowiedzi, gdy utkniesz",
    "🏆 Zdobądź wszystkie odznaki i zostań mistrzem!"
  ]
};

const LESSONS = [
  {
    id: "intro",
    title: "Twój samochód",
    icon: "🚗",
    color: "#4ECDC4",
    layers: [
      {
        id: "what-is-terminal",
        title: "Kierownica i pedały",
        category: "basics",
        categoryLabel: "🚗 Podstawy",
        description: "Terminal to kierownica i pedały w Twoim samochodzie. Sterujesz nimi, aby powiedzieć komputerowi, co ma robić.",
        analogy: "🎮 Terminal = kierownica i pedały.",
        theory: [
          {
            title: "🔀 Jak działa router?",
            content: "Router to skrzyżowanie w mieście. Każdy samochód (komputer) podjeżdża do skrzyżowania i mówi dokąd chce jechać. Router sprawdza swoją mapę (tablicę routingową) i wskazuje właściwą drogę.",
            examples: [
              "🚗 auto-ani chce jechać do auto-kuby (192.168.1.11)",
              "🔀 Router sprawdza: 192.168.1.11 jest w sieci lokalnej",
              "➡️ Wskazuje drogę prosto do auto-kuby"
            ]
          },
          {
            title: "📋 Każdy ma swoją książkę telefoniczną (/etc/hosts)",
            content: "Zamiast pamiętać numery IP, każdy komputer ma swoją książkę telefoniczną. Wpiszesz 'auto-kuby' i komputer wie, że to 192.168.1.11.",
            examples: [
              "📝 Plik /etc/hosts na każdym komputerze:",
              "192.168.1.10  auto-ani",
              "192.168.1.11  auto-kuby",
              "192.168.1.12  auto-oli",
              "192.168.1.13  auto-maxa"
            ]
          },
          {
            title: "🌐 DNS - wspólna książka telefoniczna internetu",
            content: "Gdy nie ma wpisu w /etc/hosts, komputer pyta wspólną książkę telefoniczną (DNS). Dlatego wpisujesz 'google.pl' a nie 142.250.185.78.",
            examples: [
              "🌐 Pytasz: gdzie jest 'google.pl'?",
              "📚 DNS odpowiada: 142.250.185.78",
              "🚗 Komputer jedzie pod adres 142.250.185.78"
            ]
          }
        ],
        steps: [
          {
            instruction: "Sprawdź nazwę swojego samochodu (potocznie):",
            command: "hostname",
            expectedOutput: (pc) => pc.name,
            tip: "🚗 Nazwa auta = hostname komputera. To potoczna nazwa, jaką wszyscy nazywają Twój samochód.",
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
        analogy: "🛣️ Sieć = drogi w mieście. Drogi mają numery (adresy IP).",
        theory: [
          {
            title: "🔀 Jak działa router?",
            content: "Router to skrzyżowanie w mieście. Każdy samochód (komputer) podjeżdża do skrzyżowania i mówi dokąd chce jechać. Router sprawdza swoją mapę (tablicę routingową) i wskazuje właściwą drogę.",
            examples: [
              "🚗 auto-ani chce jechać do auto-kuby (192.168.1.11)",
              "🔀 Router sprawdza: 192.168.1.11 jest w sieci lokalnej",
              "➡️ Wskazuje drogę prosto do auto-kuby"
            ]
          },
          {
            title: "📋 Każdy ma swoją książkę telefoniczną (/etc/hosts)",
            content: "Zamiast pamiętać numery IP, każdy komputer ma swoją książkę telefoniczną. Wpiszesz 'auto-kuby' i komputer wie, że to 192.168.1.11.",
            examples: [
              "📝 Plik /etc/hosts na każdym komputerze:",
              "192.168.1.10  auto-ani",
              "192.168.1.11  auto-kuby", 
              "192.168.1.12  auto-oli",
              "192.168.1.13  auto-maxa"
            ]
          },
          {
            title: "🌐 DNS - wspólna książka telefoniczna internetu",
            content: "Gdy nie ma wpisu w /etc/hosts, komputer pyta wspólną książkę telefoniczną (DNS). Dlatego wpisujesz 'google.pl' a nie 142.250.185.78.",
            examples: [
              "🌐 Pytasz: gdzie jest 'google.pl'?",
              "📚 DNS odpowiada: 142.250.185.78",
              "🚗 Komputer jedzie pod adres 142.250.185.78"
            ]
          }
        ],
        steps: [
          {
            instruction: "Zobaczmy, jakie samochody jeźdżą po naszych drogach:",
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
        description: "Samochody mogą się porozumiewać – wysyłać paczki (dane) pod konkretny adres i numer okienka (port).",
        analogy: "🚪 Port = numer okienka w budynku. Każde okienko obsługuje inną sprawę.",
        theory: [
          {
            title: "🚪 Porty - okienka w budynku",
            content: "Każdy komputer (budynek) ma wiele okienek (portów). Okienko 80 dla stron WWW, okienko 25 dla poczty, okienko 1234 dla naszej rozmowy. Musisz wiedzieć zarówno adres budynku, jak i numer okienka.",
            examples: [
              "🏠 adres: auto-kuby (192.168.1.11)",
              "🚪 okienko: 1234 (nasza rozmowa)",
              "📦 pełny adres: auto-kuby:1234"
            ]
          },
          {
            title: "📡 TCP vs UDP - list vs radio",
            content: "TCP to list polecony - pewnie dotrze, potwierdzenie odbioru. UDP to radio - szybko, ale może nie dotrzeć. Do rozmowy używamy TCP, do ogłoszeń UDP.",
            examples: [
              "📧 TCP: echo 'Cześć' | nc auto-kuby 1234 (pewne)",
              "📻 UDP: echo 'Cześć' | nc -u auto-kuby 1234 (szybkie)",
              "📢 Broadcast: echo 'Wszyscy!' | nc -b -u 192.168.1.255 1234"
            ]
          },
          {
            title: "🔄 Pipe (|) - taśma transportowa",
            content: "Znak | to taśma między maszynami. Lewa strona produkuje, prawa strona konsumuje. Idealne do automatyzacji!",
            examples: [
              "📝 echo 'Hej' produkuje tekst",
              "📦 | nc auto-kuby 1234 dostarcza",
              "🔄 Całość: echo 'Hej' | nc auto-kuby 1234"
            ]
          }
        ],
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
            command: 'echo "Uwaga, objazd!" | nc -b -u 192.168.1.255 1234',
            expectedOutput: () => `📻 Nadano do wszystkich:\n  ${COMPUTERS.slice(1).map(c => `${c.emoji} ${c.name}`).join("\n  ")}`,
            tip: "📻 Broadcast = radio FM. -b = nadaj do wszystkich, -u = przez radio (UDP). Jedna stacja nadaje, wszystkie auta słyszą!",
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
        analogy: "📋 ENV = dokumenty w schowku auta.",
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
            instruction: "Do jakich grup należysz?",
            command: "groups",
            expectedOutput: (pc) => `${pc.user} uczniowie siec`,
            tip: "👥 Grupy = grupy społeczne, do których należysz. Jak w życiu: rodzina, klasa szkolna, drużyna sportowa – każda daje Ci inne prawa i dostęp.",
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

function Terminal({ pc, step, onSuccess, aliases, incomingMessage, showNextConfirm, proceedToNext, layerDone, nextLayer }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [hint, setHint] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const successTimerRef = useRef(null);
  useEffect(() => {
    if (successTimerRef.current) { clearTimeout(successTimerRef.current); successTimerRef.current = null; }
    setHistory([]); setInput(""); setHint(false);
  }, [step?.command]);
  useEffect(() => { bodyRef.current && (bodyRef.current.scrollTop = bodyRef.current.scrollHeight); }, [history]);
  useEffect(() => {
    if (incomingMessage) {
      setHistory(h => [...h, { t: "in", v: incomingMessage.from, isRemote: true }, { t: "out", v: incomingMessage.msg, ok: true }]);
      setTimeout(() => bodyRef.current.scrollTop = bodyRef.current.scrollHeight, 50);
    }
  }, [incomingMessage]);
  const run = useCallback(() => {
    const cmd = input.trim(); if (!cmd) return;
    let out = "", ok = false;
    if (step) {
      const norm = s => s.replace(/\s+/g, " ").trim();
      if (norm(cmd) === norm(step.command) || cmd.startsWith(step.command.split(" ")[0])) { out = step.expectedOutput(pc); ok = true; }
      else { const a = aliases.find(x => x.name === cmd.split(" ")[0]); if (a) { out = `→ ${a.exp} ${cmd.split(" ").slice(1).join(" ")}\n${step.expectedOutput(pc) || "✅"}`; ok = true; } else out = `❓ Wpisz: ${step.command}`; }
    }
    setHistory(h => [...h, { t: "in", v: cmd }, ...(out ? [{ t: "out", v: out, ok }] : [])]);
    if (ok && onSuccess) { successTimerRef.current = setTimeout(onSuccess, 500); }
    setInput(""); setHint(false);
  }, [input, step, pc, aliases, onSuccess]);
  const prompt = "~$";
  const copyCmd = () => {
    const cmd = step.command;
    let out = "", ok = false;
    if (step) {
      const norm = s => s.replace(/\s+/g, " ").trim();
      if (norm(cmd) === norm(step.command) || cmd.startsWith(step.command.split(" ")[0])) { out = step.expectedOutput(pc); ok = true; }
      else { const a = aliases.find(x => x.name === cmd.split(" ")[0]); if (a) { out = `→ ${a.exp} ${cmd.split(" ").slice(1).join(" ")}\n${step.expectedOutput(pc)||"✅"}`; ok = true; } else out = `❓ Wpisz: ${step.command}`; }
    }
    setHistory(h => [...h, { t:"in", v:cmd }, ...(out?[{t:"out",v:out,ok}]:[])]);
    if (ok && onSuccess) { successTimerRef.current = setTimeout(onSuccess, 500); }
    setInput(""); setHint(false);
  };
  return (
    <div className="terminal" data-testid="terminal">
      <div className="bar">
        <div className="dot" style={{background:"#ff5f57"}}/>
        <div className="dot" style={{background:"#febc2e"}}/>
        <div className="dot" style={{background:"#28c840"}}/>
        <span className="bar-label">{pc.emoji}</span>
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
          <div>{step&&!layerDone&&<button className="hint-btn hint-ask" onClick={copyCmd} data-testid="hint-btn">💡 Podpowiedź</button>}</div>
          <div>
            {showNextConfirm&&<button className="hint-btn" onClick={proceedToNext} data-testid="next-step-btn" style={{background:"linear-gradient(135deg,#7aa2f7,#73daca)",color:"#0a0b10",border:"none",fontWeight:800}}>✅ Następny krok →</button>}
            {layerDone&&<button className="hint-btn" onClick={nextLayer} data-testid="next-layer" style={{background:"linear-gradient(135deg,#73daca,#7aa2f7)",color:"#0a0b10",border:"none",fontWeight:800}}>🎉 Następny etap →</button>}
          </div>
        </div>
      )}
    </div>
  );
}

function CityMap({computers,active}){
  return(
    <div className="city-map" data-testid="city-map">
      <div className="title">🛣️ Nasza sieć (miasto)</div>
      <div className="road"><div className="router-dot"/></div>
      <div className="grid">
        {computers.map(pc=>(
          <div key={pc.name} className="car"
            style={{background:pc.name===active.name?`${pc.color}18`:"#161822",border:pc.name===active.name?`2px solid ${pc.color}`:"2px solid #1e2030"}}>
            <div className="emoji">{pc.emoji}</div>
            <div className="name" style={{color:pc.name===active.name?pc.color:"#5a6082"}}>{pc.name}</div>
            <div className="ip">{pc.ip}</div>
            {pc.name===active.name&&<div className="you">● TY</div>}
          </div>
        ))}
      </div>
      <div className="router-label"><span>🔀 Router (skrzyżowanie)</span></div>
    </div>
  );
}

function AnalogyCard(){
  const items=[
    ["🛣️","Sieć","Drogi w mieście"],["🔀","Router","Skrzyżowanie"],["🚗","Komputer","Samochód"],
    ["🏷️","Adres IP","Tablica rejestracyjna"],["🧑","Użytkownik","Kierowca"],["🔑","Hasło","Kluczyki do auta"],
    ["📯","Ping","Trąbienie"],["📢","Echo","Megafon"],["📋","ENV","Schowek z dokumentami"],
    ["📓",".bashrc","Instrukcja obsługi"],["🏷️","Alias","Naklejka na przycisku"],["🚪","Port","Okienko w budynku (jak na poczcie)"],
    ["👥","Grupa","Grupa społeczna (rodzina, klasa)"],["🚧","Brak uprawnień","Zamknięty szlaban"],["🔧","root","Główny mechanik"],
  ];
  return(
    <div className="glossary" data-testid="glossary">
      <div className="title">🗺️ Słowniczek</div>
      {items.map(([icon,term,meaning],i)=>(
        <div key={i} className="row">
          <span className="icon">{icon}</span>
          <span className="term">{term}</span>
          <span>=</span>
          <span>{meaning}</span>
        </div>
      ))}
    </div>
  );
}

function App(){
  const[pc,setPC]=useState(COMPUTERS[0]);
  const[li,setLI]=useState(0);
  const[lai,setLAI]=useState(0);
  const[si,setSI]=useState(0);
  const[done,setDone]=useState(new Set());
  const[aliases,setAliases]=useState([]);
  const[picking,setPicking]=useState(true);
  const[showTheoryIntro,setShowTheoryIntro]=useState(false);
  const[receiverMessage,setReceiverMessage]=useState(null);
  const[showNextConfirm,setShowNextConfirm]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);
  
  // URL routing
  const updateURL = useCallback((lessonIdx, layerIdx, stepIdx, isIntro = false) => {
    if (isIntro) {
      window.history.pushState(null, '', '#/intro/theory/0');
    } else {
      const lesson = LESSONS[lessonIdx];
      const layer = lesson?.layers[layerIdx];
      const hash = `#/${lesson?.id || 'intro'}/${layer?.id || 'basics'}/${stepIdx}`;
      window.history.pushState(null, '', hash);
    }
  }, []);
  
  const parseURL = useCallback(() => {
    const hash = window.location.hash.slice(1) || '/intro/theory/0';
    const parts = hash.split('/').filter(Boolean);
    
    // Check if it's intro/theory page
    if (parts[0] === 'intro' && parts[1] === 'theory') {
      return { isIntro: true, li: 0, lai: 0, si: 0 };
    }
    
    if (parts.length >= 3) {
      const lessonIdx = LESSONS.findIndex(l => l.id === parts[0]);
      if (lessonIdx >= 0) {
        const layerIdx = LESSONS[lessonIdx].layers.findIndex(lay => lay.id === parts[1]);
        if (layerIdx >= 0) {
          const stepIdx = parseInt(parts[2]) || 0;
          return { isIntro: false, li: lessonIdx, lai: layerIdx, si: stepIdx };
        }
      }
    }
    return { isIntro: true, li: 0, lai: 0, si: 0 };
  }, []);
  
  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const { isIntro: isIntroPage, li: l, lai: la, si: s } = parseURL();
      if (isIntroPage) {
        setShowTheoryIntro(true);
        setPicking(false);
      } else {
        setLI(l);
        setLAI(la);
        setSI(s);
        setShowTheoryIntro(false);
        setShowNextConfirm(false);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseURL]);
  
  useEffect(() => {
    const { isIntro: isIntroPage, li: l, lai: la, si: s } = parseURL();
    if (!isIntroPage) {
      setLI(l);
      setLAI(la);
      setSI(s);
      setShowTheoryIntro(false);
    }
  }, [parseURL]);
  
  const lesson=LESSONS[li],layer=lesson?.layers[lai],step=layer?.steps[si];
  const layerDone=si>=layer.steps.length-1&&done.has(`${li}-${lai}-${layer.steps.length-1}`);
  
  const nextLayer=()=>{
    if(lai<lesson.layers.length-1){
      setLAI(lai+1);setSI(0);
      updateURL(li, lai+1, 0);
    }else if(li<LESSONS.length-1){
      setLI(li+1);setLAI(0);setSI(0);
      updateURL(li+1, 0, 0);
    }
  };

  const onSuccess=()=>{
    const key=`${li}-${lai}-${si}`;
    setDone(p=>new Set([...p,key]));
    if(step?.command?.startsWith("alias ")){const m=step.command.match(/alias\s+(\w+)='(.+)'/);if(m)setAliases(p=>[...p.filter(a=>a.name!==m[1]),{name:m[1],exp:m[2]}]);}
    
    // Handle nc commands - show message in receiver terminal
    if(step?.command?.includes("| nc") && step.command.includes("auto-kuby")){
      const msgMatch = step.command.match(/echo\s+"([^"]+)"/);
      if(msgMatch){
        setReceiverMessage({from: `📨 ${pc.name} wysyła:`, msg: msgMatch[1]});
        setTimeout(()=>setReceiverMessage(null), 8000);
      }
    }
    
    if(si<layer.steps.length-1)setShowNextConfirm(true);
  };
  
  const goTo=(l,la)=>{
    setLI(l);setLAI(la);setSI(0);setMenuOpen(false);
    updateURL(l, la, 0);
  };
  
  const proceedToNext=()=>{
    setShowNextConfirm(false);
    setSI(si+1);
    updateURL(li, lai, si+1);
  };

  if(picking){
    return(
      <div className="pick-screen" style={{fontFamily:"'Nunito',system-ui,sans-serif"}}>
        <div className="inner" data-testid="pick-screen">
          <div className="big-icon">🚗</div>
          <h1>Planeta X</h1>
          <p className="subtitle" style={{fontSize:"20px",fontWeight:700,color:"#a9b1d6"}}>Zostań komputerowym odkrywcą!</p>
          <p className="meta">Drogi = sieć 🛣️ • Komputery = auta 🚗 • Ty = kierowca 🧑‍🚀</p>
          <p className="choose">Wybierz swoje auto:</p>
          <div className="grid">
            {COMPUTERS.map(c=>(
              <button key={c.name} className="car-card" data-testid={`car-${c.user}`}
                onClick={()=>{setPC(c);setPicking(false);setShowTheoryIntro(true);updateURL(0,0,0,true);}}
                style={{border:`2px solid ${c.color}33`}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color;e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=c.color+"33";e.currentTarget.style.transform="";}}>
                <div className="emoji">{c.emoji}</div>
                <div className="name" style={{color:c.color}}>{c.name}</div>
                <div className="ip">🏷️ {c.ip}</div>
                <div className="user">🧑 {c.user}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Theory intro page after car selection
  if(showTheoryIntro){
    const currentLesson = LESSONS[li];
    const currentLayer = currentLesson?.layers[lai];
    return(
      <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0a0b10 0%,#1a1b2e 100%)",fontFamily:"'Nunito',system-ui,sans-serif",color:"#c0caf5",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
        <div style={{maxWidth:"800px",width:"100%"}}>
          <div style={{textAlign:"center",marginBottom:"24px"}}>
            <div style={{fontSize:"48px",marginBottom:"12px"}}>{pc.emoji}</div>
            <div style={{color:pc.color,fontSize:"20px",fontWeight:"800"}}>{pc.name}</div>
            <div style={{color:"#7982a9",fontSize:"14px"}}>Wybrałeś swój samochód!</div>
          </div>
          
          {/* Story introduction */}
          <div style={{background:"#161822",border:"2px solid #1e2030",borderRadius:"16px",padding:"20px",marginBottom:"20px"}}>
            <div style={{fontSize:"20px",fontWeight:"800",color:"#c0caf5",marginBottom:"12px",textAlign:"center"}}>{INTRO_STORY.title}</div>
            <div style={{fontSize:"15px",color:"#a9b1d6",lineHeight:"1.7",whiteSpace:"pre-wrap"}}>{INTRO_STORY.story}</div>
          </div>
          
          {/* Theory section */}
          <div style={{background:`${currentLesson.color}05`,border:`2px solid ${currentLesson.color}15`,borderRadius:"16px",padding:"24px",marginBottom:"20px"}}>
            <div style={{fontSize:"22px",fontWeight:"800",color:currentLesson.color,marginBottom:"16px",textAlign:"center"}}>📚 Jak to działa ?</div>
            
            {currentLayer?.theory?.map((item,i)=>(
              <div key={i} style={{marginBottom:"24px"}}>
                <div style={{fontSize:"18px",fontWeight:"700",color:"#c0caf5",marginBottom:"10px"}}>{item.title}</div>
                <div style={{fontSize:"16px",color:"#a9b1d6",lineHeight:"1.7",marginBottom:"14px"}}>{item.content}</div>
                <div style={{background:"#0c0e14",borderRadius:"10px",padding:"14px",borderLeft:`3px solid ${currentLesson.color}`}}>
                  {item.examples.map((ex,j)=>(
                    <div key={j} style={{fontSize:"15px",color:"#7982a9",fontFamily:"monospace",marginBottom:"6px"}}>{ex}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={()=>{setShowTheoryIntro(false);updateURL(li,lai,si);}} style={{width:"100%",background:"linear-gradient(135deg,#7aa2f7,#73daca)",color:"#0a0b10",border:"none",borderRadius:"12px",padding:"16px",fontWeight:"800",fontSize:"18px",cursor:"pointer",fontFamily:"inherit"}}>
            Ruszamy na przygodę! 🚀
          </button>
        </div>
      </div>
    );
  }

  return(
    <div style={{minHeight:"100vh",background:"#0a0b10",fontFamily:"'Nunito',system-ui,sans-serif",color:"#c0caf5"}} data-testid="app-main">
      <div className="app-nav">
        <div className="logo">
          <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} data-testid="menu-toggle">☰</button>
          <span className="logo-icon">🚗</span>
          <span className="logo-text">Planeta X</span>
        </div>
        <div className="nav-center">
          <div className="step-dots">
            <span className="label">Krok:</span>
            {layer.steps.map((_,s)=>{const d=done.has(`${li}-${lai}-${s}`),a=s===si;return<button key={s} onClick={()=>setSI(s)} className={`step-dot${a?" active":""}`} style={{background:d?"#73daca":a?"#7aa2f7":"#1e2030"}} data-testid={`step-${s}`}/>;
            })}
            <span className="label">{si+1}/{layer.steps.length}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <span className="progress-text">{done.size}/{TOTAL_STEPS}</span>
          <div className="progress-bar"><div className="progress-fill" style={{width:`${(done.size/TOTAL_STEPS)*100}%`}}/></div>
          <button className="car-btn" onClick={()=>setPicking(true)} data-testid="change-car">{pc.emoji} {pc.name}</button>
        </div>
      </div>
      <div className="main-layout">
        <div className={`sidebar${menuOpen?" open":""}`} data-testid="sidebar">
          {LESSONS.map((les,l)=>(
            <div key={les.id} style={{marginBottom:16}}>
              <div className="lesson-title" style={{color:les.color}}>{les.icon} {les.title}</div>
              {les.layers.map((lay,la)=>{
                const active=l===li&&la===lai,ct=lay.steps.filter((_,s)=>done.has(`${l}-${la}-${s}`)).length,full=ct===lay.steps.length;
                return(<button key={lay.id} onClick={()=>goTo(l,la)} className="layer-btn"
                  style={{background:active?"#161822":"transparent",border:active?`2px solid ${les.color}44`:"2px solid transparent"}}>
                  <div className="name" style={{fontWeight:active?700:600,color:active?"#c0caf5":"#7982a9"}}>{full?"✅":active?"▶":"○"} {lay.title}</div>
                  <div className="count">{ct}/{lay.steps.length}</div>
                </button>);
              })}
            </div>
          ))}
        </div>
        <div className="content">
          <div className="lesson-header" style={{background:`${lesson.color}08`,border:`2px solid ${lesson.color}22`}}>
            <h2>{layer.title}</h2>
            <p className="desc">{layer.description}</p>
            {layer.analogy&&(<div className="analogy" style={{borderLeft:`4px solid ${lesson.color}`}}>{layer.analogy}</div>)}
          </div>
          {step&&!layerDone&&(
            <div className="instruction-box" style={{background:"#7aa2f708",border:"2px solid #7aa2f722"}} data-testid="instruction">
              <div className="text">👉 {step.instruction}</div>
              <code>{step.command}</code>
            </div>
          )}
          <Terminal pc={pc} step={layerDone?null:step} onSuccess={onSuccess} aliases={aliases} showNextConfirm={showNextConfirm} proceedToNext={proceedToNext} layerDone={layerDone} nextLayer={nextLayer}/>
          
          {/* Second terminal for receiver in talking layer */}
          {layer.id === "talking" && (
            <div style={{marginTop:"20px"}}>
              <div style={{fontSize:"14px",fontWeight:"700",color:"#7982a9",marginBottom:"8px",textAlign:"center"}}>
                📡 Terminal odbiorcy (auto-kuby):
              </div>
              <Terminal 
                pc={COMPUTERS[1]} 
                step={null} 
                onSuccess={()=>{}} 
                aliases={[]} 
                incomingMessage={receiverMessage}
              />
            </div>
          )}
          {aliases.length>0&&(
            <div className="aliases-box" style={{background:"#f59e0b0a",border:"2px solid #f59e0b22"}}>
              <div className="title" style={{color:"#f59e0b"}}>🏷️ Twoje naklejki</div>
              {aliases.map((a,i)=>(<div key={i} className="item"><span style={{color:"#73daca"}}>{a.name}</span> <span style={{color:"#5a6082"}}>→</span> {a.exp}</div>))}
            </div>
          )}
        </div>
        <div className="right-panel">
          <CityMap computers={COMPUTERS} active={pc}/>
          <AnalogyCard/>
          <div className="os-table">
            <div className="title">🏎️ Systemy = marki aut</div>
            <table>
              <thead><tr><td></td><td>🐧</td><td>🪟</td><td>🍎</td></tr></thead>
              <tbody>
                {[["Pliki","ls","dir","ls"],["Ping","ping","ping","ping"],["Kim?","whoami","whoami","whoami"],["Terminal","bash","cmd","zsh"]].map(([l,...v],i)=>(
                  <tr key={i}><td style={{color:"#a9b1d6",fontWeight:600}}>{l}</td>{v.map((x,j)=><td key={j} style={{fontFamily:"monospace"}}>{x}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
