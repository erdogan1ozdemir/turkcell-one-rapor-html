#!/usr/bin/env python3
"""
Turkcell One - DataForSEO veri çekme (bu Cowork oturumunda DataForSEO devre dışıydı).
Claude Code / lokal ortamda çalıştırılır. Çıktılar data/dataforseo/ altına JSON olarak yazılır.

Kimlik bilgisi ENV ile verilir (repoya yazmayın):
  export DATAFORSEO_USERNAME="..."
  export DATAFORSEO_PASSWORD="..."
  (Brief'teki kimlikler kullanılabilir; sızma şüphesinde rotate edin.)

Çalıştırma:
  pip install requests
  python scripts/fetch-dataforseo.py

Notlar (saha):
  - location_name "Turkiye" (kod 2792), language_code "tr".
  - search_volume çağrı başına ~10 keyword -> 10'arlı batch.
  - keyword_ideas güvenilmez; keyword_suggestions/related tercih edin.
"""
import os, json, base64, time, pathlib, urllib.request

USER = os.environ.get("DATAFORSEO_USERNAME"); PWD = os.environ.get("DATAFORSEO_PASSWORD")
OUT = pathlib.Path("data/dataforseo"); OUT.mkdir(parents=True, exist_ok=True)
BASE = "https://api.dataforseo.com/v3"
LOC, LANG = "Turkiye", "tr"

CORE_SERP = ["turkcell one", "turkcell one paketleri", "turkcell one fiyat", "turkcell one nedir",
             "turkcell one premium", "turkcell one plus", "turkcell one star",
             "netflix hbo max paket", "ortak abonelik paketi", "dijital abonelik paketi"]
VOLUME_KW = ["turkcell one", "turkcell one paketleri", "turkcell one fiyat", "turkcell one nedir",
             "turkcell one premium", "turkcell one plus", "turkcell one star", "turkcell one iptal",
             "turkcell one kampanya", "turkcell one avantajlari",
             "netflix", "amazon prime", "hbo max", "disney plus", "youtube premium", "netflix fiyat",
             "youtube premium fiyat", "amazon prime uyelik", "hbo max fiyat", "netflix paketleri",
             "spotify premium fiyat", "youtube premium turkiye", "netflix turkcell", "tv+ izle"]
TRENDS_KW = ["turkcell one"]

def call(path, payload):
    if not USER or not PWD:
        raise SystemExit("ENV eksik: DATAFORSEO_USERNAME / DATAFORSEO_PASSWORD ayarlayın.")
    data = json.dumps(payload).encode()
    req = urllib.request.Request(BASE + path, data=data, method="POST")
    req.add_header("Authorization", "Basic " + base64.b64encode(f"{USER}:{PWD}".encode()).decode())
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read().decode())

def save(name, obj):
    (OUT / name).write_text(json.dumps(obj, ensure_ascii=False, indent=2)); print("WROTE", OUT / name)

def main():
    # 1) SERP (organik + PAA + related + ads + AI overview tespiti)
    serp = {}
    for kw in CORE_SERP:
        try:
            res = call("/serp/google/organic/live/advanced",
                       [{"keyword": kw, "location_name": LOC, "language_code": LANG,
                         "depth": 20, "people_also_ask_click_depth": 2}])
            serp[kw] = res; print("serp ok:", kw); time.sleep(1)
        except Exception as e:
            serp[kw] = {"error": str(e)}; print("serp fail:", kw, e)
    save("serp.json", serp)

    # 2) Search volume (10'arlı batch)
    vol = []
    for i in range(0, len(VOLUME_KW), 10):
        batch = VOLUME_KW[i:i+10]
        try:
            res = call("/keywords_data/google_ads/search_volume/live",
                       [{"keywords": batch, "location_name": LOC, "language_code": LANG}])
            vol.append(res); print("volume ok batch:", i); time.sleep(1)
        except Exception as e:
            vol.append({"error": str(e), "batch": batch}); print("volume fail:", e)
    save("search_volume.json", vol)

    # 3) Google Trends explore
    try:
        tr = call("/keywords_data/google_trends/explore/live",
                  [{"keywords": TRENDS_KW, "location_name": LOC, "language_code": LANG,
                    "type": "web", "time_range": "past_90_days",
                    "item_types": ["google_trends_graph", "google_trends_queries_list"]}])
        save("trends.json", tr)
    except Exception as e:
        save("trends.json", {"error": str(e)})

    print("\nTamam. data/dataforseo/ altındaki JSON'ları rapor güncellemesi için kullanın.")

if __name__ == "__main__":
    main()
