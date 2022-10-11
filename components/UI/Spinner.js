import styles from './style.module.css'


export default function Spinner({ color = '#7f58af', className, style }) {
  const circles = [...Array(12)].map((_, index) => {
    return (
      <div key={index}>
        <div className={styles['div-after']} style={{ background: color }}></div>
      </div>
    )
  })

  return (
    <div className={styles['lds-spinner']} style={{ ...style }}>
      {circles}
    </div>
  )
}
