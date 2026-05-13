// Profile.jsx — User profile edit page with localStorage persistence
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Profile.css';

const branches = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Information Science', 'Electrical', 'Chemical', 'Other'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [toast, setToast] = useState(null);
  const [editing, setEditing] = useState(false);
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    college: user?.college || '',
    branch: user?.branch || '',
    year: user?.year || '',
    avatar: user?.avatar || '👤',
  });

  const avatarOptions = ['🧑‍💻', '👩‍🎓', '🧑‍🔬', '👨‍💼', '👩‍💻', '🎓', '🧑‍🏫', '👩‍🏫'];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setToast({ message: 'Name cannot be empty.', type: 'error' });
      return;
    }
    updateProfile(form);
    setEditing(false);
    setToast({ message: 'Profile updated successfully! ✅', type: 'success' });
  };

  return (
    <>
      <div className="profile-page">
        <div className="page-header">
          <div className="container">
            <h1>👤 {t('profile.title')}</h1>
            <p>Manage your EliteX account details</p>
          </div>
        </div>

        <div className="container profile-body">
          {/* Avatar card */}
          <div className="profile-avatar-card card">
            <div className="profile-avatar-big">{form.avatar}</div>
            <h3 className="profile-name">{user?.name}</h3>
            <p className="profile-email">{user?.email}</p>
            <span className="badge badge-primary">{user?.college}</span>
            {user?.joinedDate && (
              <p className="profile-joined">
                Member since {new Date(user.joinedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
              </p>
            )}
            {!editing && (
              <button
                id="edit-profile-btn"
                className="btn btn-primary mt-16"
                onClick={() => setEditing(true)}
              >
                ✏️ {t('profile.editProfile')}
              </button>
            )}
          </div>

          {/* Edit form */}
          <div className="profile-form-card card">
            <h3 className="profile-section-title">
              {editing ? '✏️ Edit Profile' : '📋 Profile Details'}
            </h3>

            {editing ? (
              <form onSubmit={handleSave}>
                {/* Avatar picker */}
                <div className="input-group">
                  <label>Choose Avatar</label>
                  <div className="avatar-picker">
                    {avatarOptions.map((av) => (
                      <button
                        key={av}
                        type="button"
                        className={`avatar-option ${form.avatar === av ? 'selected' : ''}`}
                        onClick={() => setForm((p) => ({ ...p, avatar: av }))}
                        aria-label={`Select avatar ${av}`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="profile-form-grid">
                  <div className="input-group">
                    <label htmlFor="pf-name">Full Name</label>
                    <input id="pf-name" type="text" name="name" className="input-field" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="pf-phone">Phone Number</label>
                    <input id="pf-phone" type="tel" name="phone" className="input-field" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="pf-branch">Branch</label>
                    <select id="pf-branch" name="branch" className="input-field sort-select" value={form.branch} onChange={handleChange}>
                      <option value="">Select branch</option>
                      {branches.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="pf-year">Year</label>
                    <select id="pf-year" name="year" className="input-field sort-select" value={form.year} onChange={handleChange}>
                      <option value="">Select year</option>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                <div className="profile-form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                  <button id="save-profile-btn" type="submit" className="btn btn-primary">💾 {t('profile.saveChanges')}</button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                {[
                  { label: 'Full Name', value: user?.name, icon: '👤' },
                  { label: 'Email', value: user?.email, icon: '📧' },
                  { label: 'Phone', value: user?.phone || 'Not set', icon: '📞' },
                  { label: 'College', value: user?.college, icon: '🏫' },
                  { label: 'Branch', value: user?.branch || 'Not set', icon: '📚' },
                  { label: 'Year', value: user?.year || 'Not set', icon: '🎓' },
                ].map((detail) => (
                  <div key={detail.label} className="profile-detail-row">
                    <span className="detail-icon">{detail.icon}</span>
                    <div>
                      <span className="detail-label">{detail.label}</span>
                      <span className="detail-value">{detail.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
