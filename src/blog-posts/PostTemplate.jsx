import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

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

  if (!content) {
    return null
  }

  return (
    <ReactMarkdown
      children={content}
      components={{
        code(props) {
          const {children, className, ...rest} = props
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={oneLight}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          )
        }
      }}
    />
  )
}

export default PostTemplate
