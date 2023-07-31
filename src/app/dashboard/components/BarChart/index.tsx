import { BarDatum, ResponsiveBar } from '@nivo/bar'
import { I7MesesInfo } from '../../page'
import { useCallback, useEffect, useState } from 'react'

interface IProps {
  data: I7MesesInfo[]
}

export default function BarChart({ data = [] }: IProps) {
  const [barData, setBarData] = useState<BarDatum[]>([])

  const getMonth = useCallback((date: Date) => {
    const formatoData = new Intl.DateTimeFormat('pt-BR', { month: 'long' })

    // Extrair os componentes da data
    const [ano, mes, dia] = String(date).split('T')[0].split('-')

    // Criar o objeto de data a partir dos componentes
    const dataFormatada = new Date(`${ano}/${mes}/${dia}`)

    return formatoData.format(dataFormatada)
  }, [])

  const formatDate = useCallback(() => {
    const formated = data.map((mes) => ({
      ...mes,
      mes: getMonth(mes.mesReferencia),
    }))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setBarData(formated as any)
  }, [data, getMonth])

  useEffect(() => {
    formatDate()
  }, [formatDate])

  return (
    <ResponsiveBar
      data={barData}
      keys={[
        'energiaEletricaValor',
        'energiaInjetadaValor',
        'enCompSemICMSValor',
        'contribIlumPublicaMunicipalValor',
      ]}
      indexBy="mes"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Mes',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Preço (R$)',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ': ' + e.formattedValue + ' em meses: ' + e.indexValue
      }
    />
  )
}
