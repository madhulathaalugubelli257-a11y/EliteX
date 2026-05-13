// CampusEats.jsx — Food ordering page with search, filter, sort
import { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import SkeletonCard from '../components/SkeletonCard';
import { foodItems, foodCategories } from '../data/foodData';
import { useLanguage } from '../context/LanguageContext';
import '../styles/CampusEats.css';

export default function CampusEats() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [showVegOnly, setShowVegOnly] = useState(false);
  const { t } = useLanguage();

  // Simulate async data loading with useEffect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setItems(foodItems);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter + sort derived list
  const filtered = items
    .filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.restaurant.toLowerCase().includes(search.toLowerCase()) ||
                          item.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'All' || item.category === activeCategory || (item.tags && item.tags.includes(activeCategory));
      const matchVeg = showVegOnly ? item.type === 'veg' : true;
      return matchSearch && matchCat && matchVeg;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')   return a.price - b.price;
      if (sortBy === 'price-desc')  return b.price - a.price;
      if (sortBy === 'rating')      return b.rating - a.rating;
      if (sortBy === 'time')        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      if (sortBy === 'popularity')  return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      return 0;
    });

  const isBrowsingMode = search === '' && activeCategory === 'All' && !showVegOnly && sortBy === 'default';

  // Special section filters
  const popularItems = items.filter(i => i.isPopular && i.isRecommended).slice(0, 6);
  const bestBiryanis = items.filter(i => i.category === 'Rice & Biryani' && i.subCategory.includes('Biryani')).slice(0, 6);
  const eveningSnacks = items.filter(i => i.category === 'Snacks' || i.category === 'Street Food').slice(0, 6);
  const budgetMeals = items.filter(i => i.price < 100 && i.category !== 'Beverages').slice(0, 6);
  const topRated = items.filter(i => i.rating >= 4.8).slice(0, 6);

  const renderSection = (title, data, emoji) => (
    <div className="eats-section">
      <div className="section-header">
        <h2>{emoji} {title}</h2>
        <button className="btn-link">View All</button>
      </div>
      <div className="horizontal-scroll-container">
        {data.map(item => (
          <div key={item.id} className="scroll-item">
            <FoodCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="eats-page">
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <h1>🍱 {t('eats.title')}</h1>
          <p>{t('eats.subtitle')}</p>
        </div>
      </div>

      <div className="container eats-body">
        {/* Delivery banner */}
        <div className="delivery-banner">
          <span>🏍️</span>
          <span>Flat <strong>₹15</strong> delivery on all orders · Est. 15–30 min</span>
          <span className="delivery-badge">GROUP ORDER</span>
        </div>

        {/* Search */}
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            id="eats-search"
            type="search"
            placeholder={t('eats.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search food items"
          />
        </div>

        {/* Filters row */}
        <div className="eats-controls">
          <div className="filter-pills-scroll">
            {foodCategories.map((cat) => (
              <button
                key={cat}
                className={`pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                id={`filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="eats-right-controls">
            <label className="veg-toggle">
              <input
                id="veg-only-toggle"
                type="checkbox"
                checked={showVegOnly}
                onChange={(e) => setShowVegOnly(e.target.checked)}
              />
              <span className="veg-toggle-pill">🟢 {t('eats.vegOnly')}</span>
            </label>

            <select
              id="eats-sort"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort food items"
            >
              <option value="default">Relevance</option>
              <option value="rating">Rating</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="time">Delivery Time</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid-3">
            {Array(6).fill(null).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : isBrowsingMode ? (
          <div className="eats-sections-wrapper">
            {renderSection("Popular Near Campus", popularItems, "🔥")}
            {renderSection("Top Rated Picks", topRated, "🌟")}
            {renderSection("Budget Meals Under ₹99", budgetMeals, "💰")}
            {renderSection("Best Biryanis", bestBiryanis, "🍗")}
            {renderSection("Evening Snacks", eveningSnacks, "☕")}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🍽️</span>
            <h3>No items found</h3>
            <p>Try changing your search or removing filters.</p>
            <button className="btn btn-secondary" onClick={() => { setSearch(''); setActiveCategory('All'); setShowVegOnly(false); setSortBy('default'); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p className="results-count">
              Showing <strong>{filtered.length}</strong> item{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' && ` in "${activeCategory}"`}
            </p>
            <div className="grid-3">
              {filtered.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
