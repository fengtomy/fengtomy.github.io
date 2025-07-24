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
      </nav>
    </>
  )
}

export default Home
