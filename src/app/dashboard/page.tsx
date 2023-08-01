'use client'
import { FaUpload } from 'react-icons/fa'

import styles from './styles.module.css'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Card from './components/Card'
import dynamic from 'next/dynamic'
import formatToReais from '@/utils/formatToReais'
import { toast } from 'react-toastify'

const BarChart = dynamic(() => import('./components/BarChart'), { ssr: false })
const PieChart = dynamic(() => import('./components/PieChart'), { ssr: false })

export interface I7MesesInfo {
  mesReferencia: Date
  energiaEletricaValor: number
  energiaInjetadaValor: number
  enCompSemICMSValor: number
  contribIlumPublicaMunicipalValor: number
}
interface IDashboardResponse {
  qntUC: number
  resumo7meses: Array<I7MesesInfo>
  valorTotal: number
  totalEnergiaEletrica: number
  totalEnergiaInjetada: number
  totalContribIlumPublicaMunicipal: number
}

export default function Dashboard() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dashboardInfo, setDashboardInfo] = useState<IDashboardResponse>()

  async function getDashboard() {
    try {
      const response = await toast.promise(
        fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/fatura/dashboard`),
        {
          pending: 'Carregando...',
          success: 'Dashboard carregado com sucesso!',
          error: 'Aconteceu algum erro no servidor.',
        },
      )
      const body = (await response.json()) as IDashboardResponse

      setDashboardInfo(body)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getDashboard()
  }, [])

  const handleUploadFileInput = () => {
    // Simula um clique no input file real quando o botão personalizado é clicado
    if (fileInputRef.current === null) return

    fileInputRef.current.click()
  }

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    // Aqui você pode acessar o arquivo selecionado pelo usuário através do 'files' do input file
    if (event.target.files === null) return

    const selectedFile = event.target.files[0]

    if (selectedFile.type !== 'application/pdf')
      return toast.error('O arquivo precisa ser um PDF')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await toast.promise(
        fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/fatura/upload`, {
          method: 'post',
          body: formData,
        }),
        {
          pending: 'Fazendo upload...',
          error: 'Aconteceu algum erro no servidor.',
        },
      )

      if (response.status === 400) {
        const { mensagem } = await response.json()
        toast.error(mensagem)
        return
      }

      toast.success('Fatura cadastrada com sucesso!')
      getDashboard()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      className={`h-full flex-1 flex flex-col justify-between px-10 pt-10 ${styles.container}`}
    >
      <div className="flex justify-end items-end mr-10">
        <button className="flex items-end" onClick={handleUploadFileInput}>
          <input
            className="hidden"
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
          />
          <FaUpload className="mr-4" size={30} />
          <span className="underline underline-offset-2">
            Subir uma nova fatura
          </span>
        </button>
      </div>

      <div className={`flex justify-between ${styles.cardsRow}`}>
        <Card
          title="Quantidade de UC"
          value={dashboardInfo?.qntUC}
          valueStyle={{ color: '#000', fontSize: '26px', fontWeight: 500 }}
          color="#FF7D7D"
        />
        <Card
          title="Total Energia Elétrica"
          value={formatToReais(dashboardInfo?.totalEnergiaEletrica)}
          valueStyle={{ color: '#24A305', fontSize: '26px', fontWeight: 500 }}
          color="#65A4DD"
        />
        <Card
          title="Total Energia Injetada HFP"
          value={formatToReais(dashboardInfo?.totalEnergiaInjetada)}
          valueStyle={{ color: '#24A305', fontSize: '26px', fontWeight: 500 }}
          color="#F1E25B"
        />
        <Card
          title="Valor Total"
          value={formatToReais(dashboardInfo?.valorTotal)}
          valueStyle={{
            color: '#24A305',
            fontSize: '26px',
            fontWeight: 700,
            textDecoration: 'underline',
          }}
          color="#5BF16A"
        />
      </div>

      <div className={`flex justify-between ${styles.graphsRow}`}>
        <div className={`${styles.barChart}`}>
          <div className="flex-1 flex flex-col my-5 mx-6 h-full">
            <h1>Valores Faturados nos Últimos 7 Meses</h1>
            <div style={{ height: '85%', width: '100%' }}>
              <BarChart data={dashboardInfo?.resumo7meses ?? []} />
            </div>
          </div>
        </div>

        <div className={`w-2/6 ${styles.pieChart}`}>
          <div className="flex-1 flex flex-col my-5 mx-6 h-full">
            <h1>Energia Elétrica x Contrib Ilum Public Municipal</h1>
            <div style={{ height: '80%', width: '100%' }}>
              <PieChart
                data={{
                  energiaEletrica: dashboardInfo?.totalEnergiaEletrica,
                  contribIlumPublica:
                    dashboardInfo?.totalContribIlumPublicaMunicipal,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
