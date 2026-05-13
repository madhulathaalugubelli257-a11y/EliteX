// FoodCard.jsx — Reusable food item card for CampusEats
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Toast from './Toast';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Cards.css';

export default function FoodCard({ item }) {
  const { addToFoodCart, foodCart } = useCart();
  const [toast, setToast] = useState(null);
  const { t } = useLanguage();

  const inCart = foodCart.find((i) => i.id === item.id);

  const handleAdd = (e) => {
    e.preventDefault(); // prevent nav if inside link
    addToFoodCart(item);
    setToast({ message: `${item.name} added to cart!`, type: 'success' });
  };

  const discount = item.originalPrice > item.price
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <>
      <div className="food-card card">
        <Link to={`/eats/${item.id}`} className="food-card-img-wrap">
          <img src={item.image} alt={item.name} className="food-card-img" loading="lazy" />
          {item.isPopular && <span className="food-badge bestseller">⭐ {t('eats.popular')}</span>}
          {discount > 0 && <span className="food-badge discount">{discount}% OFF</span>}
          <span className={`veg-dot ${item.type === 'veg' ? 'veg' : 'nonveg'}`} title={item.type === 'veg' ? 'Veg' : 'Non-Veg'} />
        </Link>

        <div className="food-card-body">
          <div className="food-card-meta">
            <span className="food-restaurant">{item.restaurant}</span>
            <span className="food-prep">{item.deliveryTime}</span>
          </div>

          <Link to={`/eats/${item.id}`}>
            <h4 className="food-name">{item.name}</h4>
          </Link>

          <div className="food-rating">
            <span className="stars">{'★'.repeat(Math.floor(item.rating))}{'☆'.repeat(5 - Math.floor(item.rating))}</span>
            <span className="rating-num">{item.rating}</span>
            <span className="review-count">({item.isPopular ? '500+' : '100+'})</span>
          </div>

          <div className="food-card-footer">
            <div className="food-price-wrap">
              <span className="food-price">₹{item.price}</span>
              {item.originalPrice > item.price && (
                <span className="food-original-price">₹{item.originalPrice}</span>
              )}
            </div>
            <button
              className={`btn btn-sm ${inCart ? 'btn-secondary' : 'btn-primary'}`}
              onClick={handleAdd}
              id={`add-food-${item.id}`}
            >
              {inCart ? `+1 (${inCart.qty})` : `+ ${t('eats.addToCart').split(' ')[0]}`}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </>
  );
}
