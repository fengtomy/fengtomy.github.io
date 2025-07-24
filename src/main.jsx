import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import JavaScriptMap from './blog-posts/JavaScriptMap.jsx'
import UnderstandCORS from './blog-posts/UnderstandCORS.jsx'
import WebsocketIntro from './blog-posts/WebsocketIntro.jsx'
import VueCleanCode from './blog-posts/VueCleanCode.jsx'
import NewInECMA2025 from './blog-posts/NewInECMA2025.jsx'
import NewInECMA2024 from './blog-posts/NewInECMA2024.jsx'
import NewInECMA2023 from './blog-posts/NewInECMA2023.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="javascript-map" element={<JavaScriptMap />} />
        <Route path="understand-cors" element={<UnderstandCORS />} />
        <Route path="websocket-intro" element={<WebsocketIntro />} />
        <Route path="vue-clean-code" element={<VueCleanCode />} />
        <Route path="new-in-ecma2025" element={<NewInECMA2025 />} />
        <Route path="new-in-ecma2024" element={<NewInECMA2024 />} />
        <Route path="new-in-ecma2023" element={<NewInECMA2023 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
