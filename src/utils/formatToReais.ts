export default function formatToReais(value: number | undefined) {
  if (value === undefined) return

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formatter.format(value)
}
