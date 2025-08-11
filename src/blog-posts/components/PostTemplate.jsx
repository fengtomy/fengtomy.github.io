import { MarkdownHooks } from 'react-markdown'
import { createElement, useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './PostTemplate.module.css'
import { useCSSColorScheme } from '../../hooks'

const generateHeadingId = (heading) => {
  return heading.toLowerCase().replaceAll(' ', '-').replace(/[.()]/g, '')
}

const renderAnchor = (props) => {
  const { children, href } = props
  if (href.startsWith('#')) {
    return <a href={href}>{children}</a>
  }
  return <a href={href} target="_blank">{children}</a>
}

const renderHead = (props) => {
  const { children, node } = props
  return createElement(node.tagName, { id: generateHeadingId(children) }, children)
}

const renderCode = (props) => {
  const {children, className, isLightMode, ...rest} = props
  const match = /language-(\w+)/.exec(className || '')
  if (match) {
    return (
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        language={match[1]}
        style={isLightMode ? oneLight : oneDark}
      />
    )
  }
  return (
    <code {...rest} className={className}>
      {children}
    </code>
  )
}

const loadingSection = <p className={styles.placeholder}>Loading...</p>

function PostTemplate({ filename }) {
  const [content, setContent] = useState()

  const { light } = useCSSColorScheme()

  useEffect(() => {
    if (!filename) {
      return
    }

    import(`../../assets/${filename}.md?raw`)
      .then(res => {
        setContent(res.default)
      })
      .catch((e) => {
        setContent(`# Not found\n\n ## ${e.message}`)
      })
  }, [filename])

  if (!content) {
    return (
      <>
        {loadingSection}
      </>
    )
  }

  return (
    <>
      <MarkdownHooks
        fallback={loadingSection}
        children={content}
        components={{
          a: renderAnchor,
          h2: renderHead,
          h3: renderHead,
          code: (props) => renderCode({ ...props, isLightMode: light }),
        }}
      />
    </>
  )
}

export default PostTemplate
