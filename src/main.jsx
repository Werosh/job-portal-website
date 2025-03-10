// index.js - Updated to use AppRouter instead of directly rendering App
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './Router/Router'; // Update this path to match your file structure

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);