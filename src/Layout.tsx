import { Outlet } from "react-router"

const Layout = () => {
  return (
    <div className="blog-layout">
      <Outlet />
    </div>
  )
}

export default Layout