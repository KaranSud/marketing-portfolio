import { extractSiteFacts, classifySitemap, parseSitemapUrls, detectAts } from "../lib/extract.ts";

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

console.log("\nextract.test done.");
