
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'

function JavaScriptMap() {
  const [content, setContent] = useState()

  useEffect(() => {
    import("./assets/Map.md?raw").then(res => {
      setContent(res.default)
    })
  }, [])

  return (
    <>
      {content && <ReactMarkdown children={content} />}
    </>
  )
}

export default JavaScriptMap
