import { NavLink } from "react-router-dom"
import styles from './home.module.css'
import { homeLinks } from "./utils"

function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to my online space.</h1>
      <section className={styles.blogPost}>
        <h2>
          Blog Posts
        </h2>
        <nav className={styles.nav}>
          {homeLinks.map(link => <NavLink key={link.to} to={link.to} viewTransition>{link.title}</NavLink>)}
        </nav>
      </section>
    </main>
  )
}

export default Home
