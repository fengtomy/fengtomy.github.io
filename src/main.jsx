import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import JavaScriptMap from './blog-posts/JavaScriptMap.jsx'
import UnderstandCORS from './blog-posts/UnderstandCORS.jsx'
import WebsocketIntro from './blog-posts/WebsocketIntro.jsx'
import VueCleanCode from './blog-posts/VueCleanCode.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="javascript-map" element={<JavaScriptMap />} />
        <Route path="understand-cors" element={<UnderstandCORS />} />
        <Route path="websocket-intro" element={<WebsocketIntro />} />
        <Route path="vue-clean-code" element={<VueCleanCode />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
