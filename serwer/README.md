# Misja 03: Serwer Planety X 🌐

> **Status:** 🔧 W przygotowaniu

## 📖 Fabuła

Planeta X ma już swoich agentów i systemy obronne – ale nikt poza planetą o niej nie wie! Rada Planety X powierza Ci nowe zadanie: **uruchom serwer WWW i pokaż Planetę X całemu wszechświatowi**.

Musisz postawić serwer, skonfigurować domenę, zabezpieczyć go certyfikatem SSL i opublikować stronę. Gdy skończysz – każda cywilizacja w galaktyce będzie mogła odwiedzić Planetę X przez przeglądarkę!

## 🎯 Cel misji

Nauczyć się stawiać i konfigurować serwer WWW w Linuksie – od zera do działającej strony w internecie z HTTPS.

## 🗺️ Analogie: Serwer → Świat realny

| Pojęcie | Analogia | Wyjaśnienie |
|---|---|---|
| **Serwer WWW** | 🏛️ Budynek użyteczności publicznej | Stoi i czeka na gości 24/7 |
| **Nginx / Apache** | 🚪 Recepcjonista w budynku | Przyjmuje gości i kieruje ich do właściwych pokoi |
| **Port 80 (HTTP)** | 🚪 Wejście główne (bez ochrony) | Każdy może wejść, ale rozmowy są jawne |
| **Port 443 (HTTPS)** | 🔒 Wejście z bramką bezpieczeństwa | Szyfrowana rozmowa, nikt nie podsłucha |
| **Certyfikat SSL** | 🪪 Oficjalny dowód tożsamości budynku | Potwierdza, że to naprawdę Planeta X |
| **Let's Encrypt** | 🏛️ Urząd wydający darmowe dowody | Darmowe certyfikaty SSL dla każdego |
| **Domena (planetax.pl)** | 📮 Adres pocztowy budynku | Łatwiejszy do zapamiętania niż numer IP |
| **DNS** | 📚 Książka adresowa wszechświata | Tłumaczy nazwę domeny na adres IP |
| **Virtual Host** | 🏢 Wiele firm w jednym budynku | Jeden serwer, wiele stron WWW |
| **Reverse Proxy** | 🔀 Portier przekierowujący gości | Nginx przekazuje ruch do aplikacji |
| **Docker** | 📦 Kontener transportowy | Aplikacja spakowana ze wszystkim czego potrzebuje |
| **docker-compose** | 📋 Lista kontenerów do uruchomienia | Jeden plik, wiele usług |

## 📚 Moduły misji (planowane lekcje)

### 🔧 Moduł 1: Pierwszy serwer
- Instalacja Nginx na Linuksie
- Struktura katalogów serwera (`/var/www/`, `/etc/nginx/`)
- Uruchomienie i sprawdzenie statusu (`systemctl`)
- Pierwsza strona HTML

### 🌐 Moduł 2: Domena i DNS
- Jak działa DNS (analogia: książka telefoniczna wszechświata)
- Rejestracja domeny
- Konfiguracja rekordów A, CNAME, MX
- Propagacja DNS – dlaczego trzeba czekać?

### 🔒 Moduł 3: Certyfikat SSL (HTTPS)
- Dlaczego HTTP jest niebezpieczne?
- Instalacja Certbot (Let's Encrypt)
- Automatyczne odnawianie certyfikatu
- Przekierowanie HTTP → HTTPS

### 🏢 Moduł 4: Wiele stron na jednym serwerze
- Virtual Hosts w Nginx
- Konfiguracja `server_name`
- Logi dostępu i błędów
- Podstawowe zabezpieczenia (rate limiting, blokowanie IP)

### 🐳 Moduł 5: Docker – aplikacja w kontenerze
- Czym jest kontener? (analogia: kontener transportowy)
- Dockerfile – przepis na kontener
- `docker run`, `docker ps`, `docker logs`
- docker-compose – wiele usług razem

### 🔀 Moduł 6: Reverse Proxy
- Nginx jako reverse proxy
- Przekierowanie ruchu do aplikacji (Node.js, Python, PHP)
- Load balancing – rozkładanie ruchu
- Monitoring serwera (`htop`, `netstat`, `journalctl`)

## 🛠️ Wymagania techniczne

- System: Ubuntu 22.04 LTS lub Debian 12
- Dostęp: SSH do serwera (VPS lub lokalny)
- Opcjonalnie: własna domena

## 🔗 Powiązanie z poprzednimi misjami

| Misja 1 (Przylot) | Misja 2 (CyberQuest) | Misja 3 (Serwer) |
|---|---|---|
| `ssh` – łączenie z serwerem | Firewall – ochrona serwera | Nginx – serwowanie stron |
| `systemctl` – usługi | Logi – monitoring | SSL – szyfrowanie ruchu |
| Uprawnienia plików | Fail2ban – ochrona | Virtual Hosts |

## 📁 Planowana struktura projektu

```
serwer/
├── index.html          # Strona gry (gdy gotowa)
├── style.css           # Style
├── index.jsx           # Aplikacja React
├── tests/
│   └── app.spec.js     # Testy E2E
├── README.md           # Ten plik
└── TODO.md             # Lista zadań deweloperskich
```

## 👥 Dla kogo?

- Wiek: 12+ lat
- Wymagania: ukończona Misja 1 lub 2
- Czas: ~4-6 godzin nauki
