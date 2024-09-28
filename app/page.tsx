'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function Home(): JSX.Element {
    const router = useRouter()

    return (
        <main className="flex flex-col items-center p-8 min-h-screen ">
            <Image src="/banner.png" alt="Banner image" width={500} height={500} />
            <Button
                className="bg-accent"
                size="lg"
                onClick={() => {
                    router.push('/login')
                }}
            >
                Get Started
            </Button>
        </main>
    )
}
