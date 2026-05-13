// Orders.jsx — Order history page loaded from localStorage
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/Orders.css';

export default function Orders() {
  const { orders } = useCart();

  return (
    <div className="orders-page">
      <div className="page-header">
        <div className="container">
          <h1>📦 My Orders</h1>
          <p>Your complete order history</p>
        </div>
      </div>

      <div className="container orders-body">
        {orders.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h3>No orders yet</h3>
            <p>Place your first order from EliteEats or EliteMart!</p>
            <div className="flex-center gap-16 mt-16">
              <Link to="/eats" className="btn btn-primary">🍱 Order Food</Link>
              <Link to="/mart" className="btn btn-secondary">🛒 Shop Mart</Link>
            </div>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card card">
                <div className="order-card-header">
                  <div className="order-type-icon">
                    {order.type === 'food' ? '🍱' : '🛒'}
                  </div>
                  <div className="order-header-info">
                    <h4 className="order-id">{order.id}</h4>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div className="order-header-right">
                    <span className={`badge badge-${order.status === 'Confirmed' ? 'success' : 'primary'}`}>
                      {order.status}
                    </span>
                    <span className="order-total">₹{order.total}</span>
                  </div>
                </div>

                <div className="order-items-preview">
                  {order.items.slice(0, 4).map((item) => (
                    <div key={item.id} className="order-item-chip">
                      <img src={item.image} alt={item.name} className="order-chip-img" />
                      <span>{item.name} × {item.qty}</span>
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <span className="order-more">+{order.items.length - 4} more</span>
                  )}
                </div>

                <div className="order-card-footer">
                  <div className="order-type-badge">
                    <span className={`badge ${order.type === 'food' ? 'badge-danger' : 'badge-success'}`}>
                      {order.type === 'food' ? 'EliteEats' : 'EliteMart'}
                    </span>
                    <span className="order-item-count">{order.items.reduce((s, i) => s + i.qty, 0)} items</span>
                  </div>
                  <div className="order-actions">
                    <button className="btn btn-sm btn-secondary">Rate Order</button>
                    <Link to={order.type === 'food' ? '/eats' : '/mart'} className="btn btn-sm btn-primary">
                      Reorder →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
