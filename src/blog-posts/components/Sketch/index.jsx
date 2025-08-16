import styles from './Sketch.module.css'
import { generateHeadingId } from '../../../utils'

const generateHeader = (header) => {
  const anchor = '#' + generateHeadingId(header.text)
  if (header.type === 3) {
    return (
      <div key={header.text} className={styles.lowLevelHeader}>
        <a href={anchor}>- {header.text}</a>
      </div>
    )
  }
  return (
    <div key={header.text} className={styles.header}>
      <a href={anchor}>{header.text}</a>
    </div>
  )
}

const Sketch = ({ sketch }) => {
  return (
    <section className={styles.blogPostSketch}>
      <h3>Catalog</h3>
      <section className={styles.sketchWrapper}>
        {sketch.map(generateHeader)}
      </section>
    </section>
  )
}

export default Sketch
