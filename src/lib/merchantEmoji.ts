// Pick an emoji that fits a merchant based on its name and/or category.
// Order matters — first match wins.
const RULES: Array<{ match: RegExp; emoji: string }> = [
  // Bakery / pastry
  { match: /b(ä|a)ckerei|bakery|boulanger|pastry|patisser|croissant|brot|bread/i, emoji: "🥐" },
  // Pizza
  { match: /pizza|pizzeria|napoli/i, emoji: "🍕" },
  // Burger
  { match: /burger|grill house|smash/i, emoji: "🍔" },
  // Sushi / Japanese
  { match: /sushi|sashimi|izakaya|japan/i, emoji: "🍣" },
  // Ramen / noodles
  { match: /ramen|noodle|pho|wok|asian/i, emoji: "🍜" },
  // Taco / mexican
  { match: /taco|burrito|cantina|mex/i, emoji: "🌮" },
  // Kebab / döner
  { match: /kebab|d(ö|o)ner|shawarma/i, emoji: "🥙" },
  // Indian
  { match: /curry|tandoor|india|masala|biryani/i, emoji: "🍛" },
  // Chinese
  { match: /china|chinese|dim ?sum|dumpling/i, emoji: "🥟" },
  // Coffee
  { match: /caf(é|e)|coffee|espresso|barista|kaffee|roaster/i, emoji: "☕" },
  // Tea / boba
  { match: /\btea\b|boba|bubble tea|matcha|chai/i, emoji: "🧋" },
  // Ice cream / gelato
  { match: /gelato|ice cream|eis|sorbet|frozen yog/i, emoji: "🍦" },
  // Donut
  { match: /donut|doughnut/i, emoji: "🍩" },
  // Cake / dessert
  { match: /cake|kuchen|dessert|sweets|chocolat|konditorei/i, emoji: "🍰" },
  // Bar / pub / wine / cocktails
  { match: /\bbar\b|pub|tavern|brewery|bier|beer|kneipe/i, emoji: "🍺" },
  { match: /wine|weinbar|vino/i, emoji: "🍷" },
  { match: /cocktail|lounge|speakeasy/i, emoji: "🍸" },
  // Salad / healthy / vegan
  { match: /salad|bowl|vegan|veggie|green|healthy/i, emoji: "🥗" },
  // Steak / butcher
  { match: /steak|grill|bbq|barbecue|metzger|butcher/i, emoji: "🥩" },
  // Fish / seafood
  { match: /fish|seafood|oyster|fischer/i, emoji: "🐟" },
  // Breakfast / brunch
  { match: /breakfast|brunch|fr(ü|u)hst(ü|u)ck/i, emoji: "🍳" },
  // Sandwich / deli
  { match: /sandwich|deli|sub|panini|bagel/i, emoji: "🥪" },
  // Generic restaurant / lunch / dinner
  { match: /restaurant|bistro|trattoria|osteria|lunch|dinner/i, emoji: "🍽️" },
  // Shops
  { match: /supermarket|market|markt|grocery/i, emoji: "🛒" },
  { match: /pharmacy|apotheke|drug/i, emoji: "💊" },
  { match: /flower|blumen|florist/i, emoji: "💐" },
  { match: /book|buch|libreria/i, emoji: "📚" },
  { match: /salon|hair|barber|fris(ö|o)r|beauty|spa/i, emoji: "💇" },
  { match: /gym|fitness|yoga|pilates/i, emoji: "🏋️" },
  { match: /cinema|kino|movie/i, emoji: "🎬" },
  { match: /music|concert|club|disco/i, emoji: "🎶" },
];

const FALLBACK = "📍";

/** Deterministic emoji guess based on merchant name (and optional category). */
export const emojiForMerchant = (
  merchant: string,
  category?: string,
): string => {
  const haystack = `${merchant ?? ""} ${category ?? ""}`.trim();
  if (!haystack) return FALLBACK;
  for (const r of RULES) {
    if (r.match.test(haystack)) return r.emoji;
  }
  return FALLBACK;
};
