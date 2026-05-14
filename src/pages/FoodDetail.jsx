// FoodDetail.jsx — Food item detail page using useParams
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { foodItems } from '../data/foodData';
import { useCart } from '../context/CartContext';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/FoodDetail.css';

export default function FoodDetail() {
  const { id } = useParams(); // Get food item ID from URL
  const navigate = useNavigate();
  const { addToFoodCart, foodCart } = useCart();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [groupModal, setGroupModal] = useState(false);
  const [groupSize, setGroupSize] = useState(2);
  const [qty, setQty] = useState(1);

  // Simulate async item fetch with useEffect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = foodItems.find((f) => f.id === Number(id));
      setItem(found || null);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading food details..." />;

  if (!item) {
    return (
      <div className="empty-state" style={{ paddingTop: '80px' }}>
        <span className="empty-icon">🍽️</span>
        <h3>Item not found</h3>
        <p>This food item doesn't exist or was removed.</p>
        <Link to="/eats" className="btn btn-primary">Back to EliteEats</Link>
      </div>
    );
  }

  const inCart = foodCart.find((i) => i.id === item.id);
  const discount = item.originalPrice > item.price
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToFoodCart(item);
    setToast({ message: `${qty}x ${item.name} added to cart!`, type: 'success' });
  };

  const groupTotal = item.price * groupSize;
  const eachPays = Math.ceil(groupTotal / groupSize);

  return (
    <>
      <div className="food-detail-page">
        {/* Breadcrumb */}
        <div className="breadcrumb container">
          <Link to="/eats">EliteEats</Link>
          <span>›</span>
          <span>{item.name}</span>
        </div>

        <div className="container">
          <div className="food-detail-grid">
            {/* Image */}
            <div className="food-detail-img-wrap">
              <img src={item.image} alt={item.name} className="food-detail-img" />
              {item.isBestSeller && <span className="food-badge bestseller">⭐ Bestseller</span>}
              {discount > 0 && <span className="food-badge discount">{discount}% OFF</span>}
            </div>

            {/* Info */}
            <div className="food-detail-info">
              <div className="food-detail-meta">
                <span className={`veg-label ${item.type === 'veg' ? 'veg' : 'nonveg'}`}>
                  {item.type === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                </span>
                <span className="tag">{item.category}</span>
                {item.subCategory && <span className="tag">{item.subCategory}</span>}
              </div>

              <h1 className="food-detail-name">{item.name}</h1>
              <p className="food-detail-restaurant">by {item.restaurant}</p>

              <div className="food-detail-rating">
                <span className="stars">{'★'.repeat(Math.floor(item.rating))}{'☆'.repeat(5 - Math.floor(item.rating))}</span>
                <span>{item.rating}</span>
                <span className="text-muted">({item.isPopular ? '500+' : '100+'} reviews)</span>
              </div>

              <p className="food-detail-desc">{item.description}</p>

              <div className="food-detail-stats">
                <div className="detail-stat">
                  <span>⏱️</span>
                  <div>
                    <span className="detail-stat-label">Delivery Time</span>
                    <span className="detail-stat-val">{item.deliveryTime}</span>
                  </div>
                </div>
                <div className="detail-stat">
                  <span>🚚</span>
                  <div>
                    <span className="detail-stat-label">Delivery</span>
                    <span className="detail-stat-val">₹15 flat</span>
                  </div>
                </div>
                <div className="detail-stat">
                  <span>🏪</span>
                  <div>
                    <span className="detail-stat-label">Restaurant</span>
                    <span className="detail-stat-val">{item.restaurant}</span>
                  </div>
                </div>
              </div>

              {/* Price & Qty */}
              <div className="food-detail-price-row">
                <div>
                  <span className="food-detail-price">₹{item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="food-detail-original">₹{item.originalPrice}</span>
                  )}
                </div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
                  <span className="qty-num">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
                </div>
              </div>

              <p className="food-detail-subtotal">Subtotal: <strong>₹{item.price * qty + 15}</strong> (incl. ₹15 delivery)</p>

              <div className="food-detail-actions">
                <button
                  id="add-to-cart-detail"
                  className="btn btn-primary btn-lg"
                  onClick={handleAdd}
                  style={{ flex: 1 }}
                >
                  {inCart ? `+ Add More (${inCart.qty} in cart)` : '🛒 Add to Cart'}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setGroupModal(true)}
                  title="Group order — split with friends"
                >
                  👥 Group
                </button>
              </div>

              <Link to="/cart" className="btn btn-secondary w-full" style={{ textAlign: 'center', marginTop: '8px' }}>
                View Cart →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Group order modal */}
      <Modal
        isOpen={groupModal}
        onClose={() => setGroupModal(false)}
        title="👥 Group Order Calculator"
      >
        <div className="group-modal-body">
          <p className="group-modal-desc">Split <strong>{item.name}</strong> cost with your friends!</p>
          <div className="input-group">
            <label htmlFor="group-size-input">Number of people in group</label>
            <input
              id="group-size-input"
              type="number"
              min={2}
              max={20}
              value={groupSize}
              onChange={(e) => setGroupSize(Math.max(2, Number(e.target.value)))}
              className="input-field"
            />
          </div>
          <div className="group-calc">
            <div className="group-calc-row">
              <span>Food total ({groupSize} people × ₹{item.price})</span>
              <strong>₹{item.price * groupSize}</strong>
            </div>
            <div className="group-calc-row">
              <span>Delivery (shared)</span>
              <strong>₹15</strong>
            </div>
            <div className="group-calc-row total">
              <span>Each person pays</span>
              <strong>₹{Math.ceil((item.price * groupSize + 15) / groupSize)}</strong>
            </div>
          </div>
          <button
            className="btn btn-primary w-full"
            onClick={() => { handleAdd(); setGroupModal(false); setToast({ message: 'Group order placed!', type: 'success' }); }}
          >
            Confirm Group Order 🎉
          </button>
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
