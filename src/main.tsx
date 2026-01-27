// import { StrictMode, lazy } from 'react'
import { lazy } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
// import { createBrowserRouter, RouterProvider } from 'react-router'
import PostsHome from './blog-posts'
import Layout from './Layout.jsx'
import { ViteReactSSG } from 'vite-react-ssg'

const AddEventListenerWithRef = lazy(() => import('./blog-posts/views/AddEventListenerWithRef'))
const JavaScriptMap = lazy(() => import('./blog-posts/views/JavaScriptMap'))
const UnderstandCORS = lazy(() => import('./blog-posts/views/UnderstandCORS'))
const WebsocketIntro = lazy(() => import('./blog-posts/views/WebsocketIntro'))
const VueCleanCode = lazy(() => import('./blog-posts/views/VueCleanCode'))
const NewInECMA2025 = lazy(() => import('./blog-posts/views/NewInECMA2025'))
const NewInECMA2024 = lazy(() => import('./blog-posts/views/NewInECMA2024'))
const NewInECMA2023 = lazy(() => import('./blog-posts/views/NewInECMA2023'))
const Refresh404InSpa = lazy(() => import('./blog-posts/views/Refresh404InSpa'))
const IntegrateTypeScriptIntoReactVite = lazy(() => import('./blog-posts/views/IntegrateTypeScriptIntoReactVite'))

const router = ([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'blog-post',
        Component: PostsHome,
        children: [
          { path: 'integrate-typescript-into-react-vite', element: <IntegrateTypeScriptIntoReactVite /> },
          { path: 'attach-event-listener-with-ref', element: <AddEventListenerWithRef /> },
          { path: 'javascript-map', element: <JavaScriptMap /> },
          { path: 'refresh-404-in-spa', element: <Refresh404InSpa /> },
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

// const root = document.getElementById('root') as HTMLElement   

// createRoot(root).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// )

export const createRoot = ViteReactSSG(
  { routes: router },
  () => { },
)
