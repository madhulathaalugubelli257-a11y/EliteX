// chatbotData/chatbotResponses.js
// ─────────────────────────────────────────────────────────────
// EliteX AI Assistant — Predefined Response Engine
// To plug in a real AI API later, replace `getBotResponse()`
// with an async fetch to your endpoint.
// ─────────────────────────────────────────────────────────────

const responses = [
  // ── GREETING ──────────────────────────────────────────────
  {
    keywords: ['hello', 'hi', 'hey', 'hii', 'helo', 'greetings', 'good morning', 'good evening', 'good afternoon', 'sup', 'yo'],
    reply: `👋 Hey there! I'm **EliteBot**, your smart campus assistant!\n\nI can help you with:\n• 🍔 **Food ordering** via EliteEats\n• 🚗 **Ride booking** via EliteRide\n• 🛒 **Grocery shopping** via EliteMart\n• 📦 **Tracking your orders**\n\nWhat can I help you with today?`,
  },

  // ── FOOD / CAMPUS EATS ────────────────────────────────────
  {
    keywords: ['food', 'order food', 'eat', 'hungry', 'meal', 'lunch', 'dinner', 'breakfast', 'snack', 'eliteeats', 'eats', 'restaurant'],
    reply: `🍔 **Ordering Food on EliteEats is easy!**\n\n1. Go to **EliteEats** from the menu\n2. Browse restaurants & dishes\n3. Tap any item → add to 🛒 Cart\n4. Review your cart\n5. Place order & track delivery!\n\n💡 *You can filter by cuisine, rating, or price.*`,
  },
  {
    keywords: ['group order', 'group food', 'split food', 'friends order', 'group ordering'],
    reply: `👥 **Group Ordering on EliteEats:**\n\n1. Choose your items as usual\n2. Share your cart link with friends\n3. Everyone adds their items\n4. One person checks out\n5. Delivery comes to one spot!\n\n💡 *Perfect for hostel rooms or study groups.*`,
  },
  {
    keywords: ['food delivery', 'food charge', 'food fee', 'delivery charge', 'delivery fee', 'delivery cost', 'how much delivery'],
    reply: `💰 **Delivery Charges on EliteEats:**\n\n• Within campus: **₹10 – ₹20**\n• Nearby areas: **₹20 – ₹40**\n• Free delivery on orders above **₹199** 🎉\n\nCharges are shown clearly before you confirm your order.`,
  },

  // ── RIDE / CAMPUS RIDE ────────────────────────────────────
  {
    keywords: ['ride', 'book ride', 'book a ride', 'elite ride', 'eliteride', 'cab', 'auto', 'transport', 'travel', 'vehicle'],
    reply: `🚗 **Booking a Ride on EliteRide:**\n\n1. Open **EliteRide** from the menu\n2. Enter your **pickup location**\n3. Select your **destination**\n4. Choose vehicle type (Bike / Auto / Cab)\n5. Select **Shared** or **Private** ride\n6. Confirm booking & track your driver!\n\n💡 *Shared rides save up to 60% on cost.*`,
  },
  {
    keywords: ['shared ride', 'share ride', 'pool', 'carpool', 'rideshare', 'split ride'],
    reply: `🤝 **How Shared Rides Work:**\n\n• You're matched with students going the same way\n• Cost is **split equally** among riders\n• Saves up to **60%** compared to private rides\n• Slightly longer ETA due to multiple pickups\n\n✅ *Great for daily commutes within campus!*`,
  },
  {
    keywords: ['private ride', 'solo ride', 'alone', 'private'],
    reply: `🚙 **Private Ride:**\n\n• Just you + the driver\n• Direct route, no detours\n• **Faster** but costs more than shared\n\nChoose *Private* when booking your ride for this option.`,
  },
  {
    keywords: ['driver', 'become driver', 'join driver', 'register driver', 'drive', 'earn money', 'earn as driver'],
    reply: `🧑‍✈️ **Become a EliteRide Driver:**\n\n1. Go to **Profile → Become a Driver**\n2. Submit your vehicle details\n3. Upload your driving licence\n4. Get verified within **24-48 hrs**\n5. Start accepting rides & earn! 💸\n\n*Minimum age: 18 | Valid licence required.*`,
  },

  // ── GROCERY / CAMPUS MART ─────────────────────────────────
  {
    keywords: ['grocery', 'groceries', 'mart', 'elitemart', 'shop', 'shopping', 'buy grocery', 'vegetables', 'fruits', 'daily needs', 'essentials'],
    reply: `🛒 **Shopping on EliteMart:**\n\n1. Open **EliteMart** from the menu\n2. Browse categories (Snacks, Dairy, Veggies, etc.)\n3. Add items to your cart\n4. Choose **delivery** or **pickup**\n5. Pay & get it delivered to your hostel!\n\n💡 *Fresh groceries delivered in under 45 minutes.*`,
  },
  {
    keywords: ['mart delivery', 'grocery delivery', 'grocery time', 'grocery charge', 'mart charge'],
    reply: `📦 **EliteMart Delivery Info:**\n\n• Delivery time: **30–45 minutes**\n• Delivery fee: **₹15** (free above ₹299)\n• Pickup option: **Free, 0 wait time**\n\nAll products are sourced fresh daily! 🌿`,
  },

  // ── ORDERS / TRACKING ─────────────────────────────────────
  {
    keywords: ['order', 'my orders', 'order history', 'track order', 'where is my order', 'order status', 'see orders', 'orders'],
    reply: `📦 **Viewing Your Orders:**\n\n1. Click **Orders** in the top navigation\n2. See all your **active** and **past** orders\n3. Tap any order to see its **live status**\n4. Food orders show estimated delivery time\n5. Ride orders show driver location 📍\n\n*Orders are saved per account, so they're always there!*`,
  },
  {
    keywords: ['cancel order', 'cancel', 'refund', 'cancellation'],
    reply: `❌ **Cancelling an Order:**\n\n• Food orders can be cancelled within **2 minutes** of placing\n• Ride bookings can be cancelled **before driver confirmation**\n• Refunds are processed in **3–5 business days**\n\nGo to **Orders → Select Order → Cancel**.`,
  },

  // ── CART ──────────────────────────────────────────────────
  {
    keywords: ['cart', 'my cart', 'add to cart', 'view cart', 'basket'],
    reply: `🛒 **Your Cart:**\n\nYou can view your cart by clicking the 🛒 icon in the top navbar.\n\n• Add items from EliteEats or EliteMart\n• Adjust quantities in the cart page\n• Proceed to checkout when ready!\n\n*Each user has their own private cart.*`,
  },

  // ── ACCOUNT / PROFILE ─────────────────────────────────────
  {
    keywords: ['profile', 'account', 'my profile', 'settings', 'edit profile', 'change password'],
    reply: `👤 **Managing Your Profile:**\n\n1. Click your **avatar** or go to **Profile** in the navbar\n2. Edit your name, email, phone\n3. Change your password\n4. View your order history\n5. Register as a driver (if eligible)\n\n*Your data is saved securely per account.*`,
  },
  {
    keywords: ['login', 'sign in', 'log in', 'signin'],
    reply: `🔐 **Logging In:**\n\n1. Click **Login** on the top right\n2. Enter your registered email & password\n3. Hit **Sign In**\n\nDon't have an account? Click **Register** to create one for free! 🎓`,
  },
  {
    keywords: ['register', 'sign up', 'create account', 'new account', 'signup'],
    reply: `📝 **Creating an Account:**\n\n1. Click **Register** on the homepage or navbar\n2. Fill in your name, email, password\n3. Confirm and submit\n4. You're in! 🎉\n\nAll campus services are unlocked once you're logged in.`,
  },
  {
    keywords: ['logout', 'log out', 'sign out'],
    reply: `👋 **Logging Out:**\n\nGo to **Profile → Logout** or click the logout button in the navbar when signed in.\n\n*Your cart and orders are safely saved and will be there when you return!*`,
  },

  // ── NAVIGATION / APP HELP ─────────────────────────────────
  {
    keywords: ['navigate', 'navigation', 'how to use', 'how to', 'guide', 'help me', 'app', 'platform', 'elitex', 'how does it work', 'what can you do', 'features', 'services'],
    reply: `🗺️ **EliteX — Quick Navigation Guide:**\n\n• 🏠 **Home** — Overview of all services\n• 🍔 **EliteEats** — Order food from campus restaurants\n• 🚗 **EliteRide** — Book shared or private rides\n• 🛒 **EliteMart** — Shop groceries & daily essentials\n• 📦 **Orders** — Track all your orders\n• 👤 **Profile** — Manage your account\n\nJust tap the **navbar** to jump to any section! 👆`,
  },
  {
    keywords: ['dashboard', 'home page', 'main page'],
    reply: `🏠 **Dashboard:**\n\nYour dashboard gives you a quick overview of:\n• Recent orders\n• Active rides\n• Shortcut to all services\n\nAccess it from the navbar after logging in!`,
  },

  // ── PAYMENT ───────────────────────────────────────────────
  {
    keywords: ['pay', 'payment', 'upi', 'cash', 'online payment', 'how to pay', 'payment method'],
    reply: `💳 **Payment Options on EliteX:**\n\n• 📱 UPI (GPay, PhonePe, Paytm)\n• 💳 Debit / Credit Card\n• 💵 Cash on Delivery *(food & grocery)*\n• 🏦 Net Banking\n\nAll payments are **secure & encrypted**. 🔒`,
  },

  // ── SUPPORT / CONTACT ─────────────────────────────────────
  {
    keywords: ['contact', 'support', 'help', 'customer care', 'complaint', 'issue', 'problem', 'report'],
    reply: `📞 **EliteX Support:**\n\n• 📧 Email: **support@elitex.in**\n• 📱 Phone: **+91-9876543210**\n• 💬 Live Chat: Available 8AM – 10PM\n• 📄 Visit the **Contact** page for the full form\n\n*We usually respond within 1 hour!* ⚡`,
  },

  // ── ABOUT ─────────────────────────────────────────────────
  {
    keywords: ['about', 'what is elitex', 'who made', 'elitex info', 'about elitex'],
    reply: `🎓 **About EliteX:**\n\nEliteX is a **one-stop campus super-app** built for students!\n\n• 🍔 Order food from campus canteens\n• 🚗 Book affordable student rides\n• 🛒 Get groceries delivered to your hostel\n\nBuilt by students, for students. 💜\n\nVisit the **About** page to learn more!`,
  },

  // ── THANKS / BYE ──────────────────────────────────────────
  {
    keywords: ['thank', 'thanks', 'thankyou', 'thank you', 'thx', 'ty'],
    reply: `😊 You're welcome! Happy to help anytime.\n\nIs there anything else I can assist you with? 🌟`,
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'cya', 'exit', 'close'],
    reply: `👋 Goodbye! Have a great day on campus!\n\nCome back anytime if you need help. EliteBot is always here for you! 💜`,
  },
];

// ─────────────────────────────────────────────────────────────
// getBotResponse — Main matching function
// Replace body with API call for future AI integration
// ─────────────────────────────────────────────────────────────
export function getBotResponse(userInput) {
  const input = userInput.toLowerCase().trim();

  for (const item of responses) {
    if (item.keywords.some((kw) => input.includes(kw))) {
      return item.reply;
    }
  }

  // Fallback
  return `🤔 Hmm, I'm not sure about that one!\n\nTry asking me about:\n• 🍔 Food ordering\n• 🚗 Ride booking\n• 🛒 Grocery shopping\n• 📦 Order tracking\n• 👤 Account help\n\nOr type **help** for a full guide! 😊`;
}

// ─────────────────────────────────────────────────────────────
// Suggested quick-action prompts shown in the chat UI
// ─────────────────────────────────────────────────────────────
export const suggestedPrompts = [
  { label: '🍔 Order Food', text: 'How do I order food?' },
  { label: '🚗 Book Ride', text: 'How do I book a ride?' },
  { label: '🛒 Grocery Help', text: 'How does EliteMart work?' },
  { label: '📦 My Orders', text: 'Where can I see my orders?' },
  { label: '💰 Delivery Fee', text: 'How much is delivery?' },
  { label: '🧑‍✈️ Become Driver', text: 'How do I become a driver?' },
];
