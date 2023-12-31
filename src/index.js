import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { YMaps } from '@pbe/react-yandex-maps';
import { CtxGeoCode } from './Contexts/Contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));

try{
root.render(
  
  
      <BrowserRouter>
        <App />
      </BrowserRouter>
    
);
}catch(e){
  root.render(
  
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  
);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
