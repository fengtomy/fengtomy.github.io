import { NavLink } from "react-router"

function Home() {
  return (
    <>
      <h1>Welcome to my online space.</h1>
      <header>
        <h2>
          Blog Posts
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <NavLink to="/add-event-listener-with-ref">Add event listener in React, with ref?</NavLink>
          <NavLink to="/javascript-map">Map in JavaScript</NavLink>
          <NavLink to="/websocket-intro">Websocket setup introduction</NavLink>
          <NavLink to="/vue-clean-code">Clean code in Vue</NavLink>
          <NavLink to="/understand-cors">Understand CORS</NavLink>
          <NavLink to="/new-in-ecma2025">What's new in ECMA2025</NavLink>
          <NavLink to="/new-in-ecma2024">What's new in ECMA2024</NavLink>
          <NavLink to="/new-in-ecma2023">What's new in ECMA2023</NavLink>
        </nav>
      </header>
    </>
  )
}

export default Home
