// Main Application Logic for REP (Rodriguez Equipment Parts) - Light Mode
// WhatsApp contact: +58 414 675 4699 | Instagram: @repparts_ve

const REP_CONFIG = {
  phone: "+58 414 675 4699",
  cleanPhone: "584146754699",
  instagram: "@repparts_ve",
  instagramUrl: "https://instagram.com/repparts_ve",
  location: "Maracaibo, Edo. Zulia, Venezuela"
};

// Application State
const state = {
  selectedBrand: "all",
  selectedCategory: "all",
  searchQuery: "",
  quoteCart: [],
  activeProductModal: null
};

// Initialize DOM
document.addEventListener("DOMContentLoaded", () => {
  initLucideIcons();
  loadCartFromStorage();
  renderProducts();
  renderTestimonials();
  setupEventListeners();
  updateCartBadge();
  initScrollReveal();
});

function initLucideIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Render Products Grid - Clean Light Mode
function renderProducts() {
  const container = document.getElementById("products-grid");
  const countBadge = document.getElementById("results-count");
  if (!container) return;

  const filtered = PRODUCTS_DATA.filter((product) => {
    const matchesBrand = state.selectedBrand === "all" || product.brand === state.selectedBrand;
    const matchesCategory = state.selectedCategory === "all" || product.category === state.selectedCategory;
    
    const query = state.searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      product.name.toLowerCase().includes(query) ||
      product.oemNumber.toLowerCase().includes(query) ||
      product.engineFitment.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query)) ||
      product.summary.toLowerCase().includes(query);

    return matchesBrand && matchesCategory && matchesQuery;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} repuestos encontrados`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8">
        <div class="inline-flex p-4 rounded-full bg-red-50 text-red-600 mb-4 border border-red-100">
          <i data-lucide="search-x" class="w-10 h-10"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2 font-tech">No se encontraron repuestos con los filtros aplicados</h3>
        <p class="text-gray-600 max-w-md mx-auto mb-6 text-sm">
          ¿Tienes el número de parte OEM o la placa de tu motor? Consulta a nuestros especialistas diésel directamente por WhatsApp.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <button onclick="resetFilters()" class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-semibold transition bg-white shadow-sm">
            Limpiar Filtros
          </button>
          <a href="${getWhatsAppLink('Hola REP, busco un repuesto no listado para mi equipo.')}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-lg btn-rep-primary text-white text-sm font-semibold flex items-center gap-2 shadow">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            Consultar por WhatsApp (+58 414 675 4699)
          </a>
        </div>
      </div>
    `;
    initLucideIcons();
    return;
  }

  container.innerHTML = filtered.map((product) => `
    <article class="bg-white border border-gray-200 rounded-2xl overflow-hidden card-hover-effect flex flex-col justify-between group shadow-sm hover:shadow-xl">
      <div>
        <!-- Image & Badges -->
        <div class="relative aspect-video w-full bg-gray-100 overflow-hidden border-b border-gray-100">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          <!-- Brand Badge -->
          <span class="absolute top-3 left-3 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full shadow-sm ${getBrandBadgeClass(product.brand)}">
            ${product.brandLabel}
          </span>

          <!-- Quality Badge -->
          <span class="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-semibold bg-white/95 text-red-600 border border-red-200 rounded-md shadow-sm">
            ${product.badge}
          </span>

          <!-- OEM Tag overlay at bottom of image -->
          <div class="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span class="font-mono bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-gray-200 text-[11px]">
              OEM: <strong class="text-white">${product.oemNumber}</strong>
            </span>
            <span class="text-emerald-300 font-semibold flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[11px]">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Stock Inmediato
            </span>
          </div>
        </div>

        <!-- Product Details -->
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <div class="flex text-amber-500 text-xs">
              ${'★'.repeat(Math.floor(product.rating))}
            </div>
            <span class="text-xs text-gray-500 font-mono">(${product.rating} / ${product.reviewsCount} opiniones)</span>
          </div>

          <h3 class="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2 font-heading">
            ${product.name}
          </h3>

          <div class="text-xs text-gray-700 mb-3 flex items-start gap-1.5 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
            <i data-lucide="cpu" class="w-4 h-4 text-red-600 shrink-0 mt-0.5"></i>
            <span class="line-clamp-1"><strong class="text-gray-900">Aplicación:</strong> ${product.engineFitment}</span>
          </div>

          <p class="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
            ${product.summary}
          </p>

          <div class="flex flex-wrap gap-1.5 mb-2">
            ${product.components.slice(0, 2).map(comp => `
              <span class="text-[11px] px-2 py-1 rounded bg-gray-100 text-gray-700 border border-gray-200">
                ✓ ${comp.split('(')[0].substring(0, 36)}...
              </span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="p-5 pt-0 border-t border-gray-100 mt-2 bg-gradient-to-b from-transparent to-gray-50/60">
        <div class="flex items-center justify-between py-3">
          <span class="text-xs uppercase tracking-wider text-gray-500 font-tech">Garantía:</span>
          <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">${product.warranty}</span>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button 
            onclick="openQuickView('${product.id}')"
            class="w-full py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-gray-300 shadow-sm"
          >
            <i data-lucide="eye" class="w-3.5 h-3.5 text-gray-600"></i>
            Ver Ficha
          </button>

          <button 
            onclick="addToQuoteCart('${product.id}')"
            class="w-full py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i>
            Cotizar
          </button>
        </div>

        <a 
          href="${getWhatsAppLink(`Hola REP, requiero cotización y disponibilidad del producto: *${product.name}* (OEM: ${product.oemNumber}). ¿Tienen despacho en Maracaibo?`)}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="mt-2 w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-medium flex items-center justify-center gap-1.5 transition shadow-sm"
        >
          <i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
          Cotizar WhatsApp Rápido
        </a>
      </div>
    </article>
  `).join("");

  initLucideIcons();
}

function getBrandBadgeClass(brand) {
  switch (brand) {
    case 'cummins':
      return 'bg-red-600 text-white font-bold';
    case 'caterpillar':
      return 'bg-amber-500 text-black font-extrabold';
    case 'perkins':
      return 'bg-blue-600 text-white font-bold';
    default:
      return 'bg-gray-800 text-white';
  }
}

// Render Testimonials - Mercado Libre Verified Reviews
function renderTestimonials() {
  const container = document.getElementById("testimonials-container");
  if (!container) return;

  container.innerHTML = TESTIMONIALS_DATA.map((t) => `
    <div class="bg-white border border-gray-200 rounded-2xl p-6 relative flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all card-hover-effect">
      <div>
        <!-- Calificación & Insignia de Verificación Mercado Libre -->
        <div class="flex flex-col gap-2.5 mb-4">
          <div class="flex items-center justify-between">
            <div class="flex text-amber-500 gap-1 text-sm">
              ${'<i data-lucide="star" class="w-4 h-4 fill-amber-500 text-amber-500"></i>'.repeat(t.rating)}
            </div>
            <span class="text-[10px] font-tech uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
              5.0 / 5.0
            </span>
          </div>

          <!-- Insignia de Verificación Requerida -->
          <div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-semibold">
              <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
              <span>${t.badgeText || "Compra Verificada en Mercado Libre"}</span>
            </span>
          </div>
        </div>

        <!-- Comentario Real del Cliente -->
        <p class="text-gray-800 text-sm font-medium leading-relaxed italic mb-6">
          "${t.comment}"
        </p>
      </div>

      <!-- Datos del Usuario en Mercado Libre -->
      <div class="pt-4 border-t border-gray-100 flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-xs uppercase shadow-xs shrink-0">
          ${t.name.slice(0, 2)}
        </div>
        <div class="overflow-hidden">
          <h4 class="text-sm font-black text-gray-900 font-mono tracking-tight truncate">${t.name}</h4>
          <p class="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span>Calificación Positiva · Mercado Libre</span>
          </p>
        </div>
      </div>
    </div>
  `).join("");

  initLucideIcons();
}

// Event Listeners
function setupEventListeners() {
  // Brand Tabs
  document.querySelectorAll("[data-brand-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-brand-filter]").forEach(b => {
        b.classList.remove("active", "bg-red-600", "text-white");
        b.classList.add("bg-gray-100", "text-gray-700");
      });
      btn.classList.add("active", "bg-red-600", "text-white");
      btn.classList.remove("bg-gray-100", "text-gray-700");
      state.selectedBrand = btn.dataset.brandFilter;
      renderProducts();
    });
  });

  // Category Tabs
  document.querySelectorAll("[data-category-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-category-filter]").forEach(b => {
        b.classList.remove("bg-red-50", "text-red-600", "border-red-300");
        b.classList.add("text-gray-600", "border-transparent");
      });
      btn.classList.add("bg-red-50", "text-red-600", "border-red-300");
      btn.classList.remove("text-gray-600", "border-transparent");
      state.selectedCategory = btn.dataset.categoryFilter;
      renderProducts();
    });
  });

  // Search input in header
  const headerSearch = document.getElementById("header-search-input");
  if (headerSearch) {
    headerSearch.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Hero Quick Search Form (Single line or multi-field)
  const heroForm = document.getElementById("hero-search-form");
  const heroPartInput = document.getElementById("hero-part-input");
  
  if (heroPartInput) {
    heroPartInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderProducts();

      const sisBtn = document.getElementById("sis-whatsapp-btn");
      if (sisBtn) {
        const query = e.target.value.trim();
        const baseMsg = query 
          ? `Hola REP, solicito verificar con el Software SIS Caterpillar el repuesto / serial: *${query}*. ¿Tienen disponibilidad y precio?`
          : `Hola REP, necesito verificar un repuesto o serial de motor con el Software SIS Caterpillar.`;
        sisBtn.href = getWhatsAppLink(baseMsg);
      }
    });
  }

  if (heroForm) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const brandSelect = document.getElementById("hero-brand-select")?.value || "all";
      const modelInput = document.getElementById("hero-model-input")?.value || "";
      const partInput = document.getElementById("hero-part-input")?.value || "";

      state.selectedBrand = brandSelect;
      state.searchQuery = `${modelInput} ${partInput}`.trim();

      // Sync Brand filter buttons if present
      document.querySelectorAll("[data-brand-filter]").forEach(b => {
        if (b.dataset.brandFilter === state.selectedBrand) {
          b.click();
        }
      });

      renderProducts();

      // Scroll smoothly to products section
      const catalogSection = document.getElementById("catalogo-repuestos");
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (state.searchQuery) {
        showToast(`Buscando repuestos para "${state.searchQuery}"`);
      }
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("newsletter-email");
      if (emailInput && emailInput.value) {
        showToast("¡Gracias por suscribirte al boletín de repuestos REP!");
        emailInput.value = "";
      }
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu-drawer");
  const mobileClose = document.getElementById("mobile-menu-close");

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }

  // Cart / Quote Drawer Toggle
  const quoteOpenBtn = document.getElementById("open-quote-drawer");
  const quoteDrawer = document.getElementById("quote-drawer");
  const quoteCloseBtn = document.getElementById("close-quote-drawer");

  if (quoteOpenBtn && quoteDrawer) {
    quoteOpenBtn.addEventListener("click", () => {
      renderQuoteCartItems();
      quoteDrawer.classList.remove("translate-x-full");
    });
  }
  if (quoteCloseBtn && quoteDrawer) {
    quoteCloseBtn.addEventListener("click", () => {
      quoteDrawer.classList.add("translate-x-full");
    });
  }
}

// Reset filters
function resetFilters() {
  state.selectedBrand = "all";
  state.selectedCategory = "all";
  state.searchQuery = "";

  const headerSearch = document.getElementById("header-search-input");
  if (headerSearch) headerSearch.value = "";

  document.querySelectorAll("[data-brand-filter]").forEach(b => {
    if (b.dataset.brandFilter === "all") {
      b.classList.add("active", "bg-red-600", "text-white");
      b.classList.remove("bg-gray-100", "text-gray-700");
    } else {
      b.classList.remove("active", "bg-red-600", "text-white");
      b.classList.add("bg-gray-100", "text-gray-700");
    }
  });

  renderProducts();
}

// Modal Quick View - Clean Light Mode
function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("quick-view-modal");
  const content = document.getElementById("quick-view-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="relative bg-white border border-gray-200 rounded-3xl overflow-hidden max-w-4xl w-full mx-4 shadow-2xl">
      <!-- Close Button -->
      <button onclick="closeQuickView()" class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-red-600 text-gray-700 hover:text-white flex items-center justify-center transition border border-gray-200 shadow">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2">
        <!-- Media side -->
        <div class="relative bg-gray-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-200">
          <img src="${product.image}" alt="${product.name}" class="w-full max-h-[380px] object-cover rounded-2xl shadow-md border border-gray-200">
          <div class="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-gray-200 shadow-lg">
            <p class="text-xs text-gray-600 font-mono">Número OEM: <strong class="text-gray-900">${product.oemNumber}</strong></p>
            <p class="text-xs text-emerald-700 mt-1 flex items-center gap-1 font-mono font-semibold">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Despacho desde Maracaibo, Zulia
            </p>
          </div>
        </div>

        <!-- Info side -->
        <div class="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto bg-white">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${getBrandBadgeClass(product.brand)}">
                ${product.brandLabel}
              </span>
              <span class="text-xs font-tech text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded border border-gray-200">
                ${product.condition}
              </span>
            </div>

            <h2 class="text-2xl font-black text-gray-900 mb-2 font-heading leading-tight">${product.name}</h2>
            
            <div class="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-4">
              <span class="text-xs text-gray-500 block font-tech uppercase tracking-wider">Compatibilidad de Motor:</span>
              <span class="text-sm font-semibold text-red-600 font-tech">${product.engineFitment}</span>
            </div>

            <p class="text-sm text-gray-600 leading-relaxed mb-4">${product.summary}</p>

            <h4 class="text-xs uppercase tracking-wider text-gray-700 font-bold mb-2 font-tech">Componentes incluidos en el kit:</h4>
            <ul class="space-y-1.5 mb-6">
              ${product.components.map(c => `
                <li class="text-xs text-gray-700 flex items-start gap-2">
                  <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
                  <span>${c}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="pt-4 border-t border-gray-200 space-y-2">
            <div class="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>Garantía: <strong class="text-gray-900">${product.warranty}</strong></span>
              <span class="text-emerald-700 font-bold">Envíos Nacionales Tealca / MRW / Zoom</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button 
                onclick="addToQuoteCart('${product.id}'); closeQuickView();" 
                class="w-full py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs flex items-center justify-center gap-2 transition border border-gray-300 shadow-sm"
              >
                <i data-lucide="clipboard-list" class="w-4 h-4 text-red-600"></i>
                Agregar a Cotización
              </button>

              <a 
                href="${getWhatsAppLink(`Hola REP (+58 414 675 4699), me interesa cotizar el repuesto: *${product.name}* (OEM: ${product.oemNumber}) para motor ${product.engineFitment}. ¿Cuál es el precio y tiempo de entrega?`)}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-full py-3 px-4 rounded-xl btn-rep-primary text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <i data-lucide="message-circle" class="w-4 h-4"></i>
                Cotizar WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  initLucideIcons();
}

function closeQuickView() {
  const modal = document.getElementById("quick-view-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// Quote Cart Logic
function addToQuoteCart(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = state.quoteCart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    state.quoteCart[existingIndex].qty += 1;
  } else {
    state.quoteCart.push({
      id: product.id,
      name: product.name,
      oem: product.oemNumber,
      brand: product.brandLabel,
      engine: product.engineFitment,
      qty: 1
    });
  }

  saveCartToStorage();
  updateCartBadge();
  showToast(`"${product.name}" agregado a tu lista de cotización`);
}

function removeFromQuoteCart(productId) {
  state.quoteCart = state.quoteCart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartBadge();
  renderQuoteCartItems();
}

function updateCartQuantity(productId, delta) {
  const item = state.quoteCart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromQuoteCart(productId);
  } else {
    saveCartToStorage();
    updateCartBadge();
    renderQuoteCartItems();
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("rep_quote_cart", JSON.stringify(state.quoteCart));
  } catch (e) {
    console.error("Storage error", e);
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("rep_quote_cart");
    if (saved) {
      state.quoteCart = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Storage error", e);
  }
}

function updateCartBadge() {
  const totalItems = state.quoteCart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".quote-badge").forEach(badge => {
    badge.textContent = totalItems;
    if (totalItems > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  });
}

function renderQuoteCartItems() {
  const container = document.getElementById("quote-cart-items");
  const checkoutBtn = document.getElementById("quote-whatsapp-submit");
  if (!container) return;

  if (state.quoteCart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center text-gray-500">
        <i data-lucide="package-open" class="w-12 h-12 mx-auto mb-3 opacity-40 text-gray-400"></i>
        <p class="text-sm text-gray-800 font-medium">Tu lista de cotización está vacía</p>
        <p class="text-xs text-gray-500 mt-1">Explora nuestro catálogo y agrega los repuestos que requieres para tu motor.</p>
      </div>
    `;
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add("opacity-50", "pointer-events-none");
    }
    initLucideIcons();
    return;
  }

  container.innerHTML = state.quoteCart.map(item => `
    <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-3 shadow-sm">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
            ${item.brand}
          </span>
          <span class="text-xs text-gray-600 font-mono truncate">OEM: ${item.oem}</span>
        </div>
        <h4 class="text-xs font-bold text-gray-900 mt-1 truncate">${item.name}</h4>
        <span class="text-[11px] text-gray-500 font-mono block">${item.engine}</span>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <div class="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-sm">
          <button onclick="updateCartQuantity('${item.id}', -1)" class="px-2 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs">-</button>
          <span class="px-2 text-xs font-bold text-gray-800">${item.qty}</span>
          <button onclick="updateCartQuantity('${item.id}', 1)" class="px-2 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs">+</button>
        </div>

        <button onclick="removeFromQuoteCart('${item.id}')" class="p-1.5 text-gray-400 hover:text-red-600 transition" title="Eliminar">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `).join("");

  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove("opacity-50", "pointer-events-none");
    
    // Construct WhatsApp message
    let message = `*SOLICITUD DE COTIZACIÓN - REP (Rodriguez Equipment Parts)*\n`;
    message += `📍 *Ubicación del Cliente:* Maracaibo / Venezuela\n`;
    message += `─────────────────────────\n`;
    state.quoteCart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (Cant: ${item.qty})\n   • OEM: ${item.oem}\n   • Motor: ${item.engine}\n`;
    });
    message += `─────────────────────────\n`;
    message += `Por favor indicarme disponibilidad inmediata y forma de pago. Gracias!`;

    checkoutBtn.href = getWhatsAppLink(message);
  }

  initLucideIcons();
}

// Generate direct WhatsApp link
function getWhatsAppLink(customMessage) {
  const text = encodeURIComponent(customMessage || `Hola REP (+58 414 675 4699), me comunico desde la página web repparts_ve para solicitar información de repuestos diésel.`);
  return `https://wa.me/${REP_CONFIG.cleanPhone}?text=${text}`;
}

// Toast notification helper - Light Mode
function showToast(message) {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "pointer-events-auto bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm toast-enter border-l-4 border-l-red-600";
  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0"></span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Scroll Reveal Observer for Smooth Section Animations
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('is-visible'));
  }
}

// Handler for Quick Quote Form with dynamic WhatsApp URL generation
function handleQuickQuoteSubmit(event) {
  if (event) {
    event.preventDefault();
  }

  const nameInput = document.getElementById("contact-name");
  const phoneInput = document.getElementById("contact-phone");
  const brandInput = document.getElementById("contact-brand");
  const partsInput = document.getElementById("contact-parts");

  const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "No especificado";
  const phone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : "No especificado";
  const brand = brandInput && brandInput.value.trim() ? brandInput.value.trim() : "No especificado";
  const parts = partsInput && partsInput.value.trim() ? partsInput.value.trim() : "No especificado";

  const message = `Hola REP, deseo cotizar los siguientes repuestos:\n📌 Nombre: ${name}\n📞 Teléfono: ${phone}\n⚙️ Motor / Marca: ${brand}\n🔧 Repuestos / OEM: ${parts}`;

  const cleanPhone = (typeof REP_CONFIG !== "undefined" && REP_CONFIG.cleanPhone) ? REP_CONFIG.cleanPhone : "584146754699";
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");

  if (typeof showToast === "function") {
    showToast("Abriendo WhatsApp con tu requerimiento...");
  }
}

