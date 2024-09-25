import './globals.css'

import { Menu } from 'lucide-react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
            <body className={montserrat.className}>
                <div className="flex justify-between bg-accent p-6">
                    <p className="text-primary-foreground font-semibold">Archery</p>
                    <Menu className="text-primary-foreground" />
                </div>
                {children}
            </body>
        </html>
    )
}
