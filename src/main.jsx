import React from 'react';
// import App from './App.jsx';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './authContext.jsx';
import ProjectRoutes from './Routes.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
        <ProjectRoutes/>
    </AuthProvider>
  </BrowserRouter>
);
