'use client'

import { ReactNode } from 'react'
import styles from './styles.module.css'
import { IconType } from 'react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface IProps {
  text: string
  route: string
  Icon: IconType
  children?: ReactNode
}

export default function MenuItem({ Icon, text, route }: IProps) {
  const currentURL = usePathname()
  const selected = currentURL === route

  return (
    <li className={styles.container}>
      <Link
        className={`flex flex-col justify-center items-center  ${
          styles.linkContainer
        } ${selected ? styles.linkContainerSelected : ''}`}
        href={route}
      >
        <Icon className="mb-1" size={24} />
        <span>{text}</span>
      </Link>
    </li>
  )
}
