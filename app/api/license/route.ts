import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const license = await prisma.license.findMany()
        return NextResponse.json({ license })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch license' }, { status: 500 })
    }
}
