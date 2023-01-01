import React from 'react';
import { createRoot } from 'react-dom/client';

// Basic styles
import './style.css';

import App from './components/App.jsx';

const root = createRoot(document.getElementById('app'));
root.render(React.createElement(App));
