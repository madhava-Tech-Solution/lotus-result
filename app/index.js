import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
// import { Provider } from 'react-redux';
const MOUNT_NODE = document.getElementById('app');

const root = ReactDOM.createRoot(MOUNT_NODE);

root.render(<App />);
