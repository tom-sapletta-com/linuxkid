/**
 * Planeta X – i18n (Internationalization)
 * 
 * Supports all major European languages.
 * Auto-detects from browser settings, user can override once at start.
 * Choice saved to localStorage and never asked again.
 * 
 * Usage:
 *   const t = window.PlanetaI18n.t;
 *   t('next_step')  // → "Następny krok →" (in Polish)
 */

const LANGUAGES = {
  pl: { name: 'Polski', flag: '🇵🇱' },
  en: { name: 'English', flag: '🇬🇧' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  fr: { name: 'Français', flag: '🇫🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  pt: { name: 'Português', flag: '🇵🇹' },
  nl: { name: 'Nederlands', flag: '🇳🇱' },
  cs: { name: 'Čeština', flag: '🇨🇿' },
  sk: { name: 'Slovenčina', flag: '🇸🇰' },
  hu: { name: 'Magyar', flag: '🇭🇺' },
  ro: { name: 'Română', flag: '🇷🇴' },
  bg: { name: 'Български', flag: '🇧🇬' },
  hr: { name: 'Hrvatski', flag: '🇭🇷' },
  sv: { name: 'Svenska', flag: '🇸🇪' },
  da: { name: 'Dansk', flag: '🇩🇰' },
  fi: { name: 'Suomi', flag: '🇫🇮' },
  nb: { name: 'Norsk', flag: '🇳🇴' },
  uk: { name: 'Українська', flag: '🇺🇦' },
  lt: { name: 'Lietuvių', flag: '🇱🇹' },
  lv: { name: 'Latviešu', flag: '🇱🇻' },
  et: { name: 'Eesti', flag: '🇪🇪' },
};

const TRANSLATIONS = {
  // ─── Navigation ───
  next_step: {
    pl: '✅ Następny krok →', en: '✅ Next step →', de: '✅ Nächster Schritt →',
    fr: '✅ Étape suivante →', es: '✅ Siguiente paso →', it: '✅ Passo successivo →',
    pt: '✅ Próximo passo →', nl: '✅ Volgende stap →', cs: '✅ Další krok →',
    sk: '✅ Ďalší krok →', hu: '✅ Következő lépés →', ro: '✅ Pasul următor →',
    bg: '✅ Следваща стъпка →', hr: '✅ Sljedeći korak →', sv: '✅ Nästa steg →',
    da: '✅ Næste trin →', fi: '✅ Seuraava askel →', nb: '✅ Neste trinn →',
    uk: '✅ Наступний крок →', lt: '✅ Kitas žingsnis →', lv: '✅ Nākamais solis →', et: '✅ Järgmine samm →',
  },
  next_stage: {
    pl: '🎉 Następny etap →', en: '🎉 Next stage →', de: '🎉 Nächste Etappe →',
    fr: '🎉 Étape suivante →', es: '🎉 Siguiente etapa →', it: '🎉 Prossima tappa →',
    pt: '🎉 Próxima etapa →', nl: '🎉 Volgende fase →', cs: '🎉 Další etapa →',
    sk: '🎉 Ďalšia etapa →', hu: '🎉 Következő szakasz →', ro: '🎉 Etapa următoare →',
    bg: '🎉 Следващ етап →', hr: '🎉 Sljedeća etapa →', sv: '🎉 Nästa etapp →',
    da: '🎉 Næste etape →', fi: '🎉 Seuraava vaihe →', nb: '🎉 Neste etappe →',
    uk: '🎉 Наступний етап →', lt: '🎉 Kitas etapas →', lv: '🎉 Nākamais posms →', et: '🎉 Järgmine etapp →',
  },
  hint: {
    pl: '💡 Podpowiedź', en: '💡 Hint', de: '💡 Hinweis',
    fr: '💡 Indice', es: '💡 Pista', it: '💡 Suggerimento',
    pt: '💡 Dica', nl: '💡 Hint', cs: '💡 Nápověda',
    sk: '💡 Nápoveda', hu: '💡 Tipp', ro: '💡 Indiciu',
    bg: '💡 Подсказка', hr: '💡 Savjet', sv: '💡 Tips',
    da: '💡 Tip', fi: '💡 Vinkki', nb: '💡 Tips',
    uk: '💡 Підказка', lt: '💡 Užuomina', lv: '💡 Padoms', et: '💡 Vihje',
  },
  copy_to_clipboard: {
    pl: 'Kopiuj do schowka', en: 'Copy to clipboard', de: 'In die Zwischenablage kopieren',
    fr: 'Copier dans le presse-papiers', es: 'Copiar al portapapeles', it: 'Copia negli appunti',
    pt: 'Copiar para a área de transferência', nl: 'Kopiëren naar klembord', cs: 'Kopírovat do schránky',
    sk: 'Kopírovať do schránky', hu: 'Másolás vágólapra', ro: 'Copiați în clipboard',
    bg: 'Копиране в клипборда', hr: 'Kopiraj u međuspremnik', sv: 'Kopiera till urklipp',
    da: 'Kopiér til udklipsholder', fi: 'Kopioi leikepöydälle', nb: 'Kopier til utklippstavle',
    uk: 'Копіювати до буфера', lt: 'Kopijuoti į iškarpinę', lv: 'Kopēt starpliktuvē', et: 'Kopeeri lõikelauale',
  },
  step: {
    pl: 'Krok', en: 'Step', de: 'Schritt', fr: 'Étape', es: 'Paso', it: 'Passo',
    pt: 'Passo', nl: 'Stap', cs: 'Krok', sk: 'Krok', hu: 'Lépés', ro: 'Pas',
    bg: 'Стъпка', hr: 'Korak', sv: 'Steg', da: 'Trin', fi: 'Askel', nb: 'Trinn',
    uk: 'Крок', lt: 'Žingsnis', lv: 'Solis', et: 'Samm',
  },
  type_command: {
    pl: 'Wpisz komendę i naciśnij Enter ⏎', en: 'Type command and press Enter ⏎',
    de: 'Befehl eingeben und Enter drücken ⏎', fr: 'Tapez la commande et appuyez sur Entrée ⏎',
    es: 'Escribe el comando y pulsa Enter ⏎', it: 'Digita il comando e premi Invio ⏎',
    pt: 'Digite o comando e pressione Enter ⏎', nl: 'Typ commando en druk op Enter ⏎',
    cs: 'Zadejte příkaz a stiskněte Enter ⏎', sk: 'Zadajte príkaz a stlačte Enter ⏎',
    hu: 'Írja be a parancsot és nyomja meg az Enter ⏎', ro: 'Tastați comanda și apăsați Enter ⏎',
    bg: 'Въведете команда и натиснете Enter ⏎', hr: 'Unesite naredbu i pritisnite Enter ⏎',
    sv: 'Skriv kommando och tryck Enter ⏎', da: 'Skriv kommando og tryk Enter ⏎',
    fi: 'Kirjoita komento ja paina Enter ⏎', nb: 'Skriv kommando og trykk Enter ⏎',
    uk: 'Введіть команду і натисніть Enter ⏎', lt: 'Įveskite komandą ir paspauskite Enter ⏎',
    lv: 'Ievadiet komandu un nospiediet Enter ⏎', et: 'Sisesta käsk ja vajuta Enter ⏎',
  },
  choose_language: {
    pl: 'Wybierz język', en: 'Choose language', de: 'Sprache wählen',
    fr: 'Choisir la langue', es: 'Elegir idioma', it: 'Scegli la lingua',
    pt: 'Escolher idioma', nl: 'Taal kiezen', cs: 'Vybrat jazyk',
    sk: 'Vybrať jazyk', hu: 'Nyelv kiválasztása', ro: 'Alegeți limba',
    bg: 'Изберете език', hr: 'Odaberite jezik', sv: 'Välj språk',
    da: 'Vælg sprog', fi: 'Valitse kieli', nb: 'Velg språk',
    uk: 'Виберіть мову', lt: 'Pasirinkite kalbą', lv: 'Izvēlieties valodu', et: 'Vali keel',
  },
  start_mission: {
    pl: 'Rozpocznij misję', en: 'Start mission', de: 'Mission starten',
    fr: 'Démarrer la mission', es: 'Iniciar misión', it: 'Inizia missione',
    pt: 'Iniciar missão', nl: 'Start missie', cs: 'Zahájit misi',
    sk: 'Začať misiu', hu: 'Küldetés indítása', ro: 'Începeți misiunea',
    bg: 'Стартирай мисия', hr: 'Pokreni misiju', sv: 'Starta uppdrag',
    da: 'Start mission', fi: 'Aloita tehtävä', nb: 'Start oppdrag',
    uk: 'Почати місію', lt: 'Pradėti misiją', lv: 'Sākt misiju', et: 'Alusta missiooni',
  },
  glossary: {
    pl: '🗺️ Słowniczek', en: '🗺️ Glossary', de: '🗺️ Glossar',
    fr: '🗺️ Glossaire', es: '🗺️ Glosario', it: '🗺️ Glossario',
    pt: '🗺️ Glossário', nl: '🗺️ Woordenlijst', cs: '🗺️ Slovník',
    sk: '🗺️ Slovník', hu: '🗺️ Szótár', ro: '🗺️ Glosar',
    bg: '🗺️ Речник', hr: '🗺️ Rječnik', sv: '🗺️ Ordlista',
    da: '🗺️ Ordliste', fi: '🗺️ Sanasto', nb: '🗺️ Ordliste',
    uk: '🗺️ Словник', lt: '🗺️ Žodynas', lv: '🗺️ Vārdnīca', et: '🗺️ Sõnastik',
  },
  missions: {
    pl: '🚀 Twoje misje', en: '🚀 Your missions', de: '🚀 Deine Missionen',
    fr: '🚀 Vos missions', es: '🚀 Tus misiones', it: '🚀 Le tue missioni',
    pt: '🚀 Suas missões', nl: '🚀 Jouw missies', cs: '🚀 Vaše mise',
    sk: '🚀 Vaše misie', hu: '🚀 A te küldetéseid', ro: '🚀 Misiunile tale',
    bg: '🚀 Вашите мисии', hr: '🚀 Vaše misije', sv: '🚀 Dina uppdrag',
    da: '🚀 Dine missioner', fi: '🚀 Sinun tehtäväsi', nb: '🚀 Dine oppdrag',
    uk: '🚀 Ваші місії', lt: '🚀 Jūsų misijos', lv: '🚀 Jūsu misijas', et: '🚀 Sinu missioonid',
  },
  available: {
    pl: '✅ Dostępna', en: '✅ Available', de: '✅ Verfügbar',
    fr: '✅ Disponible', es: '✅ Disponible', it: '✅ Disponibile',
    pt: '✅ Disponível', nl: '✅ Beschikbaar', cs: '✅ Dostupná',
    sk: '✅ Dostupná', hu: '✅ Elérhető', ro: '✅ Disponibil',
    bg: '✅ Достъпна', hr: '✅ Dostupno', sv: '✅ Tillgänglig',
    da: '✅ Tilgængelig', fi: '✅ Saatavilla', nb: '✅ Tilgjengelig',
    uk: '✅ Доступна', lt: '✅ Prieinama', lv: '✅ Pieejams', et: '✅ Saadaval',
  },
  locked: {
    pl: '🔒 Zablokowana', en: '🔒 Locked', de: '🔒 Gesperrt',
    fr: '🔒 Verrouillé', es: '🔒 Bloqueado', it: '🔒 Bloccato',
    pt: '🔒 Bloqueado', nl: '🔒 Vergrendeld', cs: '🔒 Uzamčeno',
    sk: '🔒 Zamknuté', hu: '🔒 Zárolt', ro: '🔒 Blocat',
    bg: '🔒 Заключена', hr: '🔒 Zaključano', sv: '🔒 Låst',
    da: '🔒 Låst', fi: '🔒 Lukittu', nb: '🔒 Låst',
    uk: '🔒 Заблокована', lt: '🔒 Užrakinta', lv: '🔒 Bloķēts', et: '🔒 Lukustatud',
  },
  completed: {
    pl: '🏆 Ukończona', en: '🏆 Completed', de: '🏆 Abgeschlossen',
    fr: '🏆 Terminé', es: '🏆 Completado', it: '🏆 Completato',
    pt: '🏆 Concluído', nl: '🏆 Voltooid', cs: '🏆 Dokončeno',
    sk: '🏆 Dokončené', hu: '🏆 Befejezve', ro: '🏆 Finalizat',
    bg: '🏆 Завършена', hr: '🏆 Završeno', sv: '🏆 Slutförd',
    da: '🏆 Gennemført', fi: '🏆 Suoritettu', nb: '🏆 Fullført',
    uk: '🏆 Завершена', lt: '🏆 Baigta', lv: '🏆 Pabeigts', et: '🏆 Lõpetatud',
  },
  requires: {
    pl: 'Wymaga:', en: 'Requires:', de: 'Erfordert:', fr: 'Nécessite:',
    es: 'Requiere:', it: 'Richiede:', pt: 'Requer:', nl: 'Vereist:',
    cs: 'Vyžaduje:', sk: 'Vyžaduje:', hu: 'Szükséges:', ro: 'Necesită:',
    bg: 'Изисква:', hr: 'Zahtijeva:', sv: 'Kräver:', da: 'Kræver:',
    fi: 'Vaatii:', nb: 'Krever:', uk: 'Потребує:', lt: 'Reikia:', lv: 'Nepieciešams:', et: 'Nõuab:',
  },
};

// ─── Core i18n class ───
class I18n {
  constructor() {
    this.lang = this._detect();
  }

  _detect() {
    const saved = localStorage.getItem('planetax_lang');
    if (saved && LANGUAGES[saved]) return saved;
    const browser = (navigator.language || navigator.userLanguage || 'pl').split('-')[0].toLowerCase();
    return LANGUAGES[browser] ? browser : 'pl';
  }

  setLang(lang) {
    if (!LANGUAGES[lang]) return;
    this.lang = lang;
    localStorage.setItem('planetax_lang', lang);
    localStorage.setItem('planetax_lang_chosen', 'true');
  }

  hasChosen() {
    return localStorage.getItem('planetax_lang_chosen') === 'true';
  }

  t(key, fallback) {
    const entry = TRANSLATIONS[key];
    if (!entry) return fallback || key;
    return entry[this.lang] || entry['pl'] || fallback || key;
  }

  getLang() { return this.lang; }
  getLanguages() { return LANGUAGES; }
  getAllTranslations() { return TRANSLATIONS; }
}

if (typeof window !== 'undefined') {
  window.PlanetaI18n = new I18n();
  window.PLANETAX_LANGUAGES = LANGUAGES;
}
