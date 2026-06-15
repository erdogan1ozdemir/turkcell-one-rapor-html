/**
 * Turkcell One raporu - ekran görüntüsü yakalama (Playwright)
 * Bu ortamda (Cowork) tarayıcı ss'leri diske kaydedilemediğinden hazırlandı.
 * Claude Code / lokal ortamda çalıştırılır; çıktılar assets/screenshots/ altına kaydedilir,
 * dosya adları raporun (index.html) beklediği adlarla birebir aynıdır.
 *
 * Kurulum:
 *   npm i playwright
 *   npx playwright install chromium
 * Çalıştırma (proje kökünde, turkcell-one-html/ içinde):
 *   node scripts/capture-screenshots.mjs
 *
 * Not: Google SERP / AI Overview / Trends ve X bot korumalı olabilir.
 *  - headless:false ile (görünür pencere) daha sağlıklı çalışır.
 *  - X (Twitter) için giriş gerekebilir; gerekirse storageState ile oturum verilebilir.
 *  - Çerez/izin banner'ları otomatik kapatılmaya çalışılır; gerekirse manuel kapatın.
 */
import { chromium, devices } from "playwright";
import fs from "fs";
import path from "path";

const OUT = path.resolve("assets/screenshots");
fs.mkdirSync(OUT, { recursive: true });

const MOBILE = { ...devices["iPhone 13"], locale: "tr-TR" };
const DESKTOP = { viewport: { width: 1440, height: 900 }, locale: "tr-TR", deviceScaleFactor: 2 };

// name: kaydedilecek dosya · url · device · scroll(px, opsiyonel) · clipHeight(opsiyonel) · wait(ms)
const SHOTS = [
  // --- Turkcell hub & paket sayfaları ---
  { name: "hub-hero-desktop.png", url: "https://www.turkcell.com.tr/turkcellone/", device: "d", clipH: 820, wait: 2500 },
  { name: "hub-hero-mobile.png", url: "https://www.turkcell.com.tr/turkcellone/", device: "m", clipH: 1400, wait: 2500 },
  { name: "hub-packages-desktop.png", url: "https://www.turkcell.com.tr/turkcellone/", device: "d", scrollTo: "Size En Uygun Paketi", wait: 2500 },
  { name: "listing-desktop.png", url: "https://www.turkcell.com.tr/paket-ve-tarifeler/turkcell-one", device: "d", clipH: 900, wait: 2500 },
  { name: "listing-mobile.png", url: "https://www.turkcell.com.tr/paket-ve-tarifeler/turkcell-one", device: "m", clipH: 1500, wait: 2500 },
  { name: "detail-mobile.png", url: "https://www.turkcell.com.tr/paket-ve-tarifeler/turkcell-one/turkcell-one-plus", device: "m", clipH: 1500, wait: 2500 },

  // --- SERP / AI Overview / Trends (Google TR) ---
  { name: "serp-turkcell-one-desktop.png", url: "https://www.google.com/search?q=turkcell+one&hl=tr&gl=tr", device: "d", clipH: 1100, wait: 2500 },
  { name: "aio-turkcell-one-nedir-desktop.png", url: "https://www.google.com/search?q=turkcell+one+nedir&hl=tr&gl=tr", device: "d", clipH: 1000, wait: 2500 },
  { name: "serp-turkcell-one-mobile.png", url: "https://www.google.com/search?q=turkcell+one&hl=tr&gl=tr", device: "m", clipH: 1600, wait: 2500 },
  { name: "trends-turkcell-one-desktop.png", url: "https://trends.google.com/trends/explore?date=today%203-m&geo=TR&q=turkcell%20one&hl=tr", device: "d", clipH: 1100, wait: 5000 },

  // --- Rakip sayfaları (mobil, içerik görünür) ---
  { name: "donanimhaber-mobile.png", url: "https://www.donanimhaber.com/turkcell-one-tek-abonelikle-netflix-youtube-hbo-max-bir-arada--206627", device: "m", fullPage: true, wait: 2500 },
  { name: "webtekno-mobile.png", url: "https://www.webtekno.com/turkcell-netflix-hbo-max-prime-video-youtube-premium-ortak-abonelik-paketi-duyurdu-h218160.html", device: "m", fullPage: true, wait: 2500 },
  { name: "eksi-mobile.png", url: "https://eksisozluk.com/turkcell-one--8107934", device: "m", fullPage: true, wait: 2500 },
  { name: "sikayetvar-mobile.png", url: "https://www.sikayetvar.com/turkcell", device: "m", clipH: 1600, wait: 2500 },

  // --- X (Twitter) - giriş gerekebilir ---
  { name: "x-search-mobile.png", url: "https://x.com/search?q=turkcell%20one&f=live", device: "m", clipH: 1800, wait: 4000 },
];

async function dismissBanners(page) {
  const labels = ["Kabul", "Tümünü kabul", "Kabul Et", "Accept all", "Reddet", "Tümünü reddet", "Onayla", "Anladım", "Tamam"];
  for (const l of labels) {
    try { const b = page.getByRole("button", { name: new RegExp(l, "i") }); if (await b.first().isVisible({ timeout: 600 })) { await b.first().click({ timeout: 800 }); } } catch {}
  }
}

const run = async () => {
  const browser = await chromium.launch({ headless: false }); // SERP/AI için görünür pencere önerilir
  const results = [];
  for (const s of SHOTS) {
    const ctx = await browser.newContext(s.device === "m" ? MOBILE : DESKTOP);
    const page = await ctx.newPage();
    try {
      await page.goto(s.url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
      await page.waitForTimeout(s.wait || 2000);
      await dismissBanners(page);
      await page.waitForTimeout(600);
      if (s.scrollTo) { try { await page.getByText(new RegExp(s.scrollTo, "i")).first().scrollIntoViewIfNeeded({ timeout: 3000 }); await page.waitForTimeout(800); } catch {} }
      const file = path.join(OUT, s.name);
      const opts = { path: file };
      if (s.fullPage) opts.fullPage = true;
      else if (s.clipH) opts.clip = { x: 0, y: 0, width: s.device === "m" ? 390 : 1440, height: s.clipH };
      await page.screenshot(opts);
      results.push(`OK   ${s.name}`);
      console.log("OK  ", s.name);
    } catch (e) {
      results.push(`FAIL ${s.name} -> ${e.message}`);
      console.log("FAIL", s.name, e.message);
    } finally { await ctx.close(); }
  }
  await browser.close();
  console.log("\n--- ÖZET ---\n" + results.join("\n"));
};
run();
