import { NavLink } from "react-router"

function Home() {
  return (
    <>
      <h1>Welcome to fengxh blog posts.</h1>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        <NavLink to="/javascript-map">Map in JavaScript</NavLink>
        <NavLink to="/understand-cors">Understand CORS</NavLink>
        <NavLink to="/websocket-intro">Websocket setup introduction</NavLink>
        <NavLink to="/vue-clean-code">Clean code in Vue</NavLink>
        <NavLink to="/new-in-ecma2025">What's new in ECMA2025</NavLink>
        <NavLink to="/new-in-ecma2024">What's new in ECMA2024</NavLink>
        <NavLink to="/new-in-ecma2023">What's new in ECMA2023</NavLink>
      </nav>
    </>
  )
}

export default Home
