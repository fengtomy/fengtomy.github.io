import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import PostsHome from './blog-posts'
import Layout from './Layout.jsx'

const AddEventListenerWithRef = lazy(() => import('./blog-posts/views/AddEventListenerWithRef.jsx'))
const JavaScriptMap = lazy(() => import('./blog-posts/views/JavaScriptMap.jsx'))
const UnderstandCORS = lazy(() => import('./blog-posts/views/UnderstandCORS.jsx'))
const WebsocketIntro = lazy(() => import('./blog-posts/views/WebsocketIntro.jsx'))
const VueCleanCode = lazy(() => import('./blog-posts/views/VueCleanCode.jsx'))
const NewInECMA2025 = lazy(() => import('./blog-posts/views/NewInECMA2025.jsx'))
const NewInECMA2024 = lazy(() => import('./blog-posts/views/NewInECMA2024.jsx'))
const NewInECMA2023 = lazy(() => import('./blog-posts/views/NewInECMA2023.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, Component: Home },
      {
        path: 'blog-post',
        Component: PostsHome,
        children: [
          { path: 'attach-event-listener-with-ref', element: <AddEventListenerWithRef /> },
          { path: 'javascript-map', element: <JavaScriptMap /> },
          { path: 'understand-cors', element: <UnderstandCORS /> },
          { path: 'websocket-intro', element: <WebsocketIntro /> },
          { path: 'vue-clean-code', element: <VueCleanCode /> },
          { path: 'new-in-ecma2025', element: <NewInECMA2025 /> },
          { path: 'new-in-ecma2024', element: <NewInECMA2024 /> },
          { path: 'new-in-ecma2023', element: <NewInECMA2023 /> },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
