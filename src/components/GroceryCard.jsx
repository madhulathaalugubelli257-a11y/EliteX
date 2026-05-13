// GroceryCard.jsx — Reusable grocery item card for CampusMart
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Toast from './Toast';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Cards.css';

export default function GroceryCard({ item }) {
  const { addToGroceryCart, groceryCart } = useCart();
  const [toast, setToast] = useState(null);
  const { t } = useLanguage();

  const inCart = groceryCart.find((i) => i.id === item.id);
  const discountPct = Math.round(((item.mrp - item.price) / item.mrp) * 100);

  const handleAdd = () => {
    if (!item.inStock) return;
    addToGroceryCart(item);
    setToast({ message: `${item.name} added to cart!`, type: 'success' });
  };

  return (
    <>
      <div className={`grocery-card card ${!item.inStock ? 'out-of-stock' : ''}`}>
        <div className="grocery-img-wrap">
          <img src={item.image} alt={item.name} className="grocery-img" loading="lazy" />
          {discountPct > 0 && <span className="grocery-badge">{discountPct}% OFF</span>}
          {!item.inStock && <div className="oos-overlay">Out of Stock</div>}
        </div>

        <div className="grocery-body">
          <span className="grocery-category">{item.category}</span>
          <h4 className="grocery-name">{item.name}</h4>
          <span className="grocery-unit">{item.unit}</span>

          <div className="grocery-pool">
            <span>👥 {item.pooledOrders} students ordered</span>
            <span className="grocery-saving">Save ₹{item.bulkSaving}</span>
          </div>

          <div className="grocery-footer">
            <div className="grocery-price-wrap">
              <span className="grocery-price">₹{item.price}</span>
              <span className="grocery-mrp">₹{item.mrp}</span>
            </div>
            <button
              className={`btn btn-sm ${inCart ? 'btn-secondary' : 'btn-primary'}`}
              onClick={handleAdd}
              disabled={!item.inStock}
              id={`add-grocery-${item.id}`}
            >
              {!item.inStock ? 'N/A' : inCart ? `+1 (${inCart.qty})` : `+ ${t('mart.addToCart').split(' ')[0]}`}
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
