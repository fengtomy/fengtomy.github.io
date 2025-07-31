import ReactMarkdown, { MarkdownHooks } from 'react-markdown'
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

const placeholder = <p style={{ fontSize: '4em' }}>Loading...</p>


function PostTemplate({ filename }) {
  const [content, setContent] = useState()
  // const contentResolved = use(mdPromise)

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
    return placeholder
  }

  return (
    <>
      <MarkdownHooks
        fallback={placeholder}
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
