import './globals.css'

import { Menu } from 'lucide-react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Providers } from '@/app/providers'

const montserrat = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Archery Core Link',
    description: 'Archery Core Link Official Website',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>): JSX.Element {
    return (
        <html lang="en">
            <Providers>
                <body className={montserrat.className}>
                    <div className="flex justify-between p-6 shadow">
                        <p className="font-semibold">Archery</p>
                        <Menu />
                    </div>
                    {children}
                </body>
            </Providers>
        </html>
    )
}
