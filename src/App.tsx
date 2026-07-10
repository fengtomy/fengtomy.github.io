import { lazy } from "react"
import { Routes, Route } from "react-router"

import Home from "./Home"
import PostHome from "./blog-posts"
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

function App() {
  return (
    <div className="blog-layout">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/blog-post" Component={PostHome}>
          <Route path="integrate-typescript-into-react-vite" Component={IntegrateTypeScriptIntoReactVite} />
          <Route path="attach-event-listener-with-ref" Component={AddEventListenerWithRef} />
          <Route path="javascript-map" Component={JavaScriptMap} />
          <Route path="refresh-404-in-spa" Component={Refresh404InSpa} />
          <Route path="understand-cors" Component={UnderstandCORS} />
          <Route path="websocket-intro" Component={WebsocketIntro} />
          <Route path="vue-clean-code" Component={VueCleanCode} />
          <Route path="new-in-ecma2023" Component={NewInECMA2023} />
          <Route path="new-in-ecma2024" Component={NewInECMA2024} />
          <Route path="new-in-ecma2025" Component={NewInECMA2025} />
        </Route>
      </Routes>
    </div>
  )
}

export default App