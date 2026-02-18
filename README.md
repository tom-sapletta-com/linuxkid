# Planeta X

Interactive terminal learning app using car/city analogies. Learn Linux commands while traveling through a virtual planet!

> 🛡️ **Kontynuacja:** [Planeta X: CyberQuest](cyberquest/) – zostań tajnym agentem cyberbezpieczeństwa!

## 🗺️ Legenda analogii: Linux → Świat realny

Projekt uczy architektury Linuxa przez porównania do świata samochodów, dróg i miasta.
Poniżej pełna mapa odniesień:

### 🚗 Komputer = Samochód

| Pojęcie Linux | Analogia | Wyjaśnienie |
|---|---|---|
| **Komputer (PC)** | 🚗 Samochód | Maszyna, którą sterujesz |
| **Terminal** | 🎮 Kierownica i pedały | Interfejs do sterowania komputerem |
| **Hostname** | 🏷️ Potoczna nazwa auta | Jak wszyscy nazywają Twój samochód |
| **Adres IP** | 🏷️ Tablica rejestracyjna | Unikalny identyfikator w sieci |
| **System operacyjny** | 🏎️ Marka auta | Linux, Windows, macOS = różne marki |

### 🧑 Użytkownicy i grupy = Ludzie i relacje społeczne

| Pojęcie Linux | Analogia | Wyjaśnienie |
|---|---|---|
| **Użytkownik (user)** | 🧑 Kierowca | Osoba siedząca za kierownicą |
| **root** | 🔧 Główny mechanik | Ma klucze do WSZYSTKIEGO |
| **Hasło** | 🔑 Kluczyki do auta | Tylko Ty masz kluczyki do swojego auta |
| **Grupa (groups)** | 👥 Grupa społeczna | Jak rodzina, klasa szkolna, drużyna sportowa – każda daje inne prawa i dostęp |
| **Uprawnienia (permissions)** | 🔑 Kluczyki i zamki | Twoje kluczyki pasują do Twojego auta, ale nie do cudzego |
| **chmod** | 🔐 Zamykanie auta na klucz | Decydujesz, kto może wsiąść |
| **Autentykacja** | 🪪 Pokazanie prawa jazdy | Potwierdzenie kim jesteś |
| **Autoryzacja** | ✅ Szlaban na parkingu | Sprawdzenie, czy masz pozwolenie na wjazd |

### 🛣️ Sieć = Drogi w mieście

| Pojęcie Linux | Analogia | Wyjaśnienie |
|---|---|---|
| **Sieć** | 🛣️ Drogi w mieście | Infrastruktura łącząca komputery |
| **Router** | 🔀 Skrzyżowanie | Kieruje ruchem – wskazuje właściwą drogę |
| **Ping** | 📯 Trąbienie | Trąbisz, drugie auto odtrąbia – wiesz, że jest na drodze |
| **arp -a** | 📋 Spis tablic rejestracyjnych | Lista aut widzianych na drodze |
| **Port** | 🚪 Okienko w budynku (jak na poczcie) | Każde okienko obsługuje inną sprawę (80=WWW, 25=poczta) |
| **Broadcast** | 📻 Radio FM | Jedna stacja nadaje, wszystkie auta słyszą |
| **TCP** | 📧 List polecony | Pewna dostawa z potwierdzeniem odbioru |
| **UDP** | 📻 Radio | Szybko, ale może nie dotrzeć |
| **Pipe (\|)** | 🔄 Taśma transportowa | Lewa strona produkuje, prawa konsumuje |
| **/etc/hosts** | 📋 Książka telefoniczna | Zamiast pamiętać numery IP, szukasz po nazwie |
| **DNS** | 📚 Wspólna książka telefoniczna internetu | Globalna baza nazw → adresów IP |

### 📋 System i konfiguracja = Schowek i instrukcja obsługi

| Pojęcie Linux | Analogia | Wyjaśnienie |
|---|---|---|
| **Zmienne ENV** | 📋 Dokumenty w schowku auta | Dowód rejestracyjny, ubezpieczenie, mapa |
| **$USER** | 🧑 Dowód kierowcy | Kto siedzi za kierownicą |
| **$HOME** | 🏠 Adres garażu | Tu trzymasz swoje pliki |
| **export** | 📝 Wkładanie karteczki do schowka | Nowy dokument w pamięci auta |
| **.bashrc** | 📓 Instrukcja obsługi auta | Co ma się włączyć po przekręceniu kluczyka |
| **source** | 🔑 Przekręcenie kluczyka | Wczytanie instrukcji od nowa |
| **Alias** | 🏷️ Naklejka na przycisku | Krótka nazwa zamiast długiej komendy |
| **echo** | 📢 Megafon | Powtarza to, co powiesz |

## 🔧 Naprawione nieścisłości

### ❌ Było: `groups` = parking z kartą
**Problem:** Parking odnosi się do miejsca parkowania **aut** (komputerów), a `groups` w Linuxie to grupy **użytkowników** (ludzi). Parking nie oddaje relacji międzyludzkich.

### ✅ Jest: `groups` = grupy społeczne (rodzina, klasa, drużyna)
**Dlaczego lepiej:** Grupy w Linuxie działają jak grupy społeczne w życiu:
- **rodzina** (`family`) – masz dostęp do wspólnych zasobów domowych
- **klasa szkolna** (`uczniowie`) – masz dostęp do materiałów szkolnych
- **drużyna sportowa** (`siec`) – masz dostęp do sprzętu drużyny

Każda grupa daje inne prawa – dokładnie jak w Linuxie, gdzie przynależność do grupy daje dostęp do określonych plików i zasobów.

### ❌ Było: `port` = numer bramy w garażu
**Problem:** „Garaż" był już używany jako analogia do katalogu domowego (`$HOME`). Podwójne użycie tego samego pojęcia wprowadzało zamieszanie.

### ✅ Jest: `port` = okienko w budynku (jak na poczcie)
**Dlaczego lepiej:** Każdy budynek (komputer) ma wiele okienek, a każde obsługuje inną sprawę – okienko 80 dla stron WWW, okienko 25 dla poczty, okienko 1234 dla rozmowy. To naturalna i jednoznaczna analogia.

## 🚀 Jak uruchomić

### 🌐 Tryb Web (przeglądarka)

Najprostszy sposób – bez instalacji:

```bash
# Opcja A: wbudowany serwer Python
python3 -m http.server 8080
# Otwórz: http://localhost:8080

# Opcja B: npm start (port 3001)
npm start
# Otwórz: http://localhost:3001
```

### 🐳 Tryb Docker (kontener nginx)

```bash
# Zbuduj obraz i uruchom
make build
make up
# Otwórz: http://localhost:8080

# Lub ręcznie:
docker build -t planetax .
docker run -p 8080:80 --rm -d planetax

# Zatrzymaj
make stop
```

### 🖥️ Tryb Desktop (Electron)

Wymaga Node.js 18+:

```bash
cd electron
npm install
npm start
```

Aby zbudować instalator (AppImage / deb / exe / dmg):

```bash
cd electron
npm run build:linux   # Linux: AppImage + deb
npm run build:win     # Windows: NSIS installer
npm run build:mac     # macOS: dmg
# Wynik: ../dist-electron/
```

### 🧪 Sandbox – prawdziwy terminal (Docker Compose)

Sandbox uruchamia sieć kontenerów odwzorowującą środowisko misji:

```bash
docker compose -f sandbox/docker-compose.yml up -d

# Wejdź do terminala jako użytkownik ania:
docker exec -it planetax-sandbox bash -c "su - ania"

# Zatrzymaj sandbox:
docker compose -f sandbox/docker-compose.yml down
```

Usługi sandbox:

| Kontener | IP | Rola |
|---|---|---|
| `planetax-sandbox` | 192.168.1.10 | Główny terminal (Misja 1) |
| `planetax-kuby` | 192.168.1.11 | Peer do ćwiczeń sieciowych |
| `planetax-nginx` | 192.168.1.100 | Serwer WWW (Misja 3), port 8090 |
| `planetax-redis` | 192.168.1.101 | Redis (Misja 5) |
| `planetax-python` | 192.168.1.102 | Środowisko Python (Misja 6) |

### 📊 Opcjonalne: SQLite REST API

```bash
# Skopiuj konfigurację i uzupełnij klucz OpenRouter
cp .env.example .env

# Uruchom backend API (port 3001)
npm run api
# lub: node progress-api.js
```

Zmienne środowiskowe (`.env.example`):

| Zmienna | Opis |
|---|---|
| `OPENROUTER_API_KEY` | Klucz API z [openrouter.ai](https://openrouter.ai/keys) |
| `OPENROUTER_MODEL` | Model LLM (domyślnie: `google/gemma-3-27b-it:free`) |
| `LLM_MAX_TOKENS` | Limit tokenów odpowiedzi (domyślnie: 800) |
| `LLM_TEMPERATURE` | Kreatywność modelu 0.0–1.0 (domyślnie: 0.7) |

### 🧪 Testy E2E (Playwright)

```bash
npm install
npx playwright install
npm test                    # wszystkie testy
npm run test:desktop        # tylko desktop
npm run test:mobile         # tylko mobile
```

---

## 🏗️ Architektura projektu

```
linuxkid/
├── index.html            # 🪐 Centrum Misji – dynamiczna strona z postępem i odblokowywaniem
├── style.css             # Style dla strony głównej
├── config.html           # Konfiguracja aplikacji (język, API, motyw)
├── progress.js           # 📊 Progress Manager (localStorage + SQLite API facade)
├── progress-api.js       # 🗄️ SQLite REST API backend (opcjonalny)
├── i18n.js               # Internacjonalizacja (i18n)
├── .env.example          # Przykładowa konfiguracja (LLM, CORS)
│
├── przylot/              # ✅ Misja 01: Przylot na Planetę X
│   ├── index.html        # HTML (ładuje progress.js + React + index.jsx)
│   ├── style.css
│   ├── index.jsx         # Aplikacja React z persystencją postępu
│   ├── playwright.config.js
│   └── tests/
│       └── app.spec.js
│
├── cyberquest/           # ✅ Misja 02: CyberQuest → README
│   ├── index.html
│   ├── style.css
│   ├── index.jsx
│   ├── playwright.config.js
│   ├── README.md
│   └── tests/
│       └── app.spec.js
│
├── serwer/               # ✅ Misja 03: Serwer Planety X → README
│   ├── index.html
│   ├── style.css
│   ├── index.jsx
│   ├── README.md
│   └── TODO.md
│
├── automatyzacja/        # 📋 Misja 04: Automatyzacja (planowana) → README
│   ├── README.md
│   └── TODO.md
│
├── konteneryzacja/       # 📋 Misja 05: Konteneryzacja (planowana) → README
│   ├── README.md
│   └── TODO.md
│
├── kod/                  # 📋 Misja 06: Kod Planety X (planowana) → README
│   ├── README.md
│   └── TODO.md
│
├── electron/             # 🖥️ Aplikacja desktop (Electron)
│   ├── main.js           # Główny proces: static server + API + okno
│   ├── preload.js        # Bezpieczny most IPC
│   └── package.json      # Zależności Electron + electron-builder
│
├── sandbox/              # 🧪 Środowisko testowe (Docker Compose)
│   └── docker-compose.yml
│
├── Dockerfile            # Obraz nginx do wdrożenia webowego
├── Makefile              # Skróty: make build / up / stop / clean
├── package.json          # Zależności (Playwright + opcjonalne: Express, SQLite)
├── README.md
└── LICENSE
```

**Stack:** React 18 (CDN) + Babel (transpilacja w przeglądarce) + Vanilla CSS

**Standaryzacja:** Każdy projekt ma identyczną strukturę: `index.html` + `style.css` + `index.jsx`

## 📊 System postępu

Dwie implementacje persystencji danych:

1. **localStorage** (domyślna) – działa offline, bez serwera, dane w przeglądarce
2. **SQLite REST API** (opcjonalna) – `node progress-api.js` uruchamia serwer na porcie 3001

Hub (`index.html`) dynamicznie sprawdza postęp i blokuje misje, które wymagają ukończenia wcześniejszych:

| Misja | Wymaga ukończenia |
|---|---|
| Przylot | *(brak – zawsze dostępna)* |
| CyberQuest | Przylot |
| Serwer | Przylot |
| Automatyzacja | Serwer |
| Konteneryzacja | Automatyzacja |
| Kod Planety X | Przylot |

## 🗺️ Mapa misji

| # | Folder | Tytuł | Status | Temat |
|---|---|---|---|---|
| 01 | [`przylot/`](przylot/) | Przylot na Planetę X | ✅ Dostępna | Terminal, sieć, pliki, uprawnienia |
| 02 | [`cyberquest/`](cyberquest/README.md) | CyberQuest | ✅ Dostępna | Firewall, SSH, szyfrowanie, logi |
| 03 | [`serwer/`](serwer/README.md) | Serwer Planety X | ✅ Dostępna | Nginx, DNS, SSL |
| 04 | [`automatyzacja/`](automatyzacja/README.md) | Automatyzacja | 📋 Planowana | Bash, Cron, Ansible, CI/CD |
| 05 | [`konteneryzacja/`](konteneryzacja/README.md) | Konteneryzacja | 📋 Planowana | Docker, Kubernetes, Helm |
| 06 | [`kod/`](kod/README.md) | Kod Planety X | 📋 Planowana | Python, API, SQLite, Git |

## License

Apache License 2.0 - see [LICENSE](LICENSE) for details.

## Author

Created by **Tom Sapletta** - [tom@sapletta.com](mailto:tom@sapletta.com)
