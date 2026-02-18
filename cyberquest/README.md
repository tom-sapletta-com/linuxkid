# Planeta X: CyberQuest 🛡️

Kontynuacja gry **Planeta X** – interaktywna nauka cyberbezpieczeństwa w terminalu. Zostań tajnym agentem i obroń planetę przed atakami z Galaktyki Darknet!

## 📖 Fabuła

Ukończyłeś szkolenie na Planecie X – znasz język terminala i potrafisz sterować komputerem. Ale planeta jest w niebezpieczeństwie! Źli kosmici próbują włamać się do systemów. Rada Planety X mianowała Cię **Tajnym Agentem Cyberbezpieczeństwa**. Twoja misja: ochronić planetę!

## 🗺️ Legenda analogii: Cyberbezpieczeństwo → Świat realny

### 🏰 Obrona systemu = Obrona zamku

| Pojęcie | Analogia | Wyjaśnienie |
|---|---|---|
| **Firewall** | 🧱 Mur obronny zamku | Blokuje nieproszonych gości |
| **Reguła firewall** | 👮 Strażnik przy bramie | Sprawdza każdego kto chce wejść |
| **iptables** | 🧱 Ręczne stawianie murów | Precyzyjne, ale skomplikowane |
| **UFW** | 📱 Pilot do murów | Proste komendy zamiast ręcznej pracy |
| **Policy DROP** | 🚫 Zamknięta brama domyślna | Nikt nie wejdzie bez zaproszenia |
| **Policy ACCEPT** | 🚪 Otwarta brama | Każdy może wejść (niebezpieczne!) |

### 🕵️ Użytkownicy = Agenci

| Pojęcie | Analogia | Wyjaśnienie |
|---|---|---|
| **Użytkownik** | 🕵️ Agent | Osoba działająca w systemie |
| **root** | 👑 Komendant Główny | Ma dostęp do WSZYSTKIEGO |
| **UID** | 🆔 Numer legitymacji | Unikalny identyfikator agenta |
| **Grupa** | 👥 Oddział agentów | Zespół z wspólnymi uprawnieniami |
| **sudo** | ⭐ Oddział specjalny | Uprawnienia do wykonywania tajnych operacji |
| **who / last** | 📋 Dziennik wartownika | Kto był, kto jest, skąd przyszedł |

### 🔐 Kryptografia = Sejfy i odciski palców

| Pojęcie | Analogia | Wyjaśnienie |
|---|---|---|
| **Hasło** | 🔑 Klucz do sejfu | Proste = plastikowy, silne = tytanowy |
| **Hash hasła** | 🖐️ Odcisk palca hasła | Nie da się odtworzyć oryginału |
| **/etc/shadow** | 🏦 Sejf z odciskami haseł | Zaszyfrowane hasła, nawet admin nie widzi |
| **Klucz SSH prywatny** | 🔑 Twój odcisk palca (TAJNE!) | Nigdy nikomu nie pokazuj |
| **Klucz SSH publiczny** | 🔓 Skan odcisku (do rozdania) | Dajesz strażnikowi przy bramie |
| **GPG** | 📦 Magiczna skrzynka | Zamykasz kluczem odbiorcy, tylko on otworzy |
| **AES-256** | 🏰 Szyfrowanie klasy wojskowej | Standard armii i banków |
| **Uprawnienia plików** | 📁 Poziomy tajności teczek | 700=ściśle tajne, 750=tajne, 755=jawne |

### ⚠️ Zagrożenia = Wrogowie planety

| Pojęcie | Analogia | Wyjaśnienie |
|---|---|---|
| **Trojan** | 🐴 Szpieg udający przyjaciela | Program udaje normalny, ale kradnie dane |
| **Phishing** | 🎣 Fałszywa wiadomość-pułapka | Wyłudza hasła podszywając się pod zaufanych |
| **Brute force** | 🔨 Próbowanie wszystkich kluczy | Atakujący testuje miliony haseł |
| **Ransomware** | 💀 Porywacz danych | Szyfruje pliki i żąda okupu |
| **Backdoor** | 🚪 Tylne drzwi | Ukryte wejście dla intruza |
| **CVE** | 🕳️ Odkryta dziura w murze | Znana luka bezpieczeństwa |

### 📡 Monitoring = Patrol i dozór

| Pojęcie | Analogia | Wyjaśnienie |
|---|---|---|
| **Logi (/var/log/)** | 📓 Dziennik wartownika | Zapisuje WSZYSTKO co się dzieje |
| **auth.log** | 🔐 Dziennik logowań | Kto próbował wejść (udane i nieudane) |
| **Fail2ban** | 🤖 Robot-strażnik | Automatycznie blokuje intruzów 24/7 |
| **grep + sort + uniq** | 🔍 Narzędzia detektywa | Analiza śladów w dziennikach |
| **Aktualizacje (apt)** | 🩹 Łatanie dziur w murze | Naprawia luki zanim wróg je wykorzysta |

## 🎮 Misje (lekcje)

1. **🔍 Rozpoznanie terenu** – tożsamość agenta, skanowanie systemu, wykrywanie intruzów
2. **🧱 Mury obronne** – firewall (iptables, UFW), blokowanie ataków
3. **🔐 Szyfry i hasła** – siła haseł, klucze SSH, szyfrowanie GPG
4. **📡 Patrol i monitoring** – analiza logów, fail2ban, blokowanie IP
5. **🩹 Łatanie dziur** – aktualizacje systemu, CVE, zarządzanie łatkami

## 🏗️ Architektura

```
cyberquest/
├── index.html      # Strona główna z CSS (motyw cyberbezpieczeństwa)
├── index.jsx       # Aplikacja React (logika, misje, terminal)
├── tests/
│   └── app.spec.js # Testy E2E
└── README.md       # Dokumentacja
```

**Stack:** React 18 (CDN) + Babel + Vanilla CSS

## 🚀 Uruchomienie

```bash
# Z głównego katalogu linuxkid:
npx serve cyberquest
# lub otwórz cyberquest/index.html w przeglądarce
```

## Powiązanie z Planeta X

| Planeta X (część 1) | CyberQuest (część 2) |
|---|---|
| Nauka podstaw terminala | Nauka cyberbezpieczeństwa |
| Komputer = samochód | Komputer = zamek do obrony |
| Kierowca = użytkownik | Agent = użytkownik |
| Drogi = sieć | Mury = firewall |
| Trąbienie = ping | Patrol = monitoring logów |

## License

Apache License 2.0 - see [LICENSE](../LICENSE) for details.

## Author

Created by **Tom Sapletta** - [tom@sapletta.com](mailto:tom@sapletta.com)
