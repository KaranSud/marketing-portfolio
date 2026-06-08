import { extractSiteFacts, classifySitemap, parseSitemapUrls, detectAts, extractPeople, mergeFacts, pickDeepTargets, inferEmails } from "../lib/extract.ts";

const restaurantHtml = `
<html><head>
<meta property="og:site_name" content="Bella Trattoria" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Restaurant","name":"Bella Trattoria",
"servesCuisine":["Italian","Pizza"],"priceRange":"$$","telephone":"+1-212-555-0100",
"address":{"@type":"PostalAddress","streetAddress":"12 Mott St","addressLocality":"New York","addressRegion":"NY","postalCode":"10013","addressCountry":"US"},
"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.6","reviewCount":"328","bestRating":"5"},
"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday"],"opens":"11:00","closes":"22:00"}],
"sameAs":["https://instagram.com/bella","https://facebook.com/bella"],
"foundingDate":"2009-05-01","numberOfEmployees":42}
</script></head><body>Welcome</body></html>`;

const graphHtml = `<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[
{"@type":"WebSite","name":"Acme"},
{"@type":["Organization","Store"],"name":"Acme Goods","sameAs":["https://x.com/acme"]}
]}</script>`;

function assert(cond: boolean, msg: string) {
  console.log((cond ? "PASS" : "FAIL") + " - " + msg);
  if (!cond) process.exitCode = 1;
}

const f = extractSiteFacts(restaurantHtml);
assert(f.schemaTypes.includes("Restaurant"), "restaurant @type detected");
assert(f.name === "Bella Trattoria", "name = " + f.name);
assert(JSON.stringify(f.servesCuisine) === JSON.stringify(["Italian", "Pizza"]), "cuisine = " + JSON.stringify(f.servesCuisine));
assert(f.priceRange === "$$", "priceRange = " + f.priceRange);
assert(f.phone === "+1-212-555-0100", "phone = " + f.phone);
assert(!!f.address && f.address.includes("12 Mott St") && f.address.includes("New York"), "address = " + f.address);
assert(f.rating?.value === 4.6 && f.rating?.count === 328 && f.rating?.best === 5, "rating = " + JSON.stringify(f.rating));
assert(!!f.openingHours && f.openingHours[0] === "Mon, Tue, Wed 11:00-22:00", "hours = " + JSON.stringify(f.openingHours));
assert(f.founded === "2009", "founded = " + f.founded);
assert(f.employees === "42", "employees = " + f.employees);
assert(f.sameAs.length === 2, "sameAs count = " + f.sameAs.length);

const g = extractSiteFacts(graphHtml);
assert(g.name === "Acme Goods", "@graph org picked = " + g.name);
assert(g.schemaTypes.includes("Store"), "@graph Store type = " + JSON.stringify(g.schemaTypes));

const urls = parseSitemapUrls(`<urlset><url><loc>https://x.com/products/a</loc></url><url><loc>https://x.com/collections/b</loc></url><url><loc>https://x.com/blog/c</loc></url><url><loc>https://x.com/locations/d</loc></url></urlset>`);
const scope = classifySitemap(urls);
assert(scope.urls === 4 && scope.products === 2 && scope.articles === 1 && scope.locations === 1, "sitemap scope = " + JSON.stringify(scope));

const ats = detectAts(`<a href="https://boards.greenhouse.io/acmeco">Jobs</a>`);
assert(ats?.provider === "greenhouse" && ats.token === "acmeco", "greenhouse token = " + JSON.stringify(ats));

const peopleHtml = `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Organization","name":"Acme",
"founder":{"@type":"Person","name":"Jane Doe","jobTitle":"CEO","sameAs":["https://www.linkedin.com/in/janedoe"]},
"employee":[{"@type":"Person","name":"John Smith","jobTitle":"Head of Sales"},{"@type":"Person","name":"Acme Corporation Worldwide Holdings Limited"}]}
</script>`;
const people = extractPeople(peopleHtml);
assert(people.length === 2, "people count (junk name filtered) = " + people.length);
assert(people[0].name === "Jane Doe" && people[0].role === "CEO" && !!people[0].linkedin?.includes("janedoe"), "CEO ranked first = " + JSON.stringify(people[0]));
assert(people[1].name === "John Smith" && people[1].role === "Head of Sales", "second person = " + JSON.stringify(people[1]));

const baseF = extractSiteFacts(`<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"Chain HQ"}</script>`);
const merged = mergeFacts(baseF, f);
assert(merged.name === "Chain HQ", "merge keeps base name = " + merged.name);
assert(!!merged.address && !!merged.rating && merged.priceRange === "$$", "merge fills address/rating/price from deep page");

const deep = pickDeepTargets(["https://x.com/about", "https://x.com/locations/nyc-soho", "https://x.com/products/blue-shoe", "https://x.com/blog/post"]);
assert(deep.length === 2 && deep[0].includes("/locations/") && deep[1].includes("/products/"), "deep targets = " + JSON.stringify(deep));

// Email inference: fires only from a real matching address, stays conservative.
const inf1 = inferEmails(["jane.doe@acme.com", "info@acme.com"], "acme.com", [{ name: "Jane Doe" }, { name: "Bob Lee" }]);
assert(inf1.pattern === "{first}.{last}@acme.com", "inferred pattern = " + inf1.pattern);
assert(inf1.likely.length === 1 && inf1.likely[0].email === "bob.lee@acme.com", "likely for other leader = " + JSON.stringify(inf1.likely));
const inf2 = inferEmails(["info@acme.com", "sales@acme.com"], "acme.com", [{ name: "Jane Doe" }]);
assert(!inf2.pattern && inf2.likely.length === 0, "no inference from only generic emails = " + JSON.stringify(inf2));
const inf3 = inferEmails(["jane.doe@other.com"], "acme.com", [{ name: "Jane Doe" }]);
assert(!inf3.pattern, "no inference from off-domain email = " + JSON.stringify(inf3));

console.log("\nextract.test done.");
