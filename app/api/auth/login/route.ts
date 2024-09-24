import { loginDto } from '@/app/dto/auth.dto'
import prisma from '@/app/lib/prisma'
import { comparePassword } from '@/app/utils/password-hasher'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const dto = await request.json()
        const { phoneNumber, password } = loginDto.parse(dto)

        const requestedUser = await prisma.user.findUnique({
            where: {
                phoneNumber,
            },
        })

        if (!requestedUser) return NextResponse.json({ error: 'Phone number is incorrect.' })

        const isPasswordMatch = await comparePassword(password, requestedUser.password)

        if (!isPasswordMatch) return NextResponse.json({ error: 'Password is incorrect.' })

        const secret = process.env.JWT_SECRET

        if (!secret) throw new Error('JWT Secret not found.')

        const token = jwt.sign(
            {
                data: {
                    id: requestedUser.id,
                    name: requestedUser.name,
                    email: requestedUser.email,
                    photo: requestedUser.photo,
                },
            },
            secret,
            { expiresIn: '12h' }
        )

        return NextResponse.json({ token })
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
