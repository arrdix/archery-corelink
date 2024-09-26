import { z } from 'zod'

import { licenseEntity } from '@/app/types/license.entity'
import { roleEntity } from '@/app/types/role.entity'

export const userEntity = z.object({
    token: z.string().optional(),
    id: z.string(),
    role: roleEntity,
    phoneNumber: z.string(),
    password: z.string().optional(),
    email: z.string(),
    name: z.string(),
    dateOfBirth: z.date().optional(),
    photo: z.string(),
    clubId: z.string().nullable(),
    license: licenseEntity.optional(),
})
export type UserEntity = z.infer<typeof userEntity>
