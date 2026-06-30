const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

// ===== NAVBAR SCROLL SHADOW + HERO PARALLAX =====
const studentData = JSON.parse(
    localStorage.getItem("studentData")
);

if (studentData) {

    const userName =
        document.getElementById("user-name");

    if (userName) {
        userName.textContent = studentData.name;
    }

}
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.getElementById('navbar').classList.toggle('scrolled', scrollY > 10);
    // Parallax
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
});

// ===== MOBILE HAMBURGER =====
const hamburger = document.getElementById('nav-hamburger');
const navCenter = document.getElementById('nav-center');
const overlay = document.getElementById('mobile-overlay');

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navCenter.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

overlay.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navCenter.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
});

// ===== NAV ACTIVE STATE & PAGE SWITCHING =====
document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
        link.classList.add('active');
        hamburger.classList.remove('open');
        navCenter.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';

        // Page switching logic
        const targetSection = link.getAttribute('data-section');
        const pageHome = document.getElementById('page-home');
        const pageOrders = document.getElementById('page-orders');
        
        if (targetSection === 'orders') {
            if (pageHome) pageHome.style.display = 'none';
            if (pageOrders) {
                pageOrders.style.display = 'block';
                loadStudentOrders();
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // All other links just show home for now
            if (pageHome) pageHome.style.display = 'block';
            if (pageOrders) pageOrders.style.display = 'none';
            
            // If it's a specific section on home page, scroll to it
            if (targetSection === 'explore') {
                const overview = document.getElementById('section-overview');
                if (overview) overview.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
});

// ===== DROPDOWN TOGGLE (mobile) =====
document.querySelectorAll('.nav-link-dropdown').forEach(dd => {
    dd.querySelector('.nav-link').addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dd.classList.toggle('open');
        }
    });
});



// ===== ADD TO CART ANIMATION =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
        const btn = e.target;
        btn.textContent = '✓';
        btn.style.background = 'linear-gradient(135deg,#16a34a,#22c55e)';
        setTimeout(() => {
            btn.textContent = '+';
            btn.style.background = '';
        }, 1200);
    }
});

// ===== HERO IMAGE SLIDER =====
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    if(slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    if(dots[currentSlide]) dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    if(dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 4500);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            slideInterval = setInterval(nextSlide, 4500);
        });
    });
    
}

// ===== SEARCH FUNCTIONALITY =====
const navSearchInput = document.getElementById('nav-search-input');
if (navSearchInput) {
    navSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const canteenCards = document.querySelectorAll('.canteen-card');
        
        canteenCards.forEach(card => {
            const name = card.querySelector('.canteen-name')?.textContent.toLowerCase() || '';
            const location = card.querySelector('.canteen-location')?.textContent.toLowerCase() || '';
            
            if (name.includes(searchTerm) || location.includes(searchTerm)) {
                card.style.display = ''; // Restore default display (flex/block)
            } else {
                card.style.display = 'none';
            }
        });
        
        // Also switch to home page if they start typing while on another page
        if (searchTerm.length > 0) {
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[data-section="home"]');
            if (homeLink) homeLink.classList.add('active');
            
            document.getElementById('page-home').style.display = 'block';
            document.getElementById('page-orders').style.display = 'none';
        }
    });
}

// ===== VIEW ALL FUNCTIONALITY =====
const viewAllBtn = document.getElementById('view-all-canteens');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent jump to top
        const extraCanteens = document.querySelectorAll('.extra-canteen');
        if (extraCanteens.length > 0) {
            const isHidden = extraCanteens[0].style.display === 'none';
            
            extraCanteens.forEach(card => {
                card.style.display = isHidden ? 'block' : 'none';
            });
            
            viewAllBtn.textContent = isHidden ? 'Show Less' : 'View All';
        }
    });
}

// ===== CONTACT MENU MOBILE TOGGLE =====
const contactBtn = document.getElementById('contact-us-btn');
const contactMenu = document.getElementById('contact-menu');
if (contactBtn && contactMenu) {
    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Toggle inline display logic for mobile, while css hover works for desktop
        if (contactMenu.style.display === 'flex') {
            contactMenu.style.display = 'none';
        } else {
            contactMenu.style.display = 'flex';
        }
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.contact-dropdown')) {
            contactMenu.style.display = '';
        }
    });
}

// ==========================================================================
// MY ORDERS FUNCTIONALITY (Zomato-Style)
// ==========================================================================
let allOrders = [];

function getCanteenEmoji(name) {
    name = (name || '').toLowerCase();
    if (name.includes('oven')) return '🍕';
    if (name.includes('tea')) return '🍵';
    if (name.includes('coffee')) return '☕';
    if (name.includes('juice')) return '🍹';
    if (name.includes('kitchen') || name.includes('kitcher')) return '🍛';
    return '🏢';
}

function getCanteenPage(canteenName) {
    const name = (canteenName || '').toLowerCase().trim();
    if (name.includes('oven')) return 'oven-xpress.html';
    if (name.includes('kitchen') || name.includes('kitcher')) return 'kitchenettee.html';
    if (name.includes('tea')) return 'tea-point.html';
    if (name.includes('coffee')) return 'coffee-day.html';
    if (name.includes('juice')) return 'fresh-juice.html';
    return 'dashboard.html';
}

function getStatusBadgeClass(status) {
    status = (status || '').toLowerCase();
    if (status === 'pending' || status === 'accepted') return 'badge-pending';
    if (status === 'preparing') return 'badge-preparing';
    if (status === 'ready for pickup' || status === 'ready') return 'badge-ready';
    if (status === 'collected' || status === 'completed' || status === 'picked up') return 'badge-completed';
    if (status === 'cancelled') return 'badge-cancelled';
    return 'badge-pending';
}

function getCurrentStepIndex(status) {
    status = (status || '').toLowerCase();
    if (status === 'pending' || status === 'accepted' || status === 'payment successful') return 0;
    if (status === 'preparing') return 1;
    if (status === 'ready for pickup' || status === 'ready') return 2;
    if (status === 'picked up' || status === 'collected') return 3;
    if (status === 'completed') return 4;
    return -1; // Cancelled/unknown
}

function renderTimelineHtml(status) {
    const currentIdx = getCurrentStepIndex(status);
    if (currentIdx === -1) {
        return `<div style="color: #ef4444; font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">❌ Order Cancelled</div>`;
    }
    
    const stepsData = [
        "Order Placed",
        "Preparing",
        "Ready for Pickup",
        "Picked Up",
        "Completed"
    ];
    
    let html = '<div class="vertical-timeline">';
    stepsData.forEach((step, idx) => {
        let cls = '';
        if (idx < currentIdx) {
            cls = 'completed';
        } else if (idx === currentIdx) {
            cls = 'active';
        }
        
        html += `
            <div class="timeline-step-row ${cls}">
                <div class="timeline-step-dot"></div>
                <div class="timeline-step-content">
                    <span class="timeline-step-title">${step}</span>
                </div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function parseDate(dateStr) {
    const t = Date.parse(dateStr);
    return isNaN(t) ? Date.now() : t;
}

function sortOrders() {
    const activeStatuses = ["pending", "accepted", "preparing", "ready for pickup", "ready", "payment successful"];
    
    allOrders.sort((a, b) => {
        const aStatus = (a.status || '').toLowerCase();
        const bStatus = (b.status || '').toLowerCase();
        
        const aIsActive = activeStatuses.includes(aStatus);
        const bIsActive = activeStatuses.includes(bStatus);
        
        if (aIsActive && !bIsActive) return -1;
        if (!aIsActive && bIsActive) return 1;
        
        const aTime = parseDate(a.date);
        const bTime = parseDate(b.date);
        return bTime - aTime;
    });
}

function addOrderItemsToCart(items, canteenName) {
    let storedCart = [];
    try {
        storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch(e) {
        storedCart = [];
    }
    if (!Array.isArray(storedCart)) storedCart = [];

    items.forEach(item => {
        const id = item.name.toLowerCase().replace(/\s+/g, '-');
        const existingItem = storedCart.find(ci => ci.name === item.name);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            storedCart.push({
                id: id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                img: 'lpu-logo.png',
                canteen: canteenName
            });
        }
    });

    localStorage.setItem('cart', JSON.stringify(storedCart));
    window.dispatchEvent(new Event('storage'));
}

function bindOrderCardEvents() {
    // Accordion toggle
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cardId = btn.getAttribute('data-card-id');
            const detailsDiv = document.getElementById(`details-${cardId}`);
            if (detailsDiv) {
                const isExpanded = btn.classList.contains('expanded');
                if (isExpanded) {
                    btn.classList.remove('expanded');
                    detailsDiv.style.display = 'none';
                } else {
                    btn.classList.add('expanded');
                    detailsDiv.style.display = 'block';
                }
            }
        });
    });
    
    // Reorder button handler
    document.querySelectorAll('.reorder-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = btn.getAttribute('data-order-id');
            const order = allOrders.find(o => o.id === orderId);
            if (order) {
                addOrderItemsToCart(order.items, order.canteen);
                
                // Visual feedback of showToast if available
                if (window.showToast) {
                    window.showToast('Reordered! Items added to cart.');
                } else {
                    alert('Items added back to cart!');
                }
                
                // Redirect to correct canteen page
                const canteenPage = getCanteenPage(order.canteen);
                setTimeout(() => {
                    window.location.href = canteenPage;
                }, 800);
            }
        });
    });
}

function renderOrderCardHtml(order) {
    const emoji = getCanteenEmoji(order.canteen);
    const badgeClass = getStatusBadgeClass(order.status);
    
    let itemsListHtml = '';
    order.items.forEach(item => {
        itemsListHtml += `
            <div class="details-item-row">
                <span class="details-item-name">${item.name} <span class="details-item-qty">x${item.quantity}</span></span>
                <span class="details-item-price">₹${(item.price * item.quantity)}</span>
            </div>
        `;
    });
    
    const isCompleted = ["completed", "picked up", "collected"].includes(order.status.toLowerCase());
    const reorderBtnHtml = isCompleted 
        ? `<button class="reorder-btn" data-order-id="${order.id}">Reorder</button>`
        : '';
        
    return `
        <div class="zomato-order-card" id="card-${order.id}">
            <div class="order-card-summary">
                <div class="order-card-left">
                    <div class="order-canteen-logo">${emoji}</div>
                    <div class="order-main-info">
                        <h3 class="order-canteen-title">${order.canteen}</h3>
                        <div class="order-meta-details">
                            <span>Token: <strong>${order.token}</strong></span>
                            <span>${order.date}</span>
                        </div>
                        <span class="order-status-badge ${badgeClass}">${order.status}</span>
                    </div>
                </div>
                <div class="order-card-right">
                    <span class="order-total-price">₹${order.total}</span>
                    <div class="order-action-buttons">
                        <button class="view-details-btn" data-card-id="${order.id}">
                            View Details
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        ${reorderBtnHtml}
                    </div>
                </div>
            </div>
            
            <div class="order-card-details" id="details-${order.id}">
                <div class="details-grid">
                    <div class="details-left-pane">
                        <div class="details-title">Receipt Details</div>
                        <div class="details-items-list">
                            ${itemsListHtml}
                        </div>
                        <div class="details-summary-row total">
                            <span>Total Amount</span>
                            <span>₹${order.total}</span>
                        </div>
                        <div class="details-pickup-info">
                            <div><strong>Pickup Option:</strong> Takeaway</div>
                            <div><strong>Pickup Slot:</strong> ${order.timeSlot || 'As soon as ready'}</div>
                            <div><strong>Payment Status:</strong> Paid ✅</div>
                        </div>
                    </div>
                    <div class="details-timeline-pane">
                        <div class="details-title">Order Progress</div>
                        ${renderTimelineHtml(order.status)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderFilteredOrders() {
    const listContainer = document.getElementById('orders-list');
    const emptyState = document.getElementById('orders-empty-state');
    if (!listContainer) return;
    
    const searchText = (document.getElementById('orders-search')?.value || '').toLowerCase().trim();
    const activeFilter = document.querySelector('.filter-chip.active')?.getAttribute('data-filter') || 'all';
    
    let filtered = allOrders;
    
    // Search filter
    if (searchText) {
        filtered = filtered.filter(o => {
            const token = (o.token || '').toLowerCase();
            const canteen = (o.canteen || '').toLowerCase();
            return token.includes(searchText) || canteen.includes(searchText);
        });
    }
    
    // Status Filter
    const activeStatuses = ["pending", "accepted", "preparing", "ready for pickup", "ready", "payment successful"];
    const completedStatuses = ["completed", "picked up", "collected"];
    
    if (activeFilter === 'active') {
        filtered = filtered.filter(o => activeStatuses.includes((o.status || '').toLowerCase()));
    } else if (activeFilter === 'completed') {
        filtered = filtered.filter(o => completedStatuses.includes((o.status || '').toLowerCase()));
    } else if (activeFilter === 'cancelled') {
        filtered = filtered.filter(o => (o.status || '').toLowerCase() === 'cancelled');
    }
    
    if (filtered.length === 0) {
        if (allOrders.length === 0) {
            emptyState.style.display = 'flex';
            listContainer.style.display = 'none';
        } else {
            listContainer.innerHTML = '<div style="text-align:center;padding:40px;color:var(--gray-500)"><p>No orders match your search or filter.</p></div>';
            listContainer.style.display = 'block';
            emptyState.style.display = 'none';
        }
        return;
    }
    
    emptyState.style.display = 'none';
    listContainer.style.display = 'block';
    
    let html = '';
    filtered.forEach(order => {
        html += renderOrderCardHtml(order);
    });
    
    listContainer.innerHTML = html;
    bindOrderCardEvents();
}

async function loadStudentOrders() {
    const regNo = localStorage.getItem('studentRegNo') || '';
    const listContainer = document.getElementById('orders-list');
    const emptyState = document.getElementById('orders-empty-state');
    if (!listContainer) return;
    
    listContainer.innerHTML = '<div style="text-align:center;padding:40px;color:var(--gray-500)"><p>Loading your orders...</p></div>';
    if (emptyState) emptyState.style.display = 'none';
    listContainer.style.display = 'block';
    
    let backendOrders = [];
    try {
        if (regNo) {
            const res = await fetch(`https://backend1-i1jb.onrender.com/api/orders?registrationNumber=${regNo}`);
            if (res.ok) {
                backendOrders = await res.json();
            }
        }
    } catch (err) {
        console.warn("Could not fetch orders from backend:", err);
    }
    
    let localOrders = [];
    try {
        localOrders = JSON.parse(localStorage.getItem('canteenOrders')) || [];
    } catch (e) {
        localOrders = [];
    }
    if (!Array.isArray(localOrders)) localOrders = [];
    
    const combinedMap = new Map();
    
    backendOrders.forEach(order => {
        const id = order._id || order.id;
        combinedMap.set(id, {
            id: id,
            token: order.tokenNumber || `TKN-${id.slice(-5).toUpperCase()}`,
            regNo: order.registrationNumber,
            canteen: order.canteen,
            timeSlot: order.pickupSlot || 'As soon as ready',
            items: order.items || [],
            total: order.totalAmount || order.total,
            status: order.orderStatus || 'Pending',
            date: new Date(order.createdAt || Date.now()).toLocaleString(),
            isBackend: true
        });
    });
    
    localOrders.forEach(order => {
        if (order.regNo === regNo) {
            const id = order.id || order.token;
            if (combinedMap.has(id)) {
                const existing = combinedMap.get(id);
                existing.status = order.status || existing.status;
                existing.timeSlot = order.timeSlot || existing.timeSlot;
                existing.eta = order.eta || existing.eta;
                existing.rush = order.rush || existing.rush;
            } else {
                combinedMap.set(id, {
                    id: id,
                    token: order.token,
                    regNo: order.regNo,
                    canteen: order.canteen,
                    timeSlot: order.timeSlot,
                    items: order.items || [],
                    total: order.total,
                    status: order.status || 'Pending',
                    date: order.date,
                    rush: order.rush,
                    eta: order.eta,
                    isBackend: false
                });
            }
        }
    });
    
    allOrders = Array.from(combinedMap.values());
    sortOrders();
    renderFilteredOrders();
}

function showHomeSection() {
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
    const homeLink = document.querySelector('.nav-link[data-section="home"]');
    if (homeLink) homeLink.classList.add('active');
    
    const pageHome = document.getElementById('page-home');
    const pageOrders = document.getElementById('page-orders');
    if (pageHome) pageHome.style.display = 'block';
    if (pageOrders) pageOrders.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupOrdersFilters() {
    const searchInput = document.getElementById('orders-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderFilteredOrders();
        });
    }
    
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderFilteredOrders();
        });
    });
    
    const exploreBtn = document.getElementById('orders-explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            showHomeSection();
        });
    }
}

// Initialize filters
setupOrdersFilters();
