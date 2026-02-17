import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aventura Kids - Aprende Jugando',
  description: 'Plataforma educativa con juegos divertidos para niños',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#4F46E5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="h-screen w-full overflow-hidden flex flex-col">
        {children}
      </body>
    </html>
  )
}
