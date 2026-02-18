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

## 🏗️ Architektura projektu

```
linuxkid/
├── index.html            # 🪐 Centrum Misji – strona startowa z listą wszystkich misji
├── style.css             # Style dla strony głównej
│
├── przylot/              # ✅ Misja 01: Przylot na Planetę X (podstawy terminala)
│   ├── index.html        # HTML (ładuje style.css + index.jsx)
│   ├── style.css         # Style CSS
│   ├── index.jsx         # Aplikacja React
│   ├── playwright.config.js
│   └── tests/
│       └── app.spec.js   # Testy E2E
│
├── cyberquest/           # ✅ Misja 02: CyberQuest (cyberbezpieczeństwo)
│   ├── index.html
│   ├── style.css
│   ├── index.jsx
│   ├── playwright.config.js
│   └── tests/
│       └── app.spec.js
│
├── serwer/               # 🔧 Misja 03: Serwer Planety X (w przygotowaniu)
│   ├── README.md         # Opis misji i analogii
│   └── TODO.md           # Plan implementacji dla deweloperów
│
├── package.json          # Zależności (Playwright)
├── README.md             # Dokumentacja główna
└── LICENSE
```

**Stack:** React 18 (CDN) + Babel (transpilacja w przeglądarce) + Vanilla CSS

**Standaryzacja:** Każdy projekt ma identyczną strukturę: `index.html` + `style.css` + `index.jsx`

## 🗺️ Mapa misji

| # | Folder | Tytuł | Status | Temat |
|---|---|---|---|---|
| 01 | `przylot/` | Przylot na Planetę X | ✅ Dostępna | Terminal, sieć, pliki, uprawnienia |
| 02 | `cyberquest/` | CyberQuest | ✅ Dostępna | Firewall, SSH, szyfrowanie, logi |
| 03 | `serwer/` | Serwer Planety X | 🔧 W przygotowaniu | Nginx, DNS, SSL, Docker |
| 04 | *(planowane)* | Automatyzacja | 📋 Planowana | Bash, Cron, Ansible, CI/CD |
| 05 | *(planowane)* | Konteneryzacja | 📋 Planowana | Docker, Kubernetes, Helm |
| 06 | *(planowane)* | Kod Planety X | 📋 Planowana | Python, API, SQLite, Git |

## License

Apache License 2.0 - see [LICENSE](LICENSE) for details.

## Author

Created by **Tom Sapletta** - [tom@sapletta.com](mailto:tom@sapletta.com)
