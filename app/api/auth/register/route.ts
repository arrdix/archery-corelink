import { registerDto, RegisterDto } from '@/app/dto/auth.dto'
import prisma from '@/app/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { hashPassword } from '@/app/utils/password-hasher'

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const dto: RegisterDto = await request.json()
        const parsedDto = registerDto.parse(dto)

        const newUser = await prisma.user.create({
            data: {
                ...parsedDto,
                password: await hashPassword(parsedDto.password),
            },
        })

        return NextResponse.json({ message: `User with ID ${newUser.id} has been created.` })
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
