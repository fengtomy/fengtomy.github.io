import { Outlet } from "react-router"
import { useState, useCallback, useEffect, useRef } from "react"
import styles from './index.module.css'
import type { IBlogSketch } from "../contexts"
import { BlogSketchContext } from "../contexts"
import Sketch from "./components/Sketch"
import ProgressBar from "./components/ProgressBar"
import NavBar from "./components/NavBar"

const PostHome = () => {
  const [containerDom, setContainerDom] = useState<HTMLElement | null>(null)
  const [blogSketch, setBlogSketch] = useState<IBlogSketch[]>([])

  const progressBarRef = useRef<HTMLDivElement>(null)

  const existedRef = useCallback((node: HTMLElement) => {
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
            progressBarRef.current!.style.width = Math.round(proportion * 100) + '%'
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
      <NavBar />
      <BlogSketchContext value={{ sketch: blogSketch, setSketch: setBlogSketch }}>
        <main className={styles.blogPostWrapper}>
          <section className={styles.blogPostContentWrapper}>
            <section className={styles.blogPostContent} ref={existedRef}>
              <Outlet />
            </section>
          </section>
          {blogSketch.length > 0 && <Sketch sketch={blogSketch} />}
        </main>
      </BlogSketchContext>
    </>
  )
}

export default PostHome