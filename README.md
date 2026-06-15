# Turkcell One · Rakip Analizi & SEO/GEO Raporu (HTML)

Tek dosyalık, kendi içinde çalışan HTML rapor. `index.html` + `assets/screenshots/`.

## İçerik
- Yönetici özeti + KPI gösterge paneli
- SERP & marka görünürlüğü (canlı DataForSEO SERP + gözlem)
- **AI Overview & GEO** analizi (atıf payı, oyun planı)
- Keyword & talep peyzajı (DataForSEO + Ahrefs)
- Rakip teardown (editöryel/UGC + operatörler), sekmeli
- Kullanıcı soruları & içerik boşlukları (Ekşi + PAA)
- Sayfa & teknik SEO + önceliklendirilmiş öneriler
- Fırsat sayfaları

## Özellikler
- Yapışkan bölüm navigasyonu (scrollspy), sekmeler, sıralanabilir/filtrelenebilir tablolar
- Chart.js grafikleri (CDN), CSS heat-map matrisleri
- Screenshot grid + tıkla-büyüt (lightbox)
- Mobil + masaüstü responsive · Turkcell marka renkleri

## Deploy (Vercel)
Statik site; ekstra yapılandırma gerekmez.
```bash
# repo köküne bu klasör pushlandıktan sonra
# Vercel: Framework Preset = Other, Output dir = . (kök)
```
Chart.js cdnjs üzerinden yüklenir (internet gerekir). Görseller relatif yoldan gelir; klasör yapısını koru.

## Notlar
- Veri: DataForSEO MCP (TR: Google Ads hacim, Labs KD, canlı SERP + AI Overview, Google Trends, on_page ölçümü) + Ahrefs çapraz + canlı gözlem + Ekşi + müşteri SEO dokümanı (15 Haz 2026).
- Ham DataForSEO çıktıları: `data/dataforseo/` (`keyword-metrics.json`, `serp-and-trends.json`, `onpage-hub.json`, `FINDINGS.md`).
- Canlı ekran görüntüleri (Playwright): hub hero/paketler, DonanımHaber 6 paket, Webtekno → `assets/screenshots/`.
- Rakip fiyat/paket bilgisi anlık gözlemdir (kampanyalar değişebilir).
