import { roleEntity } from '@/app/types/role.entity'
import { z } from 'zod'

export const createUserDto = z.object({
    role: roleEntity,
    phoneNumber: z.string(),
    password: z.string(),
    email: z.string(),
    name: z.string(),
    dateOfBirth: z.string().transform((date) => new Date(date)),
    photo: z.string(),
    clubId: z.string().optional(),
})
export type CreateUserDto = z.infer<typeof createUserDto>
