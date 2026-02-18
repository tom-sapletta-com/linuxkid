const { useState, useEffect, useRef, useCallback } = React;

const AGENTS = [
  { name: "agent-alfa", codename: "ALFA-7", emoji: "🕵️", user: "ania", color: "#f7768e", rank: "Kadet" },
  { name: "agent-bravo", codename: "BRAVO-3", emoji: "🦊", user: "kuba", color: "#ff9e64", rank: "Kadet" },
  { name: "agent-charlie", codename: "CHARLIE-9", emoji: "🦅", user: "ola", color: "#e0af68", rank: "Kadet" },
  { name: "agent-delta", codename: "DELTA-1", emoji: "🐺", user: "max", color: "#9ece6a", rank: "Kadet" },
];

const THREATS = [
  { name: "Trojan", emoji: "🐴", desc: "Udaje przyjaciela, ale kradnie dane" },
  { name: "Phishing", emoji: "🎣", desc: "Fałszywe wiadomości wyłudzające hasła" },
  { name: "Brute Force", emoji: "🔨", desc: "Próbuje wszystkich haseł po kolei" },
  { name: "Ransomware", emoji: "💀", desc: "Szyfruje pliki i żąda okupu" },
];

const INTRO_STORY = {
  title: "🛡️ Tajny Agent Planety X",
  story: `Gratulacje, odkrywco! Ukończyłeś szkolenie na Planecie X. Znasz już język terminala, potrafisz sterować swoim komputerem i komunikować się z innymi maszynami.

Ale Planeta X jest w niebezpieczeństwie! Źli kosmici z Galaktyki Darknet próbują:
• 🐴 Przemycać trojany – programy udające przyjaciół
• 🎣 Łowić hasła phishingiem – fałszywymi wiadomościami
• 🔨 Łamać zamki brute force – próbując miliony kluczy
• 💀 Porywać dane ransomware – szyfrując i żądając okupu

Rada Planety X doceniła Twoje umiejętności i mianowała Cię TAJNYM AGENTEM CYBERBEZPIECZEŃSTWA. Twoja misja: ochronić planetę przed atakami!

Wybierz swoją tożsamość agenta i rozpocznij szkolenie bojowe!`,
};

const LESSONS = [
  {
    id: "recon",
    title: "Rozpoznanie terenu",
    icon: "🔍",
    color: "#7aa2f7",
    layers: [
      {
        id: "who-am-i",
        title: "Tożsamość agenta",
        category: "recon",
        categoryLabel: "🔍 Rozpoznanie",
        description: "Każdy agent musi znać swoją tożsamość, swoje uprawnienia i wiedzieć, kto jeszcze działa w systemie.",
        analogy: "🕵️ Zanim ruszysz na misję, sprawdź swoją legitymację agenta i poznaj swój oddział.",
        theory: [
          {
            title: "🪪 Tożsamość w systemie",
            content: "Musisz wiedzieć KIM jesteś, JAKIE masz uprawnienia i KTO jeszcze jest w systemie.",
            examples: [
              "🕵️ whoami → Twój pseudonim agenta",
              "🆔 id → Twój numer legitymacji i oddziały",
              "👥 who → Kto jeszcze jest na służbie",
            ]
          },
        ],
        steps: [
          {
            instruction: "Sprawdź swoją tożsamość agenta:",
            command: "whoami",
            expectedOutput: (a) => a.user,
            tip: "🕵️ Twój pseudonim agenta. W cyberbezpieczeństwie zawsze musisz wiedzieć, na jakim koncie działasz!",
          },
          {
            instruction: "Pokaż pełną legitymację (UID, GID, oddziały):",
            command: "id",
            expectedOutput: (a) => `uid=1000(${a.user}) gid=1000(${a.user}) groups=1000(${a.user}),27(sudo),100(agenci)`,
            tip: "🆔 UID=Twój numer, GID=Twój oddział, groups=wszystkie oddziały. sudo = oddział specjalny!",
          },
          {
            instruction: "Kto jeszcze jest na służbie w systemie?",
            command: "who",
            expectedOutput: (a) => `${a.user}    pts/0    2026-02-18 10:30 (terminal)\nroot       pts/1    2026-02-18 09:00 (konsola)`,
            tip: "👀 Widzisz kto jest zalogowany. Jeśli widzisz kogoś podejrzanego – to może być intruz!",
          },
          {
            instruction: "Sprawdź ostatnie logowania – kto tu był?",
            command: "last -5",
            expectedOutput: (a) => `${a.user}  pts/0  terminal  Tue Feb 18 10:30   still logged in\nroot     pts/1  konsola   Tue Feb 18 09:00   still logged in\n${a.user}  pts/0  terminal  Mon Feb 17 18:20 - 22:15 (03:55)\nreboot   system boot     Tue Feb 18 08:55`,
            tip: "📋 Historia logowań = dziennik wartownika. Szukaj podejrzanych wpisów!",
          },
        ],
      },
      {
        id: "scan-system",
        title: "Skanowanie systemu",
        category: "recon",
        categoryLabel: "🔍 Rozpoznanie",
        description: "Agent musi wiedzieć, jakie procesy działają i które porty są otwarte. Otwarte okienko = potencjalne wejście dla intruza.",
        analogy: "🏢 Sprawdź, które okienka w budynku są otwarte i kto za nimi siedzi.",
        theory: [
          {
            title: "🔎 Procesy – kto pracuje w budynku?",
            content: "Każdy działający program to pracownik. Musisz wiedzieć, kto tu pracuje – może ktoś się wkradł (trojan)!",
            examples: [
              "📋 ps aux → lista wszystkich pracowników",
              "📊 top → monitor aktywności w czasie rzeczywistym",
              "🔍 ps aux | grep suspicious → szukaj podejrzanego",
            ]
          },
        ],
        steps: [
          {
            instruction: "Sprawdź, jakie procesy działają w systemie:",
            command: "ps aux",
            expectedOutput: (a) => `USER       PID  %CPU %MEM COMMAND\nroot         1   0.0  0.1 /sbin/init\nroot        42   0.0  0.0 /usr/sbin/sshd\n${a.user}     1337   0.2  0.5 bash\nwww-data   800   0.1  0.3 nginx\n⚠️ nobody    666   5.2  2.1 ???suspicious???`,
            tip: "👀 PID 666 – podejrzany proces uruchomiony przez 'nobody' z dużym zużyciem CPU!",
          },
          {
            instruction: "Sprawdź otwarte okienka (porty) w budynku:",
            command: "ss -tlnp",
            expectedOutput: () => `State   Local Address:Port\nLISTEN  0.0.0.0:22     → sshd\nLISTEN  0.0.0.0:80     → nginx\nLISTEN  0.0.0.0:443    → nginx\n⚠️ LISTEN  0.0.0.0:4444 → ???unknown??? (PODEJRZANE!)`,
            tip: "🚪 Port 4444 jest otwarty! Klasyczny port złośliwego oprogramowania. Trzeba zbadać!",
          },
          {
            instruction: "Zbadaj podejrzany proces – kto go uruchomił?",
            command: "ps aux | grep suspicious",
            expectedOutput: () => `nobody     666   5.2  2.1  ???suspicious???\n→ ⚠️ ALERT: Proces nasłuchuje na porcie 4444!\n→ 🔍 To może być backdoor – tylne drzwi dla intruza!`,
            tip: "🐴 Znalazłeś trojana! Otwiera tylne drzwi (port 4444) dla atakującego.",
          },
        ],
      },
    ],
  },
  {
    id: "firewall",
    title: "Mury obronne",
    icon: "🧱",
    color: "#f7768e",
    layers: [
      {
        id: "firewall-basics",
        title: "Firewall – mur obronny",
        category: "defense",
        categoryLabel: "🧱 Obrona",
        description: "Firewall to mur obronny wokół Twojego zamku (komputera). Decyduje, kto może wejść, a kto musi zostać za bramą.",
        analogy: "🏰 Firewall = mur obronny zamku. Strażnicy (reguły) sprawdzają każdego, kto chce wejść lub wyjść.",
        theory: [
          {
            title: "🏰 Zamek i mury",
            content: "Twój komputer to zamek. Firewall to mur z bramami. Każda brama (port) ma strażnika (regułę).",
            examples: [
              "🏰 Komputer = zamek do obrony",
              "🧱 Firewall = mur obronny",
              "👮 Reguła = strażnik przy bramie",
            ]
          },
        ],
        steps: [
          {
            instruction: "Sprawdź aktualny stan murów obronnych:",
            command: "sudo iptables -L",
            expectedOutput: () => `Chain INPUT (policy ACCEPT)  ⚠️ Wszystko wpuszczone!\ntarget  prot  source    destination\n\nChain FORWARD (policy ACCEPT)\nChain OUTPUT (policy ACCEPT)\n\n⚠️ ALARM: Brak reguł! Zamek jest otwarty na oścież!`,
            tip: "🚨 Policy ACCEPT bez reguł = zamek bez murów! Każdy może wejść.",
          },
          {
            instruction: "Zamknij domyślną bramę – blokuj nieznajomych:",
            command: "sudo iptables -P INPUT DROP",
            expectedOutput: () => `✅ Domyślna polityka INPUT: DROP\n🧱 Mur obronny postawiony! Nikt nieznany nie wejdzie.`,
            tip: "🧱 DROP = mur. Teraz domyślnie NIKT nie wejdzie, chyba że dodasz regułę wpuszczającą.",
          },
          {
            instruction: "Wpuść ruch na okienko WWW (port 80):",
            command: "sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT",
            expectedOutput: () => `✅ Reguła dodana: wpuść TCP na port 80\n🌐 Okienko WWW otwarte dla odwiedzających.`,
            tip: "👮 Strażnik wpuszcza gości do okienka WWW (port 80). Reszta murów nadal blokuje!",
          },
          {
            instruction: "Wpuść SSH (port 22) tylko z naszej bazy:",
            command: "sudo iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT",
            expectedOutput: () => `✅ Reguła: SSH tylko z sieci 192.168.1.0/24\n🔐 Zdalny dostęp tylko dla naszych agentów!`,
            tip: "🏰 Brama SSH otwarta TYLKO dla agentów z naszej bazy. Obcy nie wejdą!",
          },
          {
            instruction: "Sprawdź nowe mury obronne:",
            command: "sudo iptables -L --line-numbers",
            expectedOutput: () => `Chain INPUT (policy DROP) ✅ Domyślnie: blokuj\nnum  target  prot  source           destination\n1    ACCEPT  tcp   anywhere         anywhere    dport 80\n2    ACCEPT  tcp   192.168.1.0/24   anywhere    dport 22\n\n🏰 Zamek zabezpieczony! 2 kontrolowane bramy.`,
            tip: "✅ 2 kontrolowane bramy (port 80 i 22) i mur blokujący resztę!",
          },
        ],
      },
      {
        id: "ufw",
        title: "UFW – prosty pilot do murów",
        category: "defense",
        categoryLabel: "🧱 Obrona",
        description: "UFW to prosty pilot do sterowania murami. Zamiast skomplikowanych komend iptables, używasz prostych poleceń.",
        analogy: "📱 UFW = pilot do murów obronnych. Naciskasz przyciski zamiast ręcznie ustawiać cegły.",
        steps: [
          {
            instruction: "Włącz pilota do murów:",
            command: "sudo ufw enable",
            expectedOutput: () => `🛡️ Firewall aktywowany!\nDomyślna polityka: blokuj przychodzące, pozwól wychodzące.\nStatus: active`,
            tip: "📱 UFW włączony! Domyślnie blokuje wszystko przychodzące.",
          },
          {
            instruction: "Otwórz bramę dla stron WWW:",
            command: "sudo ufw allow 80/tcp",
            expectedOutput: () => `Rule added: allow 80/tcp\n✅ Brama WWW otwarta!`,
            tip: "🌐 Proste! 'allow 80/tcp' zamiast długiej komendy iptables.",
          },
          {
            instruction: "Otwórz bramę SSH tylko dla naszej bazy:",
            command: "sudo ufw allow from 192.168.1.0/24 to any port 22",
            expectedOutput: () => `Rule added: allow from 192.168.1.0/24 to any port 22\n🔐 SSH dostępne tylko z naszej bazy!`,
            tip: "🏰 SSH tylko z naszej sieci. Proste i czytelne!",
          },
          {
            instruction: "Sprawdź status murów:",
            command: "sudo ufw status verbose",
            expectedOutput: () => `Status: active\nDefault: deny (incoming), allow (outgoing)\n\nTo             Action   From\n80/tcp         ALLOW    Anywhere\n22             ALLOW    192.168.1.0/24\n\n🛡️ Mury sprawne! 2 kontrolowane bramy.`,
            tip: "📋 Czytelny raport! Widzisz dokładnie, co jest otwarte i dla kogo.",
          },
        ],
      },
    ],
  },
  {
    id: "passwords",
    title: "Szyfry i hasła",
    icon: "🔐",
    color: "#bb9af7",
    layers: [
      {
        id: "password-strength",
        title: "Siła hasła – zamek do sejfu",
        category: "crypto",
        categoryLabel: "🔐 Kryptografia",
        description: "Hasło to klucz do sejfu. Proste hasło = plastikowy kluczyk. Silne hasło = klucz z tytanu.",
        analogy: "🔑 Hasło = klucz do sejfu.\n🔓 'password123' = plastikowy kluczyk\n🔐 'Xk9#mP2$vL!q' = tytanowy klucz",
        theory: [
          {
            title: "🔨 Atak brute force",
            content: "Atakujący próbuje WSZYSTKICH kombinacji. Krótkie hasło = szybko złamane. Długie z różnymi znakami = lata łamania.",
            examples: [
              "🔓 4 cyfry (PIN): 10 000 kombinacji → 1 sekunda",
              "🔑 8 małych liter: 209 miliardów → 2 godziny",
              "🔐 12 znaków mieszanych: 475 trylionów → 34 000 lat",
            ]
          },
        ],
        steps: [
          {
            instruction: "Sprawdź, gdzie przechowywane są hasła agentów:",
            command: "sudo cat /etc/shadow | head -3",
            expectedOutput: (a) => `root:$6$xyz...hash...:19000:0:99999:7:::\ndaemon:*:19000:0:99999:7:::\n${a.user}:$6$aB3$kL9mN2pQ...hash...:19040:0:99999:7:::\n\n🔐 Hasła są zaszyfrowane! Nawet admin nie widzi prawdziwych haseł.`,
            tip: "🔐 /etc/shadow = sejf z zaszyfrowanymi hasłami. Nikt nie widzi haseł – tylko ich 'odciski' (hashe).",
          },
          {
            instruction: "Zmień hasło na silniejsze:",
            command: "passwd",
            expectedOutput: (a) => `Changing password for ${a.user}.\nCurrent password: ********\nNew password: ********\nRetype new password: ********\n✅ Hasło zmienione! Nowy zamek zainstalowany.`,
            tip: "🔑 Regularnie zmieniaj hasła! Jak wymiana zamków w sejfie.",
          },
          {
            instruction: "Sprawdź politykę haseł:",
            command: "cat /etc/login.defs | grep PASS",
            expectedOutput: () => `PASS_MAX_DAYS   90    → hasło ważne max 90 dni\nPASS_MIN_DAYS   1     → min 1 dzień między zmianami\nPASS_MIN_LEN    12    → minimum 12 znaków\nPASS_WARN_AGE   14    → ostrzeżenie 14 dni przed wygaśnięciem\n\n🛡️ Polityka: silne hasła, regularna wymiana!`,
            tip: "📋 Polityka haseł = regulamin sejfów. Wymusza silne hasła i regularną wymianę.",
          },
        ],
      },
      {
        id: "ssh-keys",
        title: "Klucze SSH – odcisk palca",
        category: "crypto",
        categoryLabel: "🔐 Kryptografia",
        description: "Klucze SSH to jak odcisk palca – unikalny, niemożliwy do podrobienia. Bezpieczniejszy niż hasło!",
        analogy: "🖐️ Klucz SSH = odcisk palca agenta.\n🔑 Klucz prywatny = Twój odcisk (TAJNE!)\n🔓 Klucz publiczny = skan odcisku (dajesz strażnikowi)",
        theory: [
          {
            title: "🔑 Para kluczy",
            content: "Generujesz PARĘ kluczy: prywatny (tajny) i publiczny (do rozdania). Serwer sprawdza Twój odcisk zamiast pytać o hasło.",
            examples: [
              "🔑 Klucz prywatny: ~/.ssh/id_ed25519 (TAJNE!)",
              "🔓 Klucz publiczny: ~/.ssh/id_ed25519.pub",
              "📋 Serwer: ~/.ssh/authorized_keys",
            ]
          },
        ],
        steps: [
          {
            instruction: "Wygeneruj swój odcisk palca (parę kluczy):",
            command: "ssh-keygen -t ed25519",
            expectedOutput: (a) => `Generating public/private ed25519 key pair.\nYour identification: /home/${a.user}/.ssh/id_ed25519\nYour public key: /home/${a.user}/.ssh/id_ed25519.pub\nFingerprint: SHA256:xK9mN2pQ7vL3bR8... ${a.user}@${a.name}\n\n🖐️ Odcisk palca wygenerowany!`,
            tip: "🖐️ ed25519 = najnowszy i najbezpieczniejszy typ odcisku.",
          },
          {
            instruction: "Pokaż swój publiczny odcisk:",
            command: "cat ~/.ssh/id_ed25519.pub",
            expectedOutput: (a) => `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... ${a.user}@${a.name}\n\n🔓 Publiczny klucz – możesz go bezpiecznie dać strażnikowi (serwerowi).`,
            tip: "🔓 Klucz publiczny to skan odcisku – możesz go rozdawać. Prywatny NIGDY nie opuszcza komputera!",
          },
          {
            instruction: "Wyślij odcisk do bazy agentów:",
            command: "ssh-copy-id agent-baza",
            expectedOutput: (a) => `Number of key(s) added: 1\n✅ Odcisk dodany do bazy!\nTeraz logujesz się bez hasła: ssh ${a.user}@agent-baza\n\n🖐️ Strażnik rozpozna Cię po odcisku palca.`,
            tip: "📋 Twój publiczny klucz dodany do authorized_keys na serwerze. Logujesz się odciskiem!",
          },
        ],
      },
    ],
  },
  {
    id: "monitoring",
    title: "Patrol i monitoring",
    icon: "📡",
    color: "#73daca",
    layers: [
      {
        id: "logs",
        title: "Dziennik wartownika (logi)",
        category: "monitoring",
        categoryLabel: "📡 Monitoring",
        description: "Logi to dziennik wartownika – zapisuje WSZYSTKO co się dzieje. Kto przyszedł, kto odszedł, co się zepsuło.",
        analogy: "📓 Logi = dziennik wartownika przy bramie.\nZapisuje każde wejście, wyjście i podejrzane zdarzenie.",
        theory: [
          {
            title: "🔍 Szukanie śladów intruza",
            content: "Intruz zostawia ślady w logach. Nieudane logowania, podejrzane komendy, dziwne godziny – to sygnały alarmowe!",
            examples: [
              "⚠️ 'Failed password' → ktoś próbuje zgadnąć hasło",
              "⚠️ 'Invalid user' → ktoś próbuje nieistniejącego konta",
              "⚠️ Logowania o 3:00 w nocy → podejrzane!",
            ]
          },
        ],
        steps: [
          {
            instruction: "Sprawdź dziennik logowań – kto próbował wejść?",
            command: "sudo tail -20 /var/log/auth.log",
            expectedOutput: (a) => `Feb 18 10:30:01 ${a.name} sshd: Accepted key for ${a.user} from 192.168.1.10\n⚠️ Feb 18 03:15:42 ${a.name} sshd: Failed password for root from 45.33.32.156\n⚠️ Feb 18 03:15:43 ${a.name} sshd: Failed password for root from 45.33.32.156\n⚠️ Feb 18 03:15:44 ${a.name} sshd: Failed password for admin from 45.33.32.156\n🚨 ALERT: Nieudane próby logowania z IP 45.33.32.156 o 3:15 w nocy!`,
            tip: "🚨 Ktoś z IP 45.33.32.156 próbował się włamać o 3:15 w nocy! To atak brute force!",
          },
          {
            instruction: "Policz ile razy próbowano się włamać:",
            command: "grep 'Failed password' /var/log/auth.log | wc -l",
            expectedOutput: () => `847\n\n🚨 847 nieudanych prób logowania! To atak brute force.`,
            tip: "📊 grep szuka wzorca, wc -l liczy linie. 847 prób = masowy atak!",
          },
          {
            instruction: "Znajdź IP atakującego:",
            command: "grep 'Failed password' /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head -5",
            expectedOutput: () => `    523 45.33.32.156\n    201 103.45.67.89\n     78 185.220.101.42\n     31 23.129.64.100\n     14 192.168.1.99\n\n🎯 Główny atakujący: 45.33.32.156 (523 próby!)`,
            tip: "🕵️ Analiza logów jak praca detektywa! sort + uniq -c = policz unikalne IP.",
          },
          {
            instruction: "Zablokuj atakującego na murze obronnym!",
            command: "sudo iptables -A INPUT -s 45.33.32.156 -j DROP",
            expectedOutput: () => `✅ IP 45.33.32.156 zablokowane!\n🧱 Atakujący nie może już się połączyć.\n\n🛡️ Planeta X jest bezpieczniejsza!`,
            tip: "🧱 Zablokowany! Reguła DROP = mur nie do przejścia.",
          },
        ],
      },
      {
        id: "fail2ban",
        title: "Automatyczny strażnik (fail2ban)",
        category: "monitoring",
        categoryLabel: "📡 Monitoring",
        description: "Fail2ban to automatyczny strażnik – sam wykrywa ataki i blokuje intruzów. Nie musisz ręcznie sprawdzać logów!",
        analogy: "🤖 Fail2ban = robot-strażnik. Obserwuje dziennik 24/7 i automatycznie blokuje intruzów.",
        steps: [
          {
            instruction: "Sprawdź status robota-strażnika:",
            command: "sudo fail2ban-client status sshd",
            expectedOutput: () => `Status for the jail: sshd\n|- Currently failed: 3\n|- Total failed: 847\n└- Actions\n   |- Currently banned: 4\n   |- Total banned: 12\n   └- Banned IP list: 45.33.32.156 103.45.67.89 185.220.101.42 23.129.64.100\n\n🤖 Robot aktywny! 4 intruzów zablokowanych automatycznie.`,
            tip: "🤖 Fail2ban sam wykrył i zablokował 4 atakujących! Działa 24/7.",
          },
          {
            instruction: "Sprawdź po ilu próbach blokuje:",
            command: "sudo fail2ban-client get sshd maxretry",
            expectedOutput: () => `5\n\n🤖 Blokuje po 5 nieudanych próbach.`,
            tip: "⚙️ maxretry=5: po 5 złych próbach IP jest blokowane. Możesz zmienić na 3!",
          },
          {
            instruction: "Odblokuj IP naszego agenta (zapomniał hasła):",
            command: "sudo fail2ban-client set sshd unbanip 192.168.1.99",
            expectedOutput: () => `✅ IP 192.168.1.99 odblokowane.\n🤖 Nasz agent może znów się logować.`,
            tip: "🔓 Dlatego agenci powinni używać kluczy SSH – wtedy fail2ban ich nie zablokuje!",
          },
        ],
      },
    ],
  },
  {
    id: "encryption",
    title: "Tajne szyfry",
    icon: "🔏",
    color: "#ff9e64",
    layers: [
      {
        id: "file-permissions",
        title: "Teczki tajne i ściśle tajne",
        category: "encryption",
        categoryLabel: "🔏 Szyfry",
        description: "Pliki mają poziomy tajności. Zwykły agent widzi swoje teczki, szef oddziału widzi teczki oddziału, Komendant widzi wszystko.",
        analogy: "📁 Uprawnienia = poziomy tajności teczek.\n👤 rwx = Ty (właściciel)\n👥 r-x = Twój oddział\n🌍 --- = reszta (brak dostępu)",
        steps: [
          {
            instruction: "Stwórz teczkę ściśle tajną:",
            command: "chmod 700 ~/misja-tajna.txt",
            expectedOutput: () => `✅ Teczka: rwx------\n🔐 Tylko Ty masz dostęp!`,
            tip: "🔐 700 = rwx dla Ciebie, --- dla oddziału, --- dla reszty. Ściśle tajne!",
          },
          {
            instruction: "Stwórz teczkę tajną dla oddziału:",
            command: "chmod 750 ~/raport-oddzialu.txt",
            expectedOutput: () => `✅ Teczka: rwxr-x---\n📁 Ty: pełny dostęp | Oddział: odczyt | Reszta: brak.`,
            tip: "📁 750 = rwx dla Ciebie, r-x dla oddziału, --- dla reszty.",
          },
          {
            instruction: "Sprawdź poziomy tajności swoich teczek:",
            command: "ls -la ~/",
            expectedOutput: (a) => `-rwx------  1 ${a.user} agenci  misja-tajna.txt      🔴 ŚCIŚLE TAJNE\n-rwxr-x---  1 ${a.user} agenci  raport-oddzialu.txt  🟡 TAJNE\n-rwxr-xr-x  1 ${a.user} agenci  komunikat.txt        🟢 JAWNE\ndrwx------  2 ${a.user} agenci  .ssh/                🔴 ŚCIŚLE TAJNE`,
            tip: "📋 🔴 700=ściśle tajne, 🟡 750=tajne, 🟢 755=jawne. Katalog .ssh MUSI być 700!",
          },
        ],
      },
      {
        id: "gpg-encrypt",
        title: "Szyfrowanie wiadomości (GPG)",
        category: "encryption",
        categoryLabel: "🔏 Szyfry",
        description: "GPG to magiczna skrzynka – wkładasz wiadomość, zamykasz kluczem odbiorcy. Tylko odbiorca otworzy!",
        analogy: "📦 GPG = magiczna skrzynka z dwoma kluczami.\n🔓 Klucz publiczny odbiorcy = zamykasz\n🔑 Klucz prywatny odbiorcy = tylko on otworzy",
        theory: [
          {
            title: "📦 Jak działa szyfrowanie?",
            content: "Szyfrowanie zamienia czytelną wiadomość w bełkot. Tylko osoba z kluczem może ją odczytać.",
            examples: [
              "📝 'Spotkanie o 15:00 w bazie'",
              "🔐 → 'xK9$mP2#vL!qR8...'",
              "🔑 → 'Spotkanie o 15:00 w bazie'",
            ]
          },
        ],
        steps: [
          {
            instruction: "Zaszyfruj tajną wiadomość dla agenta Kuby:",
            command: "echo 'Spotkanie o 15:00' | gpg --encrypt --recipient kuba",
            expectedOutput: () => `-----BEGIN PGP MESSAGE-----\nhQEMA7K3nR...zaszyfrowane...\n-----END PGP MESSAGE-----\n\n🔐 Tylko agent Kuba może odczytać!`,
            tip: "📦 Wiadomość zamknięta kluczem publicznym Kuby. Nawet Ty nie możesz jej teraz odczytać!",
          },
          {
            instruction: "Zaszyfruj plik z raportem misji:",
            command: "gpg --symmetric --cipher-algo AES256 raport-misji.txt",
            expectedOutput: () => `Enter passphrase: ********\n✅ Plik zaszyfrowany: raport-misji.txt.gpg\n🔐 AES-256 – standard wojskowy!`,
            tip: "🔐 AES-256 = szyfrowanie klasy wojskowej. Używane przez armie i banki.",
          },
          {
            instruction: "Sprawdź, że zaszyfrowany plik to bełkot:",
            command: "cat raport-misji.txt.gpg",
            expectedOutput: () => `\\x89\\x01\\x0c\\x03...binarny bełkot...\\x8a\\x02\\xff\n\n🔒 Nie da się odczytać bez klucza!`,
            tip: "👀 Binarny bełkot – bez klucza nikt tego nie odczyta.",
          },
        ],
      },
    ],
  },
  {
    id: "updates",
    title: "Łatanie dziur",
    icon: "🩹",
    color: "#e0af68",
    layers: [
      {
        id: "apt-update",
        title: "Aktualizacje – łatanie murów",
        category: "maintenance",
        categoryLabel: "🩹 Konserwacja",
        description: "Aktualizacje to łatanie dziur w murach. Hakerzy szukają słabych punktów – łatki je naprawiają!",
        analogy: "🩹 Aktualizacja = łatanie dziury w murze.\nHakerzy szukają dziur. Łatki naprawiają je, zanim wróg się prześlizgnie.",
        theory: [
          {
            title: "🕳️ Luki bezpieczeństwa (CVE)",
            content: "Luka to dziura w murze. Gdy ktoś ją odkryje, dostaje numer CVE. Producent wydaje łatkę. Ty musisz ją zainstalować!",
            examples: [
              "🕳️ CVE-2024-1234 → dziura w OpenSSH",
              "🩹 Łatka: openssh 9.6p1 → naprawia",
              "⏰ Im szybciej zainstalujesz, tym bezpieczniej",
            ]
          },
        ],
        steps: [
          {
            instruction: "Sprawdź, czy są nowe łatki:",
            command: "sudo apt update",
            expectedOutput: () => `Fetched 1,234 kB in 2s\n📋 47 packages can be upgraded.\n⚠️ 12 security updates available!\n\n🚨 12 łatek bezpieczeństwa czeka!`,
            tip: "📋 apt update = sprawdź listę łatek. 12 łatek bezpieczeństwa – trzeba instalować!",
          },
          {
            instruction: "Zainstaluj wszystkie łatki:",
            command: "sudo apt upgrade -y",
            expectedOutput: () => `The following packages will be upgraded:\n  openssh-server openssl libssl3 nginx curl ...\n12 upgraded, 0 newly installed, 0 to remove.\n\n✅ Wszystkie łatki zainstalowane!\n🧱 12 dziur załatanych.`,
            tip: "🩹 Dziury załatane! Rób to regularnie – najlepiej codziennie.",
          },
          {
            instruction: "Sprawdź, czy potrzebny restart:",
            command: "cat /var/run/reboot-required 2>/dev/null || echo 'Restart nie wymagany'",
            expectedOutput: () => `*** System restart required ***\n\n🔄 Niektóre łatki wymagają restartu.`,
            tip: "🔄 Jak wymiana zamka – musisz zamknąć i otworzyć drzwi, żeby nowy zamek zadziałał.",
          },
        ],
      },
    ],
  },
];

const ALL_LAYERS = LESSONS.flatMap(l => l.layers);
const TOTAL_STEPS = ALL_LAYERS.reduce((s, l) => s + l.steps.length, 0);

/* ───── Terminal Component ───── */
function Terminal({ agent, step, onSuccess, showNextConfirm, confirmReady, proceedToNext, layerDone, nextLayer }) {
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
      if (norm(cmd) === norm(step.command) || cmd.startsWith(step.command.split(" ")[0])) {
        out = step.expectedOutput(agent); ok = true;
      } else { out = `❓ Wpisz: ${step.command}`; }
    }
    setHistory(h => [...h, { t: "in", v: cmd }, ...(out ? [{ t: "out", v: out, ok }] : [])]);
    if (ok && onSuccess) fireSuccess(onSuccess);
    setInput(""); setHint(false);
  }, [input, step, agent, onSuccess]);
  const prompt = "~$";
  const copyCmd = () => {
    const cmd = step.command;
    let out = "", ok = false;
    if (step) {
      const norm = s => s.replace(/\s+/g, " ").trim();
      if (norm(cmd) === norm(step.command) || cmd.startsWith(step.command.split(" ")[0])) {
        out = step.expectedOutput(agent); ok = true;
      } else { out = `❓ Wpisz: ${step.command}`; }
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
        <span className="bar-label">{agent.emoji}</span>
      </div>
      <div className="body" ref={bodyRef} onClick={()=>inputRef.current?.focus()}>
        <div className="placeholder">🛡️ Terminal agenta – wpisz komendę i naciśnij Enter ⏎</div>
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
            {showNextConfirm&&<button className="hint-btn" onClick={proceedToNext} data-testid="next-step-btn" disabled={!confirmReady} style={{background:layerDone?"linear-gradient(135deg,#73daca,#7aa2f7)":"linear-gradient(135deg,#f7768e,#ff9e64)",color:"#0a0b10",border:"none",fontWeight:800,opacity:confirmReady?1:0.5,cursor:confirmReady?"pointer":"default"}}>{layerDone?"🎉 Następny etap →":"✅ Następna misja →"}</button>}
          </div>
        </div>
      )}
    </div>
  );
}

/* ───── Threat Map ───── */
function ThreatMap({ agent }) {
  return (
    <div className="threat-map" data-testid="threat-map">
      <div className="title">⚠️ Mapa zagrożeń</div>
      <div className="firewall-bar"><span>🧱 FIREWALL – mur obronny</span></div>
      <div className="grid">
        {THREATS.map(t => (
          <div key={t.name} className="node" style={{background:"#f7768e08",border:"2px solid #f7768e22"}}>
            <div className="emoji">{t.emoji}</div>
            <div className="name" style={{color:"#f7768e"}}>{t.name}</div>
            <div className="status" style={{color:"#7982a9",fontSize:"11px"}}>{t.desc}</div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",marginTop:"12px"}}>
        <div style={{display:"inline-block",background:"#73daca18",border:"1px solid #73daca44",borderRadius:"10px",padding:"8px 16px"}}>
          <span style={{color:"#73daca",fontSize:"13px",fontWeight:700}}>{agent.emoji} {agent.codename} – na straży!</span>
        </div>
      </div>
    </div>
  );
}

/* ───── Glossary ───── */
function GlossaryCard() {
  const items = [
    ["🧱","Firewall","Mur obronny zamku"],["🕵️","Agent","Użytkownik systemu"],
    ["👑","root","Komendant Główny"],["🔑","Hasło","Klucz do sejfu"],
    ["🖐️","Klucz SSH","Odcisk palca agenta"],["📓","Logi","Dziennik wartownika"],
    ["🤖","Fail2ban","Robot-strażnik"],["🔐","Szyfrowanie","Magiczna skrzynka"],
    ["🚪","Port","Okienko w budynku"],["🐴","Trojan","Szpieg-przyjaciel"],
    ["🎣","Phishing","Wiadomość-pułapka"],["🔨","Brute force","Próbowanie kluczy"],
    ["💀","Ransomware","Porywacz danych"],["🩹","Aktualizacja","Łatanie dziur"],
  ];
  return (
    <div className="glossary" data-testid="glossary">
      <div className="title">🗺️ Słowniczek agenta</div>
      {items.map(([icon, term, meaning], i) => (
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

/* ───── Main App ───── */
function App() {
  const [agent, setAgent] = useState(AGENTS[0]);
  const [li, setLI] = useState(0);
  const [lai, setLAI] = useState(0);
  const [si, setSI] = useState(0);
  const [done, setDone] = useState(new Set());
  const [picking, setPicking] = useState(true);
  const [showTheoryIntro, setShowTheoryIntro] = useState(false);
  const [showNextConfirm, setShowNextConfirm] = useState(false);
  const [confirmReady, setConfirmReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const updateURL = useCallback((lessonIdx, layerIdx, stepIdx, isIntro = false) => {
    if (isIntro) { window.history.pushState(null, '', '#/intro/briefing/0'); }
    else {
      const lesson = LESSONS[lessonIdx];
      const layer = lesson?.layers[layerIdx];
      window.history.pushState(null, '', `#/${lesson?.id}/${layer?.id}/${stepIdx}`);
    }
  }, []);

  const parseURL = useCallback(() => {
    const hash = window.location.hash.slice(1) || '/intro/briefing/0';
    const parts = hash.split('/').filter(Boolean);
    if (parts[0] === 'intro' && parts[1] === 'briefing') return { isIntro: true, li: 0, lai: 0, si: 0 };
    if (parts.length >= 3) {
      const lessonIdx = LESSONS.findIndex(l => l.id === parts[0]);
      if (lessonIdx >= 0) {
        const layerIdx = LESSONS[lessonIdx].layers.findIndex(lay => lay.id === parts[1]);
        if (layerIdx >= 0) return { isIntro: false, li: lessonIdx, lai: layerIdx, si: parseInt(parts[2]) || 0 };
      }
    }
    return { isIntro: true, li: 0, lai: 0, si: 0 };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const { isIntro, li: l, lai: la, si: s } = parseURL();
      if (isIntro) { setShowTheoryIntro(true); setPicking(false); }
      else { setLI(l); setLAI(la); setSI(s); setShowTheoryIntro(false); setShowNextConfirm(false); }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseURL]);

  useEffect(() => {
    const { isIntro, li: l, lai: la, si: s } = parseURL();
    if (!isIntro) { setLI(l); setLAI(la); setSI(s); setShowTheoryIntro(false); }
  }, [parseURL]);

  const lesson = LESSONS[li], layer = lesson?.layers[lai], step = layer?.steps[si];
  const layerDone = si >= layer.steps.length - 1 && done.has(`${li}-${lai}-${layer.steps.length - 1}`);

  const nextLayer = () => {
    if (lai < lesson.layers.length - 1) { setLAI(lai + 1); setSI(0); updateURL(li, lai + 1, 0); }
    else if (li < LESSONS.length - 1) { setLI(li + 1); setLAI(0); setSI(0); updateURL(li + 1, 0, 0); }
  };

  const onSuccess = () => {
    const key = `${li}-${lai}-${si}`;
    setDone(p => new Set([...p, key]));
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

  /* ── Pick Screen ── */
  if (picking) {
    return (
      <div className="pick-screen" style={{fontFamily:"'Nunito',system-ui,sans-serif"}}>
        <div className="inner" data-testid="pick-screen">
          <div className="big-icon">🛡️</div>
          <h1>Planeta X: CyberQuest</h1>
          <p className="subtitle">Zostań tajnym agentem cyberbezpieczeństwa!</p>
          <p className="meta">Firewall = mur 🧱 • Hasło = klucz 🔑 • Ty = agent 🕵️</p>
          <p style={{color:"#a9b1d6",fontSize:"16px",marginBottom:"18px"}}>Wybierz swoją tożsamość agenta:</p>
          <div className="grid">
            {AGENTS.map(a => (
              <button key={a.name} className="agent-card" data-testid={`agent-${a.user}`}
                onClick={() => { setAgent(a); setPicking(false); setShowTheoryIntro(true); updateURL(0, 0, 0, true); }}
                style={{border:`2px solid ${a.color}33`}}
                onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = a.color + "33"; e.currentTarget.style.transform = ""; }}>
                <div className="emoji">{a.emoji}</div>
                <div className="name" style={{color: a.color}}>{a.name}</div>
                <div className="codename">🪪 {a.codename}</div>
                <div className="role">🧑 {a.user} • {a.rank}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Theory / Briefing ── */
  if (showTheoryIntro) {
    const cl = LESSONS[li], cla = cl?.layers[lai];
    return (
      <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0a0b10 0%,#1a0b1e 50%,#0a0b10 100%)",fontFamily:"'Nunito',system-ui,sans-serif",color:"#c0caf5",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
        <div style={{maxWidth:"800px",width:"100%"}}>
          <div style={{textAlign:"center",marginBottom:"24px"}}>
            <div style={{fontSize:"48px",marginBottom:"12px"}}>{agent.emoji}</div>
            <div style={{color:agent.color,fontSize:"20px",fontWeight:"800"}}>{agent.codename}</div>
            <div style={{color:"#7982a9",fontSize:"14px"}}>Tożsamość agenta potwierdzona!</div>
          </div>
          <div style={{background:"#161822",border:"2px solid #1a1c2e",borderRadius:"16px",padding:"20px",marginBottom:"20px"}}>
            <div style={{fontSize:"20px",fontWeight:"800",color:"#c0caf5",marginBottom:"12px",textAlign:"center"}}>{INTRO_STORY.title}</div>
            <div style={{fontSize:"15px",color:"#a9b1d6",lineHeight:"1.7",whiteSpace:"pre-wrap"}}>{INTRO_STORY.story}</div>
          </div>
          {cla?.theory && (
            <div style={{background:`${cl.color}05`,border:`2px solid ${cl.color}15`,borderRadius:"16px",padding:"24px",marginBottom:"20px"}}>
              <div style={{fontSize:"22px",fontWeight:"800",color:cl.color,marginBottom:"16px",textAlign:"center"}}>📚 Briefing misji</div>
              {cla.theory.map((item, i) => (
                <div key={i} style={{marginBottom:"24px"}}>
                  <div style={{fontSize:"18px",fontWeight:"700",color:"#c0caf5",marginBottom:"10px"}}>{item.title}</div>
                  <div style={{fontSize:"16px",color:"#a9b1d6",lineHeight:"1.7",marginBottom:"14px"}}>{item.content}</div>
                  <div style={{background:"#0c0e14",borderRadius:"10px",padding:"14px",borderLeft:`3px solid ${cl.color}`}}>
                    {item.examples.map((ex, j) => (
                      <div key={j} style={{fontSize:"15px",color:"#7982a9",fontFamily:"monospace",marginBottom:"6px"}}>{ex}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => { setShowTheoryIntro(false); updateURL(li, lai, si); }}
            style={{width:"100%",background:"linear-gradient(135deg,#f7768e,#ff9e64)",color:"#0a0b10",border:"none",borderRadius:"12px",padding:"16px",fontWeight:"800",fontSize:"18px",cursor:"pointer",fontFamily:"inherit"}}>
            Rozpocznij misję! 🛡️
          </button>
        </div>
      </div>
    );
  }

  /* ── Main Layout ── */
  return (
    <div style={{minHeight:"100vh",background:"#0a0b10",fontFamily:"'Nunito',system-ui,sans-serif",color:"#c0caf5"}} data-testid="app-main">
      <div className="app-nav">
        <div className="logo">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} data-testid="menu-toggle">☰</button>
          <span className="logo-icon">🛡️</span>
          <a href="../index.html" style={{textDecoration:"none",color:"inherit"}}><span className="logo-text">Planeta X</span></a>
          <span className="logo-sub">CyberQuest</span>
        </div>
        <div className="nav-center">
          <div className="step-dots">
            <span className="label">Misja:</span>
            {layer.steps.map((_, s) => {
              const d = done.has(`${li}-${lai}-${s}`), a = s === si;
              return <button key={s} onClick={() => setSI(s)} className={`step-dot${a ? " active" : ""}`}
                style={{background: d ? "#73daca" : a ? "#f7768e" : "#1a1c2e"}} data-testid={`step-${s}`}/>;
            })}
            <span className="label">{si + 1}/{layer.steps.length}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <span className="progress-text">{done.size}/{TOTAL_STEPS}</span>
          <div className="progress-bar"><div className="progress-fill" style={{width:`${(done.size / TOTAL_STEPS) * 100}%`}}/></div>
          <button className="agent-btn" onClick={() => setPicking(true)} data-testid="change-agent">{agent.emoji} {agent.codename}</button>
        </div>
      </div>
      <div className="main-layout">
        <div className={`sidebar${menuOpen ? " open" : ""}`} data-testid="sidebar">
          {LESSONS.map((les, l) => (
            <div key={les.id} style={{marginBottom: 16}}>
              <div className="lesson-title" style={{color: les.color}}>{les.icon} {les.title}</div>
              {les.layers.map((lay, la) => {
                const active = l === li && la === lai;
                const ct = lay.steps.filter((_, s) => done.has(`${l}-${la}-${s}`)).length;
                const full = ct === lay.steps.length;
                return (
                  <button key={lay.id} onClick={() => goTo(l, la)} className="layer-btn"
                    style={{background: active ? "#161822" : "transparent", border: active ? `2px solid ${les.color}44` : "2px solid transparent"}}>
                    <div className="name" style={{fontWeight: active ? 700 : 600, color: active ? "#c0caf5" : "#7982a9"}}>
                      {full ? "✅" : active ? "▶" : "○"} {lay.title}
                    </div>
                    <div className="count">{ct}/{lay.steps.length}</div>
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
            <div className="instruction-box" style={{background:"#f7768e08",border:"2px solid #f7768e22"}} data-testid="instruction">
              <div className="text">🎯 {step.instruction}</div>
              <code>{step.command}</code>
            </div>
          )}
          <Terminal agent={agent} step={(layerDone && !showNextConfirm) ? null : step} onSuccess={onSuccess} showNextConfirm={showNextConfirm} confirmReady={confirmReady} proceedToNext={proceedToNext} layerDone={layerDone} nextLayer={nextLayer}/>
        </div>
        <div className="right-panel">
          <ThreatMap agent={agent}/>
          <GlossaryCard/>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
