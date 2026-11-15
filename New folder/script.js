// Store Inventory Data
const games = [
  {
    id: 1,
    title: "Spectre Protocol: Zero Hour",
    category: "FPS",
    platforms: ["PC", "FPS"],
    price: 59.99,
    rating: "9.6 / 10",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    description:
      "Competitive 5v5 tactical shooter featuring destructible environments, sub-tick server precision, and deep operator utility synergy.",
    specs:
      "OS: Windows 10/11 64-bit | GPU: RTX 3060 / RX 6600 XT | RAM: 16GB | Storage: 45GB SSD",
  },
  {
    id: 2,
    title: "Aetheris: Shattered Crown",
    category: "RPG",
    platforms: ["PC", "Console", "RPG"],
    price: 69.99,
    rating: "9.4 / 10",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    description:
      "Explore a sprawling dark-fantasy continent torn apart by arcane storms. Forge custom spellblades and shape kingdom alliances.",
    specs:
      "OS: Windows 10/11 | GPU: RTX 3070 / RX 6800 | RAM: 16GB | Storage: 85GB NVMe SSD",
  },
  {
    id: 3,
    title: "Neon Drift: Overdrive",
    category: "Indie",
    platforms: ["PC", "Console", "Indie"],
    price: 24.99,
    rating: "9.1 / 10",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    description:
      "High-velocity synthwave street racing through rain-slicked megacities with frame-accurate drift physics and custom turbo tuning.",
    specs:
      "OS: Windows 10 | GPU: GTX 1660 / RX 580 | RAM: 8GB | Storage: 14GB SSD",
  },
  {
    id: 4,
    title: "Valkyrie Prime // Skin Bundle",
    category: "Skins & Gear",
    platforms: ["PC", "Skins & Gear"],
    price: 34.5,
    rating: "9.8 / 10",
    image:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80",
    description:
      "Limited-edition anodized gold and carbon-fiber weapon finishes, custom inspect animations, and reactive kill-counter holos.",
    specs:
      "Instant Steam / Nexus Inventory Delivery | Includes Rifle, Sidearm & Melee Finishes",
  },
  {
    id: 5,
    title: "Ironclad Bastion",
    category: "Console",
    platforms: ["Console", "FPS"],
    price: 49.99,
    rating: "8.9 / 10",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
    description:
      "Heavy-armor mech warfare across orbital shipyards. Customize reactor loadouts, railguns, and jump-jet thrusters.",
    specs:
      "Platform: PS5 / Xbox Series X|S | 4K 60FPS Performance Mode | Cross-Play Enabled",
  },
  {
    id: 6,
    title: "Hollow Signal",
    category: "Indie",
    platforms: ["PC", "Indie"],
    price: 19.99,
    rating: "9.5 / 10",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    description:
      "Atmospheric cyber-noir puzzle thriller where you intercept encrypted radio transmissions to uncover a rogue AI conspiracy.",
    specs:
      "OS: Windows 10/11 | GPU: Integrated / GTX 1050 | RAM: 8GB | Storage: 6GB",
  },
  {
    id: 7,
    title: "Chrono Syndicate",
    category: "RPG",
    platforms: ["PC", "Console", "RPG"],
    price: 54.99,
    rating: "9.2 / 10",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    description:
      "Turn-based tactical heist RPG set in 2099 Neo-Tokyo. Rewind botched turns, hack security grids, and extract high-value data.",
    specs:
      "OS: Windows 10/11 | GPU: RTX 2060 / RX 5600 XT | RAM: 16GB | Storage: 32GB SSD",
  },
  {
    id: 8,
    title: "HyperGlide Pro Mousepad XL",
    category: "Skins & Gear",
    platforms: ["PC", "Skins & Gear"],
    price: 29.99,
    rating: "9.7 / 10",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
    description:
      "Micro-woven hybrid speed/control esports desk mat (900x400x4mm) with stitched low-profile edges and non-slip rubber base.",
    specs:
      "Dimensions: 900mm x 400mm x 4mm | Surface: Humidity-Resistant Hybrid Weave",
  },
];

const categories = [
  "All Titles",
  "PC",
  "Console",
  "FPS",
  "RPG",
  "Indie",
  "Skins & Gear",
];

// State
let activeCategory = "All Titles";
let searchQuery = "";
let cart = [];
let promoApplied = false;

// DOM Elements
const categoryContainer = document.getElementById("category-filters");
const gamesGrid = document.getElementById("games-grid");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");
const desktopSearch = document.getElementById("desktop-search");
const mobileSearch = document.getElementById("mobile-search");

// Initialize App
function init() {
  renderCategories();
  renderGames();
  updateCartUI();

  // Synchronized Search Inputs
  const handleSearch = (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    desktopSearch.value = e.target.value;
    mobileSearch.value = e.target.value;
    renderGames();
  };

  desktopSearch.addEventListener("input", handleSearch);
  mobileSearch.addEventListener("input", handleSearch);
}

// Render Category Pills
function renderCategories() {
  categoryContainer.innerHTML = categories
    .map((cat) => {
      const isActive = cat === activeCategory;
      return `
      <button 
        onclick="setCategory('${cat}')"
        class="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
          isActive
            ? "bg-neonYellow text-obsidian font-bold shadow-[0_0_12px_rgba(250,204,21,0.3)]"
            : "bg-surface text-slate-300 hover:bg-surfaceHover border border-slate-800"
        }"
      >
        ${cat}
      </button>
    `;
    })
    .join("");
}

// Set Active Category
function setCategory(cat) {
  activeCategory = cat;
  renderCategories();
  renderGames();
}

// Reset Filters
function resetFilters(e) {
  if (e) e.preventDefault();
  activeCategory = "All Titles";
  searchQuery = "";
  desktopSearch.value = "";
  mobileSearch.value = "";
  renderCategories();
  renderGames();
}

// Render Game Cards
function renderGames() {
  const filtered = games.filter((game) => {
    const matchesCat =
      activeCategory === "All Titles" ||
      game.platforms.includes(activeCategory);
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery) ||
      game.category.toLowerCase().includes(searchQuery) ||
      game.description.toLowerCase().includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  resultsCount.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "item" : "items"}`;

  if (filtered.length === 0) {
    gamesGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  gamesGrid.innerHTML = filtered
    .map(
      (game) => `
    <article 
      onclick="openModal(${game.id})"
      class="game-card bg-surface border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer group"
    >
      <div>
        <div class="relative h-44 overflow-hidden bg-slate-900">
          <img 
            src="${game.image}" 
            alt="${game.title}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span class="absolute top-3 left-3 bg-obsidian/85 backdrop-blur-xs border border-slate-700 text-neonCyan text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
            ${game.category}
          </span>
          <span class="absolute top-3 right-3 bg-obsidian/85 text-neonYellow text-xs font-bold px-2 py-0.5 rounded-md">
            ★ ${game.rating.split(" ")[0]}
          </span>
        </div>

        <div class="p-4">
          <div class="flex flex-wrap gap-1.5 mb-2">
            ${game.platforms.map((p) => `<span class="text-[10px] uppercase tracking-wider text-slate-400 bg-obsidian px-2 py-0.5 rounded">${p}</span>`).join("")}
          </div>
          <h3 class="font-display font-bold text-base text-white group-hover:text-neonYellow transition-colors line-clamp-1">
            ${game.title}
          </h3>
          <p class="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            ${game.description}
          </p>
        </div>
      </div>

      <div class="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-800/60 mt-2">
        <span class="font-display font-bold text-lg text-white">$${game.price.toFixed(2)}</span>
        <button 
          onclick="event.stopPropagation(); addToCart(${game.id})"
          class="bg-slate-800 hover:bg-neonYellow text-white hover:text-obsidian font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
        >
          + Add
        </button>
      </div>
    </article>
  `,
    )
    .join("");
}

// Modal Controls
function openModal(id) {
  const game = games.find((g) => g.id === id);
  if (!game) return;

  document.getElementById("modal-img").src = game.image;
  document.getElementById("modal-title").textContent = game.title;
  document.getElementById("modal-rating").textContent = `★ ${game.rating}`;
  document.getElementById("modal-desc").textContent = game.description;
  document.getElementById("modal-specs").textContent = game.specs;
  document.getElementById("modal-price").textContent =
    `$${game.price.toFixed(2)}`;

  document.getElementById("modal-tags").innerHTML = game.platforms
    .map(
      (tag) => `
    <span class="bg-neonCyan/20 border border-neonCyan/40 text-neonCyan text-xs font-semibold px-2.5 py-0.5 rounded-md">${tag}</span>
  `,
    )
    .join("");

  const addBtn = document.getElementById("modal-add-btn");
  addBtn.onclick = () => {
    addToCart(game.id);
    closeModal();
  };

  const modal = document.getElementById("game-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("game-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

document.getElementById("game-modal").addEventListener("click", closeModal);

// Cart Drawer Controls
function toggleCart(open) {
  const overlay = document.getElementById("cart-overlay");
  const drawer = document.getElementById("cart-drawer");

  if (open) {
    overlay.classList.remove("hidden");
    setTimeout(() => drawer.classList.remove("translate-x-full"), 10);
  } else {
    drawer.classList.add("translate-x-full");
    setTimeout(() => overlay.classList.add("hidden"), 280);
  }
}

// Add Item to Cart
function addToCart(id) {
  const game = games.find((g) => g.id === id);
  if (!game) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...game, qty: 1 });
  }

  updateCartUI();
  showToast(`Added "${game.title}" to cart`);
}

// Update Quantity
function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  updateCartUI();
}

// Apply Promo Code
function applyPromo() {
  const input = document
    .getElementById("promo-input")
    .value.trim()
    .toUpperCase();
  const feedback = document.getElementById("promo-feedback");
  feedback.classList.remove("hidden");

  if (input === "GG20") {
    promoApplied = true;
    feedback.textContent = "Code GG20 applied! 20% discount activated.";
    feedback.className = "text-xs mt-1.5 text-neonCyan";
  } else {
    promoApplied = false;
    feedback.textContent = "Invalid promo code. Try GG20.";
    feedback.className = "text-xs mt-1.5 text-rose-400";
  }
  updateCartUI();
}

// Render Cart UI & Calculate Totals
function updateCartUI() {
  const badge = document.getElementById("cart-badge");
  const itemsContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const discountRow = document.getElementById("discount-row");
  const discountEl = document.getElementById("cart-discount");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = totalQty;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center text-center py-12">
        <p class="font-display text-sm text-slate-400 mb-1">YOUR CART IS EMPTY</p>
        <p class="text-xs text-slate-500">Add games or gear from the catalog to begin.</p>
      </div>
    `;
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.disabled = false;
    itemsContainer.innerHTML = cart
      .map(
        (item) => `
      <div class="flex gap-3.5 bg-obsidian/80 border border-slate-800 p-3 rounded-xl">
        <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-lg object-cover shrink-0" />
        <div class="flex-1 min-w-0">
          <h4 class="font-semibold text-sm text-white truncate">${item.title}</h4>
          <p class="text-xs text-neonYellow font-mono mt-0.5">$${(item.price * item.qty).toFixed(2)}</p>
          <div class="flex items-center gap-2 mt-2">
            <button onclick="changeQty(${item.id}, -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
            <span class="text-xs font-semibold w-5 text-center">${item.qty}</span>
            <button onclick="changeQty(${item.id}, 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
          </div>
        </div>
        <button onclick="changeQty(${item.id}, -${item.qty})" class="text-slate-500 hover:text-rose-400 text-xs self-start p-1" title="Remove">
          ✕
        </button>
      </div>
    `,
      )
      .join("");
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = promoApplied ? subtotal * 0.2 : 0;
  const total = subtotal - discount;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (promoApplied && subtotal > 0) {
    discountRow.classList.remove("hidden");
    discountRow.classList.add("flex");
    discountEl.textContent = `-$${discount.toFixed(2)}`;
  } else {
    discountRow.classList.add("hidden");
    discountRow.classList.remove("flex");
  }
  totalEl.textContent = `$${total.toFixed(2)}`;
}

// Simulated Checkout
function checkout() {
  if (cart.length === 0) return;
  cart = [];
  promoApplied = false;
  document.getElementById("promo-input").value = "";
  document.getElementById("promo-feedback").classList.add("hidden");
  updateCartUI();
  toggleCart(false);
  showToast("Order confirmed! Digital keys sent to your inbox.");
}

// Toast Notification
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-message").textContent = message;
  toast.classList.remove("translate-y-20", "opacity-0");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3000);
}

// Run
init();
