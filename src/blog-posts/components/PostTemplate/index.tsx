import { MarkdownHooks } from 'react-markdown'
import { createElement, useContext, useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './PostTemplate.module.css'
import { useCSSColorScheme } from '../../../hooks'
import { visit } from 'unist-util-visit'
import { fromMarkdown } from 'mdast-util-from-markdown'
import type { IBlogSketch } from '../../../contexts'
import { BlogSketchContext } from '../../../contexts'
import { generateHeadingId } from '../../../utils'

const renderAnchor = (props: { children?: React.ReactNode, href?: string }) => {
  const { children, href } = props
  if (href!.startsWith('#')) {
    return <a href={href}>{children}</a>
  }
  return <a href={href} target="_blank">{children}</a>
}

type MarkDownNode = {
  tagName: string;
}

const renderH1 = (props: { children?: React.ReactNode, node?: MarkDownNode }) => {
  const { children, node } = props
  return createElement(node!.tagName, { id: generateHeadingId(children as string), className: styles.h1Wrapper }, children)
}

const renderHead = (props: { children?: React.ReactNode, node?: MarkDownNode }) => {
  const { children, node } = props
  return createElement(node!.tagName, { id: generateHeadingId(children as string) }, children)
}

const renderCode = (props: { children?: React.ReactNode, node?: MarkDownNode, isLightMode: boolean, className?: string }) => {
  const {children, className, isLightMode, node, ...rest} = props
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
  return createElement(node!.tagName, { ...rest, className: [styles.inlineCode, className].filter(Boolean).join(' ') }, children)
}

const loadingSection = <p className={styles.placeholder}>Loading...</p>

function PostTemplate({ filename }: { filename: string }) {
  const [content, setContent] = useState<string>()
  const { setSketch } = useContext(BlogSketchContext)

  useEffect(() => {
    if (!content) {
      return
    }
    const headers: IBlogSketch[] = []
    const tree = fromMarkdown(content)
    visit(tree, 'heading', (node) => {
      if ([2, 3].includes(node.depth)) {
        headers.push({ type: node.depth, text: (node.children[0] as unknown as { value: string })?.value })
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
