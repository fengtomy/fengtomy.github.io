import { NavLink } from 'react-router'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">home</NavLink>
    </nav>
  )
}

export default NavBar