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
        
        let itemsHtml = `<div class="cart-items-list" style="max-height: 220px; overflow-y: auto; margin-bottom: 15px; padding-right: 5px;">`;
        window.cart.forEach((item, index) => {
            let itemPrice = parseInt(item.price) || 0;
            totalItems += item.quantity;
            subtotal += itemPrice * item.quantity;
            
            itemsHtml += `
                <div class="mini-cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px; animation: fadeIn 0.3s ease;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; font-size: 0.95rem; color: var(--gray-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">${item.name}</div>
                        <div style="color: var(--orange); font-size: 0.9rem; font-weight: 700;">₹${itemPrice * item.quantity}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <button onclick="updateMiniCartQty(${index}, -1)" style="width: 26px; height: 26px; border-radius: 6px; border: none; background: var(--gray-100); color: var(--gray-900); cursor: pointer; font-weight: bold; transition: background 0.2s;">-</button>
                        <span style="font-size: 0.95rem; font-weight: 600; min-width: 20px; text-align: center;">${item.quantity}</span>
                        <button onclick="updateMiniCartQty(${index}, 1)" style="width: 26px; height: 26px; border-radius: 6px; border: none; background: var(--gray-100); color: var(--gray-900); cursor: pointer; font-weight: bold; transition: background 0.2s;">+</button>
                        <button onclick="removeMiniCartItem(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; margin-left: 4px; font-size: 1.1rem; transition: transform 0.2s;">🗑️</button>
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
            <style>
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
                .cart-items-list::-webkit-scrollbar { width: 4px; }
                .cart-items-list::-webkit-scrollbar-thumb { background: var(--gray-300); border-radius: 10px; }
            </style>
            <div class="cart-header" style="margin-bottom: 12px;">
                <h4>Your Order</h4>
                <span class="cart-count">${totalItems} Item${totalItems !== 1 ? 's' : ''}</span>
            </div>
            ${itemsHtml}
            <div class="cart-total" style="border-top: 2px dashed #eee; padding-top: 12px;">
                <span>Subtotal:</span>
                <strong>₹${subtotal}</strong>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="view-cart-btn" style="flex: 1; padding: 12px; background: var(--gray-100); color: var(--gray-900); border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s;" onclick="window.location.href='cart.html'">View Cart</button>
                <button class="checkout-btn" style="flex: 1; padding: 12px; background: var(--orange); color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s;" onclick="localStorage.setItem('cart', JSON.stringify(window.cart)); window.location.href='checkout.html'">Checkout</button>
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
            hamburger.classList.toggle('open');
            navCenter.classList.toggle('open');
            overlay.classList.toggle('show');
        });

        overlay.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navCenter.classList.remove('open');
            overlay.classList.remove('show');
        });
    }
});

// ===== CANTEEN MENU PAGES SKELETON LOADER =====
const initCanteenSkeleton = () => {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    mainContent.classList.add('content-loading-container');

    const skeletonWrapper = document.createElement('div');
    skeletonWrapper.className = 'skeleton-wrapper';
    skeletonWrapper.id = 'canteen-skeleton';
    skeletonWrapper.setAttribute('aria-hidden', 'true');
    skeletonWrapper.style.padding = '20px';
    skeletonWrapper.style.background = '#fff';
    skeletonWrapper.style.display = 'flex';
    skeletonWrapper.style.flexDirection = 'column';
    skeletonWrapper.style.gap = '32px';

    skeletonWrapper.innerHTML = `
        <!-- Hero Title Skeleton -->
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:20px;">
            <div class="skeleton-block" style="width:250px;height:32px;border-radius:6px;"></div>
            <div class="skeleton-block" style="width:180px;height:16px;border-radius:4px;"></div>
        </div>

        <!-- Category Filters Skeleton -->
        <div style="display:flex;gap:12px;flex-wrap:wrap;overflow-x:auto;padding-bottom:10px;">
            <div class="skeleton-block" style="width:100px;height:38px;border-radius:20px;flex-shrink:0;"></div>
            <div class="skeleton-block" style="width:90px;height:38px;border-radius:20px;flex-shrink:0;"></div>
            <div class="skeleton-block" style="width:90px;height:38px;border-radius:20px;flex-shrink:0;"></div>
            <div class="skeleton-block" style="width:90px;height:38px;border-radius:20px;flex-shrink:0;"></div>
            <div class="skeleton-block" style="width:100px;height:38px;border-radius:20px;flex-shrink:0;"></div>
        </div>

        <!-- Food Menu Grid Skeleton -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;">
            <div style="border:1px solid #f1f5f9;border-radius:20px;overflow:hidden;background:#fff;padding:16px;">
                <div class="skeleton-block" style="width:100%;height:180px;border-radius:12px;margin-bottom:16px;"></div>
                <div class="skeleton-block" style="width:50%;height:18px;margin-bottom:8px;"></div>
                <div class="skeleton-block" style="width:80%;height:14px;margin-bottom:16px;"></div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div class="skeleton-block" style="width:60px;height:20px;"></div>
                    <div class="skeleton-block" style="width:90px;height:36px;border-radius:18px;"></div>
                </div>
            </div>
            <div style="border:1px solid #f1f5f9;border-radius:20px;overflow:hidden;background:#fff;padding:16px;">
                <div class="skeleton-block" style="width:100%;height:180px;border-radius:12px;margin-bottom:16px;"></div>
                <div class="skeleton-block" style="width:50%;height:18px;margin-bottom:8px;"></div>
                <div class="skeleton-block" style="width:80%;height:14px;margin-bottom:16px;"></div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div class="skeleton-block" style="width:60px;height:20px;"></div>
                    <div class="skeleton-block" style="width:90px;height:36px;border-radius:18px;"></div>
                </div>
            </div>
            <div style="border:1px solid #f1f5f9;border-radius:20px;overflow:hidden;background:#fff;padding:16px;">
                <div class="skeleton-block" style="width:100%;height:180px;border-radius:12px;margin-bottom:16px;"></div>
                <div class="skeleton-block" style="width:50%;height:18px;margin-bottom:8px;"></div>
                <div class="skeleton-block" style="width:80%;height:14px;margin-bottom:16px;"></div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div class="skeleton-block" style="width:60px;height:20px;"></div>
                    <div class="skeleton-block" style="width:90px;height:36px;border-radius:18px;"></div>
                </div>
            </div>
            <div style="border:1px solid #f1f5f9;border-radius:20px;overflow:hidden;background:#fff;padding:16px;">
                <div class="skeleton-block" style="width:100%;height:180px;border-radius:12px;margin-bottom:16px;"></div>
                <div class="skeleton-block" style="width:50%;height:18px;margin-bottom:8px;"></div>
                <div class="skeleton-block" style="width:80%;height:14px;margin-bottom:16px;"></div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div class="skeleton-block" style="width:60px;height:20px;"></div>
                    <div class="skeleton-block" style="width:90px;height:36px;border-radius:18px;"></div>
                </div>
            </div>
        </div>
    `;

    mainContent.appendChild(skeletonWrapper);

    const hideSkeleton = () => {
        setTimeout(() => {
            mainContent.classList.add('loaded');
            skeletonWrapper.classList.add('fade-out');
            setTimeout(() => {
                skeletonWrapper.remove();
            }, 300);
        }, 600);
    };

    if (document.readyState === 'complete') {
        hideSkeleton();
    } else {
        window.addEventListener('load', hideSkeleton);
    }
};

initCanteenSkeleton();

