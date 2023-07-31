'use client'
import React, { ReactNode } from 'react'
import { Box, Drawer } from '@mui/material'
import { IMenu } from '../..'

import styles from './styles.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface IProps {
  openDrawer: boolean
  toggleDrawer: (data: boolean) => void
  menus: IMenu[]
  children?: ReactNode
}

export default function DrawerMenu({
  openDrawer,
  toggleDrawer,
  menus,
  children,
}: IProps) {
  const currentURL = usePathname()

  return (
    <Drawer anchor="left" open={openDrawer} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation">
        <ul>
          {menus.map(({ text, route, Icon }) => {
            const selected = currentURL === route
            return (
              <li key={route} className={styles.listItemContainer}>
                <Link
                  className={`${styles.linkContainer} ${
                    selected ? styles.linkContainerSelected : ''
                  }`}
                  href={route}
                  onClick={() => toggleDrawer(false)}
                >
                  <Icon size={30} />
                  <span className={styles.itemText}>{text}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Box>
      {children}
    </Drawer>
  )
}
