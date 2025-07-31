import ReactMarkdown from 'react-markdown'
import { createElement, useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

const generateHeadingId = (heading) => {
  return heading.toLowerCase().replaceAll(' ', '-').replace(/[.()]/g, '')
}

const renderCustomHead = (props) => {
  const { children, node } = props
  return createElement(node.tagName, { id: generateHeadingId(children) }, children)
}

const renderCode = (props) => {
  const {children, className, ...rest} = props
  const match = /language-(\w+)/.exec(className || '')
  if (match) {
    return (
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        language={match[1]}
        style={oneLight}
      />
    )
  }
  return (
    <code {...rest} className={className}>
      {children}
    </code>
  )
}

function PostTemplate({ filename }) {
  const [content, setContent] = useState()

  useEffect(() => {
    if (!filename) {
      return
    }

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
    <>
      <ReactMarkdown
        children={content}
        components={{
          h2: renderCustomHead,
          h3: renderCustomHead,
          code: renderCode,
        }}
      />
    </>
  )
}

export default PostTemplate
