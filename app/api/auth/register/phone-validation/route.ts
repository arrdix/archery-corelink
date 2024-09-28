import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { type PhoneValidationDto, phoneValidationDto } from '@/dto/auth.dto'
import prisma from '@/lib/prisma'
import { type UserEntity } from '@/types/user.entity'

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const dto: PhoneValidationDto = await request.json()
        const { phoneNumber } = phoneValidationDto.parse(dto)

        const userFound: UserEntity | null = await prisma.user.findUnique({
            where: {
                phoneNumber,
            },
        })

        return NextResponse.json(userFound)
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
