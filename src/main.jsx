import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { EnquiryModalProvider } from './context/EnquiryModalContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EnquiryModalProvider>
        <App />
      </EnquiryModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
