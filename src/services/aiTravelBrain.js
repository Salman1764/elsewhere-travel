// Intelligent Conversational AI Travel Engine for Elsewhere Concierge
// Delivers human-like, engaging travel consultation, recommendations, itineraries, budgets, and cultural insights.

const DESTINATION_KNOWLEDGE = {
  kyoto: {
    name: "Kyoto",
    country: "Japan",
    flag: "🇯🇵",
    tagline: "The cultural soul of Japan, woven with tranquil bamboo groves and ancient Zen shrines.",
    overview: "Kyoto is an enchanting city where time slows down. With over a thousand Buddhist temples, classical wooden machiya townhouses, and meditative moss gardens, it offers one of the most serene cultural journeys in the world.",
    highlights: [
      "Fushimi Inari Taisha (hike early through thousands of vermilion torii gates)",
      "Kinkaku-ji (The Golden Pavilion glistening across the reflective mirror pond)",
      "Arashiyama Bamboo Grove & Tenryu-ji Zen temple gardens",
      "Atmospheric Gion historic quarter (traditional Geiko preservation district)",
      "Nishiki Market (Kyoto's 400-year-old food pantry)",
    ],
    foods: [
      "Traditional multi-course Kaiseki dinner",
      "Authentic Uji Ceremonial Matcha & Wagashi sweets",
      "Silken Yudofu (Kyoto simmered tofu hot-pot)",
      "Handmade Buckwheat Soba noodles",
      "Kyoto-style Tsukemono (artisan preserved vegetables)",
    ],
    bestTime: "March to May for cherry blossoms (Sakura), or October to November for flaming red autumn maple foliage.",
    budget: "$75–$160 per day for comfortable mid-range travel; $280+ for a luxury ryokan with onsen bath.",
    tips: "Visit popular shrines like Fushimi Inari and Arashiyama at dawn (7:00 AM) to experience them in pure silence before crowds arrive. Rent a bicycle to navigate the flat historic alleys effortlessly.",
    itinerary: [
      { day: 1, title: "Torii Gates & Ancient Gion", morning: "Sunrise hike up Fushimi Inari through vibrant vermilion arches.", afternoon: "Explore Kiyomizu-dera temple perched on wooden stilts over hillside forest.", evening: "Twilight stroll along the stone alleys of Gion and Shirakawa canal." },
      { day: 2, title: "Golden Splendor & Zen Forests", morning: "Gaze at the Golden Pavilion (Kinkaku-ji) reflected across ponds.", afternoon: "Walk the meditative stone raked gardens of Ryoan-ji Zen temple.", evening: "Taste street skewers, grilled dango, and matcha parfaits at Nishiki Market." },
      { day: 3, title: "Bamboo Groves & Sagano River", morning: "Wander through the soaring emerald stalks of Arashiyama Bamboo Grove.", afternoon: "Visit Tenryu-ji gardens and take an unhurried boat ride on the Hozu River.", evening: "Farewell authentic Kaiseki dinner in a riverside Pontocho alley restaurant." },
    ],
  },

  bali: {
    name: "Bali",
    country: "Indonesia",
    flag: "🇮🇩",
    tagline: "The Island of the Gods, blending emerald rice terraces, cliffside temples, and spiritual wellness.",
    overview: "Bali offers an idyllic combination of tropical natural splendor, artistic soul, and warm hospitality. From the serene jungle valleys of Ubud to the dramatic coastal sea cliffs of Uluwatu, it is the ultimate haven for both relaxation and adventure.",
    highlights: [
      "Tegallalang emerald terraced rice fields in Ubud",
      "Uluwatu Temple perched 70 meters above crashing Indian Ocean waves",
      "Sacred Monkey Forest Sanctuary in Padangtegal",
      "Sunrise hike up Mount Batur active volcano",
      "Nusa Penida coastal day-trip (Kelingking T-Rex cliff and crystal bays)",
    ],
    foods: [
      "Nasi Campur (fragrant rice with chicken, sate lilit, and sambal matah)",
      "Babi Guling (traditional spit-roasted suckling pig with crisp crackling)",
      "Bebek Betutu (slow-cooked spiced duck wrapped in banana leaves)",
      "Sate Lilit (minced seafood or chicken grilled on lemongrass skewers)",
      "Fresh young coconut and tropical dragonfruit smoothie bowls",
    ],
    bestTime: "April to October (dry season with sunshine, gentle breezes, and low humidity).",
    budget: "$40–$90 per day for boutique villas and cafe dining; $180+ for 5-star private pool sanctuaries.",
    tips: "Always wear a sarong and sash when visiting Hindu temples (available to rent or borrow at temple gates). Renting a scooter with an international permit or hiring a private driver for ~$45/day is the easiest way to explore.",
    itinerary: [
      { day: 1, title: "Ubud's Artistic Heart", morning: "Morning walk through Tegallalang rice terraces followed by coffee tasting.", afternoon: "Stroll through the Sacred Monkey Forest and browse artisan woodcarving shops.", evening: "Traditional Balinese Legong dance performance at Ubud Royal Palace." },
      { day: 2, title: "Waterfalls & Sacred Springs", morning: "Spiritual cleansing ritual at Tirta Empul holy spring water temple.", afternoon: "Swim in the refreshing natural pool of Tibumana or Kanto Lampo waterfall.", evening: "Organic farm-to-table dinner overlooking Ubud's jungle ravines." },
      { day: 3, title: "Southern Ocean Cliffs", morning: "Relax at Padang Padang or Bingin white sand beach.", afternoon: "Visit the cliffside Uluwatu temple and watch the sunset Kecak fire dance.", evening: "Candlelit fresh seafood barbecue right on the beach at Jimbaran Bay." },
    ],
  },

  paris: {
    name: "Paris",
    country: "France",
    flag: "🇫🇷",
    tagline: "The City of Light, celebrated for high fashion, monumental architecture, and romantic boulevards.",
    overview: "Paris effortlessly sets the global benchmark for art, gastronomy, and romance. Winding cobblestone alleys, grand Haussmannian avenues, world-class museums, and open-air sidewalk cafés create an unforgettable atmosphere.",
    highlights: [
      "Eiffel Tower & panoramic evening lights from Trocadéro",
      "The Louvre Museum (Mona Lisa, Venus de Milo, Winged Victory)",
      "Montmartre bohemian hilltop and Sacré-Cœur Basilica",
      "Musée d'Orsay (masterpieces of Monet, Van Gogh, and Degas)",
      "Sunset boat cruise along the River Seine passing Notre-Dame",
    ],
    foods: [
      "Warm butter croissants & pain au chocolat from neighborhood boulangeries",
      "Steak Frites with Béarnaise sauce at a classic Parisian bistro",
      "Duck Confit and Beef Bourguignon",
      "Artisan French cheeses (Brie de Meaux, Comté, Roquefort) with a fresh baguette",
      "Delicate macarons from Ladurée or Pierre Hermé",
    ],
    bestTime: "April to June and September to October for mild weather and manageable queues.",
    budget: "$120–$250 per day mid-range; $450+ for luxury palace stays overlooking the Seine.",
    tips: "Always greet shopkeepers with a polite 'Bonjour Madame/Monsieur' when entering any store. Pre-book Louvre and Eiffel Tower time slots online at least 3 weeks in advance.",
    itinerary: [
      { day: 1, title: "Iconic Paris & the Seine", morning: "Ascend the Eiffel Tower or admire it from Champ de Mars.", afternoon: "Stroll the grand Champs-Élysées to the Arc de Triomphe.", evening: "Sunset Seine river cruise followed by dinner at a Saint-Germain bistro." },
      { day: 2, title: "Art & Bohemiana", morning: "Explore the vast treasures of the Louvre Museum.", afternoon: "Wander the winding cobblestones and artist squares of Montmartre.", evening: "Panoramic sunset over Paris from the steps of Sacré-Cœur." },
      { day: 3, title: "Latin Quarter & Royal Gardens", morning: "Browse vintage books at Shakespeare & Company and see Notre-Dame.", afternoon: "Unwind by the Medici Fountain in the lush Luxembourg Gardens.", evening: "Pastries and espresso at Café de Flore watching Parisian life go by." },
    ],
  },

  rome: {
    name: "Rome",
    country: "Italy",
    flag: "🇮🇹",
    tagline: "The Eternal City, where living history and irresistible culinary soul meet at every cobblestone corner.",
    overview: "Walking through Rome is like stepping into an open-air museum. Two thousand years of history greet you around every turn, accompanied by the aroma of fresh espresso, wood-fired pizza, and handmade pasta.",
    highlights: [
      "The Colosseum and ancient ruins of the Roman Forum",
      "The Pantheon (best-preserved architectural wonder of the ancient world)",
      "Trevi Fountain (toss a coin over your left shoulder to ensure your return)",
      "Vatican Museums, Sistine Chapel, and St. Peter's Basilica",
      "Trastevere's ivy-draped medieval alleys and lively piazzas",
    ],
    foods: [
      "Authentic Roman Carbonara, Cacio e Pepe, and Amatriciana",
      "Crispy Roman thin-crust wood-fired pizza",
      "Artisanal Gelato (look for natural colors and metal tubs)",
      "Suppli (fried risotto croquettes filled with melted mozzarella)",
      "Morning espresso standing at the local bar counter",
    ],
    bestTime: "April to June and September to October. July and August can be scorching hot.",
    budget: "$95–$210 per day mid-range; $350+ for boutique hotels near Piazza Navona.",
    tips: "Never order a cappuccino after 11:00 AM (Italians only drink milk-based coffee in the morning). Always validate regional train or bus tickets before boarding.",
    itinerary: [
      { day: 1, title: "Imperial Rome", morning: "Tour the monumental Colosseum and walk through the Roman Forum.", afternoon: "Climb the Palatine Hill and view the Circus Maximus.", evening: "Toss a coin into Trevi Fountain and dine al fresco in Piazza Navona." },
      { day: 2, title: "Vatican Wonders & Trastevere", morning: "Marvel at Michelangelo's Sistine Chapel ceiling and St. Peter's Basilica.", afternoon: "Walk across Ponte Sant'Angelo into medieval Trastevere.", evening: "Authentic cacio e pepe pasta and local Chianti wine at a rustic trattoria." },
      { day: 3, title: "Piazzas & Renaissance Fountains", morning: "Step inside the awe-inspiring Pantheon under its open oculus dome.", afternoon: "Climb the Spanish Steps and shop along Via dei Condotti.", evening: "Gelato walk around Campo de' Fiori as the evening lights reflect on cobblestones." },
    ],
  },

  santorini: {
    name: "Santorini",
    country: "Greece",
    flag: "🇬🇷",
    tagline: "Whitewashed caldera cliff towns, sapphire Aegean waters, and legendary sunsets.",
    overview: "Formed by one of the largest volcanic eruptions in human history, Santorini is the crown jewel of the Cyclades islands. Its striking contrast of whitewashed cubic houses, vibrant blue domes, and dramatic black/red beaches make it a visual masterpiece.",
    highlights: [
      "Oia Village sunset viewpoint over the volcanic caldera",
      "Scenic cliffside hiking trail from Fira to Oia",
      "Red Beach (dramatic volcanic red cliffs meeting turquoise sea)",
      "Akrotiri prehistoric Bronze Age archaeological excavation",
      "Caldera catamaran sailing cruise with hot springs swim",
    ],
    foods: [
      "Fresh grilled Aegean sea bass and octopus",
      "Authentic Greek salad with creamy feta and Kalamata olives",
      "Tomatokeftedes (Santorini signature crispy tomato fritters)",
      "Fava santorinis (velvety yellow split pea purée with capers)",
      "Local crisp Assyrtiko white volcanic wine",
    ],
    bestTime: "May to October (best swimming from June to September).",
    budget: "$130–$280 per day mid-range; $450+ for luxury cliffside cave suites with infinity plunge pools.",
    tips: "Stay in Imerovigli or Firostefani for breathtaking caldera views with quieter foot traffic than busy Oia.",
    itinerary: [
      { day: 1, title: "Fira to Oia", morning: "Arrive and explore the winding pedestrian alleys of Fira.", afternoon: "Hike the world-famous cliffside trail along the edge of the caldera.", evening: "Witness the legendary sunset from the Venetian Castle ruins in Oia." },
      { day: 2, title: "Volcanic Wonders by Sea", morning: "Catamaran sailing cruise into the submerged volcanic crater.", afternoon: "Swim in the geothermal hot springs near Nea Kameni volcano.", evening: "Fresh grilled seafood dinner at Ammoudi Bay right by the water's edge." },
      { day: 3, title: "Ancient Heritage & Wine", morning: "Explore the ancient Minoan ruins of Akrotiri (the Greek Pompeii).", afternoon: "Visit Red Beach and sample volcanic wines at a cliffside vineyard.", evening: "Romantic candlelit rooftop dinner overlooking illuminated caldera cliffs." },
    ],
  },

  chitradurga: {
    name: "Chitradurga",
    country: "India",
    flag: "🇮🇳",
    tagline: "The legendary City of Seven Circles, steeped in stone fortitude, valor, and ancient lore.",
    overview: "Chitradurga ('The Picturesque Castle') is home to Kallina Kote, one of the most formidable medieval stone fortresses in Indian history. Spanning across a labyrinth of rugged granite boulders, secret waterways, and 18 ancient temples, it tells gripping tales of warrior queens and Nayaka kings.",
    highlights: [
      "Chitradurga Fort (Kallina Kote) with 7 concentric defensive stone ramparts",
      "Onake Obavvana Kindi (the legendary secret crevice defended by heroine Obavva)",
      "Chandravalli Caves & Ancient Lake (subterranean meditation chambers of monks)",
      "Vani Vilasa Sagara (historic 1907 stone masonry dam and vast reservoir)",
      "Hidimbeshwara Temple carved directly into colossal boulders",
    ],
    foods: [
      "Crispy Davanagere-style Benne Dosa (butter dosa served with spicy potato palya)",
      "Jolada Rotti Oota (sorghum flatbread with stuffed eggplant Yennegayi)",
      "Spicy Shenga Chutney powder with fresh curd",
      "Mandakki Usli with crispy Menasinakayi Bajjis (chilli fritters)",
      "Rich Karnataka Filter Coffee",
    ],
    bestTime: "October to March (cool, sunny, and comfortable for trekking fort ramparts).",
    budget: "$25–$65 per day for comfortable local heritage stays and authentic regional dining.",
    tips: "Wear sturdy sports shoes with good grip—the stone boulders can be smooth. Carry an umbrella or hat and at least 1 liter of water when exploring the fort.",
    itinerary: [
      { day: 1, title: "The Seven Circles of Granite", morning: "Enter Kallina Kote through monumental arched gateways and boulder traps.", afternoon: "Visit Onake Obavvana Kindi and the ancient stone oil reservoirs.", evening: "Panoramic sunset view over Chitradurga town from the fort's highest watchtower." },
      { day: 2, title: "Subterranean Secrets & Temples", morning: "Descend into the mystical, cool underground rock-cut chambers of Chandravalli Caves.", afternoon: "Stroll along the peaceful, tree-fringed Chandravalli Lake.", evening: "Taste hot Davanagere Benne Dosa and authentic filter coffee at a local mess." },
      { day: 3, title: "The Grand Dam Excursion", morning: "Drive through scenic rural hills to Vani Vilasa Sagara (Mari Kanive).", afternoon: "Admire the 1907 British-era stonework and gaze out across the tranquil blue reservoir.", evening: "Return to Chitradurga and browse local market spices and handcrafted keepsakes." },
    ],
  },

  mysuru: {
    name: "Mysuru",
    country: "India",
    flag: "🇮🇳",
    tagline: "The City of Palaces, world-renowned for royal heritage, silk, sandalwood, and sweet Mysurupa.",
    overview: "Mysuru is the cultural crown of Karnataka. With its majestic Indo-Saracenic royal palace, heritage heritage markets, aromatic sandalwood oils, and vibrant Dasara festivities, it is one of India's most elegant and walkable royal cities.",
    highlights: [
      "Mysore Palace (Amba Vilas) with its 97,000 glowing bulbs on weekends",
      "Chamundi Hill and the Sri Chamundeshwari Temple (panoramic city views)",
      "The massive monolithic Nandi Bull carved from single black granite",
      "Brindavan Gardens with terraced lawns and illuminated musical fountains",
      "Devaraja Market (historic 120-year-old bazaar of flowers, spices, and perfumes)",
    ],
    foods: [
      "Melt-in-your-mouth Mysore Pak from Guru Sweets (the original royal confectioners)",
      "Crisp Mysore Masala Dosa smeared with signature red garlic-chilli chutney",
      "Bisi Bele Bath (spiced lentil rice with cashews and ghee)",
      "Mylari Dosa (fluffy, cloud-like butter dosas from Hotel Vinayaka Mylari)",
      "Chilled Badam Milk and South Indian Filter Kaapi",
    ],
    bestTime: "October to March (especially spectacular during the 10-day Dasara festival in October).",
    budget: "$35–$85 per day mid-range; $220+ for luxury royal heritage suites at Lalitha Mahal Palace.",
    tips: "Take the Vande Bharat Express from Bengaluru (takes just 1 hour 45 minutes). Plan to visit Mysore Palace between 7:00 PM and 7:45 PM on Sundays when it is fully illuminated.",
    itinerary: [
      { day: 1, title: "Royal Splendor & Palaces", morning: "Tour the opulent stained-glass Durbar Hall inside Mysore Palace.", afternoon: "Browse authentic silk sarees at the Government Silk Weaving Factory.", evening: "Watch the awe-inspiring palace illumination accompanied by the royal brass band." },
      { day: 2, title: "Sacred Hills & Scented Bazaars", morning: "Drive up Chamundi Hill to visit the 17th-century temple and giant Nandi Bull.", afternoon: "Walk through vibrant mounds of marigolds and sandalwood in Devaraja Market.", evening: "Feast on iconic cloud-soft dosas at Mylari followed by fresh warm Mysore Pak." },
      { day: 3, title: "Fountains & Historic Srirangapatna", morning: "Excursion to Tipu Sultan's summer palace (Daria Daulat Bagh) in Srirangapatna.", afternoon: "Visit Ranganathittu Bird Sanctuary for a boat safari amidst painted storks.", evening: "Evening stroll through illuminated fountains and terraced lawns of Brindavan Gardens." },
    ],
  },

  "cape-town": {
    name: "Cape Town",
    country: "South Africa",
    flag: "🇿🇦",
    tagline: "Where dramatic mountain ridges meet two roaring oceans.",
    overview: "Cape Town is blessed with one of the most striking natural backdrops on Earth. Framed by flat-topped Table Mountain, dramatic Atlantic surf, rolling vineyards, and colorful historic neighborhoods, it offers endless coastal beauty.",
    highlights: [
      "Table Mountain aerial rotating cableway to the summit",
      "Boulders Beach (get up close with wild African penguin colonies)",
      "Victoria & Alfred (V&A) Waterfront harbor with vibrant dining and buskers",
      "Kirstenbosch National Botanical Garden set against mountain slopes",
      "Scenic Chapman's Peak coastal drive to the dramatic cliffs of Cape Point",
    ],
    foods: [
      "Cape Malay Bobotie (spiced minced meat baked with savory egg custard)",
      "Fresh grilled linefish and calamari along the harbor",
      "Braai (traditional wood-fired barbecue meats)",
      "Gatsby sandwich (legendary Cape Town crusty roll stuffed with meat and fries)",
      "World-class wines from nearby Stellenbosch and Franschhoek valleys",
    ],
    bestTime: "November to March (warm, sunny southern hemisphere summer).",
    budget: "$60–$140 per day mid-range; $260+ for luxury coastal suites in Camps Bay.",
    tips: "Book Table Mountain cable car tickets online and take the first morning ascent when wind speeds are lowest.",
    itinerary: [
      { day: 1, title: "Table Mountain & Waterfront", morning: "Cable car ascent to the summit of Table Mountain for 360-degree ocean views.", afternoon: "Stroll through the pastel-painted historic houses of Bo-Kaap.", evening: "Waterfront harbor cruise and sunset seafood dinner at the V&A Waterfront." },
      { day: 2, title: "Cape Peninsula & Penguins", morning: "Drive along winding Chapman's Peak to Cape Point and Cape of Good Hope.", afternoon: "Walk the wooden boardwalks among wild African penguins at Boulders Beach.", evening: "Cocktails and relaxed dining overlooking the Atlantic sunset at Camps Bay." },
      { day: 3, title: "Gardens & Wine Country", morning: "Walk along the tree-top 'Boomslang' canopy walkway at Kirstenbosch Gardens.", afternoon: "Take a 45-minute scenic drive to Constantia or Stellenbosch vineyards.", evening: "Multi-course vineyard dinner with award-winning South African wines." },
    ],
  },

  "new-york": {
    name: "New York City",
    country: "United States",
    flag: "🇺🇸",
    tagline: "The Empire City, brimming with unmatched skyline energy, culture, and sleepless ambition.",
    overview: "New York is a world capital of culture, food, theater, and architecture. From the serene green pathways of Central Park to the buzzing neon lights of Broadway, every neighborhood has its own distinct rhythm and character.",
    highlights: [
      "Central Park (Bethesda Terrace, Bow Bridge, and quiet rowboat lakes)",
      "Statue of Liberty & Ellis Island historical monument",
      "Brooklyn Bridge pedestrian crossing with panoramic morning skyline views",
      "The Metropolitan Museum of Art (The Met) and MoMA",
      "Top of the Rock or Summit One Vanderbilt for sweeping skyscraper views",
    ],
    foods: [
      "Classic hot NYC-style thin-crust cheese pizza slice",
      "Hand-rolled kettle-boiled bagels with smoked lox and cream cheese",
      "Pastrami on rye from historic Katz's Delicatessen",
      "Authentic soup dumplings in Chinatown & fresh cannoli in Little Italy",
      "Black-and-white cookies and classic New York cheesecake",
    ],
    bestTime: "April to May (pleasant spring) and September to November (crisp autumn weather and colorful foliage).",
    budget: "$140–$300 per day mid-range; $450+ for luxury Manhattan hotels.",
    tips: "Use the NYC Subway via contactless tap-to-pay (OMNY)—it is vastly faster and cheaper than hailing yellow cabs during traffic hours.",
    itinerary: [
      { day: 1, title: "Manhattan Icons", morning: "Walk across the Brooklyn Bridge from DUMBO into Lower Manhattan.", afternoon: "Visit Wall Street, 9/11 Memorial, and take the ferry to the Statue of Liberty.", evening: "Sunset views from Top of the Rock followed by a Broadway musical." },
      { day: 2, title: "Green Parks & World Art", morning: "Morning walk through Central Park's Ramble and Bow Bridge.", afternoon: "Explore Egyptian temples and European masters at The Met.", evening: "Stroll the illuminated High Line elevated park and dine in Chelsea Market." },
      { day: 3, title: "Village Charm & Skyline", morning: "Breakfast bagel in Greenwich Village and browse independent bookstores.", afternoon: "Explore trendy Soho boutiques and historic cobblestone cast-iron streets.", evening: "Cocktails at a rooftop lounge gazing over the glittering Empire State Building." },
    ],
  },

  bengaluru: {
    name: "Bengaluru",
    country: "India",
    flag: "🇮🇳",
    tagline: "The Silicon Valley of India, famed for pleasant weather, lush green gardens, and craft beer culture.",
    overview: "Bengaluru (Bangalore) seamlessly blends India's premier tech innovation with colonial botanical gardens, historic palaces, and a vibrant social fabric of craft microbreweries and heritage darshini cafés.",
    highlights: [
      "Cubbon Park (300 acres of bamboo thickets and red neoclassical buildings)",
      "Lalbagh Botanical Garden & 19th-century British Glass House",
      "Bangalore Palace (inspired by England's Windsor Castle)",
      "Vidhana Soudha (monumental Dravidian-style legislative seat)",
      "Indiranagar & Koramangala trendy cafe and microbrewery strips",
    ],
    foods: [
      "Benne Masala Dosa at Vidyarthi Bhavan or CTR (Shri Sagar)",
      "Steaming hot Rava Idli with ghee and potato saagu",
      "Bisi Bele Bath with boondi sprinkles",
      "Locally brewed mango or Belgian-style craft beers",
      "Aromatic South Indian Filter Kaapi in traditional stainless steel tumbler",
    ],
    bestTime: "September to March (consistently pleasant weather year-round).",
    budget: "$30–$75 per day mid-range; $180+ for 5-star heritage hotels like The Leela Palace.",
    tips: "Hop on the Namma Metro to glide past traffic between MG Road, Indiranagar, and Majestic.",
    itinerary: [
      { day: 1, title: "Gardens & Royal Heritage", morning: "Morning heritage jog or walk under the canopy of Cubbon Park.", afternoon: "Admire Tudor-style wooden carvings inside Bangalore Palace.", evening: "Gaze at the illuminated Dravidian grandeur of Vidhana Soudha at dusk." },
      { day: 2, title: "Botanical Wonders & Street Dosa", morning: "Explore rare tropical trees and the glass pavilion at Lalbagh.", afternoon: "Indulge in crispy butter dosas at legendary Vidyarthi Bhavan in Gandhi Bazaar.", evening: "Sample craft beers and artisanal wood-fired pizzas in Indiranagar." },
      { day: 3, title: "Art, Tech & Cafés", morning: "Contemporary art exhibitions at the National Gallery of Modern Art (NGMA).", afternoon: "Browse quirky boutiques and independent book cafes along Church Street.", evening: "Farewell rooftop dinner overlooking the illuminated city skyline." },
    ],
  },
};

// Aliases mapping common search terms to destination keys
const DESTINATION_ALIASES = {
  kyoto: "kyoto",
  japan: "kyoto",
  tokyo: "kyoto",
  bali: "bali",
  indonesia: "bali",
  ubud: "bali",
  paris: "paris",
  france: "paris",
  rome: "rome",
  italy: "rome",
  florence: "rome",
  santorini: "santorini",
  greece: "santorini",
  chitradurga: "chitradurga",
  mysore: "mysuru",
  mysuru: "mysuru",
  karnataka: "mysuru",
  "cape town": "cape-town",
  capetown: "cape-town",
  "south africa": "cape-town",
  "new york": "new-york",
  nyc: "new-york",
  manhattan: "new-york",
  usa: "new-york",
  america: "new-york",
  bengaluru: "bengaluru",
  bangalore: "bengaluru",
  india: "chitradurga",
};

export function generateTravelAssistantResponse(userPrompt) {
  const raw = (userPrompt || "").trim();
  const q = raw.toLowerCase();

  // 1. General Greetings & Openers
  const isGreeting =
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste|hola|bonjour)\b/i.test(
      q
    ) || q === "hi" || q === "hello";

  if (isGreeting && q.split(/\s+/).length <= 3) {
    return (
      `👋 **Hello! I'm your Elsewhere Travel Concierge.**\n\n` +
      `I can help you craft dream vacations, uncover local hidden secrets, and find the perfect getaway. Tell me:\n\n` +
      `* 🌍 **"Can you suggest some places?"** — for personalized destination inspiration.\n` +
      `* 🗓️ **"3-day itinerary for Kyoto"** — for day-by-day curated schedules.\n` +
      `* 🍜 **"Best food to eat in Rome"** — for signature culinary guides.\n` +
      `* ☀️ **"When is the best time to visit Bali?"** — for seasonal and weather advice.\n\n` +
      `Where in the world is calling you next?`
    );
  }

  // 2. Pleasantries & Small Talk
  if (/^(thanks|thank you|thx|awesome|great|cool|perfect|wonderful|nice)\b/i.test(q)) {
    return `You're very welcome! 😊 Whenever you're ready to plan transit routes, compare budgets, or build a day-by-day itinerary, just ask. Have a wonderful adventure! ✈️`;
  }

  if (q.includes("how are you") || q.includes("how r u")) {
    return `I'm doing wonderful and full of wanderlust, thank you for asking! 🌟 I'm ready to help you plan your next journey. Are you looking for inspiration, an itinerary, or travel advice today?`;
  }

  if (q.includes("who are you") || q.includes("what are you") || q.includes("what can you do")) {
    return (
      `✨ **I am Elsewhere AI** — your bespoke travel companion built for the Elsewhere platform!\n\n` +
      `Here is how I can assist your journey:\n` +
      `* 🗺️ **Personalized Recommendations:** Suggesting destinations tailored to your travel style (culture, beach, mountains, heritage, nightlife).\n` +
      `* 🗓️ **Custom Itineraries:** Curated day-by-day morning, afternoon, and evening guides with insider tips.\n` +
      `* 🍲 **Culinary Secrets:** The signature regional dishes you cannot miss.\n` +
      `* ☀️ **Seasons & Budgets:** Ideal travel months and daily expense estimates.\n\n` +
      `Try asking me: *"Suggest some romantic places"* or *"What should I do in Chitradurga?"*`
    );
  }

  // 3. Recommendation Queries ("Suggest some places", "Where should I go", "recommend places", etc.)
  const isRecommendationQuery =
    q.includes("suggest") ||
    q.includes("recommend") ||
    q.includes("where to go") ||
    q.includes("where should i go") ||
    q.includes("where can i go") ||
    q.includes("places to visit") ||
    q.includes("places to go") ||
    q.includes("destination ideas") ||
    q.includes("travel ideas") ||
    q.includes("best places") ||
    q.includes("good places") ||
    q.includes("some places") ||
    q.includes("any places") ||
    q.includes("options");

  if (isRecommendationQuery) {
    // Check if the user mentioned a specific mood or style
    const isBeach = q.includes("beach") || q.includes("coast") || q.includes("tropical") || q.includes("island");
    const isCulture = q.includes("culture") || q.includes("history") || q.includes("heritage") || q.includes("temple");
    const isRomantic = q.includes("romantic") || q.includes("couple") || q.includes("honeymoon");
    const isAdventure = q.includes("adventure") || q.includes("trek") || q.includes("nature") || q.includes("hike");
    const isIndia = q.includes("india") || q.includes("karnataka");

    if (isBeach) {
      return (
        `🏖️ **Top Beach & Coastal Escapes:**\n\n` +
        `1. 🌴 **Bali, Indonesia:** Spectacular cliffside temples in Uluwatu, pristine black/white sand surf coves, and lush jungle villas in Ubud.\n` +
        `2. 🌊 **Santorini, Greece:** Whitewashed caldera villages, dramatic volcanic red beaches, and world-famous Aegean sunsets.\n` +
        `3. 🐧 **Cape Town, South Africa:** Gorgeous white sands at Camps Bay and wild penguin encounters along Boulders Beach.\n\n` +
        `Would you like an itinerary for any of these coastal gems?`
      );
    }

    if (isCulture || isIndia) {
      return (
        `🏛️ **Top Cultural & Heritage Destinations:**\n\n` +
        `1. 🏯 **Kyoto, Japan:** The spiritual heart of Japan with over 1,000 temples, vermilion torii paths at Fushimi Inari, and peaceful bamboo groves.\n` +
        `2. 🏰 **Chitradurga, Karnataka:** The legendary 'Kallina Kote' stone fortress spanning seven concentric boulder rings and ancient rock caves.\n` +
        `3. 👑 **Mysuru, Karnataka:** The royal City of Palaces, illuminated weekend nights, fragrant sandalwood, and Mysore Pak delicacies.\n` +
        `4. 🏛️ **Rome, Italy:** An open-air museum filled with the Colosseum, Pantheon, and ancient cobbled piazzas.\n\n` +
        `Which of these historic journeys appeals most to you?`
      );
    }

    if (isRomantic) {
      return (
        `🥂 **Dreamy Escapes for Couples & Honeymoons:**\n\n` +
        `1. 🥐 **Paris, France:** Sunset river cruises on the Seine, romantic bistros in Saint-Germain, and twilight views of the sparkling Eiffel Tower.\n` +
        `2. 🌅 **Santorini, Greece:** Intimate cliffside cave suites with private plunge pools overlooking the tranquil caldera.\n` +
        `3. 🌸 **Kyoto, Japan:** Private garden ryokans, morning walks through bamboo groves, and traditional tea ceremonies.\n\n` +
        `Would you like advice on the best boutique stays or romantic dinner spots?`
      );
    }

    // Default rich, conversational recommendations
    return (
      `🌍 **I'd love to help you find the perfect getaway!** Here are our standout destinations tailored by travel style:\n\n` +
      `* 🌸 **For Peace & Culture:** **Kyoto, Japan** — Walk through meditative bamboo forests, thousands of vermilion torii gates, and centuries-old Zen shrines.\n` +
      `* 🌴 **For Tropical Wellness & Waves:** **Bali, Indonesia** — Emerald terraced rice paddies, cliffside sea temples, and serene wellness retreats.\n` +
      `* 🏰 **For Royal Heritage & Fortresses:** **Mysuru & Chitradurga, Karnataka** — Grand illuminated royal palaces and legendary 7-ring medieval boulder castles.\n` +
      `* 🥐 **For Art & Romance:** **Paris, France** or **Rome, Italy** — World-class museums, timeless cobblestone alleys, and unforgettable dining.\n` +
      `* 🐧 **For Dramatic Coastlines:** **Cape Town, South Africa** — Table Mountain vistas, ocean drives, and wild African penguins at Boulders Beach.\n` +
      `* 🏙️ **For Skyline Electricity:** **New York City** — Central Park strolls, Broadway theater, and 24/7 culinary energy.\n\n` +
      `Tell me what kind of vibe you're craving (relaxing, romantic, adventurous, or cultural) and how many days you have, and I'll tailor a bespoke plan for you!`
    );
  }

  // 4. Match Specific Destination from Query
  let matchedKey = null;
  for (const [alias, destKey] of Object.entries(DESTINATION_ALIASES)) {
    // Word boundary check to prevent matching substrings like "in" inside "places"
    const regex = new RegExp(`\\b${alias}\\b`, "i");
    if (regex.test(q)) {
      matchedKey = destKey;
      break;
    }
  }

  if (matchedKey && DESTINATION_KNOWLEDGE[matchedKey]) {
    const dest = DESTINATION_KNOWLEDGE[matchedKey];

    const isFood = q.includes("food") || q.includes("eat") || q.includes("dish") || q.includes("cuisine") || q.includes("dining") || q.includes("restaurant");
    const isTime = q.includes("when") || q.includes("time") || q.includes("season") || q.includes("weather") || q.includes("month");
    const isBudget = q.includes("budget") || q.includes("cost") || q.includes("price") || q.includes("expensive") || q.includes("cheap");
    const isPlaces = q.includes("what to see") || q.includes("highlights") || q.includes("attractions") || q.includes("places") || q.includes("things to do") || q.includes("famous");
    const isItinerary = q.includes("itinerary") || q.includes("plan") || q.includes("day") || q.includes("days") || q.includes("schedule");

    if (isFood) {
      return (
        `${dest.flag} **What to Eat in ${dest.name}:**\n\n` +
        `Here are the iconic regional specialties you cannot miss:\n\n` +
        dest.foods.map((f) => `* 🍴 **${f}**`).join("\n") +
        `\n\n💡 **Local Advice:** ${dest.tips}`
      );
    }

    if (isTime) {
      return (
        `☀️ **Best Time to Visit ${dest.name} ${dest.flag}:**\n\n` +
        `* **Ideal Months:** ${dest.bestTime}\n` +
        `* **Vibe:** ${dest.tagline}\n\n` +
        `💡 **Insider Tip:** ${dest.tips}`
      );
    }

    if (isBudget) {
      return (
        `💵 **Travel Budget for ${dest.name} ${dest.flag}:**\n\n` +
        `* **Estimated Daily Cost:** ${dest.budget}\n` +
        `* **Where to Stay:** Boutique neighborhood hotels offer the best character and value, while luxury properties provide bucket-list service.\n\n` +
        `💡 **Money-Saving Tip:** ${dest.tips}`
      );
    }

    if (isPlaces) {
      return (
        `🌟 **Must-See Highlights in ${dest.name} ${dest.flag}:**\n\n` +
        `*${dest.tagline}*\n\n` +
        dest.highlights.map((h, i) => `${i + 1}. **${h}**`).join("\n\n") +
        `\n\n💡 **Travel Tip:** ${dest.tips}`
      );
    }

    if (isItinerary) {
      let res = `${dest.flag} **Curated 3-Day Itinerary for ${dest.name}:**\n\n`;
      res += `*${dest.overview}*\n\n`;
      dest.itinerary.forEach((day) => {
        res += `### 🗓️ Day ${day.day}: ${day.title}\n`;
        res += `* **Morning:** ${day.morning}\n`;
        res += `* **Afternoon:** ${day.afternoon}\n`;
        res += `* **Evening:** ${day.evening}\n\n`;
      });
      res += `💡 **Insider Tip:** ${dest.tips}\n\n`;
      res += `*Tip: You can also use the **Plan a Trip** tab in the top navigation to customize days and calculate real-time transit routes!*`;
      return res;
    }

    // General conversational overview about this destination
    return (
      `${dest.flag} **Discovering ${dest.name}:**\n\n` +
      `${dest.tagline}\n\n` +
      `${dest.overview}\n\n` +
      `**Top Highlights:**\n` +
      dest.highlights.slice(0, 3).map((h) => `* ${h}`).join("\n") +
      `\n\n* **Best Time to Visit:** ${dest.bestTime}\n` +
      `* **Average Budget:** ${dest.budget}\n\n` +
      `Would you like a full 3-day itinerary or food recommendations for **${dest.name}**?`
    );
  }

  // 5. General Travel Advice
  if (q.includes("pack") || q.includes("luggage") || q.includes("suitcase")) {
    return (
      `🎒 **Smart Packing Essentials:**\n\n` +
      `* **Versatile Clothing:** Breathable layers that can be mixed and matched; one lightweight rain shell.\n` +
      `* **Footwear:** Quality broken-in walking shoes (expect 15,000+ steps per day exploring cities and trails).\n` +
      `* **Tech Gear:** Universal travel plug adapter with USB-C ports, and a compact 10,000mAh power bank.\n` +
      `* **Documents:** Digital copies of your passport, visa, and hotel reservations saved offline on your phone.\n\n` +
      `*Pro tip: Roll your clothes instead of folding—it reduces wrinkles and saves up to 30% luggage space!*`
    );
  }

  if (q.includes("budget") || q.includes("cheap") || q.includes("money") || q.includes("save money")) {
    return (
      `💰 **Smart Travel Budget Tips:**\n\n` +
      `* **Shoulder Season:** Travel in April–May or September–October for up to 40% cheaper hotels and lighter crowds.\n` +
      `* **Lunch Over Dinner:** High-end restaurants and bistros frequently offer 3-course lunch menus at half their evening price.\n` +
      `* **Public Transit:** Use local metro and train passes instead of airport taxis.\n` +
      `* **Currency Exchange:** Always choose to be charged in the **local currency** at international ATMs/card readers to avoid inflated bank conversion fees.`
    );
  }

  if (q.includes("safety") || q.includes("safe") || q.includes("emergency")) {
    return (
      `🛡️ **Top Travel Safety Tips:**\n\n` +
      `1. **Connectivity:** Get an international eSIM (like Airalo) so you have instant GPS navigation and ride-hailing when you land.\n` +
      `2. **Emergency Numbers:** Save the local emergency dispatch number (112 in Europe, 100 in India, 911 in the USA) before arriving.\n` +
      `3. **Street Smarts:** Keep your passport in the hotel room safe and carry a photocopy or digital image.\n` +
      `4. **Travel Insurance:** Always ensure you have medical cover for international trips.`
    );
  }

  // 6. Intelligent, warm fallback for any open-ended question
  return (
    `🌍 **I'd love to help you plan that!**\n\n` +
    `Could you tell me a little more about what you have in mind? For example:\n\n` +
    `* 🏝️ Are you looking for **beaches**, **mountains**, or **historic cities**?\n` +
    `* 📍 Do you have a specific destination in mind (like **Kyoto**, **Bali**, **Paris**, **Rome**, or **Chitradurga**)?\n` +
    `* ⏳ How many days are you planning to travel?\n\n` +
    `Tell me what you're imagining, and I'll share curated itineraries, local food secrets, and travel tips!`
  );
}
