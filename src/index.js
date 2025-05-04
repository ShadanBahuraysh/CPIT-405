import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


//======================== CREATE A ROOT ELEMENT FOR THE REACT APP =========================
// Grabs the HTML element with id="root" to mount the React application
const root = ReactDOM.createRoot(document.getElementById('root'));


//======================== RENDER THE APPLICATION INTO THE DOM =========================
// Renders the App component inside React.StrictMode to help identify potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);