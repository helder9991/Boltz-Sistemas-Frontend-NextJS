import { ChangeEvent } from 'react'
import styles from './styles.module.css'
import { IconType } from 'react-icons'

export interface IListItem {
  id: string
  value: string | number
}

interface IProps {
  Icon: IconType
  placeholder?: string
  title: string
  list: IListItem[] | undefined
  onChange: (selected: IListItem) => void
}

export default function Select({
  Icon,
  placeholder,
  title,
  list = [],
  onChange,
}: IProps) {
  function handleOnChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(JSON.parse(event.target.value))
  }

  return (
    <div className={`flex flex-col ${styles.container}`}>
      {title}
      <div className={`flex items-center p-3 ${styles.inputContainer}`}>
        <Icon size={20} />
        <span className={`mx-3 ${styles.separator}`} />
        <select placeholder={placeholder} onChange={handleOnChange}>
          {list.map((listItem) => (
            <option key={listItem.id} value={JSON.stringify(listItem)}>
              {listItem.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
