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
        console.log({ e })
        setContent(`# ${filename} Not found  ## ${e.message}`)
      })
  }, [filename])

  return (
    <>
      {content && <ReactMarkdown children={content} />}
    </>
  )
}

export default PostTemplate
