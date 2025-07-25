import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'

const JavaScriptMap = lazy(() => import('./blog-posts/JavaScriptMap.jsx'))
const UnderstandCORS = lazy(() => import('./blog-posts/UnderstandCORS.jsx'))
const WebsocketIntro = lazy(() => import('./blog-posts/WebsocketIntro.jsx'))
const VueCleanCode = lazy(() => import('./blog-posts/VueCleanCode.jsx'))
const NewInECMA2025 = lazy(() => import('./blog-posts/NewInECMA2025.jsx'))
const NewInECMA2024 = lazy(() => import('./blog-posts/NewInECMA2025.jsx'))
const NewInECMA2023 = lazy(() => import('./blog-posts/NewInECMA2023.jsx'))

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
