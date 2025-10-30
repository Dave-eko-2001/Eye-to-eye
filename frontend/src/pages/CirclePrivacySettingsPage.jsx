import React, { useState } from 'react';
import axios from 'axios';

function CirclePrivacySettingsPage({ userId }) {
  const [privacy, setPrivacy] = useState('private');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = async (e) => {
    const newPrivacy = e.target.value;
    setPrivacy(newPrivacy);
    setSaving(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users/privacy`, {
        userId,
        privacy: newPrivacy
      });
      setMessage('Privacy setting updated!');
    } catch (err) {
      setMessage('Error updating privacy.');
    }
    setSaving(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <h2>Circle Privacy</h2>
      <div style={{ margin: '1.5rem 0' }}>
        <label style={{ fontWeight: 500 }}>Choose your circle mode:</label>
        <select value={privacy} onChange={handleChange} style={{ marginLeft: 12, padding: 8, borderRadius: 8, border: '1px solid #25d366' }} disabled={saving}>
          <option value="private">Private (WhatsApp style)</option>
          <option value="public">Public (Instagram/Facebook style)</option>
        </select>
      </div>
      <div style={{ color: '#888', fontSize: 15 }}>
        Private: Only contacts with your number can see/search you.<br />
        Public: Anyone can search and view your profile.
      </div>
      {message && <div style={{ color: '#25d366', marginTop: 12 }}>{message}</div>}
    </div>
  );
}

export default CirclePrivacySettingsPage;
