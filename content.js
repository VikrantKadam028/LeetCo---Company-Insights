/**
 * LeetCode Company Insights — content.js
 * With perfectly aligned company logo badges
 */

(() => {
  const EXTENSION = "LeetCode Company Insights";
  const API_BASE_URL = "https://backend-leetco.onrender.com/api/problem";
  const LOGO_API_TOKEN = "pk_UlEMJAItRNC4svNEpgozlw";

  console.log(`[${EXTENSION}] Content script initialized`);

  /* -------------------- Company Domain Mapping -------------------- */
  
  const COMPANY_DOMAINS = {
    // FAANG / Big Tech
    'google': 'google.com',
    'facebook': 'facebook.com',
    'meta': 'meta.com',
    'amazon': 'amazon.com',
    'apple': 'apple.com',
    'netflix': 'netflix.com',
    'microsoft': 'microsoft.com',
    
    // Major Tech Companies
    'uber': 'uber.com',
    'lyft': 'lyft.com',
    'airbnb': 'airbnb.com',
    'twitter': 'twitter.com',
    'x': 'x.com',
    'linkedin': 'linkedin.com',
    'snapchat': 'snap.com',
    'tiktok': 'tiktok.com',
    'bytedance': 'bytedance.com',
    'tesla': 'tesla.com',
    'spacex': 'spacex.com',
    
    // Tech Unicorns
    'stripe': 'stripe.com',
    'doordash': 'doordash.com',
    'instacart': 'instacart.com',
    'robinhood': 'robinhood.com',
    'coinbase': 'coinbase.com',
    'databricks': 'databricks.com',
    'snowflake': 'snowflake.com',
    'servicenow': 'servicenow.com',
    'workday': 'workday.com',
    'salesforce': 'salesforce.com',
    'oracle': 'oracle.com',
    'sap': 'sap.com',
    'vmware': 'vmware.com',
    'adobe': 'adobe.com',
    'intuit': 'intuit.com',
    'atlassian': 'atlassian.com',
    'slack': 'slack.com',
    'zoom': 'zoom.us',
    'dropbox': 'dropbox.com',
    'box': 'box.com',
    'twilio': 'twilio.com',
    'splunk': 'splunk.com',
    
    // Finance & Fintech
    'goldman sachs': 'goldmansachs.com',
    'morgan stanley': 'morganstanley.com',
    'jp morgan': 'jpmorganchase.com',
    'jpmorgan': 'jpmorganchase.com',
    'citi': 'citigroup.com',
    'citigroup': 'citigroup.com',
    'bank of america': 'bankofamerica.com',
    'wells fargo': 'wellsfargo.com',
    'visa': 'visa.com',
    'mastercard': 'mastercard.com',
    'paypal': 'paypal.com',
    'square': 'squareup.com',
    'block': 'block.xyz',
    'capital one': 'capitalone.com',
    'american express': 'americanexpress.com',
    'amex': 'americanexpress.com',
    
    // E-commerce & Retail
    'walmart': 'walmart.com',
    'target': 'target.com',
    'ebay': 'ebay.com',
    'shopify': 'shopify.com',
    'etsy': 'etsy.com',
    'wayfair': 'wayfair.com',
    'wish': 'wish.com',
    'alibaba': 'alibaba.com',
    'tencent': 'tencent.com',
    
    // Gaming & Entertainment
    'nvidia': 'nvidia.com',
    'amd': 'amd.com',
    'intel': 'intel.com',
    'qualcomm': 'qualcomm.com',
    'sony': 'sony.com',
    'activision': 'activision.com',
    'blizzard': 'blizzard.com',
    'epic games': 'epicgames.com',
    'roblox': 'roblox.com',
    'riot games': 'riotgames.com',
    'electronic arts': 'ea.com',
    'ea': 'ea.com',
    'unity': 'unity.com',
    
    // Consulting & Enterprise
    'mckinsey': 'mckinsey.com',
    'bain': 'bain.com',
    'bcg': 'bcg.com',
    'deloitte': 'deloitte.com',
    'accenture': 'accenture.com',
    'pwc': 'pwc.com',
    'ey': 'ey.com',
    'kpmg': 'kpmg.com',
    'ibm': 'ibm.com',
    'cisco': 'cisco.com',
    'dell': 'dell.com',
    'hp': 'hp.com',
    'hpe': 'hpe.com',
    
    // Telecom
    'verizon': 'verizon.com',
    'at&t': 'att.com',
    'att': 'att.com',
    't-mobile': 't-mobile.com',
    'tmobile': 't-mobile.com',
    'sprint': 'sprint.com',
    
    // Social & Media
    'reddit': 'reddit.com',
    'pinterest': 'pinterest.com',
    'discord': 'discord.com',
    'spotify': 'spotify.com',
    'pandora': 'pandora.com',
    'soundcloud': 'soundcloud.com',
    
    // Travel & Hospitality
    'booking': 'booking.com',
    'expedia': 'expedia.com',
    'tripadvisor': 'tripadvisor.com',
    'marriott': 'marriott.com',
    'hilton': 'hilton.com',
    
    // Cloud & Infrastructure
    'aws': 'aws.amazon.com',
    'azure': 'azure.microsoft.com',
    'gcp': 'cloud.google.com',
    'cloudflare': 'cloudflare.com',
    'digitalocean': 'digitalocean.com',
    'linode': 'linode.com',
    'heroku': 'heroku.com',
    
    // Other Notable Companies
    'samsung': 'samsung.com',
    'lg': 'lg.com',
    'huawei': 'huawei.com',
    'xiaomi': 'mi.com',
    'yahoo': 'yahoo.com',
    'yelp': 'yelp.com',
    'bloomberg': 'bloomberg.com',
    'bloomberg lp': 'bloomberg.com',
    'palantir': 'palantir.com',
    'coursera': 'coursera.org',
    'duolingo': 'duolingo.com',
    'grammarly': 'grammarly.com',
    'notion': 'notion.so',
    'figma': 'figma.com',
    'canva': 'canva.com',
    'jump trading': 'jumptrading.com',
  };

  // Colors for fallback icons - defined globally
  const FALLBACK_COLORS = [
    '#A855F7', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', 
    '#8B5CF6', '#EF4444', '#06B6D4', '#F97316', '#14B8A6'
  ];

  /**
   * Get domain for a company name
   */
  function getCompanyDomain(companyName) {
    if (!companyName) return null;
    
    const normalized = companyName.toLowerCase().trim();
    
    // Direct match
    if (COMPANY_DOMAINS[normalized]) {
      return COMPANY_DOMAINS[normalized];
    }
    
    // Partial match (e.g., "Google LLC" -> "google")
    for (const [key, domain] of Object.entries(COMPANY_DOMAINS)) {
      if (normalized.includes(key) || key.includes(normalized)) {
        return domain;
      }
    }
    
    // Fallback: try to construct a basic domain
    const cleaned = normalized
      .replace(/\s+(inc|llc|ltd|corporation|corp|co|limited|technologies|tech|software|systems|group)\b/gi, '')
      .trim()
      .replace(/\s+/g, '');
    
    return cleaned ? `${cleaned}.com` : null;
  }

  /**
   * Get logo URL for a company
   */
  function getLogoUrl(companyName) {
    const domain = getCompanyDomain(companyName);
    if (!domain) return null;
    
    return `https://img.logo.dev/${domain}?token=${LOGO_API_TOKEN}&size=32&format=png`;
  }

  /**
   * Get color for fallback icon based on company name
   */
  function getFallbackColor(companyName) {
    if (!companyName) return FALLBACK_COLORS[0];
    const colorIndex = companyName.charCodeAt(0) % FALLBACK_COLORS.length;
    return FALLBACK_COLORS[colorIndex];
  }

  /**
   * Create fallback icon (first letter of company name)
   */
  function createFallbackIcon(companyName) {
    const letter = companyName.charAt(0).toUpperCase();
    const color = getFallbackColor(companyName);
    
    return `
      <div style="
        width: 16px;
        height: 16px;
        border-radius: 3px;
        background: ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 9px;
        color: white;
      ">${letter}</div>
    `;
  }

  /* -------------------- Utilities -------------------- */

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function getProblemSlug() {
    const match = location.pathname.match(/\/problems\/([^/]+)/);
    return match ? match[1] : null;
  }

  function findProblemTitleElement() {
    const links = Array.from(
      document.querySelectorAll('a[href^="/problems/"]')
    );

    for (const link of links) {
      if (link.innerText && /^\d+\.\s+/.test(link.innerText)) {
        return link;
      }
    }
    return null;
  }

  function createCompanyBox() {
    const box = document.createElement("div");
    box.id = "leetcode-company-container";
    box.className = "leetcode-company-box";
    box.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        gap: 8px;
      ">
        <div style="
          width: 20px;
          height: 20px;
          border: 2px solid rgba(168, 85, 247, 0.4);
          border-top-color: rgba(168, 85, 247, 0.9);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
        <span style="color: rgba(255, 255, 255, 0.7);">Loading company insights…</span>
      </div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
    return box;
  }

  /* -------------------- Core Logic -------------------- */

  async function injectCompanyInsights() {
    try {
      const slug = getProblemSlug();
      if (!slug) return;

      let titleEl = null;
      const start = Date.now();

      while (!titleEl && Date.now() - start < 15000) {
        titleEl = findProblemTitleElement();
        if (!titleEl) await sleep(300);
      }

      if (!titleEl) {
        throw new Error("Problem title not found");
      }

      console.log(`[${EXTENSION}] Problem detected: ${slug}`);

      if (document.getElementById("leetcode-company-container")) return;

      const box = createCompanyBox();
      titleEl.closest("div")?.appendChild(box);

      fetch(`${API_BASE_URL}?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data || !Array.isArray(data.companies) || !data.companies.length) {
            box.innerHTML = `
              <div style="
                display: flex;
                align-items: center;
                gap: 8px;
                color: rgba(255, 255, 255, 0.5);
              ">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path d="M8 4v5M8 11v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>No company data available</span>
              </div>
            `;
            return;
          }

          box.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 12px;
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0;">
                <path d="M3 21h18M5 21V7l8-4v18M19 21V10l-6-3" stroke="rgba(168, 85, 247, 0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" stroke="rgba(168, 85, 247, 0.9)" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <strong style="
                font-size: 14px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.95);
                letter-spacing: 0.3px;
              ">Asked by Companies</strong>
              <span style="
                background: rgba(168, 85, 247, 0.15);
                color: rgba(168, 85, 247, 0.95);
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 11px;
                font-weight: 600;
              ">${data.companies.length}</span>
            </div>
            <div style="
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            ">
              ${data.companies
                .map((c, index) => {
                  const name =
                    typeof c === "string"
                      ? c
                      : c.name || c.company || c.companyName || "Unknown";

                  const logoUrl = getLogoUrl(name);
                  const fallbackColor = getFallbackColor(name);
                  const companyId = `company-${index}`;

                  return `
                    <div id="${companyId}" style="
                      display: flex;
                      align-items: center;
                      height: 28px;
                      padding: 0 10px 0 6px;
                      border-radius: 6px;
                      background: rgba(255, 255, 255, 0.05);
                      border: 1px solid rgba(255, 255, 255, 0.1);
                      font-size: 13px;
                      font-weight: 500;
                      color: rgba(255, 255, 255, 0.92);
                      transition: all 0.2s ease;
                      cursor: default;
                      box-sizing: border-box;
                      line-height: 1;
                    "
                    onmouseover="
                      this.style.background='rgba(168, 85, 247, 0.15)';
                      this.style.borderColor='rgba(168, 85, 247, 0.35)';
                      this.style.transform='translateY(-1px)';
                    "
                    onmouseout="
                      this.style.background='rgba(255, 255, 255, 0.05)';
                      this.style.borderColor='rgba(255, 255, 255, 0.1)';
                      this.style.transform='translateY(0)';
                    "
                    >
                      <div style="
                        width: 16px;
                        height: 16px;
                        border-radius: 3px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                        margin-right: 6px;
                        overflow: hidden;
                        position: relative;
                      ">
                        ${
                          logoUrl
                            ? `
                              <img
                                src="${logoUrl}"
                                alt="${name}"
                                style="
                                  width: 100%;
                                  height: 100%;
                                  object-fit: contain;
                                  display: block;
                                "
                                onerror="
                                  this.onerror = null;
                                  this.style.display = 'none';
                                  const fallback = document.createElement('div');
                                  fallback.style.width = '16px';
                                  fallback.style.height = '16px';
                                  fallback.style.borderRadius = '3px';
                                  fallback.style.background = '${fallbackColor}';
                                  fallback.style.display = 'flex';
                                  fallback.style.alignItems = 'center';
                                  fallback.style.justifyContent = 'center';
                                  fallback.style.fontWeight = '700';
                                  fallback.style.fontSize = '9px';
                                  fallback.style.color = 'white';
                                  fallback.textContent = '${name.charAt(0).toUpperCase()}';
                                  this.parentElement.appendChild(fallback);
                                "
                              />
                            `
                            : createFallbackIcon(name)
                        }
                      </div>
                      <span style="
                        white-space: nowrap;
                        font-size: 12px;
                        font-weight: 500;
                        line-height: 1;
                      ">
                        ${name}
                      </span>
                    </div>
                  `;
                })
                .join("")}
            </div>
          `;

          console.log(
            `[${EXTENSION}] Displayed ${data.companies.length} companies with logos`
          );
        })
        .catch((err) => {
          console.error(`[${EXTENSION}] API error`, err);
          box.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              gap: 8px;
              color: rgba(239, 68, 68, 0.9);
            ">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M8 4v5M8 11v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>Failed to load company insights</span>
            </div>
          `;
        });
    } catch (err) {
      console.error(`[${EXTENSION}]`, err.message);
    }
  }

  /* -------------------- SPA Navigation Support -------------------- */

  let lastPath = location.pathname;

  new MutationObserver(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      if (lastPath.startsWith("/problems/")) {
        setTimeout(injectCompanyInsights, 800);
      }
    }
  }).observe(document.body, { childList: true, subtree: true });

  /* -------------------- Popup Communication -------------------- */

  chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === "PING_EXTENSION") {
      sendResponse({ status: "READY" });
    }
  });

  /* -------------------- Initial Run -------------------- */

  if (location.pathname.startsWith("/problems/")) {
    injectCompanyInsights();
  }
})();