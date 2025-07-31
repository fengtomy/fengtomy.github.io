import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

const JavaScriptMap = lazy(() => import('./blog-posts/JavaScriptMap.jsx'))
const UnderstandCORS = lazy(() => import('./blog-posts/UnderstandCORS.jsx'))
const WebsocketIntro = lazy(() => import('./blog-posts/WebsocketIntro.jsx'))
const VueCleanCode = lazy(() => import('./blog-posts/VueCleanCode.jsx'))
const NewInECMA2025 = lazy(() => import('./blog-posts/NewInECMA2025.jsx'))
const NewInECMA2024 = lazy(() => import('./blog-posts/NewInECMA2024.jsx'))
const NewInECMA2023 = lazy(() => import('./blog-posts/NewInECMA2023.jsx'))

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: 'javascript-map', element: <JavaScriptMap /> },
  { path: 'understand-cors', element: <UnderstandCORS /> },
  { path: 'websocket-intro', element: <WebsocketIntro /> },
  { path: 'vue-clean-code', element: <VueCleanCode /> },
  { path: 'new-in-ecma2025', element: <NewInECMA2025 /> },
  { path: 'new-in-ecma2024', element: <NewInECMA2024 /> },
  { path: 'new-in-ecma2023', element: <NewInECMA2023 /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
