import React, { useState } from 'react';
import axios from 'axios';
import './UserSearchBar.css';

function UserSearchBar({ onUserSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      setError('No users found or server error.');
    }
    setLoading(false);
  };

  return (
    <div className="user-search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search users by username or email..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      {error && <div className="error">{error}</div>}
      <ul className="results">
        {results.map(user => (
          <li key={user._id} onClick={() => onUserSelect(user)}>
            <img src={user.avatar || '/default-avatar.png'} alt="avatar" className="avatar" />
            <span>{user.username} ({user.email})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearchBar;
