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
            command: `cat << 'EOF' > hello.sh
#!/bin/bash
echo "Cześć! Jestem skryptem!"
echo "Dzisiaj jest $(date)"
EOF`,
            expectedOutput: () => ``,
            tip: "📝 cat << 'EOF' > plik = 'zapisz wszystko aż do słowa EOF do pliku'. #!/bin/bash na początku to tytuł przepisu – mówi komputerowi, że to skrypt bash.",
            explain: [
              { code: "cat << 'EOF' > hello.sh", area: "shell", tokens: [{type:"command",text:"cat"},{text:" "},{type:"operator",text:"<< 'EOF'"},{text:" "},{type:"operator",text:">"},{text:" "},{type:"path",text:"hello.sh"}], explain: "Zapisz cały tekst (aż do słowa EOF) do pliku hello.sh", effect: "Tworzy nowy plik hello.sh w bieżącym folderze", link: {url:"https://pl.wikipedia.org/wiki/Here_document", label:"Heredoc – Wikipedia"} },
              { code: "#!/bin/bash", area: "shell", tokens: [{type:"comment",text:"#!/bin/bash"}], explain: "Shebang – mówi systemowi: 'ten plik uruchamiaj w powłoce Bash'", effect: "Nagłówek pliku – nie zmienia nic w systemie", link: {url:"https://pl.wikipedia.org/wiki/Shebang", label:"Shebang – Wikipedia"} },
              { code: 'echo "Cześć! Jestem skryptem!"', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"Cześć! Jestem skryptem!"'}], explain: "Wypisz tekst na ekranie – komputer mówi 'Cześć!'", effect: "Wyświetla tekst w terminalu (stdout)" },
              { code: 'echo "Dzisiaj jest $(date)"', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"Dzisiaj jest '},{type:"variable",text:"$(date)"},{type:"string",text:'"'}], explain: "$(date) = uruchom komendę date i wstaw wynik. Komputer wpisze aktualną datę.", effect: "Wyświetla tekst z wstawioną datą systemową" },
              { code: "EOF", area: "shell", tokens: [{type:"keyword",text:"EOF"}], explain: "Koniec tekstu do zapisania – plik jest gotowy", effect: "Zamyka heredoc i zapisuje plik na dysku" },
            ],
          },
          {
            instruction: "Daj skryptowi pozwolenie na uruchomienie:",
            command: "chmod +x hello.sh",
            expectedOutput: () => ``,
            tip: "🔑 chmod +x = dajesz przepisowi pieczątkę 'można gotować'. Bez niej komputer nie będzie go wykonywać.",
            explain: [
              { code: "chmod +x hello.sh", area: "filesystem", tokens: [{type:"command",text:"chmod"},{text:" "},{type:"flag",text:"+x"},{text:" "},{type:"path",text:"hello.sh"}], explain: "chmod = zmień uprawnienia pliku. +x = dodaj prawo uruchamiania.", effect: "Plik hello.sh dostaje flagę 'wykonywalny' – teraz można go uruchomić jak program", link: {url:"https://pl.wikipedia.org/wiki/Chmod", label:"chmod – Wikipedia"} },
            ],
          },
          {
            instruction: "Uruchom swój skrypt!",
            command: "./hello.sh",
            expectedOutput: () => `Cześć! Jestem skryptem!\nDzisiaj jest wto 18 lut 2025 12:00:00 CET`,
            tip: "🎉 ./ = 'uruchom z bieżącego folderu'. Skrypt wykonał obie komendy po kolei – jak kucharz czytający przepis!",
            explain: [
              { code: "./hello.sh", area: "shell", tokens: [{type:"path",text:"./"},{type:"path",text:"hello.sh"}], explain: "./ = 'szukaj w bieżącym folderze'. System uruchamia skrypt linia po linii.", effect: "Uruchamia plik hello.sh jako program – wykonuje komendy echo po kolei" },
            ],
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
            command: `cat << 'EOF' > powitanie.sh
#!/bin/bash
IMIE="Astronauta"
PLANETA="X"
echo "Jestem $IMIE z Planety $PLANETA!"
EOF`,
            expectedOutput: () => ``,
            tip: "📦 IMIE i PLANETA to nazwy pudełek. Cudzysłowy trzymają wartość w środku.",
            explain: [
              { code: "cat << 'EOF' > powitanie.sh", area: "shell", tokens: [{type:"command",text:"cat"},{text:" "},{type:"operator",text:"<< 'EOF'"},{text:" "},{type:"operator",text:">"},{text:" "},{type:"path",text:"powitanie.sh"}], explain: "Zapisz tekst do pliku powitanie.sh", effect: "Tworzy plik powitanie.sh" },
              { code: "#!/bin/bash", area: "shell", tokens: [{type:"comment",text:"#!/bin/bash"}], explain: "Nagłówek – uruchamiaj w Bashu" },
              { code: 'IMIE="Astronauta"', area: "shell", tokens: [{type:"variable",text:"IMIE"},{type:"operator",text:"="},{type:"string",text:'"Astronauta"'}], explain: "Tworzy pudełko IMIE i wkłada do niego tekst 'Astronauta'", effect: "Zmienna IMIE dostępna w skrypcie" },
              { code: 'PLANETA="X"', area: "shell", tokens: [{type:"variable",text:"PLANETA"},{type:"operator",text:"="},{type:"string",text:'"X"'}], explain: "Tworzy pudełko PLANETA z wartością 'X'", effect: "Zmienna PLANETA dostępna w skrypcie" },
              { code: 'echo "Jestem $IMIE z Planety $PLANETA!"', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"Jestem '},{type:"variable",text:"$IMIE"},{type:"string",text:" z Planety "},{type:"variable",text:"$PLANETA"},{type:"string",text:'!"'}], explain: "$IMIE i $PLANETA = zajrzyj do pudełek i wstaw ich zawartość", effect: "Wypisuje: Jestem Astronauta z Planety X!" },
              { code: "EOF", area: "shell", tokens: [{type:"keyword",text:"EOF"}], explain: "Koniec pliku" },
            ],
          },
          {
            instruction: "Uruchom skrypt z pudełkami:",
            command: "chmod +x powitanie.sh && ./powitanie.sh",
            expectedOutput: () => `Jestem Astronauta z Planety X!`,
            tip: "✅ && = 'zrób to, a potem tamto'. Komputer zajrzał do pudełek i wstawił ich zawartość w tekst.",
            explain: [
              { code: "chmod +x powitanie.sh", area: "filesystem", tokens: [{type:"command",text:"chmod"},{text:" "},{type:"flag",text:"+x"},{text:" "},{type:"path",text:"powitanie.sh"}], explain: "Dodaj prawo uruchamiania", effect: "Plik staje się wykonywalny" },
              { code: "&&", area: "shell", tokens: [{type:"operator",text:"&&"}], explain: "Jeśli poprzednia komenda się udała, wykonaj następną" },
              { code: "./powitanie.sh", area: "shell", tokens: [{type:"path",text:"./powitanie.sh"}], explain: "Uruchom skrypt z bieżącego folderu", effect: "Wykonuje komendy w pliku linia po linii" },
            ],
          },
          {
            instruction: "Stwórz skrypt, który pyta o imię:",
            command: `cat << 'EOF' > pytanie.sh && chmod +x pytanie.sh
#!/bin/bash
echo "Jak masz na imię?"
read IMIE
echo "Witaj na Planecie X, $IMIE!"
EOF`,
            expectedOutput: () => ``,
            tip: "🎤 read = mikrofon. Komputer czeka, aż coś powiesz, i wkłada to do pudełka IMIE.",
            explain: [
              { code: "cat << 'EOF' > pytanie.sh && chmod +x pytanie.sh", area: "shell", tokens: [{type:"command",text:"cat"},{text:" "},{type:"operator",text:"<< 'EOF'"},{text:" "},{type:"operator",text:">"},{text:" "},{type:"path",text:"pytanie.sh"},{text:" "},{type:"operator",text:"&&"},{text:" "},{type:"command",text:"chmod"},{text:" "},{type:"flag",text:"+x"},{text:" "},{type:"path",text:"pytanie.sh"}], explain: "Zapisz do pliku i od razu daj prawo uruchamiania", effect: "Tworzy plik pytanie.sh i ustawia go jako wykonywalny" },
              { code: "#!/bin/bash", area: "shell", tokens: [{type:"comment",text:"#!/bin/bash"}], explain: "Nagłówek Bash" },
              { code: 'echo "Jak masz na imię?"', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"Jak masz na imię?"'}], explain: "Wypisz pytanie na ekranie" },
              { code: "read IMIE", area: "shell", tokens: [{type:"command",text:"read"},{text:" "},{type:"variable",text:"IMIE"}], explain: "Czekaj na odpowiedź i włóż ją do pudełka IMIE", effect: "Użytkownik wpisuje tekst, który trafia do zmiennej IMIE", link: {url:"https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html", label:"Bash builtins – GNU"} },
              { code: 'echo "Witaj na Planecie X, $IMIE!"', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"Witaj na Planecie X, '},{type:"variable",text:"$IMIE"},{type:"string",text:'!"'}], explain: "Wypisz powitanie z wstawionym imieniem" },
              { code: "EOF", area: "shell", tokens: [{type:"keyword",text:"EOF"}], explain: "Koniec pliku" },
            ],
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
            command: `cat << 'EOF' > poranek.sh && chmod +x poranek.sh
#!/bin/bash
GODZINA=$(date +%H)
if [ $GODZINA -lt 12 ]; then
  echo "☀️ Dzień dobry! Rano na Planecie X."
else
  echo "🌙 Dobry wieczór! Wieczór na Planecie X."
fi
EOF`,
            expectedOutput: () => ``,
            tip: "🚦 if [ warunek ]; then → 'jeśli tak, to...'. -lt = less than (mniej niż). fi = koniec warunku.",
            explain: [
              { code: "cat << 'EOF' > poranek.sh && chmod +x poranek.sh", area: "shell", tokens: [{type:"command",text:"cat"},{text:" "},{type:"operator",text:"<< 'EOF'"},{text:" "},{type:"operator",text:">"},{text:" "},{type:"path",text:"poranek.sh"},{text:" "},{type:"operator",text:"&&"},{text:" "},{type:"command",text:"chmod"},{text:" "},{type:"flag",text:"+x"},{text:" "},{type:"path",text:"poranek.sh"}], explain: "Zapisz skrypt i daj prawo uruchamiania", effect: "Tworzy wykonywalny plik poranek.sh" },
              { code: "GODZINA=$(date +%H)", area: "shell", tokens: [{type:"variable",text:"GODZINA"},{type:"operator",text:"="},{type:"variable",text:"$(date +%H)"}], explain: "Uruchom komendę date +%H (aktualna godzina) i włóż wynik do pudełka GODZINA", effect: "Zmienna GODZINA = np. 14" },
              { code: "if [ $GODZINA -lt 12 ]; then", area: "shell", tokens: [{type:"keyword",text:"if"},{text:" "},{type:"operator",text:"["},{text:" "},{type:"variable",text:"$GODZINA"},{text:" "},{type:"flag",text:"-lt"},{text:" "},{type:"argument",text:"12"},{text:" "},{type:"operator",text:"]"},{text:"; "},{type:"keyword",text:"then"}], explain: "Jeśli godzina jest mniejsza niż 12 (rano), to...", link: {url:"https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html", label:"Warunki Bash – GNU"} },
              { code: '  echo "☀️ Dzień dobry!..."', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"☀️ Dzień dobry! Rano na Planecie X."'}], explain: "Wypisz powitanie poranne" },
              { code: "else", area: "shell", tokens: [{type:"keyword",text:"else"}], explain: "W przeciwnym razie (godzina >= 12)..." },
              { code: '  echo "🌙 Dobry wieczór!..."', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"🌙 Dobry wieczór! Wieczór na Planecie X."'}], explain: "Wypisz powitanie wieczorne" },
              { code: "fi", area: "shell", tokens: [{type:"keyword",text:"fi"}], explain: "Koniec warunku (if czytane od tyłu = fi)" },
            ],
          },
          {
            instruction: "Uruchom – komputer sprawdzi, jaka jest pora dnia:",
            command: "./poranek.sh",
            expectedOutput: () => `☀️ Dzień dobry! Rano na Planecie X.`,
            tip: "✅ Komputer sprawdził godzinę i wybrał odpowiednią wiadomość – jak sygnalizacja!",
            explain: [
              { code: "./poranek.sh", area: "shell", tokens: [{type:"path",text:"./poranek.sh"}], explain: "Uruchom skrypt poranek.sh – komputer sprawdzi godzinę i wybierze powitanie", effect: "Wyświetla powitanie zależne od pory dnia" },
            ],
          },
          {
            instruction: "Sprawdź, czy plik istnieje:",
            command: `cat << 'EOF' > sprawdz.sh && chmod +x sprawdz.sh && ./sprawdz.sh
#!/bin/bash
if [ -f hello.sh ]; then
  echo "✅ Plik hello.sh istnieje!"
else
  echo "❌ Nie znaleziono hello.sh"
fi
EOF`,
            expectedOutput: () => `✅ Plik hello.sh istnieje!`,
            tip: "📁 -f = 'czy ten plik istnieje?'. Komputer zajrzał i odpowiedział.",
            explain: [
              { code: "cat << 'EOF' > sprawdz.sh && chmod +x sprawdz.sh && ./sprawdz.sh", area: "shell", tokens: [{type:"command",text:"cat"},{text:" "},{type:"operator",text:"<< 'EOF'"},{text:" "},{type:"operator",text:">"},{text:" "},{type:"path",text:"sprawdz.sh"},{text:" "},{type:"operator",text:"&&"},{text:" "},{type:"command",text:"chmod"},{text:" "},{type:"flag",text:"+x"},{text:" "},{type:"path",text:"sprawdz.sh"},{text:" "},{type:"operator",text:"&&"},{text:" "},{type:"path",text:"./sprawdz.sh"}], explain: "Zapisz, daj prawo uruchamiania i od razu uruchom", effect: "Tworzy, ustawia i uruchamia skrypt jednym poleceniem" },
              { code: "if [ -f hello.sh ]; then", area: "filesystem", tokens: [{type:"keyword",text:"if"},{text:" "},{type:"operator",text:"["},{text:" "},{type:"flag",text:"-f"},{text:" "},{type:"path",text:"hello.sh"},{text:" "},{type:"operator",text:"]"},{text:"; "},{type:"keyword",text:"then"}], explain: "-f = czy plik istnieje? Komputer sprawdza system plików.", effect: "Sprawdza istnienie pliku hello.sh na dysku" },
              { code: '  echo "✅ Plik hello.sh istnieje!"', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"✅ Plik hello.sh istnieje!"'}], explain: "Jeśli plik istnieje – wypisz sukces" },
              { code: '  echo "❌ Nie znaleziono hello.sh"', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"❌ Nie znaleziono hello.sh"'}], explain: "Jeśli nie istnieje – wypisz błąd" },
              { code: "fi", area: "shell", tokens: [{type:"keyword",text:"fi"}], explain: "Koniec warunku" },
            ],
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
            command: `cat << 'EOF' > planety.sh && chmod +x planety.sh && ./planety.sh
#!/bin/bash
for PLANETA in Merkury Wenus Ziemia Mars; do
  echo "🪐 Cześć, $PLANETA!"
done
EOF`,
            expectedOutput: () => `🪐 Cześć, Merkury!\n🪐 Cześć, Wenus!\n🪐 Cześć, Ziemia!\n🪐 Cześć, Mars!`,
            tip: "🎠 Karuzela zatrzymała się 4 razy – raz przy każdej planecie. done = karuzela się skończyła.",
            explain: [
              { code: "for PLANETA in Merkury Wenus Ziemia Mars; do", area: "shell", tokens: [{type:"keyword",text:"for"},{text:" "},{type:"variable",text:"PLANETA"},{text:" "},{type:"keyword",text:"in"},{text:" "},{type:"argument",text:"Merkury Wenus Ziemia Mars"},{text:"; "},{type:"keyword",text:"do"}], explain: "Karuzela: dla każdej planety z listy, włóż jej nazwę do pudełka PLANETA i wykonaj...", link: {url:"https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html", label:"Pętle Bash – GNU"} },
              { code: '  echo "🪐 Cześć, $PLANETA!"', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"🪐 Cześć, '},{type:"variable",text:"$PLANETA"},{type:"string",text:'!"'}], explain: "Wypisz powitanie z nazwą aktualnej planety", effect: "Powtarza się 4 razy – raz dla każdej planety" },
              { code: "done", area: "shell", tokens: [{type:"keyword",text:"done"}], explain: "Koniec karuzeli – wróć na początek lub zakończ" },
            ],
          },
          {
            instruction: "Policz od 1 do 5 z pętlą while:",
            command: `cat << 'EOF' > odliczanie.sh && chmod +x odliczanie.sh && ./odliczanie.sh
#!/bin/bash
LICZNIK=1
while [ $LICZNIK -le 5 ]; do
  echo "Odliczanie: $LICZNIK"
  LICZNIK=$((LICZNIK + 1))
done
echo "🚀 Start!"
EOF`,
            expectedOutput: () => `Odliczanie: 1\nOdliczanie: 2\nOdliczanie: 3\nOdliczanie: 4\nOdliczanie: 5\n🚀 Start!`,
            tip: "🔁 while = 'kręć się, dopóki warunek jest prawdziwy'. -le = less or equal (mniejsze lub równe 5).",
            explain: [
              { code: "LICZNIK=1", area: "shell", tokens: [{type:"variable",text:"LICZNIK"},{type:"operator",text:"="},{type:"argument",text:"1"}], explain: "Ustaw licznik na 1 – zaczynamy odliczanie" },
              { code: "while [ $LICZNIK -le 5 ]; do", area: "shell", tokens: [{type:"keyword",text:"while"},{text:" "},{type:"operator",text:"["},{text:" "},{type:"variable",text:"$LICZNIK"},{text:" "},{type:"flag",text:"-le"},{text:" "},{type:"argument",text:"5"},{text:" "},{type:"operator",text:"]"},{text:"; "},{type:"keyword",text:"do"}], explain: "Dopóki licznik <= 5, powtarzaj...", link: {url:"https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html", label:"Pętle Bash – GNU"} },
              { code: '  echo "Odliczanie: $LICZNIK"', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"Odliczanie: '},{type:"variable",text:"$LICZNIK"},{type:"string",text:'"'}], explain: "Wypisz aktualną wartość licznika" },
              { code: "  LICZNIK=$((LICZNIK + 1))", area: "shell", tokens: [{type:"variable",text:"LICZNIK"},{type:"operator",text:"="},{type:"variable",text:"$((LICZNIK + 1))"}], explain: "Zwiększ licznik o 1. $(( )) = kalkulator.", effect: "LICZNIK rośnie: 1→2→3→4→5→6 (i pętla się kończy)" },
              { code: "done", area: "shell", tokens: [{type:"keyword",text:"done"}], explain: "Koniec pętli – wróć do while i sprawdź warunek" },
              { code: 'echo "🚀 Start!"', area: "shell", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"🚀 Start!"'}], explain: "Po zakończeniu pętli – wypisz 'Start!'" },
            ],
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
            explain: [
              { code: "crontab -l", area: "cron", tokens: [{type:"command",text:"crontab"},{text:" "},{type:"flag",text:"-l"}], explain: "crontab = zarządzaj budzikami. -l = wyświetl listę (list).", effect: "Pokazuje wszystkie zaplanowane zadania użytkownika", link: {url:"https://pl.wikipedia.org/wiki/Cron", label:"Cron – Wikipedia"} },
            ],
          },
          {
            instruction: "Dodaj budzik – co minutę zapisuj datę do pliku:",
            command: `echo '* * * * * echo "Ping: $(date)" >> /tmp/planeta-log.txt' | crontab -`,
            expectedOutput: () => ``,
            tip: "⏰ Pięć gwiazdek = 'co minutę, co godzinę, co dzień'. >> = dopisz na koniec pliku (nie kasuj starego).",
            explain: [
              { code: "echo '* * * * * ...' | crontab -", area: "cron", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:"'* * * * * ...'"},{text:" "},{type:"operator",text:"|"},{text:" "},{type:"command",text:"crontab"},{text:" "},{type:"flag",text:"-"}], explain: "Wyślij tekst do crontab. | = taśma transportowa. crontab - = wczytaj z wejścia.", effect: "Ustawia nowy harmonogram zadań" },
              { code: "* * * * *", area: "cron", tokens: [{type:"argument",text:"* * * * *"}], explain: "5 pól: minuta godzina dzień miesiąc dzień_tygodnia. Gwiazdka = 'każdy'. Czyli: co minutę, każdego dnia.", link: {url:"https://crontab.guru/", label:"Crontab Guru – interaktywny kalkulator"} },
              { code: 'echo "Ping: $(date)" >> /tmp/planeta-log.txt', area: "filesystem", tokens: [{type:"command",text:"echo"},{text:" "},{type:"string",text:'"Ping: '},{type:"variable",text:"$(date)"},{type:"string",text:'"'},{text:" "},{type:"operator",text:">>"},{text:" "},{type:"path",text:"/tmp/planeta-log.txt"}], explain: "Dopisz datę na koniec pliku. >> = dopisz (nie nadpisuj).", effect: "Co minutę nowa linia z datą w /tmp/planeta-log.txt" },
            ],
          },
          {
            instruction: "Sprawdź, czy budzik został ustawiony:",
            command: "crontab -l",
            expectedOutput: () => `* * * * * echo "Ping: $(date)" >> /tmp/planeta-log.txt`,
            tip: "✅ Budzik działa! Co minutę komputer dopisze linijkę z datą do pliku. To Twój pierwszy automatyczny robot!",
            explain: [
              { code: "crontab -l", area: "cron", tokens: [{type:"command",text:"crontab"},{text:" "},{type:"flag",text:"-l"}], explain: "Sprawdź listę budzików – teraz powinien być jeden wpis.", effect: "Wyświetla zaplanowane zadanie z gwiazdkami" },
            ],
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
    ["📄","cat << 'EOF'","Zapisz tekst do pliku (aż do EOF)"],
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
              <div className="code-row"><ColorizedCode text={step.command}/><CopyCode text={step.command}/>{step.explain && <ExplainButton explain={step.explain} command={step.command}/>}</div>
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
          <CodeLegend/>
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
