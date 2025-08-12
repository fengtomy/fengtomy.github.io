import { NavLink } from "react-router"
import styles from './home.module.css'

const links = [
  { to: '/blog-post/attach-event-listener-with-ref', title: 'Attach event listener in React, with ref?' },
  { to: '/blog-post/javascript-map', title: 'Map in ECMA2015' },
  { to: '/blog-post/refresh-404-in-spa', title: '404 error on page reload in React and React-Router projects' },
  { to: '/blog-post/understand-cors', title: 'Understanding cross-origin and CORS' },
  { to: '/blog-post/new-in-ecma2025', title: "What's new in ECMA2025" },
  { to: '/blog-post/new-in-ecma2024', title: "What's new in ECMA2025" },
  { to: '/blog-post/new-in-ecma2023', title: "What's new in ECMA2025" },
  { to: '/blog-post/websocket-intro', title: 'WebSocket Intro' },
  { to: '/blog-post/vue-clean-code', title: 'Vue clean code in daily work' },
]

function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to my online space.</h1>
      <section className={styles.blogPost}>
        <h2>
          Blog Posts
        </h2>
        <nav className={styles.nav}>
          {links.map(link => <NavLink key={link.to} to={link.to} viewTransition>{link.title}</NavLink>)}
        </nav>
      </section>
    </main>
  )
}

export default Home
