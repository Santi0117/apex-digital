/**
 * Smoke / integration checks for mi-portafolio.
 * Usage: node scripts/qa-smoke.mjs [baseUrl]
 */
const BASE = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");

const results = [];

function pass(name, detail = "") {
  results.push({ name, ok: true, detail });
  console.log(`✓ ${name}${detail ? ` — ${detail}` : ""}`);
}

function fail(name, detail = "") {
  results.push({ name, ok: false, detail });
  console.error(`✗ ${name}${detail ? ` — ${detail}` : ""}`);
}

async function fetchJson(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = { _raw: text.slice(0, 200) };
  }
  return { res, json };
}

async function testPages() {
  const routes = [
    "/",
    "/empresas",
    "/landing",
    "/pago/exito",
    "/pago/cancelado",
    "/robots.txt",
    "/sitemap.xml",
    "/manifest.webmanifest",
  ];

  for (const route of routes) {
    try {
      const res = await fetch(`${BASE}${route}`);
      if (res.ok) pass(`GET ${route}`, `${res.status}`);
      else fail(`GET ${route}`, `status ${res.status}`);
    } catch (e) {
      fail(`GET ${route}`, e.message);
    }
  }
}

async function testContactValidation() {
  const { res, json } = await fetchJson("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "bad" }),
  });
  if (res.status === 400) pass("POST /api/contact invalid email", "400");
  else fail("POST /api/contact invalid email", `status ${res.status} ${JSON.stringify(json)}`);
}

async function testContactHoneypot() {
  const { res, json } = await fetchJson("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      website: "http://spam.bot",
      email: "spam@test.com",
    }),
  });
  if (res.ok && json.ok) pass("POST /api/contact honeypot", "silent ok");
  else fail("POST /api/contact honeypot", JSON.stringify(json));
}

async function testContactInsert() {
  const stamp = Date.now();
  const payload = {
    email: `qa+${stamp}@onvisiondigital.com`,
    name: "QA Smoke Test",
    phone: "+50688889999",
    service: "Sitios web",
    interest: "Prueba automatizada de formulario — ignorar.",
    budget: "Menos de $500",
  };
  const { res, json } = await fetchJson("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.ok && json.ok) pass("POST /api/contact insert", payload.email);
  else fail("POST /api/contact insert", `${res.status} ${JSON.stringify(json)}`);
}

async function testBookingMonth() {
  const month = new Date().toISOString().slice(0, 7);
  const { res, json } = await fetchJson(`/api/booking?month=${month}`);
  if (res.ok && Array.isArray(json.booked)) pass("GET /api/booking", `${json.booked.length} booked`);
  else fail("GET /api/booking", JSON.stringify(json));
}

async function testBookingValidation() {
  const { res } = await fetchJson("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "not-an-email" }),
  });
  if (res.status === 400) pass("POST /api/booking invalid", "400");
  else fail("POST /api/booking invalid", `status ${res.status}`);
}

async function testChat() {
  const { res, json } = await fetchJson("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "¿Cuánto cuesta un sitio web?", locale: "es" }),
  });
  if (res.ok && json.reply) pass("POST /api/chat", json.provider || "ok");
  else fail("POST /api/chat", JSON.stringify(json));
}

async function testOnvoCheckout() {
  const bad = await fetchJson("/api/checkout/onvo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  if (bad.res.status === 400) pass("POST /api/checkout/onvo missing planId", "400");
  else fail("POST /api/checkout/onvo missing planId", `${bad.res.status}`);

  const good = await fetchJson("/api/checkout/onvo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      planId: "web-standard",
      planName: "Página estándar",
      categoryLabel: "Sitios web",
      companyName: "QA Test",
    }),
  });
  if (good.res.ok && good.json.url?.includes("onvopay")) {
    pass("POST /api/checkout/onvo web-standard", "Onvo URL returned");
  } else if (good.res.status === 503) {
    pass("POST /api/checkout/onvo web-standard", "503 — Onvo not configured in this env");
  } else {
    fail("POST /api/checkout/onvo web-standard", `${good.res.status} ${JSON.stringify(good.json)}`);
  }
}

async function testSupabaseFromServer() {
  // Indirect: contact insert already tests DB if configured
}

async function main() {
  console.log(`\nQA smoke — ${BASE}\n`);
  await testPages();
  await testContactValidation();
  await testContactHoneypot();
  await testContactInsert();
  await testBookingMonth();
  await testBookingValidation();
  await testChat();
  await testOnvoCheckout();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} passed`);
  if (failed.length) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
