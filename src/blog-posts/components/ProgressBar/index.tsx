import styles from './ProgressBar.module.css'

interface IProgressBarProps {
  progressBarRef: React.RefObject<HTMLDivElement | null>;
}

const ProgressBar = (props: IProgressBarProps) => {
  return (
    <div className={styles.progressBar}>
      <div ref={props.progressBarRef} className={styles.progressBarInner}></div>
    </div>
  )
}

export default ProgressBar