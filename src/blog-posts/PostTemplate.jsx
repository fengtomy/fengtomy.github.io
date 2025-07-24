import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'

function PostTemplate({ filename }) {
  const [content, setContent] = useState()

  useEffect(() => {
    import(`../assets/${filename}.md?raw`)
      .then(res => {
        setContent(res.default)
      })
      .catch((e) => {
        setContent(`# Not found\n\n ## ${e.message}`)
      })
  }, [filename])

  return (
    <>
      {content && <ReactMarkdown children={content} />}
    </>
  )
}

export default PostTemplate
