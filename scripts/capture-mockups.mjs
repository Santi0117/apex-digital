import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mockupsDir = path.join(root, "public/projects/mockups");
const outDir = path.join(root, "public/projects");

/** Cada proyecto del portafolio → HTML mockup → captura JPG */
const shots = [
  { html: "corporativa.html", out: "consultora-legal.jpg", label: "Consultora legal" },
  { html: "saas.html", out: "panel-inventario.jpg", label: "Panel inventario" },
  { html: "ecommerce.html", out: "tienda-artesanias.jpg", label: "E-commerce" },
  { html: "constructora.html", out: "constructora-inmobiliaria.jpg", label: "Constructora" },
  { html: "landing.html", out: "estudio-arquitectura.jpg", label: "Arquitectura" },
];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

for (const { html, out, label } of shots) {
  const filePath = path.join(mockupsDir, html);
  await page.goto(`file://${filePath}`, { waitUntil: "networkidle0" });
  await page.screenshot({
    path: path.join(outDir, out),
    type: "jpeg",
    quality: 90,
    clip: { x: 0, y: 0, width: 1280, height: 720 },
  });
  console.log(`✓ ${label} → ${out}`);
}

await browser.close();
