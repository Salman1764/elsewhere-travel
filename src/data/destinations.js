import { worldCities, createDynamicCityDestination, countryCityMap } from "./worldCountries";

const destinations = [
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    category: "Culture",
    description:
      "Ancient temples, quiet gardens, wooden machiya houses, and ethereal bamboo groves make Kyoto the beating cultural heart of Japan.",
    bestTime: "March — May & October — November",
    currency: "Japanese Yen (JPY)",
    budgetPerDay: "$70 — $150",
    languages: ["Japanese", "English (tourist areas)"],
    coordinates: {
      lat: 35.0116,
      lon: 135.7681,
    },
    famousPlaces: [
      {
        name: "Fushimi Inari Taisha",
        description:
          "A celebrated Shinto shrine renowned for its winding mountain pathways sheltered by thousands of vibrant vermilion torii gates.",
      },
      {
        name: "Kinkaku-ji",
        description:
          "The shimmering Golden Pavilion, a Zen temple covered in gold leaf whose top floors reflect brilliantly across the surrounding pond.",
      },
      {
        name: "Arashiyama Bamboo Grove",
        description:
          "A serene, towering path where sunlight filters gently through rustling emerald stalks on the scenic western outskirts of Kyoto.",
      },
    ],
  },

  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    category: "Nature",
    description:
      "Tropical beaches, layered rice terraces, mist-shrouded volcanoes, and vibrant spiritual culture produce Bali's unmistakable island magic.",
    bestTime: "April — October",
    currency: "Indonesian Rupiah (IDR)",
    budgetPerDay: "$35 — $90",
    languages: ["Indonesian", "Balinese", "English"],
    coordinates: {
      lat: -8.4095,
      lon: 115.1889,
    },
    famousPlaces: [
      {
        name: "Uluwatu Temple",
        description:
          "A dramatic sea temple perched atop sheer 70-meter limestone cliffs dropping steeply into the crashing Indian Ocean.",
      },
      {
        name: "Tegallalang Rice Terraces",
        description:
          "Cascading emerald terraces that showcase the traditional Balinese 'subak' cooperative irrigation system dating back over a thousand years.",
      },
      {
        name: "Mount Batur",
        description:
          "An active volcanic peak famous for pre-dawn treks rewarding climbers with breathtaking sunrises above a sea of clouds.",
      },
    ],
  },

  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    category: "City",
    description:
      "Iconic boulevards, world-class museums, intimate bistro terraces, and historic grandeur render the French capital endlessly enchanting.",
    bestTime: "April — June & September — October",
    currency: "Euro (EUR)",
    budgetPerDay: "$110 — $230",
    languages: ["French", "English"],
    coordinates: {
      lat: 48.8566,
      lon: 2.3522,
    },
    famousPlaces: [
      {
        name: "Eiffel Tower",
        description:
          "The iconic 330-meter wrought-iron beacon designed by Gustave Eiffel, commanding breathtaking panoramic views across Paris.",
      },
      {
        name: "Louvre Museum",
        description:
          "The world's preeminent art museum, housed in a magnificent former royal palace and home to the Mona Lisa and Venus de Milo.",
      },
      {
        name: "Montmartre & Sacré-Cœur",
        description:
          "A hilltop haven of cobblestone alleys, bohemian painters' squares, and the gleaming white domes of the Basilica overlooking the metropolis.",
      },
    ],
  },

  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    category: "Nature",
    description:
      "Where dramatic granite mountains plunge into two converging oceans, Cape Town merges raw natural grandeur with cosmopolitan energy.",
    bestTime: "November — March",
    currency: "South African Rand (ZAR)",
    budgetPerDay: "$45 — $110",
    languages: ["English", "Afrikaans", "isiXhosa"],
    coordinates: {
      lat: -33.9249,
      lon: 18.4241,
    },
    famousPlaces: [
      {
        name: "Table Mountain",
        description:
          "A flat-topped landmark towering over the city bowl, often draped in its signature cloud 'tablecloth' and accessible via revolving cable car.",
      },
      {
        name: "Boulders Beach",
        description:
          "A sheltered cove of giant granite boulders harboring a charming protected colony of free-roaming African penguins.",
      },
      {
        name: "V&A Waterfront",
        description:
          "A bustling historic maritime harbor packed with art galleries, seafood restaurants, artisanal markets, and sunset boat charters.",
      },
    ],
  },

  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    category: "Beach",
    description:
      "Whitewashed cubiform cliffside villages, blue-domed chapels, and breathtaking volcanic calderas rising out of the deep blue Aegean Sea.",
    bestTime: "May — October",
    currency: "Euro (EUR)",
    budgetPerDay: "$95 — $210",
    languages: ["Greek", "English"],
    coordinates: {
      lat: 36.3932,
      lon: 25.4615,
    },
    famousPlaces: [
      {
        name: "Oia Village",
        description:
          "The quintessential Cycladic village, famed across the globe for cliff-hanging cave houses and legendary sunset panoramas.",
      },
      {
        name: "Fira",
        description:
          "Santorini's energetic cliffside capital, featuring stepped alleyways, luxury boutiques, and spectacular overlooks across the submerged volcano.",
      },
      {
        name: "Red Beach",
        description:
          "A rare geological spectacle of towering rust-red volcanic cliffs framing turquoise waters near the ancient ruins of Akrotiri.",
      },
    ],
  },

  {
    id: "new-york",
    name: "New York",
    country: "United States",
    region: "North America",
    category: "City",
    description:
      "A fast-paced metropolis of towering skylines, neighborhood microcultures, world-renowned theater, and limitless dining discoveries.",
    bestTime: "September — November & April — June",
    currency: "US Dollar (USD)",
    budgetPerDay: "$150 — $320",
    languages: ["English", "Spanish"],
    coordinates: {
      lat: 40.7128,
      lon: -74.006,
    },
    famousPlaces: [
      {
        name: "Central Park",
        description:
          "An 843-acre urban oasis in the heart of Manhattan featuring winding bridle paths, peaceful lakes, hidden arches, and peaceful lawns.",
      },
      {
        name: "Statue of Liberty",
        description:
          "The majestic neoclassical monument welcoming arrivals in New York Harbor, symbol of freedom and international friendship.",
      },
      {
        name: "Brooklyn Bridge",
        description:
          "A pioneering 1883 gothic-arched suspension bridge providing romantic pedestrian strolls high above the East River.",
      },
    ],
  },

  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    category: "Culture",
    description:
      "Maze-like ancient medina souks, ornate Moorish riads, fragrant spices, and lively desert-edge energy where antiquity lives dynamically.",
    bestTime: "March — May & October — November",
    currency: "Moroccan Dirham (MAD)",
    budgetPerDay: "$40 — $95",
    languages: ["Arabic", "French", "Berber"],
    coordinates: {
      lat: 31.6295,
      lon: -7.9811,
    },
    famousPlaces: [
      {
        name: "Jemaa el-Fnaa",
        description:
          "The electrifying main square filled with acrobats, storytellers, musicians, and open-air grilled delicacies every evening.",
      },
      {
        name: "Bahia Palace",
        description:
          "A masterwork of 19th-century Moroccan architecture showcasing intricate zellij mosaics, carved cedar woodwork, and tranquil courtyards.",
      },
      {
        name: "Jardin Majorelle",
        description:
          "An enchanting botanical garden of exotic cacti framed by striking cobalt-blue art deco pavilions restored by Yves Saint Laurent.",
      },
    ],
  },

  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    region: "Asia",
    category: "City",
    description:
      "A thrilling collision of gilded Buddhist temples, neon-lit sky bars, bustling riverboats, and legendary street-side cuisine.",
    bestTime: "November — February",
    currency: "Thai Baht (THB)",
    budgetPerDay: "$30 — $85",
    languages: ["Thai", "English"],
    coordinates: {
      lat: 13.7563,
      lon: 100.5018,
    },
    famousPlaces: [
      {
        name: "The Grand Palace",
        description:
          "A dazzling former royal complex featuring glittering golden spires and the holy Temple of the Emerald Buddha.",
      },
      {
        name: "Wat Arun",
        description:
          "The Temple of Dawn, rising majestically along the Chao Phraya River with steep spires encrusted in colorful Chinese porcelain.",
      },
      {
        name: "Chatuchak Weekend Market",
        description:
          "One of the largest open-air markets on earth, with over 15,000 vibrant stalls offering handcrafted goods, fashion, and street food.",
      },
    ],
  },

  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    category: "City",
    description:
      "A harmonious blend of ultramodern innovation and time-honored traditions, from tranquil shrines to gleaming neon skyscrapers and Michelin-starred dining.",
    bestTime: "March — May & October — November",
    currency: "Japanese Yen (JPY)",
    budgetPerDay: "$90 — $220",
    languages: ["Japanese", "English"],
    coordinates: {
      lat: 35.6762,
      lon: 139.6503,
    },
    famousPlaces: [
      {
        name: "Shibuya Crossing",
        description:
          "The busiest pedestrian intersection in the world, pulsating with luminous video screens and incredible modern urban rhythm.",
      },
      {
        name: "Senso-ji Temple",
        description:
          "Tokyo's oldest and most significant Buddhist temple located in historic Asakusa, entered through the giant lantern of the Kaminarimon Gate.",
      },
      {
        name: "Meiji Shrine",
        description:
          "A peaceful Shinto shrine surrounded by an evergreen forest of over 100,000 trees situated adjacent to energetic Harajuku.",
      },
    ],
  },

  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    category: "Culture",
    description:
      "The Eternal City is an open-air museum of ancient empire monuments, Renaissance fountains, sun-drenched piazzas, and sublime culinary artistry.",
    bestTime: "April — May & September — October",
    currency: "Euro (EUR)",
    budgetPerDay: "$85 — $190",
    languages: ["Italian", "English"],
    coordinates: {
      lat: 41.9028,
      lon: 12.4964,
    },
    famousPlaces: [
      {
        name: "The Colosseum",
        description:
          "The titanic oval amphitheater completed in 80 AD, once hosting gladiatorial spectacles for over 50,000 Roman citizens.",
      },
      {
        name: "Trevi Fountain",
        description:
          "A baroque masterpiece of carved marble where visitors toss coins over their shoulders to ensure a return journey to Rome.",
      },
      {
        name: "Vatican Museums & Sistine Chapel",
        description:
          "One of humankind's greatest art repositories, culminated by Michelangelo's transcendent frescoed ceiling in the Sistine Chapel.",
      },
    ],
  },

  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    category: "Culture",
    description:
      "Whimsical Gaudi architecture, Mediterranean beaches, lively tapas bars, and a relaxed coastal lifestyle in Catalonia's vibrant capital.",
    bestTime: "May — June & September — October",
    currency: "Euro (EUR)",
    budgetPerDay: "$75 — $175",
    languages: ["Spanish", "Catalan", "English"],
    coordinates: {
      lat: 41.3879,
      lon: 2.1699,
    },
    famousPlaces: [
      {
        name: "Sagrada Família",
        description:
          "Antoni Gaudí's soaring, awe-inspiring basilica of forest-like stone columns and radiant stained glass, nearing its historic completion.",
      },
      {
        name: "Park Güell",
        description:
          "A playful park perched over the city boasting vibrant ceramic mosaic benches, serpentine terraces, and panoramic city-to-sea views.",
      },
      {
        name: "Gothic Quarter (Barri Gòtic)",
        description:
          "A labyrinth of medieval cobblestone lanes, secluded courtyards, and Roman walls alive with cozy wine taverns and craft boutiques.",
      },
    ],
  },

  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    category: "Beach",
    description:
      "Golden surf beaches, a sparkling harbor spanned by legendary bridges, lush botanical gardens, and an outdoorsy, sunny lifestyle.",
    bestTime: "September — November & March — May",
    currency: "Australian Dollar (AUD)",
    budgetPerDay: "$110 — $240",
    languages: ["English"],
    coordinates: {
      lat: -33.8688,
      lon: 151.2093,
    },
    famousPlaces: [
      {
        name: "Sydney Opera House",
        description:
          "Jørn Utzon's UNESCO-listed modernist masterpiece with expressionist shell sails gleaming beside Sydney Harbour.",
      },
      {
        name: "Bondi Beach",
        description:
          "Australia's most renowned strip of sand, famous for turquoise peeling breaks, the Bondi Icebergs pool, and coastal walking paths.",
      },
      {
        name: "Sydney Harbour Bridge",
        description:
          "The monumental steel arch affectionately known as 'The Coathanger', offering thrilling bridge climbs with harbor vistas.",
      },
    ],
  },

  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    region: "Africa",
    category: "Culture",
    description:
      "The mother of the world: legendary Pyramids on the desert horizon, Nile sunset feluccas, medieval minarets, and epic antiquities.",
    bestTime: "October — April",
    currency: "Egyptian Pound (EGP)",
    budgetPerDay: "$30 — $75",
    languages: ["Arabic", "English"],
    coordinates: {
      lat: 30.0444,
      lon: 31.2357,
    },
    famousPlaces: [
      {
        name: "Giza Pyramids & The Sphinx",
        description:
          "The last surviving Wonder of the Ancient World, standing testament to human ambition over 4,500 years alongside the mythical Great Sphinx.",
      },
      {
        name: "Grand Egyptian Museum",
        description:
          "A state-of-the-art museum complex displaying the monumental full collection of Tutankhamun's treasures and thousands of ancient artifacts.",
      },
      {
        name: "Khan el-Khalili Bazaar",
        description:
          "A 14th-century souk overflowing with hanging brass lamps, silver jewelry, perfume essences, and traditional spiced tea cafes.",
      },
    ],
  },

  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Asia",
    category: "City",
    description:
      "A futuristic desert metropolis featuring world-record architecture, palm-shaped artificial islands, desert safaris, and luxury retail.",
    bestTime: "November — March",
    currency: "UAE Dirham (AED)",
    budgetPerDay: "$120 — $320",
    languages: ["Arabic", "English"],
    coordinates: {
      lat: 25.2048,
      lon: 55.2708,
    },
    famousPlaces: [
      {
        name: "Burj Khalifa",
        description:
          "The tallest building in human history, soaring 828 meters above Downtown Dubai with observation platforms overlooking the Arabian Gulf.",
      },
      {
        name: "Dubai Marina",
        description:
          "An opulent canal district lined with gleaming residential towers, yachts, and a 7-kilometer waterfront pedestrian promenade.",
      },
      {
        name: "Museum of the Future",
        description:
          "A visionary torus-shaped architectural triumph adorned with Arabic calligraphy poetry exploring technologies of tomorrow.",
      },
    ],
  },

  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    category: "City",
    description:
      "Centuries of royal history, lush Royal Parks, world-class free museums, and vibrant theater in Britain's endlessly evolving capital.",
    bestTime: "May — September",
    currency: "British Pound (GBP)",
    budgetPerDay: "$120 — $270",
    languages: ["English"],
    coordinates: {
      lat: 51.5074,
      lon: -0.1278,
    },
    famousPlaces: [
      {
        name: "Tower Bridge & Tower of London",
        description:
          "The iconic Victorian Gothic suspension bridge spanning the River Thames, standing next to the historic castle housing the Crown Jewels.",
      },
      {
        name: "British Museum",
        description:
          "A global treasury of human history, art, and culture housing world treasures including the Rosetta Stone beneath its soaring glass Great Court.",
      },
      {
        name: "Westminster Abbey & Big Ben",
        description:
          "The royal coronation church and the Elizabeth Tower clock that has kept London's heartbeat since the Victorian era.",
      },
    ],
  },

  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    country: "Brazil",
    region: "South America",
    category: "Beach",
    description:
      "Dramatic emerald peaks meeting curved Atlantic bays, samba rhythms echoing in Lapa, and the warm, welcoming spirit of the Cariocas.",
    bestTime: "May — October & February (Carnaval)",
    currency: "Brazilian Real (BRL)",
    budgetPerDay: "$40 — $105",
    languages: ["Portuguese", "English (tourist areas)"],
    coordinates: {
      lat: -22.9068,
      lon: -43.1729,
    },
    famousPlaces: [
      {
        name: "Christ the Redeemer",
        description:
          "The colossal 30-meter Art Deco statue crowning the summit of Corcovado Mountain with arms outstretched over Guanabara Bay.",
      },
      {
        name: "Copacabana & Ipanema Beaches",
        description:
          "World-famous crescent sands where volleyball, music, coconut stands, and unforgettable golden sunsets define beach culture.",
      },
      {
        name: "Sugarloaf Mountain (Pão de Açúcar)",
        description:
          "A monolithic granite peak jutting directly from the ocean, reached by aerial cable car offering jaw-dropping 360-degree panoramas.",
      },
    ],
  },

  {
    id: "bengaluru",
    name: "Bengaluru",
    country: "India",
    region: "Karnataka",
    category: "Culture",
    description:
      "India's vibrant Garden City and technology capital harmoniously weaves historic royal palaces, sprawling botanical parks, legendary coffee culture, and thriving modernity.",
    bestTime: "October — March",
    currency: "Indian Rupee (INR)",
    budgetPerDay: "₹2,500 — ₹6,500 ($30 — $80)",
    languages: ["Kannada", "English", "Hindi"],
    coordinates: {
      lat: 12.9716,
      lon: 77.5946,
    },
    famousPlaces: [
      {
        name: "Lalbagh Botanical Garden & Glass House",
        description:
          "A celebrated 240-acre botanical haven commissioned by Hyder Ali in 1760, centered around an exquisite London Crystal Palace-inspired Glass House and centuries-old bonsai trees.",
        image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Bangalore Palace",
        description:
          "An opulent 19th-century royal estate inspired by England's Windsor Castle, featuring Tudor-style battlements, stained glass, elegant wood carvings, and lush green courtyards.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Cubbon Park & Vidhana Soudha",
        description:
          "The green lungs of the city anchored by the majestic Neo-Dravidian legislative palace, illuminated brilliantly with thousands of golden lights on Sunday evenings.",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "ISKCON Temple Bengaluru",
        description:
          "One of the largest cultural and temple complexes in the world, perched atop the scenic Hare Krishna Hill with sweeping architectural splendor and city views.",
        image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  {
    id: "mysuru",
    name: "Mysuru",
    country: "India",
    region: "Karnataka",
    category: "Culture",
    description:
      "The royal City of Palaces captivates travelers with sandalwood heritage, exquisite silk weaving, centuries-old yoga traditions, and the illuminated splendor of the Amba Vilas Palace.",
    bestTime: "October — March (Dasara Festival)",
    currency: "Indian Rupee (INR)",
    budgetPerDay: "₹2,000 — ₹5,000 ($25 — $60)",
    languages: ["Kannada", "English", "Hindi"],
    coordinates: {
      lat: 12.2958,
      lon: 76.6394,
    },
    famousPlaces: [
      {
        name: "Mysore Palace (Amba Vilas)",
        description:
          "A world-renowned Indo-Saracenic royal masterpiece, illuminated every Sunday and during festive seasons by nearly 100,000 incandescent golden bulbs.",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Chamundi Hill & Sri Chamundeshwari Temple",
        description:
          "A 1,000-step sacred pilgrim hill featuring a colossal monolithic Nandi Bull statue and panoramic vistas overlooking the royal cityscape.",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Brindavan Gardens & Musical Fountains",
        description:
          "Symmetric terrace gardens adjoining the historic Krishnarajasagara (KRS) Dam, famous for evening illuminated musical fountain spectacles.",
        image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  {
    id: "chitradurga",
    name: "Chitradurga",
    country: "India",
    region: "Karnataka",
    category: "Culture",
    description:
      "The legendary 'Stone Fortress' city surrounded by dramatic granite boulder hills, historic rainwater harvesting tanks, and storied legends of fierce Nayaka warriors.",
    bestTime: "November — February",
    currency: "Indian Rupee (INR)",
    budgetPerDay: "₹1,500 — ₹3,800 ($20 — $45)",
    languages: ["Kannada", "English", "Hindi"],
    coordinates: {
      lat: 14.2251,
      lon: 76.398,
    },
    famousPlaces: [
      {
        name: "Chitradurga Fort (Kallina Kote)",
        description:
          "A formidable medieval fortress featuring seven concentric rings of defensive stone walls, 38 hidden gateways, ancient temples, and the legendary Obavvana Kindi passage.",
        image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Chandravalli Caves & Ancient Lake",
        description:
          "An archaeological valley nestled between three scenic hills with subterranean cave temples once used for meditation by ancient saints and royal hermits.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85",
      },
      {
        name: "Vani Vilasa Sagara (Mari Kanive)",
        description:
          "Karnataka's oldest pre-independence dam, constructed in 1907 with monumental stonework nestled peacefully in rugged scenic hills.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },
];

export const allDestinations = [...destinations, ...worldCities];

export function getDestinationById(id) {
  if (!id) return null;
  const normalizedId = String(id).toLowerCase().trim();

  // 1. Check curated destinations
  const foundInCurated = destinations.find(
    (d) => d.id === normalizedId || d.name.toLowerCase() === normalizedId
  );
  if (foundInCurated) return foundInCurated;

  // 2. Check world cities database
  const foundInWorld = worldCities.find(
    (c) =>
      c.id === normalizedId ||
      c.name.toLowerCase() === normalizedId ||
      c.country.toLowerCase() === normalizedId
  );
  if (foundInWorld) return foundInWorld;

  // 3. Dynamic generator for ANY city in the world!
  return createDynamicCityDestination(id);
}

export default destinations;