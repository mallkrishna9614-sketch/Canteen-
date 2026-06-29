/**
 * LPU CANTEEN — STAFF MENU DATA
 * Static menu definitions for all stores.
 * Availability state is overridden by localStorage per dish.
 */

const CANTEEN_MENU_DATA = {
  "Oven Xpress": {
    icon: "🍔",
    desc: "Fast snacks & fresh bites",
    image: "../media__1778178717294.jpg",
    categories: ["All", "Snacks", "Meals", "Drinks", "Desserts"],
    dishes: [
      { id: "ox-001", name: "Veg Burger", category: "Snacks", price: 60, isVeg: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=60" },
      { id: "ox-002", name: "Cheese Sandwich", category: "Snacks", price: 50, isVeg: true, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=60" },
      { id: "ox-003", name: "French Fries", category: "Snacks", price: 40, isVeg: true, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=60" },
      { id: "ox-004", name: "Cold Coffee", category: "Drinks", price: 70, isVeg: true, image: "../media__1778183101395.jpg" },
      { id: "ox-005", name: "Veg Wrap", category: "Snacks", price: 80, isVeg: true, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400&q=60" },
      { id: "ox-006", name: "Paneer Roll", category: "Meals", price: 90, isVeg: true, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=60" },
      { id: "ox-007", name: "Veg Pizza Slice", category: "Snacks", price: 60, isVeg: true, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=60" },
      { id: "ox-008", name: "Chocolate Brownie", category: "Desserts", price: 45, isVeg: true, image: "https://images.unsplash.com/photo-1540145038665-08e78e4e3a18?auto=format&fit=crop&w=400&q=60" },
      { id: "ox-009", name: "Masala Maggi", category: "Snacks", price: 35, isVeg: true, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=60" },
      { id: "ox-010", name: "Aloo Tikki Burger", category: "Snacks", price: 55, isVeg: true, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=60" }
    ]
  },

  "Kitchenette": {
    icon: "🍛",
    desc: "Home-style meals & thalis",
    image: "../media__1778179014617.jpg",
    categories: ["All", "Meals", "Snacks", "Drinks"],
    dishes: [
      { id: "kt-001", name: "Dal Tadka + Rice", category: "Meals", price: 80, isVeg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=60" },
      { id: "kt-002", name: "Paneer Butter Masala + 2 Roti", category: "Meals", price: 120, isVeg: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=60" },
      { id: "kt-003", name: "Veg Thali", category: "Meals", price: 100, isVeg: true, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=60" },
      { id: "kt-004", name: "Rajma Chawal", category: "Meals", price: 85, isVeg: true, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=60" },
      { id: "kt-005", name: "Chole Bhature", category: "Snacks", price: 70, isVeg: true, image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=400&q=60" },
      { id: "kt-006", name: "Samosa (2 pcs)", category: "Snacks", price: 20, isVeg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=60" },
      { id: "kt-007", name: "Kadhai Paneer + Roti", category: "Meals", price: 110, isVeg: true, image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=400&q=60" },
      { id: "kt-008", name: "Lassi", category: "Drinks", price: 40, isVeg: true, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=60" }
    ]
  },

  "Tea Point": {
    icon: "☕",
    desc: "Hot teas, coffees & snacks",
    image: "../media__1778179242191.jpg",
    categories: ["All", "Tea & Coffee", "Snacks", "Biscuits"],
    dishes: [
      { id: "tp-001", name: "Masala Chai", category: "Tea & Coffee", price: 15, isVeg: true, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=60" },
      { id: "tp-002", name: "Ginger Tea", category: "Tea & Coffee", price: 15, isVeg: true, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=60" },
      { id: "tp-003", name: "Filter Coffee", category: "Tea & Coffee", price: 20, isVeg: true, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=60" },
      { id: "tp-004", name: "Green Tea", category: "Tea & Coffee", price: 20, isVeg: true, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=60" },
      { id: "tp-005", name: "Bread Butter", category: "Snacks", price: 20, isVeg: true, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&q=60" },
      { id: "tp-006", name: "Veg Puff", category: "Snacks", price: 25, isVeg: true, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=60" },
      { id: "tp-007", name: "Biscuit Pack", category: "Biscuits", price: 10, isVeg: true, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=60" },
      { id: "tp-008", name: "Lemon Tea", category: "Tea & Coffee", price: 18, isVeg: true, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=400&q=60" }
    ]
  },

  "Coffee Day": {
    icon: "☕",
    desc: "Specialty coffees & beverages",
    image: "../media__1778179693818.jpg",
    categories: ["All", "Cold Drinks", "Hot Drinks", "Shakes", "Snacks"],
    dishes: [
      { id: "cd-001", name: "Cappuccino", category: "Hot Drinks", price: 80, isVeg: true, image: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&w=400&q=60" },
      { id: "cd-002", name: "Cold Coffee", category: "Cold Drinks", price: 90, isVeg: true, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=60" },
      { id: "cd-003", name: "Café Latte", category: "Hot Drinks", price: 85, isVeg: true, image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=400&q=60" },
      { id: "cd-004", name: "Frappe", category: "Cold Drinks", price: 110, isVeg: true, image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=400&q=60" },
      { id: "cd-005", name: "Chocolate Shake", category: "Shakes", price: 100, isVeg: true, image: "https://images.unsplash.com/photo-1572490122747-3a7c4b8b3f12?auto=format&fit=crop&w=400&q=60" },
      { id: "cd-006", name: "Espresso", category: "Hot Drinks", price: 60, isVeg: true, image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=60" },
      { id: "cd-007", name: "Panini Sandwich", category: "Snacks", price: 120, isVeg: true, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=60" },
      { id: "cd-008", name: "Muffin", category: "Snacks", price: 60, isVeg: true, image: "https://images.unsplash.com/photo-1558985250-27a406d64cb3?auto=format&fit=crop&w=400&q=60" }
    ]
  },

  "The Fresh Juice": {
    icon: "🧃",
    desc: "Fresh juices, shakes & bowls",
    image: "../media__1778181002956.jpg",
    categories: ["All", "Juices", "Shakes", "Bowls"],
    dishes: [
      { id: "fj-001", name: "Fresh Lime Soda", category: "Juices", price: 30, isVeg: true, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=60" },
      { id: "fj-002", name: "Mango Juice", category: "Juices", price: 50, isVeg: true, image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=60" },
      { id: "fj-003", name: "Orange Juice", category: "Juices", price: 45, isVeg: true, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=60" },
      { id: "fj-004", name: "Mixed Fruit Bowl", category: "Bowls", price: 70, isVeg: true, image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=400&q=60" },
      { id: "fj-005", name: "Banana Shake", category: "Shakes", price: 60, isVeg: true, image: "https://images.unsplash.com/photo-1572490122747-3a7c4b8b3f12?auto=format&fit=crop&w=400&q=60" },
      { id: "fj-006", name: "Watermelon Juice", category: "Juices", price: 35, isVeg: true, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=60" },
      { id: "fj-007", name: "Strawberry Smoothie", category: "Shakes", price: 80, isVeg: true, image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=60" },
      { id: "fj-008", name: "Green Detox Juice", category: "Juices", price: 65, isVeg: true, image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=400&q=60" }
    ]
  }
};

/**
 * Get dishes for a store with availability applied from localStorage
 */
function getStoreDishes(storeName) {
  const storeData = CANTEEN_MENU_DATA[storeName];
  if (!storeData) return [];
  return storeData.dishes.map(dish => {
    const key = `dishAvail_${storeName}_${dish.id}`;
    const stored = localStorage.getItem(key);
    return {
      ...dish,
      available: stored === null ? true : stored === '1'
    };
  });
}

/**
 * Toggle dish availability
 */
function toggleDishAvailability(storeName, dishId, available) {
  const key = `dishAvail_${storeName}_${dishId}`;
  localStorage.setItem(key, available ? '1' : '0');
}

/**
 * Get store status
 */
function getStoreStatus(storeName) {
  return localStorage.getItem(`storeStatus_${storeName}`) || 'open';
}

/**
 * Set store status
 */
function setStoreStatus(storeName, status) {
  localStorage.setItem(`storeStatus_${storeName}`, status);
}

/**
 * Store display names mapping (for matching with backend canteen field)
 */
const STORE_ALIASES = {
  "Oven Xpress":     ["oven xpress", "oven-xpress", "ovenxpress", "overxpress"],
  "Kitchenette":     ["kitchenette", "kitchenettee", "kitcher ettee"],
  "Tea Point":       ["tea point", "tea-point", "teapoint"],
  "Coffee Day":      ["coffee day", "coffee-day", "coffeeday"],
  "The Fresh Juice": ["the fresh juice", "fresh juice", "fresh-juice", "freshjuice"]
};


function normalizeStoreName(name) {
  if (!name) return null;
  const lower = name.toLowerCase().trim();
  for (const [canonical, aliases] of Object.entries(STORE_ALIASES)) {
    if (canonical.toLowerCase() === lower || aliases.includes(lower)) {
      return canonical;
    }
  }
  return null;
}
