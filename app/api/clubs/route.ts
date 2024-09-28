import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import {
    type CreateClubDto,
    createClubDto,
    type UpdateClubDto,
    updateClubDto,
} from '@/dto/club.dto'
import prisma from '@/lib/prisma'

export async function GET(): Promise<NextResponse> {
    try {
        const club = await prisma.club.findUnique({
            where: {
                // will be replaced with logged user id
                presidentId: 'dca160be-cc58-40d4-9458-21e4a04c6244',
            },
            include: {
                members: true,
            },
        })
        return NextResponse.json(club)
    } catch (error) {
        return NextResponse.json({ error: 'Interval Server Error' }, { status: 500 })
    }
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const dto: CreateClubDto = await request.json()
        const parsedDto = createClubDto.parse(dto)

        const newClub = await prisma.club.create({
            data: parsedDto,
        })

        return NextResponse.json(`Club with ID ${newClub.id} has been created.`)
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

export async function PATCH(request: Request): Promise<NextResponse> {
    try {
        const dto: UpdateClubDto = await request.json()
        const parsedDto = updateClubDto.parse(dto)

        const updatedClub = await prisma.club.update({
            where: {
                // will be replaced with logged user id
                presidentId: 'dca160be-cc58-40d4-9458-21e4a04c6244',
            },
            data: parsedDto,
        })

        return NextResponse.json(`Club with ID ${updatedClub.id} has been updated.`)
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
        const deletedClub = await prisma.club.delete({
            where: {
                presidentId: 'dca160be-cc58-40d4-9458-21e4a04c6244',
            },
        })

        return NextResponse.json(`Club with ID ${deletedClub.id} has been updated.`)
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
