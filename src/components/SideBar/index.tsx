'use client'
import Image from 'next/image'
import MenuItem from './components/MenuItem'
import styles from './styles.module.css'
import { FaClipboardList, FaChartLine, FaBars } from 'react-icons/fa'
import DrawerMenu from './components/DrawerMenu'
import { useState } from 'react'
import { IconType } from 'react-icons'

const logoFile = '/logo.svg'

export interface IMenu {
  route: string
  text: string
  Icon: IconType
}

export default function SideBar() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const menus: IMenu[] = [
    {
      route: '/dashboard',
      text: 'Dashboard',
      Icon: FaChartLine,
    },
    {
      route: '/historico',
      text: 'Histórico',
      Icon: FaClipboardList,
    },
  ]

  function toggleDrawerMenu() {
    setOpenDrawer((prevState) => !prevState)
  }

  return (
    <div className={`h-full ${styles.container}`}>
      <DrawerMenu
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawerMenu}
        menus={menus}
      />

      <button className={styles.menuContainer} onClick={toggleDrawerMenu}>
        <FaBars size={30} color="#515151" />
      </button>
      <div
        className={`flex items-center justify-center relative ${styles.logoContainer}`}
      >
        <Image src={logoFile} alt="Sistema" width={120} height={100} />
        <hr className={`absolute bottom-0 ${styles.containerSeparator}`} />
      </div>

      <nav className={`flex justify-center ${styles.navContainer}`}>
        <ul>
          {menus.map(({ route, Icon, text }) => (
            <MenuItem key={route} route={route} text={text} Icon={Icon} />
          ))}
        </ul>
      </nav>
    </div>
  )
}
