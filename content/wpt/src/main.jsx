import React from 'react'
import ReactDOM from 'react-dom/client'
import "../public/styles/root.scss"
import "../public/styles/modules/shortcuts.scss"
import "../public/styles/modules/animations.scss"
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


const localstorage_name = "nfc_wpt_app";
if (!localStorage.getItem(localstorage_name)) {
  localStorage.setItem(localstorage_name, JSON.stringify({
    projects  : []
  }));
}
export default localstorage_name;