import os

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{canteen_name} - Menu</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="dashboard.css">
    <link rel="stylesheet" href="menu.css">
</head>
<body class="menu-page">
    <!-- Navbar -->
    <header class="navbar fade-in" style="background: rgba(255, 255, 255, 0.95); box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        <div class="nav-container">
            <div class="nav-left">
                <a href="dashboard.html" class="nav-logo">
                    <span class="logo-icon">🍽️</span>
                    <span class="logo-text">LPU<span class="orange">Canteen</span></span>
                </a>
            </div>
            <nav class="nav-center" id="nav-center">
                <a href="dashboard.html" class="nav-link">Home</a>
                <a href="dashboard.html" class="nav-link">Explore</a>
                <a href="#" class="nav-link active">Menu</a>
            </nav>
            <div class="nav-right">
                <a href="dashboard.html" class="hero-cta" style="padding: 10px 20px; font-size: 0.85rem; text-decoration: none;">Back to Dashboard</a>
            </div>
        </div>
    </header>

    <main class="main-content" style="padding-top: 80px;">
        <!-- Hero Section -->
        <section class="menu-hero" style="background-image: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url('{bg_image}');">
            <div class="menu-hero-content">
                <div class="menu-hero-badge">★ 4.8 Rating</div>
                <h1 class="menu-hero-title">{canteen_name}</h1>
                <p class="menu-hero-tagline">{tagline}</p>
                <div class="menu-hero-meta">
                    <span>📍 {location}</span>
                    <span>🕒 9:00 AM - 10:00 PM</span>
                </div>
            </div>
        </section>

        <!-- Category Filters -->
        <section class="category-filters">
            <div class="filter-container">
                <button class="filter-btn active">All Items</button>
                <button class="filter-btn">Snacks</button>
                <button class="filter-btn">Meals</button>
                <button class="filter-btn">Drinks</button>
                <button class="filter-btn">Desserts</button>
                <button class="filter-btn">Combos</button>
            </div>
        </section>

        <!-- Menu Section -->
        <section class="menu-items-section">
            <div class="menu-grid">
                {menu_items_html}
            </div>
        </section>


    </main>

    <!-- Mini Cart (Fixed at bottom right) -->
    <div class="mini-cart">
        <div class="cart-header">
            <h4>Your Order</h4>
            <span class="cart-count">2 Items</span>
        </div>
        <div class="cart-total">
            <span>Subtotal:</span>
            <strong>₹240</strong>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
    </div>

    <!-- Footer -->
    <footer class="menu-footer">
        <div class="footer-content">
            <div class="footer-left">
                <h3>Need Help?</h3>
                <p>Email: <a href="mailto:support@lpu.co.in">support@lpu.co.in</a></p>
                <p>Call: <a href="tel:01824404404">01824-404404</a></p>
            </div>
            <div class="footer-right">
                <a href="dashboard.html" class="footer-btn">Back to Dashboard</a>
            </div>
        </div>
    </footer>
    <script src="cart.js"></script>
</body>
</html>
"""

menu_item_template = """
                <div class="food-card">
                    <div class="food-img-wrap">
                        <img src="{img}" alt="{name}" class="food-img">
                        <div class="food-type {type_class}"></div>
                    </div>
                    <div class="food-info">
                        <h3 class="food-name">{name}</h3>
                        <p class="food-desc">Delicious and freshly prepared {name_lower}.</p>
                        <div class="food-bottom">
                            <span class="food-price">₹{price}</span>
                            <button class="add-btn">Add +</button>
                        </div>
                    </div>
                </div>
"""

canteens = [
    {
        "filename": "oven-xpress.html",
        "name": "Oven Xpress",
        "tagline": "Fast snacks & fresh bites",
        "location": "Main Campus Area",
        "bg_image": "media__1778178717294.jpg",
        "items": [
            {"name": "Veg Burger", "price": "60", "type": "veg", "img": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60"},
            {"name": "Cheese Sandwich", "price": "50", "type": "veg", "img": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=60"},
            {"name": "French Fries", "price": "40", "type": "veg", "img": "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=60"},
            {"name": "Cold Coffee", "price": "70", "type": "veg", "img": "https://images.unsplash.com/photo-1461023058943-07cb1ce8dbb1?auto=format&fit=crop&w=500&q=60"},
            {"name": "Veg Wrap", "price": "80", "type": "veg", "img": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=60"},
        ]
    },
    {
        "filename": "coffee-day.html",
        "name": "Coffee Day",
        "tagline": "Brewing happiness since 1993",
        "location": "Central Library",
        "bg_image": "media__1778179693818.jpg",
        "items": [
            {"name": "Cappuccino", "price": "90", "type": "veg", "img": "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?auto=format&fit=crop&w=500&q=60"},
            {"name": "Latte", "price": "100", "type": "veg", "img": "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=500&q=60"},
            {"name": "Brownie", "price": "80", "type": "veg", "img": "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=500&q=60"},
            {"name": "Cold Coffee", "price": "110", "type": "veg", "img": "https://images.unsplash.com/photo-1461023058943-07cb1ce8dbb1?auto=format&fit=crop&w=500&q=60"},
            {"name": "Garlic Bread", "price": "70", "type": "veg", "img": "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=500&q=60"},
        ]
    },
    {
        "filename": "fresh-juice.html",
        "name": "The fresh juice",
        "tagline": "Fresh, healthy, energizing",
        "location": "Sports Complex",
        "bg_image": "media__1778181002956.jpg",
        "items": [
            {"name": "Mango Shake", "price": "60", "type": "veg", "img": "https://images.unsplash.com/photo-1546889851-925a666e52e4?auto=format&fit=crop&w=500&q=60"},
            {"name": "Banana Smoothie", "price": "50", "type": "veg", "img": "https://images.unsplash.com/photo-1526424382096-74a93e105682?auto=format&fit=crop&w=500&q=60"},
            {"name": "Orange Juice", "price": "40", "type": "veg", "img": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=60"},
            {"name": "Protein Shake", "price": "90", "type": "veg", "img": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=500&q=60"},
        ]
    },
    {
        "filename": "kitchenettee.html",
        "name": "Kitcher ettee",
        "tagline": "Delicious meals and combos",
        "location": "Block 38",
        "bg_image": "media__1778179014617.jpg",
        "items": [
            {"name": "Paneer Butter Masala", "price": "120", "type": "veg", "img": "media__1778183447481.jpg"},
            {"name": "Dal Makhani", "price": "90", "type": "veg", "img": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=60"},
            {"name": "Butter Naan", "price": "20", "type": "veg", "img": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=60"},
            {"name": "Aloo Paratha", "price": "30", "type": "veg", "img": "media__1778183651996.jpg"},
        ]
    },
    {
        "filename": "tea-point.html",
        "name": "Tea Point",
        "tagline": "Your daily dose of chai",
        "location": "Near Block 34",
        "bg_image": "media__1778179242191.jpg",
        "items": [
            {"name": "Masala Chai", "price": "15", "type": "veg", "img": "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=500&q=60"},
            {"name": "Samosa", "price": "15", "type": "veg", "img": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=60"},
            {"name": "Bread Pakora", "price": "20", "type": "veg", "img": "https://images.unsplash.com/photo-1626200419109-380d19910d65?auto=format&fit=crop&w=500&q=60"},
            {"name": "Patties", "price": "25", "type": "veg", "img": "https://images.unsplash.com/photo-1588316139591-177b9cc0f47e?auto=format&fit=crop&w=500&q=60"},
        ]
    }
]

for canteen in canteens:
    menu_html = ""
    for item in canteen["items"]:
        type_class = "veg-icon" if item["type"] == "veg" else "non-veg-icon"
        menu_html += menu_item_template.format(name=item["name"], name_lower=item["name"].lower(), price=item["price"], type_class=type_class, img=item["img"])
    
    html_content = html_template.format(
        canteen_name=canteen["name"],
        tagline=canteen["tagline"],
        location=canteen["location"],
        bg_image=canteen["bg_image"],
        menu_items_html=menu_html
    )
    
    with open(f'd:/Lpu canteen/{canteen["filename"]}', 'w', encoding='utf-8') as f:
        f.write(html_content)
