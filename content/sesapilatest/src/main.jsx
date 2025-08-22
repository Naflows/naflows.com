import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { storage } from '../editor/edit/src/storage/access.js'
import { HashRouter as Router } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)

if (!storage.access()) storage.set({articles:[]});

if (!storage.access("SesAPIParameters")) storage.set({
    preferedDisplay : "grid"
}, "SesAPIParameters" );

localStorage.removeItem('running_article');




const Storage = storage.access('SesAPIParameters');
if (Storage.opacityDisplay == undefined) Storage.disableOpacity = false;
if (Storage.enableSecondView == undefined) Storage.enableSecondView = false;
if (Storage.enableInfoBox == undefined) Storage.enableInfoBox = true;

storage.set(Storage,'SesAPIParameters');
