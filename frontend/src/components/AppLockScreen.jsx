import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AppLockScreen({ onUnlock }) {
  const [authMethod, setAuthMethod] = useState('password');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setAuthMethod(localStorage.getItem('eye2eye_auth_method') || 'password');
  }, []);

  // Real password check with backend
  const handlePassword = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // You may want to get the user's email from context or prompt
      const email = localStorage.getItem('eye2eye_user_email');
      if (!email) {
        setError('No user email found. Please log in again.');
        return;
      }
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth-device/password`, { email, password: pw });
      if (res.data.success) {
        onUnlock();
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('Incorrect password');
    }
  };

  // WebAuthn biometric unlock
  const handleBiometric = async () => {
    if (!window.PublicKeyCredential) {
      setError('Biometric unlock not supported');
      return;
    }
    try {
      // This is a placeholder for real WebAuthn logic
      // In production, use navigator.credentials.get() with server challenge
      onUnlock();
    } catch (err) {
      setError('Biometric unlock failed');
    }
  };

  return (
    <div style={{ position: 'fixed', zIndex: 9999, top: 0, left: 0, width: '100vw', height: '100vh', background: '#f4f6fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '2.5rem 2rem', minWidth: 320, textAlign: 'center' }}>
        <h2>Unlock Eye to Eye</h2>
        {authMethod === 'password' && (
          <form onSubmit={handlePassword}>
            <input
              type="password"
              placeholder="Enter your password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              style={{ padding: 10, borderRadius: 8, border: '1px solid #25d366', width: '90%', marginBottom: 16 }}
            />
            <button type="submit" style={{ background: '#25d366', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 500, width: '100%' }}>
              Unlock
            </button>
          </form>
        )}
        {authMethod === 'biometric' && (
          <button onClick={handleBiometric} style={{ background: '#25d366', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 500, width: '100%' }}>
            Unlock with Fingerprint / Face ID
          </button>
        )}
        {error && <div style={{ color: '#d32f2f', marginTop: 12 }}>{error}</div>}
      </div>
    </div>
  );
}

export default AppLockScreen;
