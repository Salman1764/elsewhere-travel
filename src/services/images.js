// Curated high-resolution fallback photography for destinations and landmarks
const destinationFallbacks = {
  kyoto:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85",
  bali:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85",
  paris:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85",
  "cape-town":
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=85",
  santorini:
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=85",
  "new-york":
    "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1400&q=85",
  marrakech:
    "https://images.unsplash.com/photo-1517821099606-cef63a9bcab6?auto=format&fit=crop&w=1400&q=85",
  bangkok:
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=85",
  tokyo:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=85",
  rome:
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1400&q=85",
  barcelona:
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1400&q=85",
  sydney:
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1400&q=85",
  cairo:
    "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1400&q=85",
  dubai:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85",
  london:
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=85",
  "rio-de-janeiro":
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1400&q=85",
  mumbai:
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=85",
  zurich:
    "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1400&q=85",
  jaipur:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85",
  munich:
    "https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&w=1400&q=85",
  venice:
    "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1400&q=85",
  prague:
    "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1400&q=85",
  vienna:
    "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1400&q=85",
  banff:
    "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1400&q=85",
  reykjavik:
    "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1400&q=85",
  queenstown:
    "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1400&q=85",
  seoul:
    "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1400&q=85",
  lisbon:
    "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1400&q=85",
  amsterdam:
    "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1400&q=85",
  cusco:
    "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1400&q=85",
  singapore:
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=85",
  florence:
    "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1400&q=85",
  bengaluru:
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1400&q=85",
  bangalore:
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1400&q=85",
  mysuru:
    "https://images.unsplash.com/photo-1600100397608-f010f421a97d?auto=format&fit=crop&w=1400&q=85",
  mysore:
    "https://images.unsplash.com/photo-1600100397608-f010f421a97d?auto=format&fit=crop&w=1400&q=85",
  chitradurga:
    "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1400&q=85",
  india:
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=85",
  switzerland:
    "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1400&q=85",
  germany:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1400&q=85",
  norway:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
};

const famousPlaceFallbacks = {
  // Kyoto
  "Fushimi Inari Taisha":
    "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1200&q=85",
  "Kinkaku-ji":
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
  "Arashiyama Bamboo Grove":
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=85",

  // Bali
  "Uluwatu Temple":
    "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=85",
  "Tegallalang Rice Terraces":
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
  "Mount Batur":
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85",

  // Paris
  "Eiffel Tower":
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
  "Louvre Museum":
    "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=85",
  "Montmartre & Sacré-Cœur":
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=85",

  // Cape Town
  "Table Mountain":
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85",
  "Boulders Beach":
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85",
  "V&A Waterfront":
    "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=85",

  // Santorini
  "Oia Village":
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
  "Fira":
    "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1200&q=85",
  "Red Beach":
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",

  // New York
  "Central Park":
    "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?auto=format&fit=crop&w=1200&q=85",
  "Statue of Liberty":
    "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1200&q=85",
  "Brooklyn Bridge":
    "https://images.unsplash.com/photo-1546436836-07a91091f160?auto=format&fit=crop&w=1200&q=85",

  // Marrakech
  "Jemaa el-Fnaa":
    "https://images.unsplash.com/photo-1517821099606-cef63a9bcab6?auto=format&fit=crop&w=1200&q=85",
  "Bahia Palace":
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
  "Jardin Majorelle":
    "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=85",

  // Bangkok
  "The Grand Palace":
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=85",
  "Wat Arun":
    "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=85",
  "Chatuchak Weekend Market":
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",

  // Tokyo
  "Shibuya Crossing":
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
  "Senso-ji Temple":
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=85",
  "Meiji Shrine":
    "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?auto=format&fit=crop&w=1200&q=85",

  // Rome
  "The Colosseum":
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=85",
  "Trevi Fountain":
    "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=85",
  "Vatican Museums & Sistine Chapel":
    "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=85",

  // Barcelona
  "Sagrada Família":
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=85",
  "Park Güell":
    "https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?auto=format&fit=crop&w=1200&q=85",
  "Gothic Quarter (Barri Gòtic)":
    "https://images.unsplash.com/photo-1579282240050-352db0a14c21?auto=format&fit=crop&w=1200&q=85",

  // Sydney
  "Sydney Opera House":
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=85",
  "Bondi Beach":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
  "Sydney Harbour Bridge":
    "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=85",

  // Cairo
  "Giza Pyramids & The Sphinx":
    "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=85",
  "Grand Egyptian Museum":
    "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=85",
  "Khan el-Khalili Bazaar":
    "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=1200&q=85",

  // Dubai
  "Burj Khalifa":
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
  "Dubai Marina":
    "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=85",
  "Museum of the Future":
    "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=85",

  // London
  "Tower Bridge & Tower of London":
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
  "British Museum":
    "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=85",
  "Westminster Abbey & Big Ben":
    "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=85",

  // Rio
  "Christ the Redeemer":
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=85",
  "Copacabana & Ipanema Beaches":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
  "Sugarloaf Mountain (Pão de Açúcar)":
    "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=85",

  // Mumbai
  "Gateway of India":
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=85",
  "Marine Drive & Chowpatty":
    "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1200&q=85",
  "Chhatrapati Shivaji Maharaj Terminus":
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=85",

  // Bengaluru
  "Lalbagh Botanical Garden & Glass House":
    "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1200&q=85",
  "Lalbagh Botanical Garden":
    "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1200&q=85",
  "Bangalore Palace":
    "https://images.unsplash.com/photo-1600100397608-f010f421a97d?auto=format&fit=crop&w=1200&q=85",
  "Cubbon Park & Vidhana Soudha":
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
  "Vidhana Soudha":
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
  "Cubbon Park":
    "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=85",
  "ISKCON Temple Bengaluru":
    "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=1200&q=85",
  "Tipu Sultan's Summer Palace":
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",

  // Mysuru
  "Mysore Palace (Amba Vilas)":
    "https://images.unsplash.com/photo-1600100397608-f010f421a97d?auto=format&fit=crop&w=1200&q=85",
  "Mysore Palace":
    "https://images.unsplash.com/photo-1600100397608-f010f421a97d?auto=format&fit=crop&w=1200&q=85",
  "Chamundi Hill & Sri Chamundeshwari Temple":
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
  "Chamundi Hill":
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
  "Brindavan Gardens & Musical Fountains":
    "https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?auto=format&fit=crop&w=1200&q=85",
  "Brindavan Gardens":
    "https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?auto=format&fit=crop&w=1200&q=85",

  // Chitradurga
  "Chitradurga Fort (Kallina Kote)":
    "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=85",
  "Chitradurga Fort":
    "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=85",
  "Chandravalli Caves & Ancient Lake":
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85",
  "Chandravalli Caves":
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85",
  "Vani Vilasa Sagara (Mari Kanive)":
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
};

export function getDestinationQuery(destination) {
  return `${destination.name} ${destination.country} travel`;
}

export function getFamousPlaceQuery(place, destination) {
  return `${place.name} ${destination.country}`;
}

export function getFallbackImage(query, width = 1400) {
  if (!query) return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=" + width + "&q=85";
  const cleanQuery = query.toLowerCase();

  // Check exact famous place name (longest specific names first!)
  const sortedFamous = Object.keys(famousPlaceFallbacks).sort((a, b) => b.length - a.length);
  for (const name of sortedFamous) {
    const cleanName = name.toLowerCase();
    if (cleanQuery.includes(cleanName) || cleanName.includes(cleanQuery)) {
      return famousPlaceFallbacks[name];
    }
  }

  // Check destination ID or city name (longest names first: e.g. "bengaluru" before "india")
  const sortedDests = Object.keys(destinationFallbacks).sort((a, b) => b.length - a.length);
  for (const id of sortedDests) {
    if (cleanQuery.includes(id.toLowerCase())) {
      return destinationFallbacks[id];
    }
  }

  return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=" + width + "&q=85";
}