'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a rota "/dashboard" após 3 segundos
    const redirectTimeout = setTimeout(() => {
      router.push('/dashboard')
    }, 3000)

    return () => clearTimeout(redirectTimeout)
  }, [router])

  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <h1 className="font-bold text-lg">Página não encontrada</h1>
      <p>Você será redirecionado para a pagina /dashboard</p>
    </div>
  )
}
