import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

const STORAGE_KEY = "elsewhere_language";

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

const translations = {
  en: {
    // Nav
    navDiscover: "Discover",
    navDestinations: "Destinations",
    navAbout: "About",
    navPlanTrip: "Plan a trip",
    navSignIn: "Sign in",
    navRegister: "Register",
    navSignOut: "Sign out",
    navLocation: "Location",
    navSelectLocation: "Set location",
    navSaved: "Saved",

    // Hero
    heroEyebrow: "THE WORLD AWAITS",
    heroTitleLine1: "Journey into the",
    heroTitleLine2: "extraordinary.",
    heroDesc:
      "Curated travel experiences, hidden sanctuaries, and inspiring itineraries designed for the curious traveler.",
    heroExploreBtn: "Explore destinations",
    heroPlanBtn: "Create your itinerary",

    // Destinations Section
    destEyebrow: "01 / DESTINATIONS",
    destHeading1: "Go somewhere",
    destHeading2: "extraordinary.",
    destDesc:
      "A handpicked collection of places worth travelling for. Explore by region, mood, or simply follow your curiosity.",
    searchPlaceholder: "Search destinations, countries, or regions...",
    clearSearch: "Clear search",
    noResultsTitle: "We couldn't find that place.",
    noResultsDesc: "Try another destination, country, or filter.",

    // Filters
    filterAll: "All",
    filterAsia: "Asia",
    filterEurope: "Europe",
    filterAfrica: "Africa",
    filterNorthAmerica: "North America",
    filterSouthAmerica: "South America",
    filterOceania: "Oceania",

    // Destination Details
    backToDestinations: "Back to destinations",
    aboutDestination: "ABOUT THE DESTINATION",
    destStoryTitle1: "A place worth",
    destStoryTitle2: "remembering.",
    bestTime: "BEST TIME",
    locationLabel: "LOCATION",
    currencyLabel: "CURRENCY",
    budgetPerDayLabel: "BUDGET / DAY",
    languageSpokenLabel: "LANGUAGE SPOKEN",
    mustSee: "MUST SEE",
    famousPlaces: "Famous places",
    famousPlacesTitle: "Famous places",
    placesCount: "places",
    saveToWishlist: "Save to Wishlist",
    savedToWishlist: "Saved in Wishlist",

    // Location Section & Modal
    locEyebrow: "YOUR STARTING POINT",
    locHeading1: "Where are you",
    locHeading2: "starting from?",
    locUseGPS: "Use my current location",
    locFinding: "Finding your location...",
    locSearchPlaceholder: "Search city or airport...",
    locSearchBtn: "Search",
    locCurrentGPS: "Current Location",
    locModalTitle: "Set Your Starting Point",
    locModalSubtitle: "Tailor weather, routes, and recommendations based on where you begin.",

    // Auth Modal
    authSignInTab: "Sign In",
    authRegisterTab: "Create Account",
    authSignInTitle: "Welcome back",
    authSignInSubtitle: "Sign in to access your saved trips and personalized plans.",
    authRegisterTitle: "Begin your journey",
    authRegisterSubtitle: "Create an account to save destinations and generate custom itineraries.",
    authFullName: "Full Name",
    authFullNamePlaceholder: "e.g. Maya Lin",
    authEmail: "Email Address",
    authEmailPlaceholder: "you@example.com",
    authPassword: "Password",
    authPasswordPlaceholder: "••••••••",
    authSignInSubmit: "Sign in to Elsewhere",
    authRegisterSubmit: "Create your account",
    authDemoLogin: "⚡ Quick Demo Login",
    authNoAccount: "Don't have an account yet?",
    authHaveAccount: "Already have an account?",
  },
  es: {
    navDiscover: "Descubrir",
    navDestinations: "Destinos",
    navAbout: "Acerca de",
    navPlanTrip: "Planear viaje",
    navSignIn: "Iniciar sesión",
    navRegister: "Registrarse",
    navSignOut: "Cerrar sesión",
    navLocation: "Ubicación",
    navSelectLocation: "Elegir ubicación",
    navSaved: "Guardados",

    heroEyebrow: "EL MUNDO TE ESPERA",
    heroTitleLine1: "Un viaje hacia lo",
    heroTitleLine2: "extraordinario.",
    heroDesc:
      "Experiencias de viaje seleccionadas, santuarios ocultos e itinerarios inspiradores para el viajero curioso.",
    heroExploreBtn: "Explorar destinos",
    heroPlanBtn: "Crear tu itinerario",

    destEyebrow: "01 / DESTINOS",
    destHeading1: "Viaja a un lugar",
    destHeading2: "extraordinario.",
    destDesc:
      "Una colección selecta de lugares que valen la pena visitar. Explora por región, ambiente o tu propia curiosidad.",
    searchPlaceholder: "Buscar destinos, países o regiones...",
    clearSearch: "Limpiar búsqueda",
    noResultsTitle: "No pudimos encontrar ese lugar.",
    noResultsDesc: "Prueba con otro destino, país o filtro.",

    filterAll: "Todos",
    filterAsia: "Asia",
    filterEurope: "Europa",
    filterAfrica: "África",
    filterNorthAmerica: "Norteamérica",
    filterSouthAmerica: "Sudamérica",
    filterOceania: "Oceanía",

    backToDestinations: "Volver a destinos",
    aboutDestination: "ACERCA DEL DESTINO",
    destStoryTitle1: "Un lugar digno de",
    destStoryTitle2: "recordar.",
    bestTime: "MEJOR ÉPOCA",
    locationLabel: "UBICACIÓN",
    currencyLabel: "MONEDA",
    budgetPerDayLabel: "PRESUPUESTO / DÍA",
    languageSpokenLabel: "IDIOMAS",
    mustSee: "IMPERDIBLES",
    famousPlaces: "Lugares emblemáticos",
    famousPlacesTitle: "Lugares emblemáticos",
    placesCount: "lugares",
    saveToWishlist: "Guardar en favoritos",
    savedToWishlist: "Guardado en favoritos",

    locEyebrow: "TU PUNTO DE PARTIDA",
    locHeading1: "¿Desde dónde",
    locHeading2: "empiezas tu viaje?",
    locUseGPS: "Usar mi ubicación actual",
    locFinding: "Detectando ubicación...",
    locSearchPlaceholder: "Buscar ciudad o lugar...",
    locSearchBtn: "Buscar",
    locCurrentGPS: "Ubicación actual",
    locModalTitle: "Define tu punto de partida",
    locModalSubtitle: "Personaliza el clima y las recomendaciones según tu ubicación.",

    authSignInTab: "Iniciar Sesión",
    authRegisterTab: "Crear Cuenta",
    authSignInTitle: "Bienvenido de vuelta",
    authSignInSubtitle: "Inicia sesión para ver tus viajes guardados y planes.",
    authRegisterTitle: "Comienza tu viaje",
    authRegisterSubtitle: "Crea una cuenta para guardar destinos y generar itinerarios.",
    authFullName: "Nombre completo",
    authFullNamePlaceholder: "p. ej. María Rodríguez",
    authEmail: "Correo electrónico",
    authEmailPlaceholder: "tu@ejemplo.com",
    authPassword: "Contraseña",
    authPasswordPlaceholder: "••••••••",
    authSignInSubmit: "Entrar a Elsewhere",
    authRegisterSubmit: "Crear mi cuenta",
    authDemoLogin: "⚡ Acceso Demo Rápido",
    authNoAccount: "¿No tienes una cuenta?",
    authHaveAccount: "¿Ya tienes cuenta?",
  },
  fr: {
    navDiscover: "Découvrir",
    navDestinations: "Destinations",
    navAbout: "À propos",
    navPlanTrip: "Planifier un voyage",
    navSignIn: "Connexion",
    navRegister: "S'inscrire",
    navSignOut: "Déconnexion",
    navLocation: "Localisation",
    navSelectLocation: "Choisir un lieu",
    navSaved: "Favoris",

    heroEyebrow: "LE MONDE VOUS ATTEND",
    heroTitleLine1: "Voyagez vers",
    heroTitleLine2: "l'extraordinaire.",
    heroDesc:
      "Des expériences de voyage sélectionnées avec soin, des havres secrets et des itinéraires sur mesure.",
    heroExploreBtn: "Explorer les destinations",
    heroPlanBtn: "Créer votre itinéraire",

    destEyebrow: "01 / DESTINATIONS",
    destHeading1: "Partez vers",
    destHeading2: "l'extraordinaire.",
    destDesc:
      "Une sélection de lieux inoubliables. Explorez par région, ambiance ou simplement au fil de vos envies.",
    searchPlaceholder: "Rechercher des destinations, pays...",
    clearSearch: "Effacer la recherche",
    noResultsTitle: "Nous n'avons pas trouvé ce lieu.",
    noResultsDesc: "Essayez une autre destination ou région.",

    filterAll: "Tous",
    filterAsia: "Asie",
    filterEurope: "Europe",
    filterAfrica: "Afrique",
    filterNorthAmerica: "Amérique du Nord",
    filterSouthAmerica: "Amérique du Sud",
    filterOceania: "Océanie",

    backToDestinations: "Retour aux destinations",
    aboutDestination: "À PROPOS DU LIEU",
    destStoryTitle1: "Un lieu qui mérite",
    destStoryTitle2: "d'être vécu.",
    bestTime: "PÉRIODE IDÉALE",
    locationLabel: "LOCALISATION",
    currencyLabel: "DEVISE",
    budgetPerDayLabel: "BUDGET / JOUR",
    languageSpokenLabel: "LANGUES PARLÉES",
    mustSee: "À NE PAS MANQUER",
    famousPlaces: "Lieux incontournables",
    famousPlacesTitle: "Lieux incontournables",
    placesCount: "lieux",
    saveToWishlist: "Ajouter aux favoris",
    savedToWishlist: "Enregistré dans les favoris",

    locEyebrow: "VOTRE POINT DE DÉPART",
    locHeading1: "D'où commence",
    locHeading2: "votre voyage ?",
    locUseGPS: "Utiliser ma position actuelle",
    locFinding: "Détection en cours...",
    locSearchPlaceholder: "Rechercher une ville...",
    locSearchBtn: "Rechercher",
    locCurrentGPS: "Position actuelle",
    locModalTitle: "Définissez votre point de départ",
    locModalSubtitle: "Adaptez la météo et vos suggestions selon votre lieu de départ.",

    authSignInTab: "Connexion",
    authRegisterTab: "Créer un compte",
    authSignInTitle: "Bon retour parmi nous",
    authSignInSubtitle: "Connectez-vous pour retrouver vos voyages enregistrés.",
    authRegisterTitle: "Commencez l'aventure",
    authRegisterSubtitle: "Créez un compte pour sauvegarder vos destinations de rêve.",
    authFullName: "Nom complet",
    authFullNamePlaceholder: "ex: Camille Dupont",
    authEmail: "Adresse e-mail",
    authEmailPlaceholder: "vous@exemple.com",
    authPassword: "Mot de passe",
    authPasswordPlaceholder: "••••••••",
    authSignInSubmit: "Se connecter à Elsewhere",
    authRegisterSubmit: "Créer mon compte",
    authDemoLogin: "⚡ Connexion Démo Rapide",
    authNoAccount: "Pas encore de compte ?",
    authHaveAccount: "Déjà un compte ?",
  },
  de: {
    navDiscover: "Entdecken",
    navDestinations: "Reiseziele",
    navAbout: "Über uns",
    navPlanTrip: "Reise planen",
    navSignIn: "Anmelden",
    navRegister: "Registrieren",
    navSignOut: "Abmelden",
    navLocation: "Standort",
    navSelectLocation: "Standort wählen",
    navSaved: "Gemerkt",

    heroEyebrow: "DIE WELT WARTET",
    heroTitleLine1: "Reise ins",
    heroTitleLine2: "Außergewöhnliche.",
    heroDesc:
      "Handverlesene Reiseerlebnisse, verborgene Rückzugsorte und inspirierende Routen für neugierige Reisende.",
    heroExploreBtn: "Ziele entdecken",
    heroPlanBtn: "Reiseplan erstellen",

    destEyebrow: "01 / REISEZIELE",
    destHeading1: "Reise an einen",
    destHeading2: "besonderen Ort.",
    destDesc:
      "Eine kuratierte Auswahl unvergesslicher Reiseziele. Erkunde nach Region, Stimmung oder purer Neugier.",
    searchPlaceholder: "Ziele, Länder oder Regionen suchen...",
    clearSearch: "Suche löschen",
    noResultsTitle: "Ort nicht gefunden.",
    noResultsDesc: "Versuche eine andere Stadt oder einen Filter.",

    filterAll: "Alle",
    filterAsia: "Asien",
    filterEurope: "Europa",
    filterAfrica: "Afrika",
    filterNorthAmerica: "Nordamerika",
    filterSouthAmerica: "Südamerika",
    filterOceania: "Ozeanien",

    backToDestinations: "Zurück zu allen Reisezielen",
    aboutDestination: "ÜBER DAS REISEZIEL",
    destStoryTitle1: "Ein Ort voller",
    destStoryTitle2: "Erinnerungen.",
    bestTime: "BESTE REISEZEIT",
    locationLabel: "STANDORT",
    currencyLabel: "WÄHRUNG",
    budgetPerDayLabel: "BUDGET / TAG",
    languageSpokenLabel: "SPRACHEN",
    mustSee: "HIGHLIGHTS",
    famousPlaces: "Berühmte Sehenswürdigkeiten",
    famousPlacesTitle: "Berühmte Sehenswürdigkeiten",
    placesCount: "Orte",
    saveToWishlist: "Auf Wunschliste",
    savedToWishlist: "Auf der Wunschliste",

    locEyebrow: "DEIN STARTPUNKT",
    locHeading1: "Wo beginnt",
    locHeading2: "deine Reise?",
    locUseGPS: "Aktuellen Standort nutzen",
    locFinding: "Standort wird ermittelt...",
    locSearchPlaceholder: "Stadt oder Ort eingeben...",
    locSearchBtn: "Suchen",
    locCurrentGPS: "Aktueller Standort",
    locModalTitle: "Startpunkt festlegen",
    locModalSubtitle: "Passe Wetterberichte und Reiseempfehlungen an deinen Abflugort an.",

    authSignInTab: "Anmelden",
    authRegisterTab: "Registrieren",
    authSignInTitle: "Willkommen zurück",
    authSignInSubtitle: "Melde dich an, um deine gespeicherten Reisen abzurufen.",
    authRegisterTitle: "Beginne deine Reise",
    authRegisterSubtitle: "Erstelle ein Konto, um Ziele zu merken und Routen zu planen.",
    authFullName: "Vollständiger Name",
    authFullNamePlaceholder: "z.B. Max Mustermann",
    authEmail: "E-Mail-Adresse",
    authEmailPlaceholder: "name@beispiel.de",
    authPassword: "Passwort",
    authPasswordPlaceholder: "••••••••",
    authSignInSubmit: "Bei Elsewhere anmelden",
    authRegisterSubmit: "Konto erstellen",
    authDemoLogin: "⚡ Schnelle Demo-Anmeldung",
    authNoAccount: "Noch kein Konto?",
    authHaveAccount: "Bereits registriert?",
  },
  ja: {
    navDiscover: "発見する",
    navDestinations: "目的地",
    navAbout: "私たちについて",
    navPlanTrip: "旅の計画",
    navSignIn: "ログイン",
    navRegister: "新規登録",
    navSignOut: "ログアウト",
    navLocation: "現在地",
    navSelectLocation: "出発地を設定",
    navSaved: "お気に入り",

    heroEyebrow: "世界があなたを待っている",
    heroTitleLine1: "非日常の",
    heroTitleLine2: "旅へ出かけよう。",
    heroDesc:
      "好奇心旺盛な旅人のための、厳選された特別な体験と美しい旅程。",
    heroExploreBtn: "目的地を探す",
    heroPlanBtn: "旅程を作成する",

    destEyebrow: "01 / 厳選の旅先",
    destHeading1: "心揺さぶる",
    destHeading2: "特別な場所へ。",
    destDesc:
      "世界中から選りすぐりの美しい旅先コレクション。地域や気分に合わせて探索してください。",
    searchPlaceholder: "都市、国、または地域を検索...",
    clearSearch: "クリア",
    noResultsTitle: "目的地が見つかりませんでした。",
    noResultsDesc: "別のキーワードやフィルターをお試しください。",

    filterAll: "すべて",
    filterAsia: "アジア",
    filterEurope: "ヨーロッパ",
    filterAfrica: "アフリカ",
    filterNorthAmerica: "北米",
    filterSouthAmerica: "南米",
    filterOceania: "オセアニア",

    backToDestinations: "旅先一覧へ戻る",
    aboutDestination: "旅先について",
    destStoryTitle1: "心に残る",
    destStoryTitle2: "忘れられない記憶。",
    bestTime: "ベストシーズン",
    locationLabel: "所在地",
    currencyLabel: "通貨",
    budgetPerDayLabel: "1日の目安予算",
    languageSpokenLabel: "言語",
    mustSee: "必見スポット",
    famousPlaces: "名所・観光地",
    famousPlacesTitle: "名所・観光地",
    placesCount: "箇所",
    saveToWishlist: "お気に入りに追加",
    savedToWishlist: "お気に入り保存済み",

    locEyebrow: "あなたの出発点",
    locHeading1: "どちらから",
    locHeading2: "出発されますか？",
    locUseGPS: "現在地を使用する",
    locFinding: "現在地を取得中...",
    locSearchPlaceholder: "都市名を検索...",
    locSearchBtn: "検索",
    locCurrentGPS: "現在地",
    locModalTitle: "出発地を設定する",
    locModalSubtitle: "天候やルート案内をあなたの出発地に合わせて最適化します。",

    authSignInTab: "ログイン",
    authRegisterTab: "新規アカウント登録",
    authSignInTitle: "おかえりなさい",
    authSignInSubtitle: "保存した旅先やカスタム旅程にアクセスします。",
    authRegisterTitle: "旅を始めましょう",
    authRegisterSubtitle: "アカウントを作成してお気に入りの目的地を保存できます。",
    authFullName: "お名前",
    authFullNamePlaceholder: "例：山田 太郎",
    authEmail: "メールアドレス",
    authEmailPlaceholder: "you@example.com",
    authPassword: "パスワード",
    authPasswordPlaceholder: "••••••••",
    authSignInSubmit: "ログイン",
    authRegisterSubmit: "アカウントを作成",
    authDemoLogin: "⚡ クイックデモログイン",
    authNoAccount: "アカウントをお持ちでないですか？",
    authHaveAccount: "既にアカウントをお持ちですか？",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored && translations[stored] ? stored : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore
    }
  }, [language]);

  const t = (key) => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  const currentLanguageMeta =
    LANGUAGES.find((lang) => lang.code === language) || LANGUAGES[0];

  const value = {
    language,
    setLanguage,
    currentLanguageMeta,
    languages: LANGUAGES,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
