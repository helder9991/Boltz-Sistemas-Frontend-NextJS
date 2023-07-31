import { CSSProperties } from 'react'
import styles from './styles.module.css'

interface IProps {
  title: string
  value: string | number | undefined
  valueStyle?: CSSProperties
  color?: string
}

export default function Card({ title, value, valueStyle, color }: IProps) {
  return (
    <div className={`${styles.container}`}>
      <div className="flex-1 flex flex-col my-5 mx-6">
        <h1>{title}</h1>
        <div className=" flex-1 flex items-center justify-center">
          <span style={valueStyle}>{value ?? ''}</span>
        </div>
      </div>
      <div className={styles.line} style={{ backgroundColor: color }}></div>
    </div>
  )
}
