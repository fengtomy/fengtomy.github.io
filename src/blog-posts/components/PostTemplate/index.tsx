import { MarkdownHooks } from 'react-markdown'
import { useContext, useEffect, useState, useRef } from 'react'
import styles from './PostTemplate.module.css'
import { useCSSColorScheme } from '@/hooks'
import { visit } from 'unist-util-visit'
import { fromMarkdown } from 'mdast-util-from-markdown'
import type { IBlogSketch } from '@/contexts'
import { BlogSketchContext } from '@/contexts'
import { renderAnchor, renderH1, renderBr, renderCode, renderHead } from './utils'

const loadingSection = <p className={styles.placeholder}>Loading...</p>

interface IPostTemplateProps {
  filename: string
}
function PostTemplate({ filename }: IPostTemplateProps) {
  const [content, setContent] = useState<string>()
  const { setSketch } = useContext(BlogSketchContext)

  const importErrorRef = useRef(false)

  useEffect(() => {
    if (!content || importErrorRef.current) {
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

    import(`../../../assets/md/${filename}.md?raw`)
      .then(res => {
        setContent(res.default)
      })
      .catch((e) => {
        importErrorRef.current = true
        let errorMessage = `## ${e.message}`
        if (e.message.startsWith('Unknown variable dynamic import')) {
          errorMessage = `## File: ${filename} is preparing.\n\n ### Please wait a moment.`
        }
        setContent(`# Not found\n\n ${errorMessage}`)
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
          br: renderBr,
          code: (props) => renderCode({ ...props, isLightMode: light }),
        }}
      />
    </>
  )
}

export default PostTemplate
