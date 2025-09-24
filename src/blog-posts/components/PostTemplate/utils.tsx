import { generateHeadingId } from '@/utils'
import styles from './PostTemplate.module.css'
import { createElement } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const renderAnchor = (props: { children?: React.ReactNode, href?: string }) => {
  const { children, href } = props
  if (href!.startsWith('#')) {
    return <a href={href}>{children}</a>
  }
  return <a href={href} target="_blank">{children}</a>
}

type MarkDownNode = {
  tagName: string;
}

export const renderH1 = (props: { children?: React.ReactNode, node?: MarkDownNode }) => {
  const { children, node } = props
  return createElement(node!.tagName, { id: generateHeadingId(children as string), className: styles.h1Wrapper }, children)
}

export const renderHead = (props: { children?: React.ReactNode, node?: MarkDownNode }) => {
  const { children, node } = props
  return createElement(node!.tagName, { id: generateHeadingId(children as string) }, children)
}

export const renderBr = () => {
  // Add space between text groups within p element.
  return (<span className={styles.textGapPlaceholder} />)
}

export const renderCode = (props: { children?: React.ReactNode, node?: MarkDownNode, isLightMode: boolean, className?: string }) => {
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