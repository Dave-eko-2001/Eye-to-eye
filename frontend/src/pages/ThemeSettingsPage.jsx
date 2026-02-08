import React, { useEffect, useState } from 'react';

const getDeviceTheme = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

function ThemeSettingsPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('eye2eye_theme') || 'device');

  useEffect(() => {
    let appliedTheme = theme;
    if (theme === 'device') appliedTheme = getDeviceTheme();
    document.documentElement.setAttribute('data-theme', appliedTheme);
    localStorage.setItem('eye2eye_theme', theme);
  }, [theme]);

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <h2>Theme Settings</h2>
      <div style={{ margin: '1.5rem 0' }}>
        <label style={{ fontWeight: 500 }}>Choose theme:</label>
        <select value={theme} onChange={e => setTheme(e.target.value)} style={{ marginLeft: 12, padding: 8, borderRadius: 8, border: '1px solid #25d366' }}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="device">Device Default</option>
        </select>
      </div>
      <div style={{ color: '#888', fontSize: 15 }}>
        Your choice will be applied across the app and saved for future visits.
      </div>
    </div>
  );
}

export default ThemeSettingsPage;
