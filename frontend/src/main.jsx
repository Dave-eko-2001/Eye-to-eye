import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import App from './App';
=======
import AppWithLock from './AppWithLock';
>>>>>>> b8fa83a (Biometircs intergration into settings)

import { initTheme } from './theme';
import './index.css';

initTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
=======
  <AppWithLock />
>>>>>>> b8fa83a (Biometircs intergration into settings)
  </React.StrictMode>
);
