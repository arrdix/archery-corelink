import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { loginDto } from '@/dto/auth.dto'
import prisma from '@/lib/prisma'
import { type UserEntity } from '@/types/user.entity'
import HashPassword from '@/utils/password-hasher'
import { generateToken } from '@/utils/token-generator'

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const dto = await request.json()
        const { phoneNumber, password } = loginDto.parse(dto)

        const requestedUser = await prisma.user.findUnique({
            where: {
                phoneNumber,
            },
        })

        if (!requestedUser)
            return NextResponse.json({ error: 'Phone number is incorrect.' }, { status: 400 })

        const isPasswordMatch = await HashPassword.compare(password, requestedUser.password)

        if (!isPasswordMatch)
            return NextResponse.json({ error: 'Password is incorrect.' }, { status: 400 })

        const user: UserEntity = requestedUser

        delete user.password
        delete user.dateOfBirth

        const token = generateToken(user)

        return NextResponse.json(token)
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
