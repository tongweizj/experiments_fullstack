import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async";
import './index.css'
import App from './App.jsx'

const Root = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

createRoot(document.getElementById('root')).render(
  import.meta.env.DEV ? Root : <StrictMode>{Root}</StrictMode>
);

