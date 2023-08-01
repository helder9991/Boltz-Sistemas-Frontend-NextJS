import styles from './styles.module.css'
import { ChangeEvent, HTMLInputTypeAttribute, useRef } from 'react'
import { IconType } from 'react-icons'

interface IProps {
  Icon: IconType
  type: HTMLInputTypeAttribute
  placeholder?: string
  title: string
  onInputChange: (value: string) => void
  defaultValue: string
}

export default function Input({
  Icon,
  type,
  placeholder,
  title,
  onInputChange,
  defaultValue,
}: IProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker()
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    onInputChange(value)
  }

  return (
    <div className={`flex flex-col ${styles.container}`}>
      {title}
      <div
        className={`flex items-center p-3 ${styles.inputContainer}`}
        onClick={handleInputClick}
        onChange={handleInputChange}
      >
        <Icon size={20} />
        <span className={`mx-3 ${styles.separator}`} />
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={inputRef}
        />
      </div>
    </div>
  )
}
