document.addEventListener('DOMContentLoaded', () => {
    const addBtns = document.querySelectorAll('.add-btn');
    const miniCart = document.querySelector('.mini-cart');

    // Attempt to extract canteen name from the page if available
    const canteenNameEl = document.querySelector('.menu-hero-title');
    const defaultCanteen = canteenNameEl ? canteenNameEl.textContent.trim() : 'LPU Canteen';

    let storedCart = [];
    try {
        storedCart = JSON.parse(localStorage.getItem('cart'));
    } catch(e) {
        console.error("Cart parse error", e);
    }
    window.cart = Array.isArray(storedCart) ? storedCart : [];

    window.showToast = function(message) {
        let toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '100px';
        toast.style.right = '30px';
        toast.style.background = 'var(--gray-900)';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        toast.style.zIndex = '1000';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.3s ease';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    };

    window.updateMiniCartQty = function(index, change) {
        let storedCart = JSON.parse(localStorage.getItem('cart'));
        window.cart = Array.isArray(storedCart) ? storedCart : [];
        if (window.cart[index]) {
            window.cart[index].quantity += change;
            if (window.cart[index].quantity <= 0) {
                window.cart.splice(index, 1);
                showToast("Item Removed");
            } else {
                showToast("Cart Updated");
            }
            localStorage.setItem('cart', JSON.stringify(window.cart));
            updateCartUI();
            
            // Dispatch storage event manually for same-tab listeners if any
            window.dispatchEvent(new Event('storage'));
        }
    };

    window.removeMiniCartItem = function(index) {
        let storedCart = JSON.parse(localStorage.getItem('cart'));
        window.cart = Array.isArray(storedCart) ? storedCart : [];
        window.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(window.cart));
        showToast("Item Removed");
        updateCartUI();
        window.dispatchEvent(new Event('storage'));
    };

    window.updateCartUI = function() {
        if (!miniCart) return;
        let storedCart = JSON.parse(localStorage.getItem('cart'));
        window.cart = Array.isArray(storedCart) ? storedCart : [];
        
        let totalItems = 0;
        let subtotal = 0;
        
        let itemsHtml = `<div class="cart-items-list">`;
        window.cart.forEach((item, index) => {
            let itemPrice = parseInt(item.price) || 0;
            totalItems += item.quantity;
            subtotal += itemPrice * item.quantity;
            
            itemsHtml += `
                <div class="mini-cart-item">
                    <div class="mini-cart-item-name">${item.name}</div>
                    <div class="mini-cart-item-price">₹${itemPrice * item.quantity}</div>
                    <div class="mini-cart-item-controls">
                        <button onclick="updateMiniCartQty(${index}, -1)" class="mini-qty-btn">-</button>
                        <span class="mini-qty-display">${item.quantity}</span>
                        <button onclick="updateMiniCartQty(${index}, 1)" class="mini-qty-btn">+</button>
                        <button onclick="removeMiniCartItem(${index})" class="mini-remove-btn">🗑️</button>
                    </div>
                </div>
            `;
        });
        itemsHtml += `</div>`;

        if (totalItems === 0) {
            miniCart.style.display = 'none';
            return;
        }

        miniCart.style.display = 'block';
        miniCart.innerHTML = `
            <div class="cart-header">
                <h4>Your Order</h4>
                <span class="cart-count">${totalItems} Item${totalItems !== 1 ? 's' : ''}</span>
            </div>
            ${itemsHtml}
            <div class="cart-total">
                <span>Subtotal:</span>
                <strong>₹${subtotal}</strong>
            </div>
            <div class="mini-cart-action-row">
                <button class="view-cart-btn" onclick="window.location.href='cart.html'">View Cart</button>
                <button class="checkout-btn" onclick="localStorage.setItem('cart', JSON.stringify(window.cart)); window.location.href='checkout.html'">Checkout</button>
            </div>
        `;

        miniCart.classList.remove('bounce');
        void miniCart.offsetWidth; // Trigger reflow
        miniCart.classList.add('bounce');
    };

    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.food-card');
            const name = card.querySelector('.food-name').textContent;
            
            // Fix parsing issues for price format (e.g. "₹ 40/-" -> 40)
            const priceStr = card.querySelector('.food-price').textContent;
            const price = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
            
            const img = card.querySelector('.food-img').src;
            const id = name.toLowerCase().replace(/\s+/g, '-');

            let storedCart = JSON.parse(localStorage.getItem('cart'));
            window.cart = Array.isArray(storedCart) ? storedCart : [];
            const existingItem = window.cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                window.cart.push({
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1,
                    img: img,
                    canteen: defaultCanteen
                });
            }

            localStorage.setItem('cart', JSON.stringify(window.cart));
            updateCartUI();
            showToast('Item Added');
            window.dispatchEvent(new Event('storage')); // Notify other listeners on this page

            // Visual feedback
            const originalText = btn.textContent;
            btn.textContent = 'Added ✓';
            btn.style.background = '#ff4757';
            btn.style.color = 'white';
            btn.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.transform = '';
            }, 800);
        });
    });

    // Listen for cross-tab or programmatic localStorage changes
    window.addEventListener('storage', (e) => {
        if (!e.key || e.key === 'cart') {
            updateCartUI();
        }
    });

    // Init UI on load
    updateCartUI();

    // ===== STAFF STORE CLOSED INTEGRATION =====
    // Read-only check: if staff has marked this store closed, show banner + disable ordering
    (function checkStoreStatus() {
        const storeAliases = {
            "Oven Xpress":  ["oven xpress", "oven-xpress", "ovenxpress"],
            "Kitchenette":  ["kitchenette", "kitchenettee", "kitcher ettee"],
            "Tea Point":    ["tea point", "tea-point", "teapoint"],
            "Coffee Day":   ["coffee day", "coffee-day", "coffeeday"],
            "Fresh Juice":  ["fresh juice", "fresh-juice", "freshjuice", "the fresh juice"]
        };

        function getCanonicalName(name) {
            if (!name) return null;
            const lower = name.toLowerCase().trim();
            for (const [canonical, aliases] of Object.entries(storeAliases)) {
                if (canonical.toLowerCase() === lower || aliases.includes(lower)) return canonical;
            }
            return null;
        }

        const pageCanteen = document.querySelector('.menu-hero-title')?.textContent.trim();
        const canonical   = getCanonicalName(pageCanteen);
        if (!canonical) return;

        const status = localStorage.getItem(`storeStatus_${canonical}`);
        if (!status || status === 'open') return;

        // Show status banner
        const isClosed = status === 'closed';
        const banner   = document.createElement('div');
        banner.id      = 'store-status-banner';
        banner.style.cssText = `
            position:fixed;top:70px;left:0;right:0;z-index:999;
            padding:14px 24px;text-align:center;font-family:Poppins,sans-serif;
            font-weight:700;font-size:0.95rem;letter-spacing:0.3px;
            display:flex;align-items:center;justify-content:center;gap:10px;
            background:${isClosed ? 'linear-gradient(90deg,#dc2626,#b91c1c)' : 'linear-gradient(90deg,#d97706,#b45309)'};
            color:white;box-shadow:0 4px 20px rgba(0,0,0,0.2);`;
        banner.innerHTML = isClosed
            ? '🔴 This store is currently <strong style="margin:0 5px;">CLOSED</strong> — Ordering is not available right now'
            : '🟡 This store is currently <strong style="margin:0 5px;">BUSY</strong> — Orders may take longer than usual';
        document.body.prepend(banner);

        // Disable add-to-cart buttons if closed
        if (isClosed) {
            document.querySelectorAll('.add-btn').forEach(btn => {
                btn.disabled = true;
                btn.textContent = 'Closed';
                btn.style.cssText = 'background:#d1d5db;color:#9ca3af;cursor:not-allowed;';
            });
        }
    })();

    // ===== MOBILE HAMBURGER FOR MENU PAGES =====
    const hamburger = document.getElementById('nav-hamburger');
    const navCenter = document.getElementById('nav-center');
    let overlay = document.getElementById('mobile-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'mobile-overlay';
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
    }

    if (hamburger && navCenter && overlay) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            navCenter.classList.toggle('open');
            overlay.classList.toggle('show');
            document.body.classList.toggle('no-scroll', isOpen);
        });

        overlay.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navCenter.classList.remove('open');
            overlay.classList.remove('show');
            document.body.classList.remove('no-scroll');
        });
    }
});
