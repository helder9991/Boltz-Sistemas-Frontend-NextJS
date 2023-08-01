import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

// These styles apply to every route in the application
import './layout.css'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import SideBar from '../components/SideBar'

export const metadata: Metadata = {
  title: 'Boltz Sistemas',
  description: 'Sistema Boltz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body>
        <ToastContainer />
        <SideBar />
        <div className={`flex flex-1 justify-center overflow-y-auto`}>
          {children}
        </div>
      </body>
    </html>
  )
}
