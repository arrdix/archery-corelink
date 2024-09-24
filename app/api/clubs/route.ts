import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const clubs = await prisma.club.findMany()
        return NextResponse.json({ clubs })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch clubs' }, { status: 500 })
    }
}
