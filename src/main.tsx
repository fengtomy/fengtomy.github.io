// import { lazy } from 'react'
import './index.css'
import Home from './Home'
import { Route, Routes } from 'react-router'
import PostsHome from './blog-posts'
import Layout from './Layout'
import AddEventListenerWithRef from './blog-posts/views/AddEventListenerWithRef'
import JavaScriptMap from './blog-posts/views/JavaScriptMap'
import UnderstandCORS from './blog-posts/views/UnderstandCORS'
import WebsocketIntro from './blog-posts/views/WebsocketIntro'
import VueCleanCode from './blog-posts/views/VueCleanCode'
import NewInECMA2023 from './blog-posts/views/NewInECMA2023'
import NewInECMA2024 from './blog-posts/views/NewInECMA2024'
import NewInECMA2025 from './blog-posts/views/NewInECMA2025'
import Refresh404InSpa from './blog-posts/views/Refresh404InSpa'
import IntegrateTypeScriptIntoReactVite from './blog-posts/views/IntegrateTypeScriptIntoReactVite'

// const AddEventListenerWithRef = lazy(() => import('./blog-posts/views/AddEventListenerWithRef'))
// const JavaScriptMap = lazy(() => import('./blog-posts/views/JavaScriptMap'))
// const UnderstandCORS = lazy(() => import('./blog-posts/views/UnderstandCORS'))
// const WebsocketIntro = lazy(() => import('./blog-posts/views/WebsocketIntro'))
// const VueCleanCode = lazy(() => import('./blog-posts/views/VueCleanCode'))
// const NewInECMA2025 = lazy(() => import('./blog-posts/views/NewInECMA2025'))
// const NewInECMA2024 = lazy(() => import('./blog-posts/views/NewInECMA2024'))
// const NewInECMA2023 = lazy(() => import('./blog-posts/views/NewInECMA2023'))
// const Refresh404InSpa = lazy(() => import('./blog-posts/views/Refresh404InSpa'))
// const IntegrateTypeScriptIntoReactVite = lazy(() => import('./blog-posts/views/IntegrateTypeScriptIntoReactVite'))


export const App = () => {
  // const createRouter = typeof window !== 'undefined' ? createBrowserRouter : createMemoryRouter
  // const router = createRouter([
  //   {
  //     path: '/',
  //     element: <Layout />,
  //     children: [
  //       { index: true, Component: Home },
  //       {
  //         path: 'blog-post',
  //         Component: PostsHome,
  //         children: [
  //           { path: 'integrate-typescript-into-react-vite', element: <IntegrateTypeScriptIntoReactVite /> },
  //           { path: 'attach-event-listener-with-ref', element: <AddEventListenerWithRef /> },
  //           { path: 'javascript-map', element: <JavaScriptMap /> },
  //           { path: 'refresh-404-in-spa', element: <Refresh404InSpa /> },
  //           { path: 'understand-cors', element: <UnderstandCORS /> },
  //           { path: 'websocket-intro', element: <WebsocketIntro /> },
  //           { path: 'vue-clean-code', element: <VueCleanCode /> },
  //           { path: 'new-in-ecma2025', element: <NewInECMA2025 /> },
  //           { path: 'new-in-ecma2024', element: <NewInECMA2024 /> },
  //           { path: 'new-in-ecma2023', element: <NewInECMA2023 /> },
  //         ]
  //       }
  //     ]
  //   }
  // ])

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="blog-post" element={<PostsHome />}>
            <Route path="integrate-typescript-into-react-vite" element={<IntegrateTypeScriptIntoReactVite />} />
            <Route path="attach-event-listener-with-ref" element={<AddEventListenerWithRef />} />
            <Route path="javascript-map" element={<JavaScriptMap />} />
            <Route path="refresh-404-in-spa" element={<Refresh404InSpa />} />
            <Route path="understand-cors" element={<UnderstandCORS />} />
            <Route path="websocket-intro" element={<WebsocketIntro />} />
            <Route path="vue-clean-code" element={<VueCleanCode />} />
            <Route path="new-in-ecma2025" element={<NewInECMA2025 />} />
            <Route path="new-in-ecma2024" element={<NewInECMA2024 />} />
            <Route path="new-in-ecma2023" element={<NewInECMA2023 />} />
          </Route>
        </Route>
      </Routes>
  )
}
