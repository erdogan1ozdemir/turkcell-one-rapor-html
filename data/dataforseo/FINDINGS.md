# DataForSEO Doğrulama Bulguları — Turkcell One (15 Haziran 2026)

Bu klasör, Cowork oturumunda **devre dışı olan** DataForSEO verisinin Claude Code'da `dfs-mcp` connector'ı (brief'teki gömülü kimlik) ile çekilmiş halidir. Konum: `Turkiye` (2792), dil: `tr`. Rapor (`../index.html`) bu verilerle güncellenmiştir.

## 1. Marka talebi gerçekten oluşuyor (yeni kanıt)
- `turkcell one` aylık aramalar: 10 (2025-2026 başı) → **50 (Nis 2026)** → **260 (May 2026)**. 12 aylık ortalama hâlâ ~30, ama eğri net yukarı.
- `turkcell one paketleri / nedir / fiyat / premium` → DataForSEO DB'sinde **henüz yok** (talep oluşma aşamasında).
- Hub için `ranked_keywords` → **boş** (sayfa henüz ölçülü organik kelime taşımıyor). Rapordaki "talep henüz oluşuyor" tezini doğrular.

## 2. Talep havuzu & content gap — DataForSEO (Ahrefs ile çapraz)
DataForSEO Google Ads hacimleri Ahrefs'ten genelde yüksek (farklı toplama). KD ise DataForSEO Labs'ta belirgin farklı:

| Kelime | DFS hacim | DFS KD | Ahrefs (v3) hacim/KD | Niyet |
|---|---|---|---|---|
| netflix | 2.740.000 | 75 | 2.150.000 / 61 | navigational |
| amazon prime | 450.000 | 36 | 305.000 / 26 | commercial |
| hbo max | 368.000 | 22 | 260.000 / 30 | navigational |
| disney plus (kapsam dışı) | 301.000 | 48 | 196.000 / 50 | navigational |
| youtube premium | 165.000 | 24 | 88.000 / 31 | informational |
| **amazon prime üyelik** | **60.500** | **6** | 22.000 / 3 | commercial |
| **netflix fiyat** | **49.500** | **11** | 51.000 / 44 | commercial |
| **youtube premium fiyat** | **27.100** | **18** | 26.000 / 1 | commercial |
| netflix paketleri | 6.600 | 15 | 7.400 / 53 | commercial |
| **hbo max fiyat** | **5.400** | **3** | 8.200 / 23 | commercial |
| youtube premium türkiye | 2.900 | 26 | 1.900 / 4 | commercial |
| netflix abonelik | 2.400 | 14 | 1.800 / 40 | transactional |
| spotify premium fiyat (kapsam dışı) | 1.600 | 5 | 1.300 / 1 | commercial |

**Okuma:** "Yüksek hacim + düşük KD" content gap tezi DataForSEO ile **daha da güçlü**. Öne çıkan düşük KD: amazon prime üyelik (60,5B/KD6), netflix fiyat (49,5B/KD11), hbo max fiyat (5,4B/KD3), spotify premium fiyat (1,6B/KD5), netflix paketleri (6,6B/KD15).

## 3. SERP "turkcell one" (canlı, masaüstü)
- Organik #1 = **One Plus DETAY** sayfası (₺600); #2 = **hub**. Liste sayfası bu sorguda ilk sayfada görünmedi (ama "turkcell one nedir" sorgusunda #1).
- Sitelink'lerde paket isimleri: **Plus / Ultra / Star** → "Ultra" isimlendirmesi sitelink'te doğrulandı.
- Şikayetvar "Turkcell One Şikayetleri": **1,5/5 · 13.210 oy**.
- DonanımHaber snippet: "Mega (330 TL): Netflix Temel, Amazon Prime, Lifebox 250GB, Wonjo Kids, **YouTube Premium (Bireysel üyelik)**" → YouTube bireysel doğrulandı.
- PAA: "Turkcell One nedir?", "Turkcell'in en ucuz paketi hangisi?", "1 yıllık paket ne kadar?" vb.
- Bu çekimde üst reklam item'ı dönmedi (reklam gün/saat bazında değişebilir).

## 4. AI Overview "turkcell one nedir" (kritik)
- AI Overview **var**. TANIM ve paket dökümü otoritesi: **Webtekno + Instagram + DonanımHaber**. Turkcell yalnızca "sayfayı ziyaret et / abone ol" adımında atıf alıyor.
- Yani markanın bilgi otoritesi paylaşımlı değil, **definisyonel kısımda büyük ölçüde üçüncü tarafta**. "Atfı markaya yaklaştırma" fırsatı doğrulandı ve keskinleşti.

## 5. Google Trends (90 gün) — düzeltme
- Gerçek zirve **9 Haziran 2026** (değer 100), 10 Haz 96, sonra normalizasyon. Rapordaki "~1 Haz zirve" düzeltildi.
- Bölge ilk 5: Konya 100, İstanbul 29, Ordu 22, Trabzon 21, Eskişehir 21 (Ankara 21, İzmir 19).
- İlgili sorgular (gerçek): turkcell netflix, hbo, netflix, turkcell one plus/premium, hbo max, youtube premium, **google one** (kafa karışıklığı), youtube premium fiyat, netflix fiyat, netflix paketleri.

## 6. Sayfa içi (hub) — ölçülü (on_page_instant_pages)
- title 57 krk ✓, description 105 krk ✓, canonical sonda "/" ✓, H1=1 ✓, **H2=27 ✓** (tam doğrulama).
- Ek ölçülen: görseller **alt metinsiz** (no_image_alt), **render engelleyen kaynak** var, **etkileşime hazır olma ~3,2 sn / DOM complete ~8,1 sn** (yüksek yükleme süresi), 28 script, hub'dan **yalnızca 7 iç bağlantı** (zayıf iç bağlantı), onpage_score 86,36, DOM ~320 KB.
- images_count = 59 (instant_pages ölçümü; Cowork canlı DOM gözlemi lazy/JS ile daha yüksek görmüştü). H3 = 10 (gerçek SSS soruları; geçiş/cayma soruları sayfada zaten mevcut).
