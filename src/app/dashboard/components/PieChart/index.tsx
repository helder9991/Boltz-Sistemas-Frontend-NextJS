import { ResponsivePie } from '@nivo/pie'

interface IProps {
  data: {
    energiaEletrica: number | undefined
    contribIlumPublica: number | undefined
  }
}

export default function PieChart({
  data: { energiaEletrica = 0, contribIlumPublica = 0 },
}: IProps) {
  const data = [
    {
      id: 'Energ. Eletrica',
      label: 'Energia Elétrica',
      value: energiaEletrica ? energiaEletrica.toFixed(2) : 0,
    },
    {
      id: 'Contrib Ilum Publica',
      label: 'Contrib Ilum Pública',
      value: contribIlumPublica ? contribIlumPublica.toFixed(2) : 0,
    },
  ]

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 20, bottom: 80, left: 20 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      enableArcLinkLabels={false}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#ffffff4c',
          size: 4,
          padding: 1,
          stagger: true,
        },
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 50,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  )
}
