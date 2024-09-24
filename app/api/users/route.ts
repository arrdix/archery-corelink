import { createUserDto, CreateUserDto } from '@/app/dto/user.dto'
import prisma from '@/app/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET() {
    try {
        const users = await prisma.user.findMany()
        return NextResponse.json({ users })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const dto: CreateUserDto = await request.json()
        const parsedDto = createUserDto.parse(dto)

        const newUser = await prisma.user.create({
            data: parsedDto,
        })

        return NextResponse.json({ newUser })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json({ error: 'Interval Server Error' }, { status: 400 })
    }
}
