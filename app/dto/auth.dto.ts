import { roleEntity } from '@/app/types/role.entity'
import { z } from 'zod'

export const registerDto = z.object({
    role: roleEntity,
    phoneNumber: z.string(),
    password: z.string(),
    email: z.string(),
    name: z.string(),
    dateOfBirth: z.string().transform((date) => new Date(date)),
    photo: z.string(),
    clubId: z.string().optional(),
})
export type RegisterDto = z.infer<typeof registerDto>

export const loginDto = z.object({
    phoneNumber: z.string(),
    password: z.string(),
})
export type LoginDto = z.infer<typeof loginDto>
