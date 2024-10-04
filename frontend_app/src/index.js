import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeIcons } from '@fluentui/react';

import { AuthProvider } from './components/Authentication';
const root = ReactDOM.createRoot(document.getElementById('root'));
initializeIcons()
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
