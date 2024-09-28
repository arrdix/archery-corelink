import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { loginDto } from '@/app/dto/auth.dto'
import prisma from '@/app/lib/prisma'
import { type UserEntity } from '@/app/types/user.entity'
import { comparePassword } from '@/app/utils/password-hasher'
import { generateToken } from '@/app/utils/token-generator'

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

        const isPasswordMatch = await comparePassword(password, requestedUser.password)

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
