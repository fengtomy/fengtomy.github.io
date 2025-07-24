import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import JavaScriptMap from './JavaScriptMap.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="javascript-map" element={<JavaScriptMap />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
