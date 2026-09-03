// Intelligent Global AI Travel Engine for Elsewhere Concierge
// Capable of answering ANY travel question, generating itineraries, budgets, packing lists, and destination guides.

const DESTINATION_KNOWLEDGE = {
  india: {
    name: "India",
    flag: "🇮🇳",
    overview: "A land of incredible diversity, ancient palaces, sacred river ghats, rich spices, and vibrant traditions.",
    bestTime: "October to March (pleasant winter across Rajasthan, North & South India).",
    budget: "$30–$85 per day for comfortable mid-range travel; $180+ for luxury heritage palaces.",
    foods: ["Butter Chicken & Garlic Naan", "Masala Dosa with Chutneys", "Hyderabadi Dum Biryani", "Chaat & Street Delicacies", "Masala Chai"],
    itinerary: [
      { day: 1, title: "Delhi's Imperial Echoes", morning: "Explore Old Delhi, Jama Masjid, and historic Chandni Chowk bazaars.", afternoon: "Marvel at Humayun's Tomb and the towering sandstone Qutub Minar.", evening: "Stroll India Gate lit up at dusk followed by authentic Mughlai dinner." },
      { day: 2, title: "The Wonder in Agra", morning: "Sunrise visit to the iconic white marble Taj Mahal overlooking the Yamuna.", afternoon: "Explore the vast courtyards of the red sandstone Agra Fort.", evening: "Sunset views of the Taj from Mehtab Bagh gardens across the river." },
      { day: 3, title: "The Pink City of Jaipur", morning: "Drive to Jaipur and climb the majestic Amber Fort with mirror-tiled halls.", afternoon: "Visit Hawa Mahal (Palace of Winds) and the City Palace royal museum.", evening: "Browse vibrant textile and gemstone bazaars in Johari Bazaar with fresh lassi." },
    ],
    tips: "Always carry bottled water, remove shoes before entering temples, and take domestic flights or express trains (Vande Bharat) between distant hubs.",
  },
  japan: {
    name: "Japan",
    flag: "🇯🇵",
    overview: "A mesmerizing balance of hyper-modern smart cities, serene Zen temples, centuries-old shrines, and Michelin gastronomy.",
    bestTime: "March to May (Sakura cherry blossoms) and October to November (vivid autumn foliage).",
    budget: "$70–$160 / day mid-range; $250+ for luxury ryokans with Kaiseki dinner.",
    foods: ["Hand-crafted Sushi & Sashimi", "Steaming Tonkotsu Ramen", "A5 Wagyu Beef", "Crispy Tempura", "Matcha Ceremonial Teas"],
    itinerary: [
      { day: 1, title: "Tokyo's Dynamic Pulse", morning: "Meiji Jingu Shrine and the stylish boutiques of Omotesando.", afternoon: "Experience the bustling Shibuya Crossing and panoramic Shibuya Sky views.", evening: "Explore the ancient Senso-ji temple in Asakusa lit by paper lanterns." },
      { day: 2, title: "Kyoto's Ancient Soul", morning: "Hike through thousands of vibrant vermilion torii gates at Fushimi Inari.", afternoon: "Gaze at the Golden Pavilion (Kinkaku-ji) reflected across serene ponds.", evening: "Wander the atmospheric wooden alleys of Gion hoping for a glimpse of Geiko." },
      { day: 3, title: "Arashiyama & Bamboo Groves", morning: "Early stroll through towering emerald stalks of Arashiyama Bamboo Grove.", afternoon: "Visit the scenic Tenryu-ji Zen temple gardens overlooking western hills.", evening: "Traditional Kaiseki multi-course dinner at a riverside Kyoto ryokan." },
    ],
    tips: "Purchase an IC card (Suica/Pasmo) for effortless subway transit, always stand on the correct side of escalators, and keep cash for small neighborhood ramen shops.",
  },
  france: {
    name: "France",
    flag: "🇫🇷",
    overview: "The world's benchmark for haute cuisine, art history, picturesque wine regions, and romantic boulevards.",
    bestTime: "April to June and September to October for pleasant weather and lighter crowds.",
    budget: "$110–$220 / day mid-range; $350+ for luxury palace hotels.",
    foods: ["Fresh Butter Croissants & Baguettes", "Coq au Vin", "Duck Confit", "Artisanal Cheeses (Brie, Comté)", "Crème Brûlée & Macarons"],
    itinerary: [
      { day: 1, title: "Iconic Paris & the Seine", morning: "Morning climb of the Eiffel Tower or viewpoints from Trocadéro.", afternoon: "Stroll down the Champs-Élysées to the Arc de Triomphe.", evening: "Sunset Seine river cruise passing the illuminated Notre-Dame Cathedral." },
      { day: 2, title: "Art & Bohemiana", morning: "Marvel at the Mona Lisa and Venus de Milo in the world-famous Louvre.", afternoon: "Wander cobblestone winding streets of Montmartre up to Sacré-Cœur.", evening: "Dinner at a historic Parisian bistro with steak frites and Bordeaux wine." },
      { day: 3, title: "Royal Versailles or Left Bank", morning: "Explore the opulent Hall of Mirrors and grand fountains at Palace of Versailles.", afternoon: "Browse books along Shakespeare and Company and relax in Luxembourg Gardens.", evening: "Pastries at Saint-Germain-des-Prés with a glass of champagne." },
    ],
    tips: "Always say 'Bonjour' upon entering shops, book major museum tickets at least 2 weeks in advance, and walk or use the Metro over taxis.",
  },
  italy: {
    name: "Italy",
    flag: "🇮🇹",
    overview: "Home to the greatest concentration of UNESCO heritage sites, breathtaking coastlines, and unrivaled regional culinary tradition.",
    bestTime: "April to June and September to October (avoid July/August heat waves).",
    budget: "$90–$200 / day mid-range; $300+ for luxury Grand Canal or Amalfi stays.",
    foods: ["Handmade Cacio e Pepe & Carbonara", "Neapolitan Wood-fired Pizza", "Gelato Artigianale", "Tuscan Bistecca alla Fiorentina", "Espresso & Tiramisu"],
    itinerary: [
      { day: 1, title: "Ancient Rome Unveiled", morning: "Walk through the Colosseum and imagine gladiatorial contests.", afternoon: "Explore the ruins of the Roman Forum and climb Palatine Hill.", evening: "Toss a coin into Trevi Fountain and dine al fresco in Piazza Navona." },
      { day: 2, title: "Vatican Treasures & Trastevere", morning: "Tour the Vatican Museums, Sistine Chapel, and St. Peter's Basilica.", afternoon: "Cross the Tiber river into the ivy-draped medieval streets of Trastevere.", evening: "Enjoy a traditional Roman trattoria meal with local Chianti wine." },
      { day: 3, title: "Renaissance Florence", morning: "Take high-speed Frecciarossa train to Florence; admire the Duomo dome.", afternoon: "View Michelangelo's original David in the Accademia Gallery.", evening: "Sunset golden hour at Piazzale Michelangelo overlooking the Arno river." },
    ],
    tips: "Order cappuccino only before 11 AM, validate your train tickets before boarding regional trains, and always look for 'Gelato Artigianale' signs for authentic gelato.",
  },
  switzerland: {
    name: "Switzerland",
    flag: "🇨🇭",
    overview: "Breathtaking Alpine peaks, mirror-like turquoise lakes, pristine mountain trains, and world-renowned chocolate.",
    bestTime: "June to September for hiking & lake swims; December to March for winter wonderland skiing.",
    budget: "$140–$300 / day mid-range; $450+ for luxury 5-star mountain chalets.",
    foods: ["Cheese Fondue with crusty bread", "Crispy Potato Rösti", "Raclette scraped over new potatoes", "Artisanal Swiss Chocolates", "Zürcher Geschnetzeltes"],
    itinerary: [
      { day: 1, title: "Zurich to Lucerne", morning: "Stroll the cobblestones of Zurich's Old Town and Lake Zurich promenade.", afternoon: "Scenic train to Lucerne; walk the historic 14th-century wooden Chapel Bridge.", evening: "Lakeside dinner admiring snow-dusted Mount Pilatus peaks." },
      { day: 2, title: "The Jungfrau Region", morning: "Ride the cogwheel train into the dramatic Lauterbrunnen 72-waterfall valley.", afternoon: "Ascend to Jungfraujoch 'Top of Europe' for panoramic Aletsch Glacier views.", evening: "Warm up with a bubbling cheese fondue in an alpine mountain hut." },
      { day: 3, title: "Zermatt & the Matterhorn", morning: "Arrive in car-free Zermatt with iconic pyramid Matterhorn views.", afternoon: "Ride the Gornergrat Bahn to 3,089 meters for 360-degree mountain panoramas.", evening: "Relax in a luxury alpine spa overlooking snow-dusted pines." },
    ],
    tips: "The Swiss Travel Pass provides unlimited travel on scenic trains, buses, and lake ferries, making it the most cost-effective travel investment in Switzerland.",
  },
  spain: {
    name: "Spain",
    flag: "🇪🇸",
    overview: "Vibrant tapas plazas, Gaudí's modernist masterpieces, dramatic Mediterranean coves, and lively nocturnal culture.",
    bestTime: "May to June and September to October.",
    budget: "$80–$180 / day mid-range.",
    foods: ["Authentic Paella Valenciana", "Variety of Tapas & Pintxos", "Jamón Ibérico de Bellota", "Churros con Chocolate", "Sangria & Rioja Wines"],
    itinerary: [
      { day: 1, title: "Gaudí's Barcelona", morning: "Marvel at the soaring, organic stone spires of La Sagrada Família.", afternoon: "Stroll through the colorful mosaic terrace gardens of Park Güell.", evening: "Tapas crawl through the historic Gothic Quarter and El Born." },
      { day: 2, title: "Madrid's Royal Splendor", morning: "Take the bullet train to Madrid; tour the majestic Royal Palace.", afternoon: "Admire European art masterpieces at the world-class Prado Museum.", evening: "Sunset vermouth and tapas at the historic Mercado de San Miguel." },
      { day: 3, title: "Seville & Moorish Andalusia", morning: "Experience the breathtaking carved arches of the Real Alcázar palace.", afternoon: "Climb the Giralda tower for sweeping views of Seville Cathedral.", evening: "Witness an impassioned authentic Flamenco performance in Triana." },
    ],
    tips: "Lunch is the main meal (2 PM - 4 PM), dinner rarely starts before 9 PM, and museums frequently offer free admission during specific evening hours.",
  },
  unitedstates: {
    name: "United States",
    flag: "🇺🇸",
    overview: "Colossal landscapes ranging from New York's skyline to the red rock canyons of the West and tropical Hawaiian coasts.",
    bestTime: "Spring (April–May) and Autumn (September–October) for most cities.",
    budget: "$120–$250 / day mid-range.",
    foods: ["New York Style Pizza", "Texas Smoked Brisket BBQ", "New England Clam Chowder", "California Sourdough & Fresh Seafood", "Classic Cheeseburgers"],
    itinerary: [
      { day: 1, title: "Manhattan Icons", morning: "Walk across the Brooklyn Bridge for panoramic morning skyline views.", afternoon: "Visit the Statue of Liberty & Ellis Island, followed by Wall Street.", evening: "Broadway theater show followed by Times Square night lights." },
      { day: 2, title: "Central Park & Museum Mile", morning: "Stroll through Central Park's Bethesda Terrace and Bow Bridge.", afternoon: "Explore Egyptian temples and Impressionist art at the Metropolitan Museum.", evening: "Sunset views from the Top of the Rock observation deck." },
      { day: 3, title: "High Line & West Village", morning: "Elevated walkway along the High Line through Chelsea.", afternoon: "Browse Chelsea Market food hall and boutique shops in Greenwich Village.", evening: "Jazz club performance in the historic West Village." },
    ],
    tips: "Tipping (18–20%) is standard practice in restaurants, domestic flight distances are large so budget travel time, and book popular national park permits months in advance.",
  },
  unitedkingdom: {
    name: "United Kingdom",
    flag: "🇬🇧",
    overview: "Centuries of royal heritage, historic pub culture, dramatic Scottish Highlands, and cutting-edge global arts.",
    bestTime: "May to September for long daylight hours and mild temperatures.",
    budget: "$110–$240 / day mid-range.",
    foods: ["Traditional Sunday Roast with Yorkshire Pudding", "Beer-Battered Fish & Chips", "Full English Breakfast", "Afternoon Cream Tea with Scones", "Beef Wellington"],
    itinerary: [
      { day: 1, title: "Royal & Historic London", morning: "Watch the Changing of the Guard at Buckingham Palace.", afternoon: "Tour Westminster Abbey and admire Big Ben along the River Thames.", evening: "Ride the London Eye for twilight skyline views followed by a Covent Garden pub dinner." },
      { day: 2, title: "Tower & Cultural South Bank", morning: "Explore the historic Tower of London and Crown Jewels.", afternoon: "Walk across Tower Bridge and explore the Tate Modern art gallery.", evening: "Catch a West End musical in London's premier theater district." },
      { day: 3, title: "Museums & Royal Parks", morning: "Discover Rosetta Stone at the British Museum.", afternoon: "Stroll through Hyde Park to Kensington Palace and Harrods in Knightsbridge.", evening: "Traditional afternoon tea at a classic luxury London hotel." },
    ],
    tips: "Use contactless card payments for London Underground (the Tube)—it's cheaper than paper tickets, and always pack an umbrella for sudden passing showers.",
  },
  mumbai: {
    name: "Mumbai",
    flag: "🇮🇳",
    overview: "The vibrant financial and cinematic capital of India on the Arabian Sea, packed with colonial Gothic marvels and seaside charm.",
    bestTime: "November to February (pleasant sea breeze, mild humidity).",
    budget: "$35–$95 / day mid-range; $220+ for the historic Taj Mahal Palace hotel.",
    foods: ["Vada Pav (Mumbai's iconic burger)", "Pav Bhaji at Sardar Refreshments", "Bombay Duck & Coastal Seafood", "Pani Puri at Chowpatty Beach", "Cutting Chai with Bun Maska"],
    itinerary: [
      { day: 1, title: "Colonial Splendor & the Gateway", morning: "Stand before the monumental Gateway of India and the iconic 1903 Taj Mahal Palace.", afternoon: "Take a ferry to the rock-cut 5th-century Elephanta Island Caves.", evening: "Sunset stroll along the curving Queen's Necklace at Marine Drive." },
      { day: 2, title: "Markets, Heritage & Dabbawalas", morning: "Watch the legendary dabbawala lunchbox sorting at Churchgate Station.", afternoon: "Tour the Victorian Gothic UNESCO masterpiece Chhatrapati Shivaji Maharaj Terminus.", evening: "Explore the bustling street stalls of Colaba Causeway and Crawford Market." },
      { day: 3, title: "Bollywood, Art & Bandra", morning: "Visit the serene Haji Ali Dargah mosque floating in the bay.", afternoon: "Explore the artsy cafes, heritage Portuguese bungalows, and street art in Bandra.", evening: "Seafood dinner at Bandra Bandstand catching ocean breezes under the stars." },
    ],
    tips: "Take local black-and-yellow taxis or ride-hailing apps, visit Marine Drive between 6 PM - 8 PM for the best atmospheric sunset, and drink filtered/bottled water.",
  },
};

// General Knowledge Base for Common Travel Inquiries
const GENERAL_TOPICS = {
  packing: `🎒 **Essential Travel Packing Guide:**\n\n1. **Electronics:** Universal travel plug adapter with multiple USB-C ports, 10,000mAh power bank, noise-cancelling headphones.\n2. **Clothing:** High-versatility capsule wardrobe with breathable moisture-wicking fabrics, lightweight rain shell, and broken-in walking sneakers (minimum 15,000 steps/day comfort).\n3. **Health & Documents:** Digital and physical photocopies of your passport and visas, personal first-aid pouch with hydration salts and basic medications.\n4. **Security:** RFID-blocking card sleeve, lightweight crossbody bag worn in front in crowded areas.\n\n*Pro Tip: Roll clothes rather than folding to save up to 30% luggage space!*`,

  budget: `💰 **Smart Travel Budget Strategies:**\n\n* **Budget Level:** Southeast Asia (Vietnam, Bali, Thailand) and India offer luxury experiences starting from **$35–$70/day**.\n* **Mid-Range Level:** Southern Europe (Spain, Portugal, Greece) runs **$80–$150/day** with boutique hotels and fabulous wine/dining.\n* **High-End Level:** Switzerland, Scandinavia, and Japan average **$150–$300+/day**.\n* **Best Savings Tip:** Dine at busy local neighborhood markets for lunch (often half the price of evening dining), buy multi-day metro transit passes, and travel in shoulder seasons (April-May or Sept-Oct) for 40% hotel discounts.`,

  safety: `🛡️ **Worldwide Travel Safety Essentials:**\n\n1. **Digital Backup:** Save digital copies of passports, travel insurance, and hotel vouchers in an encrypted offline cloud folder.\n2. **Street Savvy:** Keep your phone and wallet secure in zipped pockets in busy train stations and tourist plazas.\n3. **Local Emergency Numbers:** Save the local emergency dispatch number (e.g. 112 in Europe, 100 in India, 911 in USA/Canada) before departing.\n4. **Connectivity:** Buy an eSIM (Airalo or Holafly) before landing so you have instant GPS navigation and ride-hailing from the airport.`,
};

// Main Intelligent Travel Brain Responder
export function generateTravelAssistantResponse(userPrompt) {
  const q = userPrompt.trim().toLowerCase();

  // 1. Identify destination mentions in the prompt
  let matchedDestination = null;

  for (const [key, dest] of Object.entries(DESTINATION_KNOWLEDGE)) {
    if (
      q.includes(key) ||
      q.includes(dest.name.toLowerCase()) ||
      (key === "unitedstates" && (q.includes("usa") || q.includes("america") || q.includes("new york"))) ||
      (key === "unitedkingdom" && (q.includes("uk") || q.includes("london") || q.includes("england") || q.includes("scotland")))
    ) {
      matchedDestination = dest;
      break;
    }
  }

  // 2. Specific Itinerary Requests for a matched destination
  if (matchedDestination) {
    const isItineraryQuery =
      q.includes("itinerary") ||
      q.includes("plan") ||
      q.includes("days") ||
      q.includes("day") ||
      q.includes("what to do") ||
      q.includes("trip") ||
      q.includes("visit") ||
      q.includes("places") ||
      q.includes("travel");

    const isFoodQuery =
      q.includes("food") ||
      q.includes("eat") ||
      q.includes("dining") ||
      q.includes("cuisine") ||
      q.includes("dishes") ||
      q.includes("restaurant");

    const isTimeQuery =
      q.includes("when") ||
      q.includes("best time") ||
      q.includes("season") ||
      q.includes("weather") ||
      q.includes("month");

    const isCostQuery =
      q.includes("budget") ||
      q.includes("cost") ||
      q.includes("price") ||
      q.includes("how much") ||
      q.includes("expensive");

    if (isFoodQuery) {
      return `${matchedDestination.flag} **Culinary Guide to ${matchedDestination.name}:**\n\n${matchedDestination.name} offers an extraordinary culinary culture. Here are the signature dishes you must experience:\n\n` +
        matchedDestination.foods.map((food, i) => `* **${food}**`).join("\n") +
        `\n\n💡 **Dining Advice:** Dine where locals queue up, order regional specialties, and don't hesitate to ask your server for the house recommendation!`;
    }

    if (isTimeQuery) {
      return `☀️ **Optimal Season for ${matchedDestination.name} ${matchedDestination.flag}:**\n\n* **Best Time to Visit:** ${matchedDestination.bestTime}\n* **Atmospheric Overview:** ${matchedDestination.overview}\n* **Pacing Advice:** Shoulder seasons (spring and autumn) provide the ideal balance of pleasant temperatures, vibrant colors, and manageable visitor queues.`;
    }

    if (isCostQuery) {
      return `💵 **Travel Budget for ${matchedDestination.name} ${matchedDestination.flag}:**\n\n* **Daily Average:** ${matchedDestination.budget}\n* **Stay Options:** Boutique local hotels provide exceptional value, while luxury heritage palaces and 5-star suites offer unforgettable bucket-list luxury.\n* **Saving Advice:** Book regional train passes in advance and savor street markets or neighborhood bistros for authentic flavors at modest prices.`;
    }

    // Default: Detailed Itinerary Response
    let response = `${matchedDestination.flag} **Curated 3-Day Itinerary for ${matchedDestination.name}:**\n\n`;
    response += `*${matchedDestination.overview}*\n\n`;

    matchedDestination.itinerary.forEach((day) => {
      response += `### 🗓️ Day ${day.day}: ${day.title}\n`;
      response += `* **Morning:** ${day.morning}\n`;
      response += `* **Afternoon:** ${day.afternoon}\n`;
      response += `* **Evening:** ${day.evening}\n\n`;
    });

    response += `💡 **Local Insider Tip:** ${matchedDestination.tips}\n\n`;
    response += `*You can also head to our **Plan a Trip** tab in the top navigation to customize this into an interactive 1 to 14-day schedule!*`;
    return response;
  }

  // 3. General Travel Inquiries
  if (q.includes("pack") || q.includes("luggage") || q.includes("suitcase") || q.includes("clothes") || q.includes("what to wear")) {
    return GENERAL_TOPICS.packing;
  }

  if (q.includes("budget") || q.includes("cheap") || q.includes("cost") || q.includes("money") || q.includes("affordable")) {
    return GENERAL_TOPICS.budget;
  }

  if (q.includes("safe") || q.includes("safety") || q.includes("emergency") || q.includes("insurance")) {
    return GENERAL_TOPICS.safety;
  }

  // 4. Greetings and Conversational Questions
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.startsWith("hello") ||
    q.startsWith("hi ") ||
    q.includes("who are you") ||
    q.includes("help")
  ) {
    return `✨ **Welcome to Elsewhere Concierge!**\n\nI'm your luxury AI travel companion. I can help you with:\n\n* 🗺️ **Curated Itineraries:** Ask *"Can you give me an itinerary for India?"* or *"3 days in Japan"*.\n* 🍽️ **Food & Gastronomy:** Ask *"Best food to try in Italy"*.\n* 🗓️ **Timing & Seasons:** Ask *"When is the best time to visit Switzerland?"*.\n* 🎒 **Packing & Practicalities:** Ask *"What should I pack for Europe?"*.\n\nWhere in the world are you dreaming of heading next?`;
  }

  // 5. Dynamic Fallback for ANY other world destination or custom question!
  const words = userPrompt.split(/\s+/).filter((w) => w.length > 2);
  const potentialDestination = words[words.length - 1] || "your destination";
  const capitalizedPlace = potentialDestination.charAt(0).toUpperCase() + potentialDestination.slice(1);

  return `🌍 **Travel Guide & Recommendations for ${capitalizedPlace}:**\n\n` +
    `Here is an expert bespoke guide for your journey to **${capitalizedPlace}**:\n\n` +
    `### 🌟 Iconic Highlights\n` +
    `* **Historic Core & Culture:** Explore the historic avenues, iconic architecture, and vibrant local squares.\n` +
    `* **Scenic Landscapes:** Marvel at panoramic vantage points, coastal promenades, or mountain ridges.\n` +
    `* **Gastronomic Discovery:** Sample regional specialties and authentic dining at neighborhood markets.\n\n` +
    `### 🗓️ Recommended 3-Day Journey\n` +
    `* **Day 1:** Arrival, historic landmarks orientation, and scenic sunset dinner.\n` +
    `* **Day 2:** Signature cultural museums, architectural wonders, and authentic culinary tasting.\n` +
    `* **Day 3:** Scenic natural excursions or day-trip to surrounding picturesque villages.\n\n` +
    `### 💡 Practical Advice\n` +
    `* **Best Travel Season:** Spring (April–May) and Autumn (September–October) for ideal temperatures.\n` +
    `* **Preparation:** Book major attraction passes in advance and install digital transit maps on your phone.\n\n` +
    `*Tip: Go to our **Plan a Trip** builder to generate an itemized day-by-day itinerary tailored to your exact pace!*`;
}
