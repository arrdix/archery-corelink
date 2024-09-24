import { updateUserDto, UpdateUserDto } from '@/app/dto/user.dto'
import prisma from '@/app/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(): Promise<NextResponse> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                // will be replaced with logged user id
                id: 'dca160be-cc58-40d4-9458-21e4a04c6244',
            },
            include: {
                license: true,
            },
        })
        return NextResponse.json({ user })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json({ error: 'Interval Server Error' }, { status: 400 })
    }
}

export async function PATCH(request: Request): Promise<NextResponse> {
    try {
        const dto: UpdateUserDto = await request.json()
        const parsedDto = updateUserDto.parse(dto)

        const updatedUser = await prisma.user.update({
            where: {
                // will be replaced with logged user id
                id: 'b7f2c4a4-9638-406f-b1b2-321d8df69fbb',
            },
            data: parsedDto,
        })

        return NextResponse.json({ message: `User with ID ${updatedUser.id} has been updated.` })
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

export async function DELETE(): Promise<NextResponse> {
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                // will be replaced with logged user id
                id: '972233f4-aa21-40f0-be6b-d57398f90531',
            },
        })

        return NextResponse.json({ message: `User with ID ${deletedUser.id} has been deleted.` })
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
