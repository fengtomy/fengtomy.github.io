import { Outlet, NavLink } from "react-router"
import { useState, useCallback, useEffect, useRef } from "react"
import styles from './index.module.css'
import { BlogSketchContext } from "../contexts"
import Sketch from "./components/Sketch"
import ProgressBar from "./components/ProgressBar"

const PostHome = () => {
  const [containerDom, setContainerDom] = useState(null)
  const [blogSketch, setBlogSketch] = useState([])

  const progressBarRef = useRef()

  const existedRef = useCallback((node) => {
    if (node !== null) {
      setContainerDom(node)
    }
  }, [])

  useEffect(() => {
    if (containerDom) {
      const handleScroll = function() {
        const proportion = containerDom.scrollTop / (containerDom.scrollHeight - containerDom.offsetHeight)
        if (progressBarRef.current) {
          window.requestAnimationFrame(() => {
            progressBarRef.current.style.width = parseInt(proportion * 100) + '%'
          })
        }
      }

      containerDom.addEventListener('scroll', handleScroll)

      return () => {
        containerDom.removeEventListener('scroll', handleScroll)
      }
    }
  }, [containerDom])

  return (
    <>
      <ProgressBar progressBarRef={progressBarRef} />
      <nav className={styles.nav}>
        <NavLink to="/">home</NavLink>
      </nav>
      <BlogSketchContext value={{ sketch: blogSketch, setSketch: setBlogSketch }}>
        <main className={styles.blogPostWrapper}>
          <section className={styles.blogPostContent} ref={existedRef}>
            <Outlet />
          </section>
          {blogSketch.length > 0 && <Sketch sketch={blogSketch} />}
        </main>
      </BlogSketchContext>
    </>
  )
}

export default PostHome