
import React, { useState } from 'react';

const SettingsContent: React.FC = () => {
  const [settings, setSettings] = useState({
    libraryName: 'LibraryHub',
    maxBooksPerMember: 5,
    loanPeriod: 14,
    finePerDay: 0.50,
    notifications: true,
    autoBackup: false,
    language: 'english'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
    // In a real app, you would send these settings to your backend
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>System Settings</h4>
        <button className="btn btn-primary" onClick={handleSaveSettings}>
          <i className="fas fa-save me-2"></i>Save Settings
        </button>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="chart-container">
            <h5 className="mb-4">General Settings</h5>
            
            <div className="mb-3">
              <label className="form-label">Library Name</label>
              <input 
                type="text" 
                className="form-control" 
                name="libraryName"
                value={settings.libraryName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Maximum Books per Member</label>
              <input 
                type="number" 
                className="form-control" 
                name="maxBooksPerMember"
                value={settings.maxBooksPerMember}
                onChange={handleInputChange}
                min="1"
                max="10"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Loan Period (days)</label>
              <input 
                type="number" 
                className="form-control" 
                name="loanPeriod"
                value={settings.loanPeriod}
                onChange={handleInputChange}
                min="1"
                max="30"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Fine per Day ($)</label>
              <input 
                type="number" 
                className="form-control" 
                name="finePerDay"
                value={settings.finePerDay}
                onChange={handleInputChange}
                min="0"
                step="0.10"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Language</label>
              <select 
                className="form-select" 
                name="language"
                value={settings.language}
                onChange={handleInputChange}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="chart-container">
            <h5 className="mb-4">System Preferences</h5>
            
            <div className="form-check form-switch mb-4">
              <input 
                className="form-check-input" 
                type="checkbox" 
                name="notifications"
                checked={settings.notifications}
                onChange={handleInputChange}
                id="notificationsSwitch"
              />
              <label className="form-check-label" htmlFor="notificationsSwitch">
                Enable Email Notifications
              </label>
            </div>
            
            <div className="form-check form-switch mb-4">
              <input 
                className="form-check-input" 
                type="checkbox" 
                name="autoBackup"
                checked={settings.autoBackup}
                onChange={handleInputChange}
                id="backupSwitch"
              />
              <label className="form-check-label" htmlFor="backupSwitch">
                Automatic Daily Backup
              </label>
            </div>
            
            <div className="mb-4">
              <label className="form-label">Backup Schedule</label>
              <select className="form-select" disabled={!settings.autoBackup}>
                <option value="00:00">12:00 AM</option>
                <option value="03:00">3:00 AM</option>
                <option value="06:00">6:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
            </div>
            
            <hr className="my-4" />
            
            <h6 className="mb-3">System Information</h6>
            <div className="row">
              <div className="col-6">
                <div className="card bg-light">
                  <div className="card-body py-2">
                    <small className="text-muted">Version</small>
                    <div className="fw-bold">2.1.4</div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card bg-light">
                  <div className="card-body py-2">
                    <small className="text-muted">Last Updated</small>
                    <div className="fw-bold">Jan 15, 2024</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="d-grid gap-2 mt-4">
              <button className="btn btn-outline-primary">
                <i className="fas fa-sync-alt me-2"></i>Check for Updates
              </button>
              <button className="btn btn-outline-danger">
                <i className="fas fa-trash-alt me-2"></i>Clear Cache
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .chart-container {
          background: #fff;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
};

export default SettingsContent;