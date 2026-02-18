# TODO – Misja 03: Serwer Planety X 🌐

> Plik dla deweloperów. Opisuje co trzeba zbudować, w jakiej kolejności i dlaczego.

## Status: 🔧 W przygotowaniu

---

## 🎯 Priorytety (co zrobić najpierw)

### P0 – Fundament (blokuje wszystko inne)
- [ ] Zaprojektować dane lekcji (`LESSONS` array) dla 6 modułów
- [ ] Zdefiniować analogie serwer→świat realny (wzorem `przylot/` i `cyberquest/`)
- [ ] Stworzyć `index.html` (kopiuj strukturę z `przylot/index.html`, zmień tytuł i kolory)
- [ ] Stworzyć `style.css` (motyw kolorystyczny: zielono-niebieski, #9ece6a jako akcent)

### P1 – Treść gry
- [ ] Napisać `INTRO_STORY` – fabuła misji (serwer dla Planety X)
- [ ] Moduł 1: Pierwszy serwer (nginx install, systemctl, pierwsza strona)
- [ ] Moduł 2: Domena i DNS (rekordy A, CNAME, propagacja)
- [ ] Moduł 3: SSL/HTTPS (certbot, let's encrypt, auto-renewal)
- [ ] Moduł 4: Virtual Hosts (wiele stron, logi)
- [ ] Moduł 5: Docker (Dockerfile, docker run, docker-compose)
- [ ] Moduł 6: Reverse Proxy (nginx proxy_pass, load balancing)

### P2 – Komponenty React
- [ ] Skopiować `Terminal` component z `przylot/index.jsx` jako bazę
- [ ] Stworzyć `ServerMap` component (zamiast CityMap – wizualizacja serwera/klientów)
- [ ] Stworzyć `GlossaryCard` z terminologią serwerową
- [ ] Stworzyć `StatusPanel` – pokazuje status usług (nginx running/stopped)
- [ ] Zaimplementować `App` component z URL routingiem

### P3 – Testy
- [ ] Stworzyć `tests/app.spec.js` (wzorem `przylot/tests/app.spec.js`)
- [ ] Stworzyć `playwright.config.js` (port 3003)
- [ ] Testy: pick screen, nawigacja, terminal, podpowiedź

### P4 – Integracja
- [ ] Dodać link do Misji 3 w `../index.html` (odblokować kartę)
- [ ] Zaktualizować `../README.md` z nową strukturą
- [ ] Zaktualizować skills w `../index.html` (odblokować umiejętności serwera)

---

## 🎨 Decyzje projektowe

### Kolory
- Akcent główny: `#9ece6a` (zielony – symbolizuje "online/running")
- Akcent drugi: `#73daca` (turkusowy – sieć)
- Tło kart: `#9ece6a08`
- Border: `#9ece6a33`

### Motyw terminala
- Prompt: `~$` (jak w pozostałych projektach)
- Kolor promptu: `#9ece6a`
- Kursor: `#9ece6a`

### Persona gracza
- Gracz = **Administrator Serwera Planety X**
- Serwer = **Centrum Transmisji Planety X**
- Domena = **planetax.galaktyka**
- IP serwera: `192.168.1.100`

### Symulowane komendy (expectedOutput)
Komendy muszą być symulowane (jak w poprzednich projektach):
```
sudo apt install nginx     → "Instalowanie nginx... ✅ nginx zainstalowany!"
systemctl start nginx      → "● nginx.service - A high performance web server\n   Active: active (running)"
curl localhost             → "<!DOCTYPE html><html>...<h1>Witaj na Planecie X!</h1>..."
certbot --nginx            → "Obtaining SSL certificate...\n✅ Certyfikat SSL zainstalowany!\n🔒 https://planetax.galaktyka"
docker run hello-world     → "Hello from Docker!\nThis message shows Docker is working correctly."
```

---

## 📐 Struktura danych lekcji

```js
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
        steps: [
          { instruction: "Zaktualizuj listę pakietów:", command: "sudo apt update", ... },
          { instruction: "Zainstaluj Nginx:", command: "sudo apt install nginx -y", ... },
          { instruction: "Sprawdź status:", command: "systemctl status nginx", ... },
        ]
      },
      {
        id: "first-page",
        title: "Pierwsza strona WWW",
        steps: [ ... ]
      }
    ]
  },
  { id: "dns", title: "Domena i DNS", icon: "🌐", color: "#73daca", layers: [...] },
  { id: "ssl", title: "Certyfikat SSL", icon: "🔒", color: "#7aa2f7", layers: [...] },
  { id: "vhosts", title: "Virtual Hosts", icon: "🏢", color: "#e0af68", layers: [...] },
  { id: "docker", title: "Docker", icon: "🐳", color: "#bb9af7", layers: [...] },
  { id: "proxy", title: "Reverse Proxy", icon: "🔀", color: "#f7768e", layers: [...] },
];
```

---

## 🔗 Zależności od innych projektów

- Wzoruj się na `przylot/index.jsx` dla struktury komponentów
- Wzoruj się na `cyberquest/index.jsx` dla stylu narracji
- Używaj tych samych wzorców: `Terminal`, `useCallback`, `useRef`, `successTimerRef`
- Zachowaj identyczną strukturę plików: `index.html` + `style.css` + `index.jsx`

---

## ⏱️ Szacowany czas implementacji

| Zadanie | Czas |
|---|---|
| Dane lekcji (LESSONS array) | 4-6h |
| Komponenty React | 3-4h |
| CSS i stylowanie | 1-2h |
| Testy E2E | 2-3h |
| Integracja z hub | 0.5h |
| **Razem** | **~12-16h** |

---

## 📝 Notatki

- Misja powinna działać bez prawdziwego serwera – wszystkie komendy są symulowane
- Dodać tryb "sandbox" gdzie użytkownik może eksperymentować z komendami
- Rozważyć dodanie wizualizacji przepływu HTTP request/response
- Certbot i SSL to świetna okazja do wyjaśnienia kryptografii asymetrycznej (kontynuacja CyberQuest)
