import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/normalize.css';
import App from './App';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
