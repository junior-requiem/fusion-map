import React from 'react';
import { createRoot } from 'react-dom/client';
import OracleFusionHCMEnterpriseMap from './OracleFusionHCMEnterpriseMap';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OracleFusionHCMEnterpriseMap />
  </React.StrictMode>,
);
