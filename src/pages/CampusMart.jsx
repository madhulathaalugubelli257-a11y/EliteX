// CampusMart.jsx — Weekly grocery pooling page
import { useState, useEffect } from 'react';
import GroceryCard from '../components/GroceryCard';
import SkeletonCard from '../components/SkeletonCard';
import { groceryItems, groceryCategories } from '../data/groceryData';
import { useLanguage } from '../context/LanguageContext';
import '../styles/CampusMart.css';

export default function CampusMart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const { t } = useLanguage();

  // Days until Sunday (next weekly order close)
  const today = new Date();
  const daysUntilSunday = (7 - today.getDay()) % 7 || 7;

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(groceryItems);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = items
    .filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')   return a.price - b.price;
      if (sortBy === 'price-desc')  return b.price - a.price;
      if (sortBy === 'saving')      return b.bulkSaving - a.bulkSaving;
      if (sortBy === 'popular')     return b.pooledOrders - a.pooledOrders;
      return 0;
    });

  const totalPoolSavings = items.reduce((s, i) => s + i.bulkSaving, 0);

  return (
    <div className="mart-page">
      <div className="page-header">
        <div className="container">
          <h1>🛒 {t('mart.title')}</h1>
          <p>{t('mart.subtitle')}</p>
        </div>
      </div>

      <div className="container mart-body">
        {/* Pool info banner */}
        <div className="mart-pool-banner">
          <div className="pool-stat">
            <span className="pool-stat-icon">👥</span>
            <div>
              <strong>189 students</strong>
              <span>pooled this week</span>
            </div>
          </div>
          <div className="pool-divider" />
          <div className="pool-stat">
            <span className="pool-stat-icon">💰</span>
            <div>
              <strong>₹{totalPoolSavings}+</strong>
              <span>total savings available</span>
            </div>
          </div>
          <div className="pool-divider" />
          <div className="pool-stat">
            <span className="pool-stat-icon">📅</span>
            <div>
              <strong>Order closes in {daysUntilSunday} day{daysUntilSunday !== 1 ? 's' : ''}</strong>
              <span>Every Sunday 8 PM</span>
            </div>
          </div>
          <div className="pool-divider" />
          <div className="pool-stat">
            <span className="pool-stat-icon">🏍️</span>
            <div>
              <strong>Tuesday delivery</strong>
              <span>Volunteer team delivers</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            id="mart-search"
            type="search"
            placeholder={t('mart.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Controls */}
        <div className="mart-controls">
          <div className="filter-pills">
            {groceryCategories.map((cat) => (
              <button
                key={cat}
                className={`pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                id={`mart-cat-${cat.toLowerCase().replace(/[^a-z]/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            id="mart-sort"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="popular">Most Pooled</option>
            <option value="saving">Highest Savings</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        {!loading && (
          <p className="results-count">
            <strong>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && ` in "${activeCategory}"`}
          </p>
        )}

        {loading ? (
          <div className="grid-4">
            {Array(8).fill(null).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🛒</span>
            <h3>No products found</h3>
            <p>Try a different search or category.</p>
            <button className="btn btn-secondary" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid-4">
            {filtered.map((item) => (
              <GroceryCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
