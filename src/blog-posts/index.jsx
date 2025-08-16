import { Outlet, NavLink } from "react-router"
import { useState, useCallback, useEffect, useMemo } from "react"
import { throttle } from "../utils"
import styles from './index.module.css'
import { BlogSketchContext } from "../contexts"
import Sketch from "./components/Sketch"

const PostHome = () => {
  const [viewProportion, setViewProportion] = useState(0)
  const [containerDom, setContainerDom] = useState(null)
  const [blogSketch, setBlogSketch] = useState([])

  // console.log('blog sketch', blogSketch)

  const existedRef = useCallback((node) => {
    if (node !== null) {
      setContainerDom(node)
    }
  }, [])

  const progressBarRight = useMemo(() => {
    return parseInt((1 - viewProportion) * 100) + '%'
  }, [viewProportion])

  useEffect(() => {
    if (containerDom) {
      const handleScroll = throttle(function() {
        let proportion = containerDom.scrollTop / (containerDom.scrollHeight - containerDom.offsetHeight)
        if (proportion >= 1) {
          proportion = 1
        }
        setViewProportion(proportion)
      }, 16)

      containerDom.addEventListener('scroll', handleScroll)

      return () => {
        containerDom.removeEventListener('scroll', handleScroll)
      }
    }
  }, [containerDom])

  return (
    <>
      <div className={styles.progressBar} style={{ right: progressBarRight }}></div>
      <nav className={styles.nav}>
        <NavLink to="/">home</NavLink>
      </nav>
      <BlogSketchContext value={{ sketch: blogSketch, setSketch: setBlogSketch }}>
        <main className={styles.blogPostWrapper}>
          <section className={styles.blogPostContent} ref={existedRef}>
            <Outlet />
          </section>
          <Sketch sketch={blogSketch} />
        </main>
      </BlogSketchContext>
    </>
  )
}

export default PostHome