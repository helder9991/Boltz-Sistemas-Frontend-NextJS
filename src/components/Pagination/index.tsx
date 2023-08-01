'use client'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface IProps {
  totalItems: number
  itemsPerPage: number
}

export default function Pagination({ itemsPerPage, totalItems }: IProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const qntPages = Math.ceil(totalItems / itemsPerPage)
  const params = new URLSearchParams(Array.from(searchParams.entries()))
  const currentPage = Number(searchParams.get('page') ?? 1)
  const showPages = 5
  const [pagesToShow, setPagesToShow] = useState<string[]>([])

  useEffect(() => {
    const pages: string[] = []
    const leftPage = currentPage - Math.floor(showPages / 2)
    const rightPage = currentPage + Math.floor(showPages / 2)

    for (let page = leftPage; page <= rightPage; page++) {
      if (page >= 1 && page <= qntPages) {
        pages.push(String(page))
      }
    }

    if (Number(pages[0]) > 1) {
      pages.unshift('...')
      pages.unshift('1')
    }

    if (Number(pages[pages.length - 1]) < qntPages) {
      pages.push('...')
      pages.push(String(qntPages))
    }

    setPagesToShow(pages)
  }, [currentPage, qntPages])

  const handleChangePage = (page: string) => {
    params.set('page', page)

    const search = params.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  return (
    <div className={`flex justify-center items-center ${styles.container}`}>
      {pagesToShow.map((page, index) => (
        <div
          key={index}
          className={`flex justify-center items-center m-1 ${
            styles.pageNumber
          } ${page === String(currentPage) ? styles.pageNumberSelected : ''}`}
          onClick={() => handleChangePage(page)}
        >
          {page === '...' ? <span>...</span> : page}
        </div>
      ))}
    </div>
  )
}
