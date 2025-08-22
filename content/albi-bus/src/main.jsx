import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../public/styles/root.scss';
import '../public/styles/main.scss';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
