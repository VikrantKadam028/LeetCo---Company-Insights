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

  // LeetCode theme colors
  const LEETCODE_COLORS = {
    primary: '#1A1A1A',
    secondary: '#262626',
    accent: '#FFA116',
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    border: '#3D3D3D',
    success: '#0ACF83',
    warning: '#FFA116',
    error: '#FF375F'
  };

  // Colors for fallback icons
  const FALLBACK_COLORS = [
    '#FFA116', '#0ACF83', '#FF375F', '#2E8B57', '#1E90FF',
    '#9370DB', '#FF6347', '#20B2AA', '#FFD700', '#DA70D6'
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
    
    return `https://img.logo.dev/${domain}?token=${LOGO_API_TOKEN}&size=48&format=png`;
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
   * Get company display name
   */
  function getCompanyDisplayName(company) {
    return typeof company === "string" ? company : company.name || company.company || company.companyName || "Unknown";
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
          border: 2px solid rgba(255, 161, 22, 0.4);
          border-top-color: rgba(255, 161, 22, 0.9);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
        <span style="color: ${LEETCODE_COLORS.textSecondary};">Loading company insights…</span>
      </div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
    return box;
  }

  /**
   * Create a small hover dropdown showing company tags below the company box
   */
  function createHoverDropdown(companies, referenceElement) {
    const dropdown = document.createElement('div');
    dropdown.id = 'leetcode-company-hover-dropdown';
    dropdown.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 8px;
      background: ${LEETCODE_COLORS.primary};
      border: 1px solid ${LEETCODE_COLORS.border};
      border-radius: 8px;
      padding: 8px;
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      width: 395px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;

    companies.forEach(company => {
      const name = getCompanyDisplayName(company);
      const logoUrl = getLogoUrl(name);
      const fallbackColor = getFallbackColor(name);

      const tag = document.createElement('div');
      tag.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 8px;
        background: ${LEETCODE_COLORS.secondary};
        border-radius: 6px;
        font-size: 12px;
        color: ${LEETCODE_COLORS.textPrimary};
        white-space: nowrap;
        max-width: 120px;
      `;

      const logoContainer = document.createElement('div');
      logoContainer.style.cssText = `
        width: 16px;
        height: 16px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-shrink: 0;
        background: ${LEETCODE_COLORS.primary};
      `;

      if (logoUrl) {
        const img = document.createElement('img');
        img.src = logoUrl;
        img.alt = name;
        img.style.cssText = 'width: 100%; height: 100%; object-fit: contain;';
        img.onerror = () => {
          img.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.style.cssText = `
            width: 100%;
            height: 100%;
            border-radius: 4px;
            background: ${fallbackColor};
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 10px;
            color: white;
          `;
          fallback.textContent = name.charAt(0).toUpperCase();
          logoContainer.appendChild(fallback);
        };
        logoContainer.appendChild(img);
      } else {
        const fallback = document.createElement('div');
        fallback.style.cssText = `
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background: ${fallbackColor};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 10px;
          color: white;
        `;
        fallback.textContent = name.charAt(0).toUpperCase();
        logoContainer.appendChild(fallback);
      }

      const nameLabel = document.createElement('span');
      nameLabel.textContent = name;
      nameLabel.style.overflow = 'hidden';
      nameLabel.style.textOverflow = 'ellipsis';

      tag.appendChild(logoContainer);
      tag.appendChild(nameLabel);
      dropdown.appendChild(tag);
    });

    // Position dropdown relative to reference element
    const rect = referenceElement.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    dropdown.style.top = `${rect.bottom + scrollTop + 8}px`;
    dropdown.style.left = `${rect.left + scrollLeft}px`;

    // Prevent dropdown from going off right edge
    const dropdownRect = dropdown.getBoundingClientRect();
    if (dropdownRect.right > window.innerWidth) {
      dropdown.style.left = `${window.innerWidth - dropdownRect.width - 10}px`;
    }

    return dropdown;
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
                color: ${LEETCODE_COLORS.textSecondary};
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

          const companies = data.companies;
          const totalCompanies = companies.length;
          const displayCompanies = companies.slice(0, 5);
          
          box.innerHTML = `
            <div id="horizontal-logos-container" style="
              display: flex;
              align-items: center;
              cursor: pointer;
              border-radius: 8px;
              background: ${LEETCODE_COLORS.secondary};
              transition: all 0.3s ease;
              margin-bottom: 10px;
            "
            onmouseover="
              this.style.background = '#2D2D2D';
              this.style.borderColor = '${LEETCODE_COLORS.accent}';
            "
            onmouseout="
              this.style.background = '${LEETCODE_COLORS.secondary}';
              this.style.borderColor = '${LEETCODE_COLORS.border}';
            ">
              <div style="
                display: flex;
                align-items: center;
                position: relative;
              ">
                ${displayCompanies.map((company, index) => {
                  const name = getCompanyDisplayName(company);
                  const logoUrl = getLogoUrl(name);
                  const fallbackColor = getFallbackColor(name);
                  
                  return `
                    <div style="
                      width: 36px;
                      height: 36px;
                      border-radius: 30px;
                      background: white;
                      display: flex;

                      border: 1px solid grey;
                      
                      align-items: center;
                      justify-content: center;
                      margin-left: ${index > 0 ? '-8px' : '0'};
                      position: relative;
                      z-index: ${displayCompanies.length - index};
                      overflow: hidden;
                      transition: all 0.3s ease;
                    ">
                      <img 
                        src="${logoUrl || ''}" 
                        alt="${name}"
                        style="width: 100%; height: 100%; object-fit: contain; "
                        onerror="
                          this.onerror = null;
                          this.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.style.width = '100%';
                          fallback.style.height = '100%';
                          fallback.style.borderRadius = '10px';
                          fallback.style.background = '${fallbackColor}';
                          fallback.style.display = 'flex';
                          fallback.style.alignItems = 'center';
                          fallback.style.justifyContent = 'center';
                          fallback.style.fontWeight = '600';
                          fallback.style.fontSize = '14px';
                          fallback.style.color = 'white';
                          fallback.textContent = '${name.charAt(0).toUpperCase()}';
                          this.parentElement.appendChild(fallback);
                        "
                      />
                    </div>
                  `;
                }).join('')}
                
                ${totalCompanies > 5 ? `
                  <div style="
                    width: 36px;
                    height: 36px;
                    border-radius: 25px;
                    background: ${LEETCODE_COLORS.secondary};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: -8px;
                    position: relative;
                    z-index: 1;
                    font-size: 12px;
                    font-weight: 600;
                    color: ${LEETCODE_COLORS.accent};
                    background: rgba(255, 161, 22, 0.1);
                  ">
                    +${totalCompanies - 5}
                  </div>
                ` : ''}
              </div>
              
              <div style="
                margin-left: 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                flex: 1;
              ">
                <span style="
                  font-size: 14px;
                  color: ${LEETCODE_COLORS.textSecondary};
                  font-weight: 500;
                ">
                  ${totalCompanies} ${totalCompanies === 1 ? 'company' : 'companies'} asked this question
                </span>
              </div>
              
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="
                color: ${LEETCODE_COLORS.textSecondary};
                flex-shrink: 0;
              ">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          `;
          
          // Hover behavior for dropdown
          setTimeout(() => {
            const container = document.getElementById('horizontal-logos-container');
            if (!container) return;

            let isMouseOverContainer = false;
            let isMouseOverDropdown = false;

            const showDropdown = () => {
              const existing = document.getElementById('leetcode-company-hover-dropdown');
              if (existing) existing.remove();

              const dropdown = createHoverDropdown(companies, container);
              document.body.appendChild(dropdown);

              // Track mouse over dropdown
              dropdown.addEventListener('mouseenter', () => {
                isMouseOverDropdown = true;
              });
              dropdown.addEventListener('mouseleave', () => {
                isMouseOverDropdown = false;
                setTimeout(hideDropdownIfNotHovered, 150);
              });
            };

            const hideDropdownIfNotHovered = () => {
              if (!isMouseOverContainer && !isMouseOverDropdown) {
                const existing = document.getElementById('leetcode-company-hover-dropdown');
                if (existing) existing.remove();
              }
            };

            container.addEventListener('mouseenter', () => {
              isMouseOverContainer = true;
              showDropdown();
            });

            container.addEventListener('mouseleave', () => {
              isMouseOverContainer = false;
              setTimeout(hideDropdownIfNotHovered, 150);
            });
          }, 0);
          
          console.log(`[${EXTENSION}] Displayed ${totalCompanies} companies in horizontal layout`);
          
        })
        .catch((err) => {
          console.error(`[${EXTENSION}] API error`, err);
          box.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              gap: 8px;
              color: ${LEETCODE_COLORS.error};
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



/**
 * content_complexity.js
 *
 * Drop-in addition to your existing content.js.
 * Paste the entire file contents at the bottom of content.js,
 * OR add it as a second entry in manifest.json content_scripts:
 *
 *   "js": ["content.js", "content_complexity.js"]
 *
 * ─── What this does ───────────────────────────────────────────────────────────
 *  1. Waits for LeetCo's company-box to appear (MutationObserver)
 *  2. Injects an "Analyze Complexity" button below it
 *  3. Extracts the user's code from Monaco editor (3 strategies)
 *  4. POSTs to your backend and renders a polished complexity card
 */

// ─── Config ───────────────────────────────────────────────────────────────────

const LC_BACKEND    = 'https://backend-leetco.onrender.com';
const LC_BOX_ID     = 'leetco-complexity-box';
const LC_BTN_ID     = 'leetco-analyze-btn';

// ─────────────────────────────────────────────────────────────────────────────
// 1.  CODE EXTRACTION  (3 strategies, tries in order)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strategy A — Monaco global registry
 * Most reliable. Works as long as Monaco exposes window.monaco.
 */
function extractViaMonacoGlobal() {
  try {
    const editors = window.monaco?.editor?.getEditors?.() ?? [];
    if (editors.length > 0) return editors[0].getValue();
  } catch {}
  return null;
}

/**
 * Strategy B — React fiber walk
 * Finds the Monaco React wrapper and reads its `value` prop.
 * Brittle — only fails if LeetCode upgrades their React internals.
 */
function extractViaReactFiber() {
  try {
    const editorEl = document.querySelector('.view-lines');
    if (!editorEl) return null;

    const fiberKey = Object.keys(editorEl).find(k => k.startsWith('__reactFiber'));
    let fiber = editorEl[fiberKey];

    while (fiber) {
      const val = fiber?.memoizedProps?.value;
      if (typeof val === 'string' && val.trim().length > 0) return val;
      fiber = fiber.return;
    }
  } catch {}
  return null;
}

/**
 * Strategy C — DOM text scrape (last resort)
 * Concatenates visible line text from Monaco's rendered DOM.
 * Loses some whitespace; only used when A and B fail.
 */
function extractViaDOMScrape() {
  try {
    const lines = [...document.querySelectorAll('.view-lines .view-line')]
      .map(el => el.textContent)
      .join('\n');
    return lines.trim() ? lines : null;
  } catch {}
  return null;
}

function extractCode() {
  return extractViaMonacoGlobal()
      ?? extractViaReactFiber()
      ?? extractViaDOMScrape();
}

// ─────────────────────────────────────────────────────────────────────────────
// 2.  LANGUAGE DETECTION
// ─────────────────────────────────────────────────────────────────────────────

function detectLanguage() {
  const selectors = [
    '[data-cy="lang-select"] span',
    '.ant-select-selection-item',
    'button[id*="headlessui"] span',
    '[class*="LanguageSelector"] span',
  ];

  let raw = '';
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el?.textContent?.trim()) { raw = el.textContent.trim().toLowerCase(); break; }
  }

  const MAP = {
    'c++': 'cpp', 'c#': 'csharp', 'python3': 'python',
    javascript: 'javascript', typescript: 'typescript',
    java: 'java', go: 'go', rust: 'rust',
    kotlin: 'kotlin', swift: 'swift', ruby: 'ruby', python: 'python',
  };

  return MAP[raw] ?? raw ?? 'python';
}

// ─────────────────────────────────────────────────────────────────────────────
// 3.  BACKEND CALL
// ─────────────────────────────────────────────────────────────────────────────

async function fetchComplexity(code, language) {
  const res = await fetch(`${LC_BACKEND}/api/analyze-complexity`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ code, language }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Server error ${res.status}`);
  }

  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// 4.  UI — Button injection
// ─────────────────────────────────────────────────────────────────────────────

function findAnchor() {
  return (
    document.querySelector('.leetcode-company-box') ??
    document.querySelector('#leetco-company-section') ??
    null
  );
}

function injectButton(anchor) {
  if (document.getElementById(LC_BTN_ID)) return;

  const btn = document.createElement('button');
  btn.id = LC_BTN_ID;
  btn.innerHTML = svgIcon('waveform') + ' Analyze Complexity';

  Object.assign(btn.style, {
    marginTop     : '10px',
    display       : 'inline-flex',
    alignItems    : 'center',
    gap           : '7px',
    padding       : '8px 16px',
    background    : 'linear-gradient(135deg,#ff6b1a,#ff8c00)',
    color         : '#fff',
    border        : 'none',
    borderRadius  : '9px',
    fontSize      : '13px',
    fontWeight    : '600',
    cursor        : 'pointer',
    fontFamily    : 'inherit',
    letterSpacing : '0.15px',
    boxShadow     : '0 2px 8px rgba(255,107,0,.35)',
    transition    : 'opacity .2s, transform .15s, box-shadow .2s',
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.opacity   = '0.9';
    btn.style.transform = 'translateY(-1px)';
    btn.style.boxShadow = '0 4px 14px rgba(255,107,0,.45)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.opacity   = '1';
    btn.style.transform = 'translateY(0)';
    btn.style.boxShadow = '0 2px 8px rgba(255,107,0,.35)';
  });

  btn.addEventListener('click', () => onAnalyzeClick(btn));
  anchor.insertAdjacentElement('afterend', btn);
}

async function onAnalyzeClick(btn) {
  const code = extractCode();

  if (!code?.trim()) {
    renderError('No code found in the editor — write something first!');
    return;
  }

  // Loading state
  btn.disabled     = true;
  btn.innerHTML    = spinnerHTML() + ' Analyzing…';
  btn.style.opacity = '0.75';

  try {
    const lang   = detectLanguage();
    const result = await fetchComplexity(code, lang);
    renderComplexityCard(result);

    btn.innerHTML = svgIcon('waveform') + ' Re-analyze';
  } catch (err) {
    renderError(err.message ?? 'Analysis failed — try again');
    btn.innerHTML = svgIcon('waveform') + ' Retry';
  } finally {
    btn.disabled      = false;
    btn.style.opacity = '1';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5.  UI — Complexity card renderer
// ─────────────────────────────────────────────────────────────────────────────

/** Complexity → 0–100 score for the progress bar */
const BIG_O_SCORE = {
  'O(1)':           1,
  'O(log n)':       15,
  'O(n)':           28,
  'O(n log n)':     42,
  'O(n²)':          60,
  'O(n²) or worse': 68,
  'O(n³)':          78,
  'O(2ⁿ) or O(n)': 88,
  'O(2ⁿ)':          96,
};

const BIG_O_COLOR = [
  [15,  '#22c55e'],   // green   — O(1) .. O(log n)
  [30,  '#84cc16'],   // lime    — O(n)
  [50,  '#facc15'],   // yellow  — O(n log n)
  [70,  '#f97316'],   // orange  — O(n²)
  [100, '#ef4444'],   // red     — O(n³)+
];

function getColor(notation) {
  const score = BIG_O_SCORE[notation] ?? 42;
  for (const [max, col] of BIG_O_COLOR) {
    if (score <= max) return col;
  }
  return '#ef4444';
}

function getBarWidth(notation) {
  return Math.max(4, BIG_O_SCORE[notation] ?? 42);
}

function renderComplexityCard(data) {
  document.getElementById(LC_BOX_ID)?.remove();

  const tcColor = getColor(data.timeComplexity);
  const scColor = getColor(data.spaceComplexity);
  const tcWidth = getBarWidth(data.timeComplexity);
  const scWidth = getBarWidth(data.spaceComplexity);

  const sourceLabel = data.source === 'timecomplexity.ai'
    ? '🌐 TimeComplexity.ai'
    : data.source === 'rule-based'
    ? '⚡ Estimated (rule-based)'
    : data.source;

  const confidenceColors = { high: '#22c55e', medium: '#facc15', low: '#94a3b8' };
  const confColor = confidenceColors[data.confidence] ?? '#94a3b8';

  const breakdownHTML = (data.breakdown?.length)
    ? `<div style="margin-top:14px;padding-top:12px;border-top:1px solid #1f1f1f">
        <div style="font-size:10.5px;text-transform:uppercase;letter-spacing:.6px;color:#555;margin-bottom:8px">Breakdown</div>
        ${data.breakdown.map(b => `
          <div style="display:flex;justify-content:space-between;align-items:center;
                      padding:5px 0;border-bottom:1px solid #181818;font-size:12px">
            <span style="color:#9ca3af">${b.label}</span>
            <code style="color:#ff8c00;font-size:12px;font-weight:700">${b.complexity}</code>
          </div>`).join('')}
      </div>`
    : '';

  const ruleBasedNote = data.source === 'rule-based'
    ? `<div style="margin-top:12px;padding:9px 11px;background:#181818;border-radius:7px;
                   font-size:11px;color:#4b5563;line-height:1.55">
        ⚡ Estimated via static pattern analysis (TimeComplexity.ai was unreachable).
        Results are approximate — resubmit to retry the online analyzer.
       </div>`
    : '';

  const card = document.createElement('div');
  card.id = LC_BOX_ID;
  card.innerHTML = `
    <style>
      @keyframes _lcFadeUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
      @keyframes _lcBarGrow { from{width:0} }
      #${LC_BOX_ID} { animation:_lcFadeUp .3s ease-out both }
    </style>

    <div style="
      margin-top:12px; padding:16px 18px;
      border-radius:13px; background:#0f0f0f;
      border:1px solid #1e1e1e;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
      color:#fff; font-size:13px;
    ">

      <!-- ── Header ── -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:15px">
        <div style="display:flex;align-items:center;gap:7px;font-weight:700;font-size:13.5px">
          ${svgIcon('waveform', '#ff8c00')}
          Complexity Analysis
        </div>
        <span style="
          display:inline-flex;align-items:center;gap:4px;
          padding:2px 9px;border-radius:99px;
          background:${confColor}18;color:${confColor};
          font-size:10.5px;font-weight:600;letter-spacing:.3px
        ">
          <span style="width:5px;height:5px;border-radius:50%;background:${confColor}"></span>
          ${sourceLabel}
        </span>
      </div>

      <!-- ── Time Complexity ── -->
      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:5px">
          <span style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:.5px">Time</span>
          <code style="font-size:18px;font-weight:800;color:${tcColor};letter-spacing:-.5px;font-family:monospace">
            ${data.timeComplexity ?? '—'}
          </code>
        </div>
        <div style="height:5px;background:#1a1a1a;border-radius:99px;overflow:hidden">
          <div style="
            height:100%;width:${tcWidth}%;border-radius:99px;
            background:linear-gradient(90deg,${tcColor}66,${tcColor});
            animation:_lcBarGrow .55s cubic-bezier(.4,0,.2,1) both
          "></div>
        </div>
        ${data.timeReasoning
          ? `<div style="margin-top:5px;color:#6b7280;font-size:11.5px;line-height:1.5">${data.timeReasoning}</div>`
          : ''}
      </div>

      <!-- ── Space Complexity ── -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:5px">
          <span style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:.5px">Space</span>
          <code style="font-size:18px;font-weight:800;color:${scColor};letter-spacing:-.5px;font-family:monospace">
            ${data.spaceComplexity ?? '—'}
          </code>
        </div>
        <div style="height:5px;background:#1a1a1a;border-radius:99px;overflow:hidden">
          <div style="
            height:100%;width:${scWidth}%;border-radius:99px;
            background:linear-gradient(90deg,${scColor}66,${scColor});
            animation:_lcBarGrow .7s .1s cubic-bezier(.4,0,.2,1) both
          "></div>
        </div>
        ${data.spaceReasoning
          ? `<div style="margin-top:5px;color:#6b7280;font-size:11.5px;line-height:1.5">${data.spaceReasoning}</div>`
          : ''}
      </div>

      ${breakdownHTML}
      ${ruleBasedNote}
    </div>`;

  document.getElementById(LC_BTN_ID)?.insertAdjacentElement('afterend', card);
}

function renderError(msg) {
  document.getElementById(LC_BOX_ID)?.remove();

  const el = document.createElement('div');
  el.id = LC_BOX_ID;
  Object.assign(el.style, {
    marginTop   : '10px',
    padding     : '11px 14px',
    borderRadius: '9px',
    background  : '#180a0a',
    border      : '1px solid #3f1515',
    color       : '#f87171',
    fontSize    : '12.5px',
    fontFamily  : 'inherit',
  });
  el.textContent = `⚠️  ${msg}`;

  document.getElementById(LC_BTN_ID)?.insertAdjacentElement('afterend', el);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6.  HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function svgIcon(type, color = 'currentColor') {
  if (type === 'waveform') {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>`;
  }
  return '';
}

function spinnerHTML() {
  return `<span style="
    display:inline-block;width:12px;height:12px;flex-shrink:0;
    border:2px solid rgba(255,255,255,.25);
    border-top-color:#fff;border-radius:50%;
    animation:spin .65s linear infinite
  "></span>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 7.  BOOT — observe DOM, inject button when company box appears
// ─────────────────────────────────────────────────────────────────────────────

(function boot() {
  function tryInject() {
    const anchor = findAnchor();
    if (anchor) injectButton(anchor);
  }

  // Try immediately (page might already be loaded)
  tryInject();

  // Watch for SPA navigation / React re-renders
  new MutationObserver(tryInject).observe(document.body, {
    childList: true,
    subtree  : true,
  });
})();

// Handle PING from popup.js (existing extension pattern)
if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.type === 'PING_EXTENSION') sendResponse({ status: 'READY' });
    return true;
  });
}
