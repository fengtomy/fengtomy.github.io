import { MarkdownHooks } from 'react-markdown'
import { createElement, useContext, useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './PostTemplate.module.css'
import { useCSSColorScheme } from '../../../hooks'
import { visit } from 'unist-util-visit'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { BlogSketchContext } from '../../../contexts'
import { generateHeadingId } from '../../../utils'

const renderAnchor = (props) => {
  const { children, href } = props
  if (href.startsWith('#')) {
    return <a href={href}>{children}</a>
  }
  return <a href={href} target="_blank">{children}</a>
}

const renderH1 = (props) => {
  const { children, node } = props
  return createElement(node.tagName, { id: generateHeadingId(children), className: styles.h1Wrapper }, children)
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
  const { setSketch } = useContext(BlogSketchContext)

  useEffect(() => {
    if (!content) {
      return
    }
    const headers = []
    const tree = fromMarkdown(content)
    visit(tree, 'heading', (node) => {
      if ([2, 3].includes(node.depth)) {
        headers.push({ type: node.depth, text: node.children[0]?.value })
      }
    })
    setSketch(headers)
  }, [content, setSketch])

  const { light } = useCSSColorScheme()

  useEffect(() => {
    if (!filename) {
      return
    }

    import(`../../../assets/${filename}.md?raw`)
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
          h1: renderH1,
          h2: renderHead,
          h3: renderHead,
          code: (props) => renderCode({ ...props, isLightMode: light }),
        }}
      />
    </>
  )
}

export default PostTemplate
