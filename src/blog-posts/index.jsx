import { Outlet, NavLink } from "react-router"
import { useState, useCallback, useEffect, useMemo } from "react"
import { throttle } from "../utils"

const PostHome = () => {
  const [viewProportion, setViewProportion] = useState(0)
  const [containerDom, setContainerDom] = useState(null)

  const existedRef = useCallback((node) => {
    if (node !== null) {
      setContainerDom(node)
    }
  }, [])

  const progressBarRight = useMemo(() => {
    return `calc(100% - ${viewProportion})`
  }, [viewProportion])


  useEffect(() => {
    if (containerDom) {
      const handleScroll = throttle(function() {
        let proportion = containerDom.scrollTop / (containerDom.scrollHeight - containerDom.offsetHeight)
        if (proportion >= 1) {
          proportion = 1
        }
        setViewProportion((proportion * 100).toFixed(2) + '%')
      }, 16)

      containerDom.addEventListener('scroll', handleScroll)

      return () => {
        containerDom.removeEventListener('scroll', handleScroll)
      }
    }
  }, [containerDom])

  return (
    <>
      <div style={{ position: 'absolute', left: 0, top: 0, right: progressBarRight, height: '2px', backgroundColor: 'blue', borderRadius: '2px' }}></div>
      <NavLink to="/"><h2>HOME</h2></NavLink>
      <section style={{ padding: '0 1em', overflowY: 'auto' }} ref={existedRef}>
        <Outlet />
      </section>
    </>
  )
}

export default PostHome