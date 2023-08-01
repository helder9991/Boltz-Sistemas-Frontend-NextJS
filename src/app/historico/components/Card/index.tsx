import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './styles.module.css'
import { FaChevronDown } from 'react-icons/fa'
import { IFatura } from '../../page'
import { toast } from 'react-toastify'

interface IProps {
  data: IFatura
}

export default function Card({ data }: IProps) {
  function formatDate(date: Date, stringFormat: string) {
    const formatedDate = format(new Date(date), stringFormat, {
      locale: ptBR,
    })

    return formatedDate.toUpperCase()
  }

  async function handleDownloadFatura(idFatura: string) {
    try {
      const response = await toast.promise(
        fetch(
          `http://${process.env.NEXT_PUBLIC_API_URL}/fatura/download/${idFatura}`,
          { cache: 'no-cache' },
        ),
        {
          pending: 'Carregando...',
          error: 'Aconteceu algum erro no servidor.',
        },
      )

      if (response.status === 400) {
        const body = await response.json()
        toast.error(body.mensagem)
        return
      }

      const file = await response.blob()
      const fileUrl = URL.createObjectURL(file)
      const link = document.createElement('a')

      link.href = fileUrl
      link.download = 'fatura.pdf'
      link.style.display = 'none'

      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)
    } catch (err) {}
  }
  return (
    <div className={`flex flex-col py-5 ${styles.container}`}>
      <div className={`flex justify-between text-sm mx-8`}>
        <span>{formatDate(data.mesReferencia, 'MMMM/yyyy')}</span>
        <h1 className="font-bold text-black">
          VENCIMENTO {formatDate(data.mesVencimento, 'dd/MM')}
        </h1>
      </div>

      <div className={`flex justify-between items-end h-full mx-8`}>
        <div className={`flex flex-col justify-center h-full `}>
          <span className={`w-full `}>Valor</span>
          <h1 className={`ml-5 text-black font-inter text-xl font-semibold`}>
            {data.total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </h1>
        </div>
        <button
          className={`flex items-center underline ${styles.details}`}
          onClick={() => handleDownloadFatura(data.id)}
        >
          Baixar fatura
          <FaChevronDown className={`ml-2`} size={20} />
        </button>
      </div>
    </div>
  )
}
