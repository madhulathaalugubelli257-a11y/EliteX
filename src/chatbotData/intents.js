// chatbotData/intents.js
// Each intent has: id, keywords (with weights), phrases (exact phrase bonus), responses[]

export const intents = [

  // ── GREETING ──────────────────────────────────────────────
  {
    id: 'greeting',
    keywords: ['hello','hi','hey','hii','helo','greetings','sup','yo','morning','evening','afternoon','howdy'],
    phrases: ['good morning','good evening','good afternoon','how are you'],
    responses: [
      `👋 Hey there! I'm **EliteBot** — your smart campus assistant!\n\nI can help you with:\n• 🍔 Food ordering via EliteEats\n• 🚗 Ride booking via EliteRide\n• 🛒 Grocery shopping via EliteMart\n• 📦 Order tracking\n\nWhat can I help you with today?`,
      `😊 Hi! Great to see you here!\n\nI'm EliteBot — ask me anything about food, rides, groceries, or your account. What's on your mind?`,
      `👋 Hello! I'm EliteBot, always ready to help!\n\nTry asking about food delivery, ride booking, or your orders. What do you need?`,
    ],
    followUps: ['🍔 Order Food', '🚗 Book Ride', '🛒 EliteMart', '📦 My Orders'],
  },

  // ── DELIVERY TIME ─────────────────────────────────────────
  {
    id: 'delivery_time',
    keywords: ['time','long','arrive','wait','minutes','hours','reach','eta','when','late','delay','fast','soon','quick'],
    phrases: ['how long','how much time','when will','how fast','delivery time','food arrive','reach me','take to deliver'],
    responses: [
      `⏱️ **Food Delivery Time:**\n\nMost orders are delivered within **20–35 minutes** depending on:\n• Restaurant preparation time\n• Distance from your location\n• Current order volume\n\nYou can track your order live from the **Orders** page! 📍`,
      `🕐 Your food typically arrives within **20–35 minutes**.\n\nPeak hours (lunch & dinner) may add 5–10 extra minutes. Track your delivery in real-time under **Orders**!`,
      `📦 Delivery usually takes **20–35 mins** for food and **30–45 mins** for groceries.\n\nRestaurant prep time + distance = your ETA. Check **Orders** to track live! 🗺️`,
    ],
    followUps: ['📦 Track Order', '💰 Delivery Fee', '🍔 Order Food'],
  },

  // ── DELIVERY CHARGE ───────────────────────────────────────
  {
    id: 'delivery_charge',
    keywords: ['charge','fee','cost','price','rupee','free','how much','pay','expensive','cheap','money','rs','₹'],
    phrases: ['delivery fee','delivery charge','delivery cost','how much delivery','free delivery','cost of delivery'],
    responses: [
      `💰 **Delivery Charges:**\n\n🍔 **EliteEats:**\n• Within campus: ₹10 – ₹20\n• Nearby areas: ₹20 – ₹40\n• **Free** above ₹199 🎉\n\n🛒 **EliteMart:**\n• Flat ₹15 delivery\n• **Free** above ₹299 🎉`,
      `🏷️ Here's what delivery costs on EliteX:\n\n• Food orders: **₹10–₹40** (free above ₹199)\n• Grocery orders: **₹15** flat (free above ₹299)\n\nCharges are shown clearly before you confirm! ✅`,
    ],
    followUps: ['🍔 Order Food', '🛒 Grocery Help', '⏱️ Delivery Time'],
  },

  // ── FOOD ORDERING ─────────────────────────────────────────
  {
    id: 'food_ordering',
    keywords: ['food','order','eat','hungry','meal','lunch','dinner','breakfast','snack','dish','menu','restaurant','campus eats','eats'],
    phrases: ['order food','campus eats','how to order','place order','food order'],
    responses: [
      `🍔 **Ordering Food on EliteEats:**\n\n1. Open **EliteEats** from the navbar\n2. Browse restaurants & dishes\n3. Tap any item → **Add to Cart**\n4. Review your cart\n5. Place order & track live!\n\n💡 Filter by cuisine, rating, or price for quick results.`,
      `🍕 **Getting food on EliteEats is easy!**\n\nJust go to **EliteEats**, pick your restaurant, choose your dishes, and checkout. Your food will be on its way in minutes! 🚀`,
    ],
    followUps: ['⏱️ Delivery Time', '💰 Delivery Fee', '👥 Group Orders', '📦 Track Order'],
  },

  // ── GROUP ORDERS ──────────────────────────────────────────
  {
    id: 'group_orders',
    keywords: ['group','friends','split','together','share','hostel','roommate','bulk','multiple','everyone'],
    phrases: ['group order','group food','order together','friends order','split food'],
    responses: [
      `👥 **Group Ordering on EliteEats:**\n\n1. Add your items to the cart\n2. Share the cart link with friends\n3. Everyone adds their items\n4. One person checks out\n5. Single delivery to one spot!\n\n💡 Perfect for hostel rooms & study groups! 🎓`,
      `🎉 Want to order together with friends?\n\nUse **Group Order** on EliteEats — one cart, one delivery, everyone's food! Just share the link and let your squad add their items.`,
    ],
    followUps: ['🍔 Order Food', '⏱️ Delivery Time', '💰 Delivery Fee'],
  },

  // ── RIDE BOOKING ──────────────────────────────────────────
  {
    id: 'ride_booking',
    keywords: ['ride','book','cab','auto','bike','transport','travel','vehicle','pickup','drop','go','commute'],
    phrases: ['book ride','book a ride','elite ride','eliteride','how to book','get a ride','need a ride'],
    responses: [
      `🚗 **Booking a Ride on EliteRide:**\n\n1. Open **EliteRide** from the navbar\n2. Enter your **pickup location**\n3. Select your **destination**\n4. Choose vehicle (Bike / Auto / Cab)\n5. Select **Shared** or **Private**\n6. Confirm & track your driver!\n\n💡 Shared rides save up to 60% on cost.`,
      `🛺 Getting a ride is simple!\n\nOpen **EliteRide**, enter your pickup & drop location, pick your vehicle type, and you're good to go. A driver will be assigned instantly! ⚡`,
    ],
    followUps: ['🤝 Shared Ride', '🚙 Private Ride', '🧑‍✈️ Become Driver'],
  },

  // ── SHARED RIDE ───────────────────────────────────────────
  {
    id: 'shared_ride',
    keywords: ['shared','share','pool','carpool','split','cheap','affordable','save','together','multiple','students'],
    phrases: ['shared ride','share ride','ride pool','how shared','split cost','save money ride'],
    responses: [
      `🤝 **Shared Rides on EliteRide:**\n\n• Matched with students going the **same direction**\n• Cost **split equally** among all riders\n• Save up to **60%** vs private rides\n• Slight detour for multiple pickups\n\n✅ Best for daily campus commutes!`,
      `💸 Shared rides are the smart student choice!\n\nYou're grouped with others heading the same way. Cost is divided, so you save big. Select **Shared** when booking to enjoy lower fares! 🎓`,
    ],
    followUps: ['🚙 Private Ride', '🚗 Book Ride', '💰 Ride Cost'],
  },

  // ── PRIVATE RIDE ──────────────────────────────────────────
  {
    id: 'private_ride',
    keywords: ['private','solo','alone','direct','fast','quick','personal','just me','only me'],
    phrases: ['private ride','solo ride','ride alone','just me','only me'],
    responses: [
      `🚙 **Private Ride:**\n\n• Just you + the driver, no stops\n• **Direct route** — fastest option\n• More expensive than shared\n• Great for urgent travel or late nights\n\nSelect **Private** when booking on EliteRide.`,
    ],
    followUps: ['🤝 Shared Ride', '🚗 Book Ride'],
  },

  // ── DRIVER REGISTRATION ───────────────────────────────────
  {
    id: 'driver_registration',
    keywords: ['driver','drive','earn','income','money','register','join','vehicle','licence','license','partner'],
    phrases: ['become driver','be a driver','join as driver','earn money','register as driver','how to drive'],
    responses: [
      `🧑‍✈️ **Become a EliteRide Driver:**\n\n1. Go to **Profile → Become a Driver**\n2. Submit vehicle details\n3. Upload your driving licence\n4. Verified within **24–48 hours**\n5. Start earning! 💸\n\n*Min age: 18 | Valid licence required.*`,
      `💰 Want to earn while driving?\n\nRegister as a **EliteRide Driver** from your Profile. Submit your vehicle + licence, get verified, and start accepting rides from your campus! 🚗`,
    ],
    followUps: ['🚗 Book Ride', '👤 My Profile'],
  },

  // ── GROCERY ───────────────────────────────────────────────
  {
    id: 'grocery',
    keywords: ['grocery','groceries','mart','elitemart','shop','vegetable','fruit','daily','essential','snack','dairy','bread','egg','milk','bottle'],
    phrases: ['elite mart','how to shop','order grocery','grocery delivery','buy groceries','elitemart'],
    responses: [
      `🛒 **Shopping on EliteMart:**\n\n1. Open **EliteMart** from the navbar\n2. Browse categories (Snacks, Dairy, Veggies…)\n3. Add items to your cart\n4. Choose **delivery** or **pickup**\n5. Get it delivered to your hostel! 🚀\n\n💡 Delivery in under 45 minutes.`,
      `🥦 Need groceries? EliteMart has you covered!\n\nFrom snacks to daily essentials — add to cart, checkout, and get it delivered right to your hostel door. Quick, easy, fresh! 🛒`,
    ],
    followUps: ['⏱️ Delivery Time', '💰 Delivery Fee', '📦 Track Order'],
  },

  // ── ORDER TRACKING ────────────────────────────────────────
  {
    id: 'order_tracking',
    keywords: ['order','track','status','where','history','placed','active','see','find','check','my order','orders'],
    phrases: ['my orders','track order','where is my order','order status','see my orders','find my order','order history'],
    responses: [
      `📦 **Tracking Your Orders:**\n\n1. Click **Orders** in the navbar\n2. See **active** and **past** orders\n3. Tap any order for live status\n4. Food orders show delivery ETA\n5. Ride orders show driver location 📍`,
      `🗺️ Want to check your order?\n\nHead to the **Orders** page from the top navbar. You'll see everything — active deliveries, completed orders, and live tracking! ✅`,
    ],
    followUps: ['❌ Cancel Order', '📞 Contact Support'],
  },

  // ── CANCEL / REFUND ───────────────────────────────────────
  {
    id: 'cancel_refund',
    keywords: ['cancel','refund','return','wrong','mistake','undo','stop','reverse','money back'],
    phrases: ['cancel order','get refund','cancel ride','cancel food','money back','wrong order'],
    responses: [
      `❌ **Cancelling & Refunds:**\n\n• Food orders: Cancel within **2 minutes** of placing\n• Ride bookings: Cancel **before driver confirmation**\n• Refunds processed in **3–5 business days**\n\nGo to **Orders → Select Order → Cancel** ✅`,
    ],
    followUps: ['📦 Track Order', '📞 Contact Support'],
  },

  // ── PAYMENT ───────────────────────────────────────────────
  {
    id: 'payment',
    keywords: ['pay','payment','upi','cash','card','online','gpay','paytm','phonepay','phonepe','net banking','cod','debit','credit'],
    phrases: ['how to pay','payment method','pay online','cash on delivery','upi payment'],
    responses: [
      `💳 **Payment Options on EliteX:**\n\n• 📱 UPI (GPay, PhonePe, Paytm)\n• 💳 Debit / Credit Card\n• 💵 Cash on Delivery *(food & grocery)*\n• 🏦 Net Banking\n\nAll payments are **secure & encrypted** 🔒`,
    ],
    followUps: ['🍔 Order Food', '🛒 Grocery Help'],
  },

  // ── ACCOUNT / PROFILE ─────────────────────────────────────
  {
    id: 'account',
    keywords: ['profile','account','setting','edit','name','email','phone','password','change','update','login','logout','register','signup','signin'],
    phrases: ['my profile','my account','change password','edit profile','how to login','sign in','sign up','create account','log out'],
    responses: [
      `👤 **Managing Your Account:**\n\n1. Tap your avatar or go to **Profile**\n2. Edit name, email, phone\n3. Change your password\n4. View order history\n5. Register as a driver\n\n*Your data is safe and saved per account.*`,
      `🔐 Need account help?\n\n• **Login:** Click Login on the top-right\n• **Register:** Click Register to create a free account\n• **Profile:** Access via navbar → Profile\n• **Logout:** Profile → Logout`,
    ],
    followUps: ['📦 My Orders', '🧑‍✈️ Become Driver'],
  },

  // ── SUPPORT ───────────────────────────────────────────────
  {
    id: 'support',
    keywords: ['support','help','contact','complaint','issue','problem','report','stuck','error','wrong','broken'],
    phrases: ['contact support','customer care','need help','having issue','something wrong','report problem'],
    responses: [
      `📞 **EliteX Support:**\n\n• 📧 Email: support@elitex.in\n• 📱 Phone: +91-9876543210\n• 💬 Live Chat: 8AM – 10PM\n• 📄 Visit the **Contact** page\n\n*We usually respond within 1 hour!* ⚡`,
      `🙋 Need assistance? We're here!\n\nVisit the **Contact** page or email **support@elitex.in**. Our team is available from 8AM–10PM every day. ✅`,
    ],
    followUps: ['❌ Cancel Order', '📦 Track Order'],
  },

  // ── APP NAVIGATION ────────────────────────────────────────
  {
    id: 'navigation',
    keywords: ['how','use','navigate','guide','features','services','elitex','what','app','platform','works','does'],
    phrases: ['how to use','how does it work','what is elitex','what can you do','guide me','show me','app features'],
    responses: [
      `🗺️ **EliteX Quick Guide:**\n\n• 🏠 **Home** — Overview of all services\n• 🍔 **EliteEats** — Order food\n• 🚗 **EliteRide** — Book rides\n• 🛒 **EliteMart** — Grocery shopping\n• 📦 **Orders** — Track all orders\n• 👤 **Profile** — Manage account\n\nTap the navbar to jump to any section! 👆`,
    ],
    followUps: ['🍔 Order Food', '🚗 Book Ride', '🛒 Grocery Help'],
  },

  // ── THANKS ────────────────────────────────────────────────
  {
    id: 'thanks',
    keywords: ['thank','thanks','thankyou','thx','ty','appreciate','helpful','great','awesome','perfect','nice','good bot'],
    phrases: ['thank you','thanks a lot','that helped','you are great'],
    responses: [
      `😊 You're welcome! Happy to help anytime.\n\nAnything else I can assist you with? 🌟`,
      `🎉 Glad I could help! Feel free to ask me anything else about EliteX. 💜`,
      `✅ Anytime! That's what I'm here for. Anything else? 😊`,
    ],
    followUps: ['🍔 Order Food', '🚗 Book Ride', '🛒 EliteMart'],
  },

  // ── BYE ───────────────────────────────────────────────────
  {
    id: 'goodbye',
    keywords: ['bye','goodbye','see you','later','cya','exit','close','quit','done','finished'],
    phrases: ['good bye','see you later','talk later'],
    responses: [
      `👋 Goodbye! Have a great day on campus!\n\nCome back anytime — EliteBot is always here for you! 💜`,
      `✨ See you later! Enjoy your day.\n\nRemember, I'm just a tap away if you need help! 😊`,
    ],
    followUps: [],
  },
];

// Default follow-up chips shown after any unmatched response
export const defaultFollowUps = ['🍔 Order Food', '🚗 Book Ride', '🛒 Grocery Help', '📦 My Orders'];
