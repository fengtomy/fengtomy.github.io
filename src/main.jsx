import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { loadable } from './utils.jsx'

const JavaScriptMap = loadable('./blog-posts/JavaScriptMap.jsx')
const UnderstandCORS = loadable('./blog-posts/UnderstandCORS.jsx')
const WebsocketIntro = loadable('./blog-posts/WebsocketIntro.jsx')
const VueCleanCode = loadable('./blog-posts/VueCleanCode.jsx')
const NewInECMA2025 = loadable('./blog-posts/NewInECMA2025.jsx')
const NewInECMA2024 = loadable('./blog-posts/NewInECMA2024.jsx')
const NewInECMA2023 = loadable('./blog-posts/NewInECMA2023.jsx')

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
