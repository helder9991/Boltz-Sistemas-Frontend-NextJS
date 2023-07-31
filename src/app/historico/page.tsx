'use client'
import Input from '@/components/Input'
import styles from './styles.module.css'
import { FaCalendar, FaUser } from 'react-icons/fa'
import Card from './components/Card'
import Select, { IListItem } from '@/components/Select'
import Pagination from '@/components/Pagination'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { urlParams } from '@/utils/urlParams'

interface IInstalacoesResponse {
  instalacoes: {
    id: string
    numCliente: number
    numInstalacao: number
  }[]
  qntItens: number
}

export interface IFatura {
  id: string
  total: number
  mesReferencia: Date
  mesVencimento: Date
}
interface IFaturasResponse {
  faturas: IFatura[]
  qntItens: number
}

interface IInstalacoesDropdown {
  instalacoes: {
    id: string
    value: number
  }[]
  qntItens: number
}

export default function Historico() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const firstRender = useRef(true)

  const selectedDate = searchParams.get('data')
  const selectedInstalacao = searchParams.get('instalacao')
  const selectedPage = searchParams.get('page')

  const [loadingFaturas, setLoadingFaturas] = useState<boolean>(true)
  const [faturasList, setFaturasList] = useState<IFatura[]>([])
  const [qntItems, setQntItems] = useState<number>(0)
  const [instalacaoDropdown, setInstalacaoDropdown] =
    useState<IInstalacoesDropdown>()

  const handleChangeInstalacao = useCallback(
    (instalacao: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set('instalacao', instalacao)

      const search = params.toString()
      const query = search ? `?${search}` : ''

      router.push(`${pathname}${query}`)
    },
    [router, pathname, searchParams],
  )

  const getDropdown = useCallback(async () => {
    try {
      const response = await toast.promise(
        fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/instalacao`),
        {
          pending: 'Carregando...',
          error: 'Aconteceu algum erro no servidor.',
        },
      )

      const body = await response.json()

      if (response.status === 400) {
        toast.error(body.mensagem)
        return
      }

      const { instalacoes, qntItens } = body as IInstalacoesResponse

      const dropdown: IInstalacoesDropdown = {
        qntItens: qntItens,
        instalacoes: instalacoes.map((instalacao) => ({
          id: instalacao.id,
          value: instalacao.numInstalacao,
        })),
      }

      handleChangeInstalacao(instalacoes[0].id)
      setInstalacaoDropdown(dropdown)
    } catch (err) {
      console.error(err)
    }
  }, [handleChangeInstalacao])

  const getFaturas = useCallback(async () => {
    try {
      if (selectedInstalacao === undefined) return

      const queryParams = urlParams({
        data: selectedDate,
        pagina: selectedPage,
        idInstalacao: selectedInstalacao,
      })

      if (queryParams === '?') return

      setLoadingFaturas(true)

      const response = await toast.promise(
        fetch(
          `http://${process.env.NEXT_PUBLIC_API_URL}/fatura/historico${queryParams}`,
          { cache: 'no-cache' },
        ),
        {
          pending: 'Carregando...',
          error: 'Aconteceu algum erro no servidor.',
        },
      )

      const body = await response.json()

      if (response.status === 400) {
        toast.error(body.mensagem)
        return
      }

      const { faturas, qntItens } = body as IFaturasResponse

      setFaturasList(faturas)
      setQntItems(qntItens)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingFaturas(false)
    }
  }, [selectedDate, selectedInstalacao, selectedPage])

  useEffect(() => {
    async function run() {
      if (firstRender.current === true) {
        await getDropdown()
        firstRender.current = false
      }
      await getFaturas()
    }

    run()
  }, [getDropdown, getFaturas])

  const handleSelectDate = useCallback(
    async (date: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      if (date !== '') {
        const formatedDate = format(parseISO(date), 'MM/dd/yyyy')

        params.set('data', formatedDate)
      } else {
        params.delete('data')
      }

      const search = params.toString()
      const query = search ? `?${search}` : ''

      router.push(`${pathname}${query}`)
    },
    [searchParams, router, pathname],
  )

  return (
    <div className={`flex-1 flex flex-col items-center ${styles.container}`}>
      <div className={`flex w-full justify-center ${styles.searchField}`}>
        <div
          className={`flex justify-center items-center justify-between mb-12 ${styles.searchFieldContent}`}
        >
          <Select
            title="Número da instalação"
            Icon={FaUser}
            list={instalacaoDropdown?.instalacoes}
            onChange={(instalacao: IListItem) =>
              handleChangeInstalacao(instalacao.id)
            }
          />
          <Input
            title="Data"
            type="month"
            Icon={FaCalendar}
            onInputChange={handleSelectDate}
            defaultValue={
              selectedDate ? format(new Date(selectedDate), 'yyyy-MM') : ''
            }
          />
        </div>
      </div>

      {faturasList.length === 0 && (
        <div className={`flex items-center justify-center h-full`}>
          <span>
            {loadingFaturas
              ? 'Carregando...'
              : 'Não há dados para serem mostrados'}
          </span>
        </div>
      )}

      <div
        className={`grid grid-cols-3 justify-items-center p-8 ${styles.cardsRow}`}
      >
        {faturasList.map((fatura) => (
          <Card key={fatura.id} data={fatura} />
        ))}
      </div>
      <div>
        {qntItems !== 0 && (
          <Pagination itemsPerPage={6} totalItems={qntItems} />
        )}
      </div>
    </div>
  )
}
