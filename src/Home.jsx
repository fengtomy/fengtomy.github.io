import { NavLink } from "react-router"
import styles from './home.module.css'

function Home() {
  return (
    <>
      <h1>Welcome to my online space.</h1>
      <header>
        <h2>
          Blog Posts
        </h2>
        <nav className={styles.nav}>
          <NavLink to="/blog-post/attach-event-listener-with-ref">Attach event listener in React, with ref?</NavLink>
          <NavLink to="/blog-post/javascript-map">Map in JavaScript</NavLink>
          <NavLink to="/blog-post/understand-cors">Understand CORS</NavLink>
          <NavLink to="/blog-post/new-in-ecma2025">What's new in ECMA2025</NavLink>
          <NavLink to="/blog-post/new-in-ecma2024">What's new in ECMA2024</NavLink>
          <NavLink to="/blog-post/new-in-ecma2023">What's new in ECMA2023</NavLink>
          <NavLink to="/blog-post/websocket-intro">Websocket setup introduction</NavLink>
          <NavLink to="/blog-post/vue-clean-code">Clean code in Vue</NavLink>
        </nav>
      </header>
    </>
  )
}

export default Home
