// ===== File: src/pages/Dashboard/Dashboard.jsx =====
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    // In a real app, you would call an API to delete the account
    // For demo, we'll just logout
    alert('Account deletion requested. This is a demo - no actual deletion occurred.');
    setShowDeleteConfirm(false);
  };

  if (!user) {
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = () => {
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-text">AuthApp</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => setActiveTab('profile')}
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Security</span>
          </button>

          <button
            onClick={() => setActiveTab('activity')}
            className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Activity</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <h1 className="page-title">
              {activeTab === 'profile' && 'Profile Overview'}
              {activeTab === 'security' && 'Security Settings'}
              {activeTab === 'activity' && 'Recent Activity'}
              {activeTab === 'settings' && 'Account Settings'}
            </h1>
          </div>
          
          <div className="header-right">
            <div className="user-menu">
              <div className="user-avatar">
                {getInitials()}
              </div>
              <div className="user-info">
                <span className="user-name">{user.firstName} {user.lastName}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-tab fade-in">
              {/* Welcome Card */}
              <div className="welcome-card">
                <div className="welcome-content">
                  <h2>Welcome back, {user.firstName}! 👋</h2>
                  <p>Here's what's happening with your account today.</p>
                </div>
                <div className="welcome-stats">
                  <div className="stat-item">
                    <span className="stat-value">2</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">15</span>
                    <span className="stat-label">Tasks</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">3</span>
                    <span className="stat-label">Teams</span>
                  </div>
                </div>
              </div>

              {/* Profile Details Card */}
              <div className="details-card">
                <div className="card-header">
                  <h3>Personal Information</h3>
                  <button className="edit-button">
                    <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>
                
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>{user.firstName} {user.lastName}</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Email Address</label>
                    <p>{user.email}</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Phone Number</label>
                    <p>{user.phone || 'Not provided'}</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Date of Birth</label>
                    <p>{user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Not provided'}</p>
                  </div>
                  
                  <div className="info-item full-width">
                    <label>Address</label>
                    <p>{user.address || 'Not provided'}</p>
                  </div>
                  
                  <div className="info-item">
                    <label>PAN Card</label>
                    <p>{user.panCardPhoto || 'Not uploaded'}</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Member Since</label>
                    <p>{user.createdAt ? formatDate(user.createdAt) : 'N/A'}</p>
                  </div>
                  
                  <div className="info-item">
                    <label>Account ID</label>
                    <p className="account-id">{user.id}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  <button className="action-card">
                    <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>New Project</span>
                  </button>
                  
                  <button className="action-card">
                    <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Schedule</span>
                  </button>
                  
                  <button className="action-card">
                    <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Messages</span>
                  </button>
                  
                  <button className="action-card">
                    <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="security-tab fade-in">
              <div className="security-card">
                <h3>Password & Authentication</h3>
                
                <div className="security-item">
                  <div className="security-info">
                    <h4>Password</h4>
                    <p>Last changed 30 days ago</p>
                  </div>
                  <button className="security-button">Change Password</button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <button className="security-button primary">Enable 2FA</button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <h4>Active Sessions</h4>
                    <p>You're currently logged in on this device</p>
                  </div>
                  <button className="security-button">View All</button>
                </div>
              </div>

              <div className="danger-zone">
                <h3>Danger Zone</h3>
                <div className="danger-item">
                  <div className="danger-info">
                    <h4>Delete Account</h4>
                    <p>Once you delete your account, there is no going back. Please be certain.</p>
                  </div>
                  {!showDeleteConfirm ? (
                    <button 
                      onClick={() => setShowDeleteConfirm(true)}
                      className="danger-button"
                    >
                      Delete Account
                    </button>
                  ) : (
                    <div className="confirm-delete">
                      <p className="confirm-text">Are you sure?</p>
                      <div className="confirm-actions">
                        <button 
                          onClick={handleDeleteAccount}
                          className="confirm-yes"
                        >
                          Yes, delete
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(false)}
                          className="confirm-no"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="activity-tab fade-in">
              <div className="activity-card">
                <div className="card-header">
                  <h3>Recent Activity</h3>
                  <select className="activity-filter">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                  </select>
                </div>

                <div className="activity-timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon login">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <div className="timeline-content">
                      <h4>Logged in</h4>
                      <p>From Chrome on Windows</p>
                      <span className="timeline-time">Just now</span>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-icon profile">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="timeline-content">
                      <h4>Profile updated</h4>
                      <p>Changed profile picture</p>
                      <span className="timeline-time">2 days ago</span>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-icon security">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="timeline-content">
                      <h4>Password changed</h4>
                      <p>Security update</p>
                      <span className="timeline-time">1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-tab fade-in">
              <div className="settings-card">
                <h3>Preferences</h3>
                
                <div className="settings-group">
                  <h4>Notifications</h4>
                  <div className="settings-item">
                    <div className="settings-info">
                      <span>Email notifications</span>
                      <p>Receive updates about your account activity</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-item">
                    <div className="settings-info">
                      <span>Push notifications</span>
                      <p>Receive push notifications on your browser</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Privacy</h4>
                  <div className="settings-item">
                    <div className="settings-info">
                      <span>Profile visibility</span>
                      <p>Make your profile visible to other users</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-item">
                    <div className="settings-info">
                      <span>Activity status</span>
                      <p>Show when you're active</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Language & Region</h4>
                  <select className="settings-select">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <button className="save-settings">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;