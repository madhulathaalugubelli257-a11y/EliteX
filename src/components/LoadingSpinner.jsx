// LoadingSpinner.jsx — Reusable loading spinner component
import '../styles/Spinner.css';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="spinner-wrapper" role="status" aria-label={message}>
      <div className="spinner-ring">
        <div></div><div></div><div></div><div></div>
      </div>
      {message && <p className="spinner-text">{message}</p>}
    </div>
  );
}
