// Dashboard.jsx — Protected dashboard page
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Dashboard.css';

const quickLinks = [
  { icon: '🍱', label: 'EliteEats', desc: 'Order food', link: '/eats', color: '#FF6584' },
  { icon: '🛵', label: 'EliteRide', desc: 'Book a ride', link: '/ride', color: '#6C63FF' },
  { icon: '🛒', label: 'EliteMart', desc: 'Grocery pool', link: '/mart', color: '#43D9AD' },
  { icon: '📦', label: 'My Orders', desc: 'Order history', link: '/orders', color: '#FF9F43' },
  { icon: '👤', label: 'Profile', desc: 'Edit profile', link: '/profile', color: '#4ECDC4' },
  { icon: '🛍️', label: 'My Cart', desc: 'View cart', link: '/cart', color: '#A29BFE' },
];

const tips = [
  { icon: '💡', text: 'Place a group food order with friends to save on delivery.' },
  { icon: '🛵', text: 'Check EliteRide every morning for 7-9 AM metro rides.' },
  { icon: '🛒', text: 'Weekly grocery orders close every Sunday at 8 PM.' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { orders, foodCart, groceryCart, totalCartItems } = useCart();

  const recentOrders = orders.slice(0, 3);
  const greeting = new Date().getHours() < 12 ? '☀️ Good morning' :
                   new Date().getHours() < 17 ? '👋 Good afternoon' : '🌙 Good evening';

  return (
    <div className="dashboard-page">
      {/* Hero banner */}
      <section className="dashboard-hero">
        <div className="container">
          <div className="dashboard-hero-content">
            <div>
              <p className="dashboard-greeting">{greeting},</p>
              <h1 className="dashboard-name">{user?.name?.split(' ')[0] || 'Student'} 🎓</h1>
              <p className="dashboard-college">{user?.college}</p>
            </div>
            <div className="dashboard-avatar">{user?.avatar || '👤'}</div>
          </div>

          <div className="dashboard-stats-row">
            <div className="dash-stat">
              <span className="dash-stat-num">{orders.length}</span>
              <span className="dash-stat-label">Total Orders</span>
            </div>
            <div className="dash-stat">
              <span className="dash-stat-num">{totalCartItems}</span>
              <span className="dash-stat-label">Items in Cart</span>
            </div>
            <div className="dash-stat">
              <span className="dash-stat-num">{foodCart.length}</span>
              <span className="dash-stat-label">Food Items</span>
            </div>
            <div className="dash-stat">
              <span className="dash-stat-num">{groceryCart.length}</span>
              <span className="dash-stat-label">Grocery Items</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Quick access */}
        <section className="dash-section">
          <h2 className="dash-section-title">Quick Access</h2>
          <div className="quick-links-grid">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.link}
                className="quick-link-card"
                style={{ '--qcard-color': link.color }}
              >
                <span className="quick-link-icon">{link.icon}</span>
                <span className="quick-link-label">{link.label}</span>
                <span className="quick-link-desc">{link.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="dash-two-col">
          {/* Recent orders */}
          <section className="dash-section">
            <div className="dash-section-header">
              <h2 className="dash-section-title">Recent Orders</h2>
              <Link to="/orders" className="dash-see-all">See all →</Link>
            </div>
            {recentOrders.length === 0 ? (
              <div className="dash-empty">
                <span>📭</span>
                <p>No orders yet. Start by ordering food!</p>
                <Link to="/eats" className="btn btn-primary btn-sm">Order Now</Link>
              </div>
            ) : (
              <div className="orders-mini-list">
                {recentOrders.map((order) => (
                  <div key={order.id} className="order-mini-card">
                    <div className="order-mini-icon">
                      {order.type === 'food' ? '🍱' : '🛒'}
                    </div>
                    <div className="order-mini-info">
                      <span className="order-mini-id">{order.id}</span>
                      <span className="order-mini-date">{order.date}</span>
                    </div>
                    <div className="order-mini-right">
                      <span className="order-mini-total">₹{order.total}</span>
                      <span className={`badge badge-${order.status === 'Confirmed' ? 'success' : 'primary'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Campus tips */}
          <section className="dash-section">
            <h2 className="dash-section-title">Campus Tips 💡</h2>
            <div className="tips-list">
              {tips.map((tip, i) => (
                <div key={i} className="tip-card">
                  <span className="tip-icon">{tip.icon}</span>
                  <p>{tip.text}</p>
                </div>
              ))}
            </div>

            {/* Cart summary */}
            {totalCartItems > 0 && (
              <div className="cart-summary-widget">
                <span className="cart-sum-icon">🛒</span>
                <div>
                  <span className="cart-sum-text">{totalCartItems} item{totalCartItems > 1 ? 's' : ''} in cart</span>
                  <span className="cart-sum-sub">Ready to checkout?</span>
                </div>
                <Link to="/cart" className="btn btn-primary btn-sm">View Cart</Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
