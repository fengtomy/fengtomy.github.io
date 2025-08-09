import { Outlet, NavLink } from "react-router"

const PostHome = () => {
  return (
    <>
      <NavLink to="/"><h2>HOME</h2></NavLink>
      <Outlet />
    </>
  )
}

export default PostHome