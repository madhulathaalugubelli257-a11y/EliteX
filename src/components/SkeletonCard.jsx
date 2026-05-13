// SkeletonCard.jsx — Pulsing skeleton placeholder for loading states
import '../styles/Cards.css';

export default function SkeletonCard({ type = 'food' }) {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-line short" />
        <div className="skeleton skeleton-line medium" />
        <div className="skeleton skeleton-line full" />
        <div className="skeleton skeleton-line short" />
      </div>
    </div>
  );
}
