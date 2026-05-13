// Cart.jsx — Shopping cart page for food and grocery items
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Cart.css';

function CartSection({ title, icon, items, onUpdateQty, onRemove, total, type, onCheckout, t }) {
  if (items.length === 0) return null;

  return (
    <div className="cart-section">
      <h3 className="cart-section-title">{icon} {title}</h3>
      <div className="cart-items-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h4 className="cart-item-name">{item.name}</h4>
              <p className="cart-item-restaurant">{item.restaurantName || item.category}</p>
              <span className="cart-item-price">₹{item.price} each</span>
            </div>
            <div className="cart-item-controls">
              <div className="qty-control">
                <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                <span className="qty-num">{item.qty}</span>
                <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
              </div>
              <span className="cart-item-subtotal">₹{item.price * item.qty}</span>
              <button className="cart-remove-btn" onClick={() => onRemove(item.id)} aria-label="Remove item">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>
        {type === 'food' && (
          <div className="cart-summary-row">
            <span>Delivery fee</span>
            <span>₹15</span>
          </div>
        )}
        <div className="cart-summary-row total">
          <span>{t('cart.total')}</span>
          <strong>₹{total + (type === 'food' ? 15 : 0)}</strong>
        </div>
        <button className="btn btn-primary w-full" onClick={() => onCheckout(type, items, total + (type === 'food' ? 15 : 0))}>
          ✅ {t('cart.checkout')}
        </button>
      </div>
    </div>
  );
}

export default function Cart() {
  const {
    foodCart, updateFoodQty, removeFromFoodCart, foodCartTotal,
    groceryCart, updateGroceryQty, removeFromGroceryCart, groceryCartTotal,
    totalCartItems, placeOrder,
  } = useCart();
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleCheckout = (type, items, total) => {
    const order = placeOrder(type, items, total);
    setToast({ message: `Order ${order.id} placed successfully! 🎉`, type: 'success' });
    setTimeout(() => navigate('/orders'), 2500);
  };

  if (totalCartItems === 0) {
    return (
      <div className="cart-page">
        <div className="page-header">
          <div className="container"><h1>🛍️ My Cart</h1></div>
        </div>
        <div className="container">
          <div className="empty-state">
            <span className="empty-icon">🛒</span>
            <h3>{t('cart.emptyMessage')}</h3>
            <p>Add items from EliteEats or EliteMart to get started!</p>
            <div className="flex-center gap-16 mt-16">
              <Link to="/eats" className="btn btn-primary">🍱 Browse Food</Link>
              <Link to="/mart" className="btn btn-secondary">🛒 Browse Mart</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="cart-page">
        <div className="page-header">
          <div className="container">
            <h1>🛍️ {t('cart.title')} ({totalCartItems} {t('cart.items')})</h1>
          </div>
        </div>

        <div className="container cart-body">
          <CartSection
            title="EliteEats"
            icon="🍱"
            items={foodCart}
            onUpdateQty={updateFoodQty}
            onRemove={removeFromFoodCart}
            total={foodCartTotal}
            type="food"
            onCheckout={handleCheckout}
            t={t}
          />
          <CartSection
            title="EliteMart"
            icon="🛒"
            items={groceryCart}
            onUpdateQty={updateGroceryQty}
            onRemove={removeFromGroceryCart}
            total={groceryCartTotal}
            type="grocery"
            onCheckout={handleCheckout}
            t={t}
          />
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
