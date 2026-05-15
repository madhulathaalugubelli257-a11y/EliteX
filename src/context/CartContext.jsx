// CartContext.jsx
// User-isolated cart and order history using per-user localStorage keys.
//
// KEY DESIGN DECISIONS:
// 1. CartProvider is INSIDE AuthProvider in App.jsx, so useAuth() works here.
// 2. Storage keys include the user's email: "elitex_food_cart_user@x.com"
//    → each user gets completely separate data in localStorage.
// 3. useEffect on `userId` LOADS the correct user's data when they log in/switch.
// 4. Write actions (add, remove, update, placeOrder) call saveToStorage() DIRECTLY
//    instead of using a sync useEffect. This avoids the race condition where a
//    useEffect-based sync could momentarily write the wrong user's data to the
//    new user's key during a login switch.
// 5. On logout (userId → null), in-memory state is cleared.
//    Other users' localStorage data is NEVER touched.

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

// ---- Helpers ----

/**
 * Build a per-user localStorage key.
 * @param {string|null} userId  - user's email (used as unique ID)
 * @param {string}      dataKey - e.g. 'food_cart', 'grocery_cart', 'orders', 'ride_bookings'
 * @returns {string|null}
 */
function buildKey(userId, dataKey) {
  if (!userId) return null;
  return `elitex_${dataKey}_${userId}`;
}

/** Safely read JSON from localStorage. Returns fallback ([]) on missing/corrupt data. */
function loadFromStorage(key) {
  if (!key) return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Persist data to localStorage under a user-specific key. No-op when key is null. */
function saveToStorage(key, data) {
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ---- Provider ----

export function CartProvider({ children }) {
  // Get the currently logged-in user from AuthContext.
  // CartProvider is inside AuthProvider, so this is always available.
  const { user } = useAuth();

  // Use email as the unique user identifier for storage keys.
  // Falls back to user.id if email is absent (e.g. OAuth users).
  const userId = user?.email || user?.id?.toString() || null;

  // ---- State (starts empty; loaded per-user in useEffect below) ----
  const [foodCart, setFoodCart] = useState([]);
  const [groceryCart, setGroceryCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [rideBookings, setRideBookings] = useState([]); // per-user ride history
  const [sosBookings, setSosBookings] = useState([]); // per-user SOS history

  // ---- Load the correct user's data whenever userId changes ----
  // This covers: initial page load, login, logout, and account switching.
  useEffect(() => {
    if (userId) {
      // User logged in — load THEIR data from localStorage
      setFoodCart(loadFromStorage(buildKey(userId, 'food_cart')));
      setGroceryCart(loadFromStorage(buildKey(userId, 'grocery_cart')));
      setOrders(loadFromStorage(buildKey(userId, 'orders')));
      setRideBookings(loadFromStorage(buildKey(userId, 'ride_bookings')));
      setSosBookings(loadFromStorage(buildKey(userId, 'sos_bookings')));
    } else {
      // User logged out — wipe in-memory state ONLY.
      // Other users' localStorage entries are untouched.
      setFoodCart([]);
      setGroceryCart([]);
      setOrders([]);
      setRideBookings([]);
      setSosBookings([]);
    }
  }, [userId]); // Re-runs every time the logged-in user changes

  // ---- Food Cart Actions ----

  const addToFoodCart = (item) => {
    setFoodCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const updated = existing
        ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];
      saveToStorage(buildKey(userId, 'food_cart'), updated); // save immediately
      return updated;
    });
  };

  const removeFromFoodCart = (id) => {
    setFoodCart((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveToStorage(buildKey(userId, 'food_cart'), updated);
      return updated;
    });
  };

  const updateFoodQty = (id, qty) => {
    if (qty <= 0) {
      removeFromFoodCart(id);
      return;
    }
    setFoodCart((prev) => {
      const updated = prev.map((i) => (i.id === id ? { ...i, qty } : i));
      saveToStorage(buildKey(userId, 'food_cart'), updated);
      return updated;
    });
  };

  const clearFoodCart = () => {
    setFoodCart([]);
    saveToStorage(buildKey(userId, 'food_cart'), []);
  };

  // ---- Grocery Cart Actions ----

  const addToGroceryCart = (item) => {
    setGroceryCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const updated = existing
        ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];
      saveToStorage(buildKey(userId, 'grocery_cart'), updated);
      return updated;
    });
  };

  const removeFromGroceryCart = (id) => {
    setGroceryCart((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveToStorage(buildKey(userId, 'grocery_cart'), updated);
      return updated;
    });
  };

  const updateGroceryQty = (id, qty) => {
    if (qty <= 0) {
      removeFromGroceryCart(id);
      return;
    }
    setGroceryCart((prev) => {
      const updated = prev.map((i) => (i.id === id ? { ...i, qty } : i));
      saveToStorage(buildKey(userId, 'grocery_cart'), updated);
      return updated;
    });
  };

  const clearGroceryCart = () => {
    setGroceryCart([]);
    saveToStorage(buildKey(userId, 'grocery_cart'), []);
  };

  // ---- Ride Bookings ----

  const addRideBooking = (booking) => {
    setRideBookings((prev) => {
      const updated = [booking, ...prev];
      saveToStorage(buildKey(userId, 'ride_bookings'), updated);
      return updated;
    });
  };

  // ---- SOS Bookings ----

  const addSosBooking = (booking) => {
    setSosBookings((prev) => {
      const updated = [booking, ...prev];
      saveToStorage(buildKey(userId, 'sos_bookings'), updated);
      return updated;
    });
  };

  // ---- Orders ----

  const placeOrder = (type, cartItems, total) => {
    const order = {
      id: `ORD-${Date.now()}`,
      type,           // 'food' | 'grocery'
      items: cartItems,
      total,
      status: 'Confirmed',
      date: new Date().toLocaleString('en-IN'),
    };
    setOrders((prev) => {
      const updated = [order, ...prev];
      saveToStorage(buildKey(userId, 'orders'), updated); // save under this user's key
      return updated;
    });
    if (type === 'food')    clearFoodCart();
    if (type === 'grocery') clearGroceryCart();
    return order;
  };

  // ---- Derived Values ----
  const foodCartTotal    = foodCart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const groceryCartTotal = groceryCart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalCartItems   = foodCart.reduce((s, i) => s + i.qty, 0) +
                           groceryCart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        // Food cart
        foodCart,
        addToFoodCart,
        removeFromFoodCart,
        updateFoodQty,
        clearFoodCart,
        foodCartTotal,

        // Grocery cart
        groceryCart,
        addToGroceryCart,
        removeFromGroceryCart,
        updateGroceryQty,
        clearGroceryCart,
        groceryCartTotal,

        // Ride bookings
        rideBookings,
        addRideBooking,

        // SOS bookings
        sosBookings,
        addSosBooking,

        // Orders & totals
        totalCartItems,
        orders,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
