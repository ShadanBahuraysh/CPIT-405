import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Find the DOM element with id="root" and create a React root for it
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component tree inside the React.StrictMode wrapper
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
