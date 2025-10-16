import React, { useState } from 'react';

const getBiometricSupport = () => {
  if (window.PublicKeyCredential) {
    return 'biometric'; // WebAuthn supported
  }
  return 'password';
};

function SecuritySettingsPage() {
  const [authMethod, setAuthMethod] = useState(() => {
    return localStorage.getItem('eye2eye_auth_method') || getBiometricSupport();
  });

  const handleChange = (e) => {
    setAuthMethod(e.target.value);
    localStorage.setItem('eye2eye_auth_method', e.target.value);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <h2>Security & Access</h2>
      <div style={{ margin: '1.5rem 0' }}>
        <label style={{ fontWeight: 500 }}>Choose unlock method:</label>
        <select value={authMethod} onChange={handleChange} style={{ marginLeft: 12, padding: 8, borderRadius: 8, border: '1px solid #25d366' }}>
          <option value="password">Password</option>
          <option value="biometric">Fingerprint / Face Unlock (if supported)</option>
        </select>
      </div>
      <div style={{ color: '#888', fontSize: 15 }}>
        When enabled, you must use your selected method to unlock Eye to Eye each time the app is launched.
      </div>
    </div>
  );
}

export default SecuritySettingsPage;
