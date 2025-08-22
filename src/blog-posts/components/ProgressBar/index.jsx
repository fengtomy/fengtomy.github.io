import styles from './ProgressBar.module.css'

const ProgressBar = (props) => {
  return (
    <div className={styles.progressBar}>
      <div ref={props.progressBarRef} className={styles.progressBarInner}></div>
    </div>
  )
}

export default ProgressBar