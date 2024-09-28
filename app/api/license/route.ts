import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import {
    type CreateLicenseDto,
    createLicenseDto,
    type UpdateLicenseDto,
    updateLicenseDto,
} from '@/dto/license.dto'
import prisma from '@/lib/prisma'

export async function GET(): Promise<NextResponse> {
    try {
        const license = await prisma.license.findUnique({
            where: {
                // will be replaced with logged user id
                userId: 'dca160be-cc58-40d4-9458-21e4a04c6244',
            },
        })
        return NextResponse.json(license)
    } catch (error) {
        return NextResponse.json({ error: 'Interval Server Error' }, { status: 500 })
    }
}

export async function POST(request: NextResponse): Promise<NextResponse> {
    try {
        const dto = await request.json()
        const parsedDto: CreateLicenseDto = createLicenseDto.parse(dto)

        const newLicense = await prisma.license.create({
            data: parsedDto,
        })

        return NextResponse.json(`License with ID ${newLicense.id} has been created.`)
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
        const dto: UpdateLicenseDto = await request.json()
        const parsedDto = updateLicenseDto.parse(dto)

        const updatedLicense = await prisma.license.update({
            where: {
                // will be replaced with logged user id
                userId: 'dca160be-cc58-40d4-9458-21e4a04c6244',
            },
            data: parsedDto,
        })

        return NextResponse.json(`License with ID ${updatedLicense.id} has been updated.`)
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
        const deletedLicense = await prisma.license.delete({
            where: {
                // will be replaced with logged user id
                userId: 'dca160be-cc58-40d4-9458-21e4a04c6244',
            },
        })

        return NextResponse.json(`License with ID ${deletedLicense.id} has been updated.`)
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
