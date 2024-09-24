import { z } from 'zod'
import { roleEntity } from '@/app/types/role.entity'
import { licenseEntity } from '@/app/types/license.entity'

export const userEntity = z.object({
    id: z.string(),
    role: roleEntity,
    phoneNumber: z.string(),
    password: z.string(),
    email: z.string(),
    name: z.string(),
    dateOfBirth: z.date(),
    photo: z.string(),
    clubId: z.string(),
    license: licenseEntity,
    presidentOf: z.string().nullable(),
})
export type UserEntity = z.infer<typeof userEntity>
