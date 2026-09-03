// Curated multilingual phrasebook for Elsewhere destinations
// Supports native Web Speech API audio pronunciation

export const DESTINATION_PHRASES = {
  kyoto: {
    language: "Japanese (日本語)",
    code: "ja-JP",
    phrases: [
      { text: "Konnichiwa", script: "こんにちは", meaning: "Hello / Good day" },
      { text: "Arigatō gozaimasu", script: "ありがとうございます", meaning: "Thank you very much" },
      { text: "Kore wa ikura desu ka?", script: "これはいくらですか？", meaning: "How much does this cost?" },
      { text: "Eki wa doko desu ka?", script: "駅はどこですか？", meaning: "Where is the train station?" },
      { text: "Oishii desu!", script: "美味しいです！", meaning: "This is delicious!" },
      { text: "Sumimasen", script: "すみません", meaning: "Excuse me / Pardon" },
    ],
  },
  mumbai: {
    language: "Hindi & Marathi (हिंदी / मराठी)",
    code: "hi-IN",
    phrases: [
      { text: "Namaste", script: "नमस्ते", meaning: "Hello / Greetings" },
      { text: "Dhanyavaad", script: "धन्यवाद", meaning: "Thank you" },
      { text: "Yeh kitne ka hai?", script: "यह कितने का है?", meaning: "How much is this?" },
      { text: "Station kahan hai?", script: "स्टेशन कहाँ है?", meaning: "Where is the station?" },
      { text: "Bahut swadisht hai!", script: "बहुत स्वादिष्ट है!", meaning: "Very delicious!" },
      { text: "Aap kaise hain?", script: "आप कैसे हैं?", meaning: "How are you?" },
    ],
  },
  jaipur: {
    language: "Hindi (हिंदी)",
    code: "hi-IN",
    phrases: [
      { text: "Khamma Ghani", script: "खम्मा घणी", meaning: "Traditional Rajasthani Hello" },
      { text: "Dhanyavaad", script: "धन्यवाद", meaning: "Thank you" },
      { text: "Yeh kitne ka hai?", script: "यह कितने का है?", meaning: "How much is this?" },
      { text: "Fort kahan hai?", script: "किला कहाँ है?", meaning: "Where is the fort?" },
      { text: "Bahut sundar hai", script: "बहुत सुंदर है", meaning: "It is very beautiful" },
    ],
  },
  paris: {
    language: "French (Français)",
    code: "fr-FR",
    phrases: [
      { text: "Bonjour", script: "Bonjour", meaning: "Hello / Good day" },
      { text: "Merci beaucoup", script: "Merci beaucoup", meaning: "Thank you very much" },
      { text: "Combien ça coûte ?", script: "Combien ça coûte ?", meaning: "How much does this cost?" },
      { text: "Où est le métro ?", script: "Où est le métro ?", meaning: "Where is the metro?" },
      { text: "C'est délicieux !", script: "C'est délicieux !", meaning: "It is delicious!" },
      { text: "L'addition, s'il vous plaît", script: "L'addition, s'il vous plaît", meaning: "The bill, please" },
    ],
  },
  zurich: {
    language: "Swiss German (Deutsch)",
    code: "de-CH",
    phrases: [
      { text: "Grüezi", script: "Grüezi", meaning: "Traditional Swiss Hello" },
      { text: "Merci vielmal", script: "Merci vielmal", meaning: "Thank you very much" },
      { text: "Wie viel choschtet das?", script: "Wie viel choschtet das?", meaning: "How much is this?" },
      { text: "Wo isch de Bahnhof?", script: "Wo isch de Bahnhof?", meaning: "Where is the train station?" },
      { text: "Es isch fei!", script: "Es isch fei!", meaning: "It is delicious!" },
    ],
  },
  munich: {
    language: "German (Deutsch)",
    code: "de-DE",
    phrases: [
      { text: "Servus / Guten Tag", script: "Servus", meaning: "Hello (Bavarian style)" },
      { text: "Vielen Dank", script: "Vielen Dank", meaning: "Thank you very much" },
      { text: "Wie viel kostet das?", script: "Wie viel kostet das?", meaning: "How much does this cost?" },
      { text: "Wo ist der Hauptbahnhof?", script: "Wo ist der Hauptbahnhof?", meaning: "Where is the central station?" },
      { text: "Das ist wunderbar!", script: "Das ist wunderbar!", meaning: "This is wonderful!" },
    ],
  },
  venice: {
    language: "Italian (Italiano)",
    code: "it-IT",
    phrases: [
      { text: "Buongiorno", script: "Buongiorno", meaning: "Good morning / Hello" },
      { text: "Grazie mille", script: "Grazie mille", meaning: "A thousand thanks" },
      { text: "Quanto costa?", script: "Quanto costa?", meaning: "How much does it cost?" },
      { text: "Dov'è Piazza San Marco?", script: "Dov'è Piazza San Marco?", meaning: "Where is St. Mark's Square?" },
      { text: "È delizioso!", script: "È delizioso!", meaning: "It is delicious!" },
    ],
  },
  barcelona: {
    language: "Spanish & Catalan (Español / Català)",
    code: "es-ES",
    phrases: [
      { text: "¡Hola! Buenos días", script: "¡Hola!", meaning: "Hello / Good day" },
      { text: "Muchas gracias", script: "Muchas gracias", meaning: "Thank you very much" },
      { text: "¿Cuánto cuesta?", script: "¿Cuánto cuesta?", meaning: "How much is this?" },
      { text: "¿Dónde está la playa?", script: "¿Dónde está la playa?", meaning: "Where is the beach?" },
      { text: "¡Una ronda de tapas, por favor!", script: "Tapas por favor", meaning: "A round of tapas, please!" },
    ],
  },
  bali: {
    language: "Balinese & Indonesian (Bahasa)",
    code: "id-ID",
    phrases: [
      { text: "Om Swastiastu", script: "ᬑᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ", meaning: "Traditional Balinese Greeting" },
      { text: "Terima kasih", script: "Terima kasih", meaning: "Thank you" },
      { text: "Berapa harganya?", script: "Berapa harganya?", meaning: "How much does this cost?" },
      { text: "Di mana pantai?", script: "Di mana pantai?", meaning: "Where is the beach?" },
      { text: "Enak sekali!", script: "Enak sekali!", meaning: "Extremely delicious!" },
    ],
  },
};

export function getPhrasebookForDestination(destinationId, defaultCountry = "") {
  if (DESTINATION_PHRASES[destinationId]) {
    return DESTINATION_PHRASES[destinationId];
  }

  // Fallback for general countries
  const clean = defaultCountry.toLowerCase();
  if (clean.includes("india")) return DESTINATION_PHRASES.mumbai;
  if (clean.includes("japan")) return DESTINATION_PHRASES.kyoto;
  if (clean.includes("france")) return DESTINATION_PHRASES.paris;
  if (clean.includes("switzerland") || clean.includes("germany")) return DESTINATION_PHRASES.munich;
  if (clean.includes("italy")) return DESTINATION_PHRASES.venice;
  if (clean.includes("spain")) return DESTINATION_PHRASES.barcelona;

  // Universal international traveler phrasebook
  return {
    language: "International Travel Phrasings",
    code: "en-US",
    phrases: [
      { text: "Hello! Pleased to meet you.", script: "Hello", meaning: "Warm local greeting" },
      { text: "Thank you very much for your hospitality.", script: "Thank you", meaning: "Polite gratitude" },
      { text: "How much does this cost?", script: "Pricing", meaning: "Fair market inquiry" },
      { text: "Could you please point me to the main center?", script: "Directions", meaning: "Navigation assistance" },
      { text: "This regional specialty is delicious!", script: "Compliment", meaning: "Dining appreciation" },
    ],
  };
}
