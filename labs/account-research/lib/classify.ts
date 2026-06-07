// Deterministic business-type classification. Grounded in real extracted
// signals (schema.org @types, CMS, physical-presence markers, tech footprint,
// Wikidata industry), never a model guess. Drives which signals we surface and
// how the brief reframes itself per vertical.

import type { SiteFacts, SiteScope } from "./extract";

export type Category =
  | "saas_tech"
  | "ecommerce"
  | "restaurant_food"
  | "local_service"
  | "professional_services"
  | "healthcare"
  | "media_content"
  | "nonprofit"
  | "other";

export type Classification = {
  category: Category;
  label: string;
  confidence: "high" | "medium" | "low";
  reason: string;
};

export type ClassifyInput = {
  facts: SiteFacts;
  hasGithub: boolean;
  hasHN: boolean;
  techNames: string[];
  scope?: SiteScope;
  wikidataIndustry?: string;
  /** name + description + title + slogan, for keyword fallback when a business
   * has no schema.org markup and no Wikidata industry (common for SMBs). */
  text?: string;
};

// High-precision content keywords for businesses with no schema/Wikidata.
// Deliberately unambiguous terms that effectively never appear in a tech
// company's copy, so this can safely run before the dev-footprint check.
const KEYWORD_VERTICALS: { category: Category; re: RegExp }[] = [
  {
    category: "healthcare",
    re: /\b(dental|dentist|orthodont|endodont|medical clinic|health (?:clinic|center|system)|hospital|pharmacy|physical therapy|veterinar|chiropract|dermatolog|optometr|urgent care|family medicine)\b/,
  },
  {
    category: "restaurant_food",
    re: /\b(restaurant|caf[eé]|coffee shop|bakery|steakhouse|pizzeria|brewery|winery|bar and grill|bar & grill|fine dining|eatery|food truck|our menu)\b/,
  },
    {
    category: "professional_services",
    re: /\b(law firm|attorneys?|lawyers?|legal services|\bllp\b|accounting firm|\bcpa\b|professional services|consult(?:ing|ancy)|advisory|insurance agency|real estate|realty|architecture firm|engineering firm|staffing|recruiting agency|marketing agency|\bad agency\b)\b/,
  },
  {
    category: "local_service",
    re: /\b(hair salon|nail salon|day spa|barber|gym|fitness studio|yoga studio|plumbing|\bhvac\b|roofing|landscap(?:e|ing)|cleaning service|auto repair|car dealership|dealership|hotel|resort|moving company|pest control|locksmith)\b/,
  },
  {
    category: "ecommerce",
    re: /\b(online store|shop now|free shipping|add to cart|our (?:collection|products)|boutique|apparel|skincare|cosmetics|jewelry)\b/,
  },
  {
    category: "media_content",
    re: /\b(magazine|newsroom|podcast network|our reporters|breaking news|publication|editorial team)\b/,
  },
];

function keywordVertical(text?: string): Category | null {
  if (!text) return null;
  const t = text.toLowerCase();
  for (const k of KEYWORD_VERTICALS) if (k.re.test(t)) return k.category;
  return null;
}

const LABELS: Record<Category, string> = {
  saas_tech: "Tech / SaaS",
  ecommerce: "E-commerce / D2C",
  restaurant_food: "Restaurant / Food & Beverage",
  local_service: "Local / Service business",
  professional_services: "Professional / B2B services",
  healthcare: "Healthcare",
  media_content: "Media / Content",
  nonprofit: "Nonprofit / Public",
  other: "Business",
};

export function categoryLabel(c: Category): string {
  return LABELS[c];
}

function typesMatch(facts: SiteFacts, re: RegExp): boolean {
  return facts.schemaTypes.some((t) => re.test(t));
}

export function classifyBusiness(input: ClassifyInput): Classification {
  const { facts, hasGithub, hasHN, techNames, scope, wikidataIndustry, text } =
    input;
  const ind = (wikidataIndustry || "").toLowerCase();
  const kw = keywordVertical(text);
  const hasPhysical = !!(facts.address || facts.openingHours?.length);
  const techNamesL = techNames.map((t) => t.toLowerCase());
  const hasEcomCms = facts.cmsHints.some((c) =>
    /shopify|woocommerce|bigcommerce/i.test(c)
  );
  const productPages = scope?.products || 0;
  // A real developer footprint, not just a React marketing site (every business
  // uses React now). GitHub/HN are definitive; product tooling is a weaker hint.
  const devFootprint = hasGithub || hasHN;
  const devTech = techNamesL.some((t) =>
    /segment|amplitude|posthog|intercom|stripe|vercel|datadog|sentry|launchdarkly/.test(t)
  );

  const mk = (
    category: Category,
    confidence: Classification["confidence"],
    reason: string
  ): Classification => ({ category, label: LABELS[category], confidence, reason });

  // Order: definitive, hard-to-fake signals first (food/health/nonprofit
  // schema or industry, e-commerce PLATFORM, real dev footprint), then weaker
  // heuristics. A SaaS with /products/ marketing pages must not read as a shop.

  // A. Food / hospitality
  if (
    typesMatch(
      facts,
      /Restaurant|FoodEstablishment|Cafe|Bakery|Bar(?!ber)|Brewery|Winery|IceCreamShop/
    ) ||
    (facts.servesCuisine?.length ?? 0) > 0 ||
    /restaurant|food|beverage|hospitality|catering|coffee|brewer/.test(ind)
  )
    return mk("restaurant_food", "high", "Food/hospitality schema or industry");

  // B. Healthcare
  if (
    typesMatch(
      facts,
      /Medical|Dentist|Physician|Hospital|HealthClub|Pharmacy|Optician|Nursing/
    ) ||
    /health|medical|dental|hospital|clinic|pharmaceutical|biotech/.test(ind)
  )
    return mk("healthcare", "high", "Healthcare schema or industry");

  // C. Nonprofit / public
  if (
    typesMatch(facts, /NGO|NonProfit|Church|GovernmentOrganization|Museum|Library/) ||
    /non-?profit|charit|government|religi|museum/.test(ind)
  )
    return mk("nonprofit", "high", "Nonprofit/public schema or industry");

  // D. Professional / B2B services (industry/schema beats a stray GitHub org)
  if (
    typesMatch(
      facts,
      /ProfessionalService|LegalService|FinancialService|InsuranceAgency|RealEstateAgent|AccountingService|TravelAgency|EmploymentAgency|Attorney/
    ) ||
    /legal|law firm|\blaw\b|accounting|consult|insurance|real estate|financial service|advisory|marketing agency|\bagency\b|architecture|staffing|logistics|manufactur/.test(
      ind
    )
  )
    return mk("professional_services", "high", "Professional-service schema or industry");

  // E. Media / content (schema or industry only; a content-heavy law firm or
  // SaaS blog must not read as media, so raw article count is NOT used here).
  if (
    typesMatch(facts, /NewsMediaOrganization|NewspaperPublication/) ||
    /media|publish|news|broadcast|magazine|entertainment/.test(ind)
  )
    return mk("media_content", "high", "Media/publishing schema or industry");

  // F. E-commerce platform (definitive)
  if (hasEcomCms) return mk("ecommerce", "high", "E-commerce platform detected");

  // G. Precise content keywords for the non-tech, physical verticals. Runs
  // BEFORE the dev-footprint check so a law firm or dental group with a GitHub
  // org (or HN mentions) is not mislabeled as a tech company.
  if (
    kw &&
    /^(healthcare|restaurant_food|professional_services|local_service)$/.test(kw)
  )
    return mk(kw, "medium", "Content keywords on site");

  // H. Real developer / tech footprint (definitive for what remains)
  if (devFootprint)
    return mk("saas_tech", "high", "Developer/tech footprint (GitHub/HN)");

  // I. Tech by industry or product tooling (medium)
  if (
    /software|saas|technology|internet|computer|artificial intelligence|developer|cloud|cyber|fintech|\bapi\b|information technology|web|platform/.test(
      ind
    ) ||
    (devTech && !hasPhysical)
  )
    return mk("saas_tech", "medium", "Tech industry or product tooling");

  // I. E-commerce by large catalog, no platform detected
  if (productPages >= 12 && !hasPhysical)
    return mk("ecommerce", "medium", "Large product catalog");

  // J. Local / service business
  if (
    typesMatch(
      facts,
      /LocalBusiness|Plumber|Electrician|Locksmith|BeautySalon|HairSalon|DaySpa|AutomotiveBusiness|HomeAndConstruction|SportsActivityLocation|Hotel|Lodging|EntertainmentBusiness|ChildCare|Dealer/
    ) ||
    (hasPhysical && productPages < 12)
  ) {
    const conf = typesMatch(facts, /LocalBusiness|Plumber|Salon|Spa|Hotel/)
      ? "high"
      : "medium";
    return mk("local_service", conf, "Local-business schema or physical presence");
  }

  // Store / shop schema without a known platform
  if (typesMatch(facts, /OnlineStore|Store|Shop/))
    return mk("ecommerce", "medium", "Store schema");

  // Final content-keyword fallback (catches e-commerce / media on schema-less sites)
  if (kw) return mk(kw, "low", "Content keywords on site");

  // Last resort: an overwhelmingly article-heavy site with no commerce or
  // physical presence is probably a publisher.
  if (!!scope && scope.articles >= 30 && scope.products === 0 && !hasPhysical)
    return mk("media_content", "low", "Predominantly article content");

  return mk("other", "low", "No decisive vertical signal");
}
