import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { type RegisterDto, registerDto } from '@/dto/auth.dto'
import prisma from '@/lib/prisma'
import { type UserEntity } from '@/types/user.entity'
import HashPassword from '@/utils/password-hasher'
import { generateToken } from '@/utils/token-generator'

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const dto: RegisterDto = await request.json()
        const parsedDto = registerDto.parse(dto)

        const newUser: UserEntity = await prisma.user.create({
            data: {
                ...parsedDto,
                password: await HashPassword.hash(parsedDto.password),
                photo: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Jack',
            },
        })

        delete newUser.password
        delete newUser.dateOfBirth

        const token = generateToken(newUser)

        return NextResponse.json({ token, ...newUser })
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
